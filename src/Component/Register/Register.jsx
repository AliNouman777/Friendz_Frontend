import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import logo from "../Header/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { SignupCall } from "../../../Redux/AsyncSlice/signUp";
import avatar from "./avatar.png";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const animations = {
    initial: {
      x: "30vw",
    },
    initial2: {
      x: "-20vw",
    },
    whileInView: {
      x: "0vw",
    },
  };

  const {isAuth,loading}=useSelector(state=>state.user)
  useEffect(()=>{
    if(isAuth){
      navigate("/")
    }
  })
  const [name, setname] = useState("");
  const [image, setimage] = useState(avatar);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setimage(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      avatar: image,
      name: name,
      email: email,
      password: password,
    };

    dispatch(SignupCall(data)).then((e) => {
      if (e.payload) {
        if (e.payload.status === 201) {
          toast.success("Account Created Successfully");
          setemail("");
          setpassword("");
          setname("");
          setimage(avatar);
          navigate("/");
        } else {
          toast.error(e.payload.message);
        }
      }
    });
  };
  return (
    <>
      <div className="login">
        <motion.div
          className="logincon"
          initial={animations.initial2}
          whileInView={animations.whileInView}
          transition={{ duration: 1 }}
        >
          <h1>Signup to Friendz</h1>
          <p>connect to people socialy</p>

          <motion.div
            initial={animations.initial2}
            whileInView={animations.whileInView}
            transition={{ duration: 1 }}
          >
            <img src={logo} id="signupimage" alt="Logo" />
          </motion.div>
        </motion.div>
        <motion.div
          initial={animations.initial}
          whileInView={animations.whileInView}
          transition={{ duration: 1 }}
          className="formcon"
        >
          <form onSubmit={handleSubmit} className="submitform">
            <h1>SignUp</h1>

            <img src={image} alt="" id="signupimage" />
            <input
              type="file"
              required
              onChange={handleChangeImage}
              name="image"
              id="image"
            />

            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Name"
              required
            />

            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email"
              required
            />

            <input
              value={password}
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              required
              name="password"
              placeholder="Password"
              id="password"
            />
            <button disabled={loading} type="submit">SignUp</button>
            <p>OR</p>
            <Link className="link" to={"/login"}>
              LogIn
            </Link>
          </form>
        </motion.div>
      </div>
      <Toaster />
    </>
  );
};

export default Register;
