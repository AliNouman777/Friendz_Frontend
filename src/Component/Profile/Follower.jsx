import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useSelector } from "react-redux";

const Follower = ({ setshowfollower, profileid }) => {
  const { followerList } = useSelector((state) => state.user);
  let elem;
  if (followerList.followers) {
    elem = followerList.followers.map((i) => {
      return (
        <p key={i._id}>
          <Link to={profileid === i._id ? "/profile" : `/User/${i._id}`}>
            {i.name}
          </Link>
        </p>
      );
    });
  }

  return (
    <section id="parent">
      <div className="follower">
        <i
          onClick={() => setshowfollower(false)}
          id="close"
          className="fa fa-window-close close"
          aria-hidden="true"
        ></i>
        {elem}
      </div>
    </section>
  );
};

export default Follower;
