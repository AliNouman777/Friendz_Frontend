import React, { useEffect, useMemo, useState } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AllUser } from "../../../Redux/AsyncSlice/User";
import { LoadUser } from "../../../Redux/AsyncSlice/LoadUser";
import toast, { Toaster } from "react-hot-toast";

import {
  Allpost,
  LikeAndUnlikePost,
  AsynViewComment,
} from "../../../Redux/AsyncSlice/Allpost";
import Comment from "../Comment/Comment";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [like, setLike] = useState(false);
  const [showcomment, setshowComment] = useState(false);
  const [ownerkey, setownerkey] = useState(null);
  const [owner, setowner] = useState("");

  const { isAuth, AllUserdata, user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    const fetchData = async () => {
      navigate("/");
      dispatch(Allpost())
        .then((e) => {})
        .catch((err) => {
          alert("Some error occured");
        });
      dispatch(AllUser())
        .then((e) => {})
        .catch((err) => {
          alert("Some error occured");
        });
    };
    dispatch(LoadUser())
      .then((e) => {})
      .catch((err) => {
        alert("Some error occured");
      });
    if (isAuth) {
      fetchData();
    } else {
        navigate("/login");
    }
  }, [like, isAuth]);

  const handleLike = (key) => {
    dispatch(LikeAndUnlikePost(key))
      .then((e) => {
        setLike(!like);
        toast.success(e.payload.message);
      })
      .catch((err) => {
        alert("Some error occured");
      });
  };

  let UserData;
  if (user.MyProfile) {
    UserData = AllUserdata.map((item) => {
      return item._id && user.MyProfile._id ? (
        <Link
          to={
            item._id === user.MyProfile._id ? "/profile" : `/User/${item._id}`
          }
          key={item._id}
          className="usercon"
        >
          <img src={item.avatar.url} alt="img" />
          <h5>{item.name}</h5>
        </Link>
      ) : (
        <h2>Loading...</h2>
      );
    });
  }

  let PostItems;
  if (posts.Post) {
    PostItems = posts.Post.map((item) => {
      let isLiked;
      if (user.MyProfile) {
        isLiked = item.likes.includes(user.MyProfile._id);
      }

      function handleComment(key, ownerid, Owner) {
        setshowComment(!showcomment);
        dispatch(AsynViewComment(key));
        setownerkey(ownerid);
        setowner(Owner);
      }

      {
        return (
          <div key={item._id} className="postcon">
            <div className="post">
              <div className="postuser">
                <img src={item.owner.avatar.url} alt="post" />

                {item.owner && user.MyProfile && (
                  <Link
                    to={
                      item.owner._id === user.MyProfile._id
                        ? "/profile"
                        : `/User/${item.owner._id}`
                    }
                  >
                    <h5>{item.owner.name}</h5>
                  </Link>
                )}
              </div>
              <p className="caption">{item.caption}</p>
              <img id="postimg" src={item.image.url} alt="post" />
            </div>
            <div className="posttext">
              <div className="likes">
                <p id="likeslength">{item.likes.length} Likes</p>
                <i
                  style={{ color: "red" }}
                  className={`fa-${
                    !isLiked ? "regular" : "solid"
                  } fa-heart heart`}
                  onClick={() => handleLike(item._id, item.likes)}
                ></i>
              </div>
              <div className="comments">
                <i
                  onClick={() =>
                    handleComment(item._id, item._id, user.MyProfile._id)
                  }
                  className="fa-regular fa-comment-dots comment"
                ></i>
              </div>
            </div>
          </div>
        );
      }
    });
  }

  return (
    <>
      {user.MyProfile ? (
        <div className="Home">
          <main>
            {posts.Post && posts.Post.length > 0 ? PostItems : <h1>No Post</h1>}
          </main>
          <span className="Span">
            <h1 id="alluser">All User</h1>
          </span>
          <aside>{UserData}</aside>
          {showcomment && (
            <Comment
              ownerkey={ownerkey}
              owner={owner}
              setshowcomment={setshowComment}
            />
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <Toaster />
    </>
  );
};

export default Home;
