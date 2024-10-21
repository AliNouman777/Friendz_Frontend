import React from 'react'
import './App.css'
import Header from './Component/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Component/Home/Home.jsx'
import AddPost from "./Component/AddPost/AddPost.jsx"
import Profile from "./Component/Profile/Profile.jsx"
import Setting from "./Component/Setting/Setting.jsx"
import Login from "./Component/Login/Login.jsx"
import Register from "./Component/Register/Register.jsx"
import { useEffect } from 'react'
import { LoadUser } from '../Redux/AsyncSlice/LoadUser'
import { useDispatch ,useSelector} from 'react-redux'
import UserProfile from './Component/UserProfile/UserProfile.jsx'




function App() {
  const dispatch = useDispatch()
const {isAuth}=useSelector(state=>state.user)

  useEffect(() => {
      dispatch(LoadUser())
}, [])

  

  return (
    <BrowserRouter>
      <Header />
      <Routes>

        
      <Route path={'/signup'} element={<Register/>} />

        <Route path='/login' element={<Login/>} />

        <Route path='/' element={<Home />} />

        <Route path='/addPost' element={isAuth ? <AddPost /> : <Login />} />

        <Route path='/profile' element={<Profile />} />

        < Route path='/setting' element={isAuth?<Setting/> : <Login/>} />

        <Route path="/User/:id" element={<UserProfile/>} />"

      </Routes>
    </BrowserRouter>
  )
}

export default App
