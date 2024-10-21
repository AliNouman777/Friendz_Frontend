import React,{useEffect} from "react";
import "./Login.css";
import logo from "../Header/logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginCall } from "../../../Redux/AsyncSlice/LoginCall";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuth,loading}=useSelector(state=>state.user)
  
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

  useEffect(()=>{
    if(isAuth){ 
      navigate("/")
    }
  })

  const Submit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    dispatch(LoginCall(data)).then((res) => {

      if(res.payload.success === true){
        toast.success("Login Successful");
        navigate("/");
      }else{
        toast.error("Invalid Credentials");
      }}
    ).catch((err) => {
     alert("Some problem occured")
    })
  };

  return (
    <>
    <div className="login" id="login">
      <motion.div
        initial={animations.initial2}
        whileInView={animations.whileInView}
        transition={{ duration: 1 }}
        className="logincon"
      >
        <h1>Login to Friendz</h1>
        <p>connect to people socialy</p>
        <div>
          <img src={logo} alt="Logo" />
        </div>
      </motion.div>

      <motion.div
        initial={animations.initial}
        whileInView={animations.whileInView}
        transition={{ duration: 1 }}
        className="formcon"
        id="formcon"
      >
        <form className="submitform" id="submitform" onSubmit={Submit}>
          <h1>Login</h1>

          <input
            type="email"
            name="email"
            id="emailid"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            placeholder="Password"
            id="passwordid"
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <p>OR</p>
          <Link className="link" to={"/signup"}>
            SignUp
          </Link>
        </form>
      </motion.div>
    </div>
    <Toaster />
    </>
  );
};

export default Login;
