import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import {
  AsyncFollowingList,
  AsyncFollowerList,
} from "../../../Redux/AsyncSlice/User";
import { LoadUser } from "../../../Redux/AsyncSlice/LoadUser";
import {
  LikeAndUnlikePost,
  AsyncDeletePost,
} from "../../../Redux/AsyncSlice/Allpost";
import Follower from "./Follower.jsx";
import Following from "./Following.jsx";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isAuth, loading } = useSelector((state) => state.user);

  const [showfollowing, setshowfollowing] = useState(false);
  const [showfollower, setshowfollower] = useState(false);
  let postelem;

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
    dispatch(LoadUser());
  }, []);

  function handlelike(id) {
    dispatch(LikeAndUnlikePost(id)).then(() => {
      dispatch(LoadUser());
      toast.success("post liked");
    });
  }

  function deletePost(userid) {
    dispatch(AsyncDeletePost(userid)).then(() => {
      toast.success("post deleted");
      dispatch(LoadUser());
    });
  }

  function follower() {
    dispatch(AsyncFollowerList());
    setshowfollower(true);
  }

  function following() {
    dispatch(AsyncFollowingList());
    setshowfollowing(true);
  }

  if (user.MyProfile) {
    postelem = user.MyProfile.post.map((post) => {
      return (
        <div key={post._id} className="sectionpost">
          <img src={post.image.url} alt="post" /> <br />
          <p>{post.caption}</p>
          <div className="profilepostdata">
            <div>
              <p id="secondary" className="secondary">
                {post.likes.length} likes
              </p>
              {post.likes.includes(user.MyProfile._id) ? (
                <i
                  onClick={() => handlelike(post._id)}
                  className="fa-solid fa-heart heart proheart"
                ></i>
              ) : (
                <i
                  onClick={() => handlelike(post._id)}
                  className="fa-regular fa-heart heart proheart"
                ></i>
              )}
            </div>

            <i
              disabled={loading}
              onClick={() => deletePost(post._id)}
              id="deletepost"
              className="fa-solid fa-trash-can trashcan"
            ></i>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      {user.MyProfile ? (
        <div className="Profile">
          <section className="profilesection">
            <img src={user.MyProfile.avatar.url} alt="profile" />
            <div className="profiledetail">
              <h1>{user.MyProfile.name}</h1>
              <p>{user.MyProfile.email}</p>
              <div className="profiledata">
                <button onClick={follower}>
                  Followers {"(" + user.MyProfile.followers.length + ")"}
                </button>
                <button onClick={following}>
                  Following {"(" + user.MyProfile.following.length + ")"}
                </button>
              </div>
              <span>{user.MyProfile.post.length} &nbsp; Posts</span>
            </div>
          </section>

          <section className="postSection">
            {showfollower && (
              <Follower
                setshowfollower={setshowfollower}
                profileid={user.MyProfile._id}
              />
            )}

            {showfollowing && (
              <Following
                setshowfollowing={setshowfollowing}
                profileid={user.MyProfile._id}
              />
            )}

            {postelem}
          </section>
        </div>
      ) : (
        <h1>Loadiing...</h1>
      )}
      <Toaster />
    </>
  );
};

export default Profile;
