import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useLayoutEffect } from "react";
import "./Setting.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AsyncChangeProfile,
  AsyncChangePassword,
  AsyncDeleteProfile,
  AsyncLogoutProfile,
} from "../../../Redux/AsyncSlice/User";
import toast ,{Toaster} from 'react-hot-toast'; 
const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  useLayoutEffect(()=>{
  
  },[isAuth])
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [oldpassword, setoldpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function toggleDropdown2() {
    setShowDropdown2(!showDropdown2);
  }

  function handleChange() {
    dispatch(AsyncChangeProfile({ name, email })).then(()=>{
      toast.success("Profile Updated Successfully");
    });
  }

  function handlepasswordchange() {
    dispatch(AsyncChangePassword({ oldpassword, password, confirmpassword })).then(()=>{
      toast.success("Password Updated Successfully"); 
    });
  }

  function ChangeProfile() {
    dispatch(AsyncDeleteProfile()).then(() => {
      navigate("/login");
      toast.success("Profile Deleted Successfully");
    });
  }

  function Logout() {
    dispatch(AsyncLogoutProfile()).then(() => {
      navigate("/login");
    });
  }

  return (
    <>
      <section className="settings">
        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            Change Username And Email
          </button>

          {showDropdown && (
            <div className="change">
              <div className="changecontent">
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={(e) => setname(e.target.value)}
                />
                <button onClick={handleChange}>Change</button>
                <Link onClick={() => setShowDropdown(!showDropdown)}>
                  Cancel
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown2}>
            Change Password
          </button>
          {showDropdown2 && (
            <div className="change">
              <div className="changecontent">
                <input
                  type="text"
                  name="passord"
                  id="oldpassword"
                  onChange={(e) => setoldpassword(e.target.value)}
                  placeholder="Old Password"
                />

                <input
                  type="text"
                  name="passord"
                  id="passord"
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="New Password"
                />

                <input
                  type="text"
                  name="confirm-passord"
                  id="passord"
                  onChange={(e) => setconfirmpassword(e.target.value)}
                  placeholder="Confirm Password"
                />

                <button onClick={handlepasswordchange}>Change</button>

                <Link onClick={() => setShowDropdown2(!showDropdown2)}>
                  Cancel
                </Link>
              </div>
            </div>
          )}
        </div>

        <button onClick={Logout} className="deleteprofile logout">
          Logout
        </button>

        <br />
        
        <button onClick={ChangeProfile} className="deleteprofile">
          Delete Profile
        </button>
      </section>
      <Toaster/>
    </>
  );
};

export default Setting;
