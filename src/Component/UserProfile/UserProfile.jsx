import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GetUser } from "../../../Redux/AsyncSlice/User";
import "./UserProfile.css";
import { AsyncFollowUser } from "../../../Redux/AsyncSlice/User.jsx";
import toast, { Toaster } from "react-hot-toast";

const UserProfile = () => {
  const { ParticularUser, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [Includes, setIncludes] = useState(false);

  const [toggle, settoggle] = useState(false);
  const { id } = useParams();

  const FollowUser = (id) => {
    dispatch(AsyncFollowUser(id)).then((e) => {
      settoggle(!toggle);
      toast.success(e.payload.message);
    });
  };

  useEffect(() => {
    dispatch(GetUser(id));
  }, [dispatch, toggle]);

  return (
    <>
      <div className="user-profile">
        {ParticularUser.user ? (
          <>
            <div className="user-profile-header">
              <div className="user-profile-image" id="profile-image">
                <img src={ParticularUser.user.avatar.url} alt={"profile"} />
              </div>
              <div className="user-profile-stats">
                <p>
                  <span>{ParticularUser.user.post.length}</span> posts
                </p>
                <p>
                  <span>{ParticularUser.user.followers.length}</span> followers
                </p>
                <p>
                  <span>{ParticularUser.user.following.length}</span> following
                </p>

                {ParticularUser.user && user.MyProfile ? (
                  ParticularUser.user.followers.includes(user.MyProfile._id) ? (
                    <i
                      onClick={() => FollowUser(ParticularUser.user._id)}
                      className="fa fa-user-friends"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    <i
                      onClick={() => FollowUser(ParticularUser.user._id)}
                      className="fa fa-user-plus"
                      aria-hidden="true"
                    ></i>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
            <h1 className="user-profile-name">{ParticularUser.user.name}</h1>
            <p className="user-profile-email">
              Email: {ParticularUser.user.email}
            </p>

            {ParticularUser.user.post.length > 0 ? (
              <div className="user-profile-posts">
                {ParticularUser.user.post.map((post) => (
                  <div key={post._id} id="post-image">
                    <img src={post.image.url} alt={"post"} id="ppic" />
                    <div id="detailscon">
                      <p id="captionpara">{post.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h1>No Posts</h1>
              </div>
            )}
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default UserProfile;
