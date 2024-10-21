import React from "react";
import "./Profile.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Following = ({ setshowfollowing, profileid }) => {
  const { followingList } = useSelector((state) => state.user);

  let elem;
  if (followingList.following) {
    elem = followingList.following.map((i) => {
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
          onClick={() => setshowfollowing(false)}
          id="close"
          className="fa fa-window-close close"
          aria-hidden="true"
        ></i>

        {elem}
      </div>
    </section>
  );
};

export default Following;
