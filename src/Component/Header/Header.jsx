import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import logo from "./logo.png"
import { useSelector } from 'react-redux'

const Header = () => {

    const {isAuth}=useSelector(state=>state.user)

    return isAuth && (
        <div className='header'>

        <div className="logo">
            <img src={logo}  alt="logo" />
        </div>

            <div className="innerheader">

                <Link to='/'>  <i className="fa-solid fa-house"></i></Link>

                <Link to="/addpost" > <i className="fa-solid fa-plus"></i></Link>

                <Link to="/profile" > <i className="fa-solid fa-user"></i></Link>

               <Link to="/setting"><i className="fa-solid fa-gear"></i></Link>
            </div>
        </div>
    )
}

export default Header
