import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Avatar from './avatar.png';


const Layout = ({name, setUserName}) => {
  
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      navigate('/dashboard');
    }
  }, [])

  const Logout = () => {
    localStorage.removeItem('userToken');
    setUserName('');
  }

  const UserNav = !localStorage.getItem('userToken') ?
    [
      <li key={1} className="nav-item m-1 ">
        <Link className="nav-link text-white" to="/login">Login</Link>
      </li>,
      <li key={2} className="nav-item m-1 ">
        <Link className="nav-link text-white" to="/register">Register</Link>
      </li>
    ] :
    [
      <li key={3} className="nav-item m-1">
        <div className="avatar">
          <img  src={Avatar} alt="" />
          &nbsp;&nbsp;<span>{name}</span>
        </div>
      </li>,
      <li key={4} className="nav-item m-1">
        <Link className="nav-link text-white" to="" onClick={Logout}>Logout</Link>
      </li>
    ]


  return (
    <>
      <nav className="">
        <ul className="navbar ">
          <li className="nav-item m-1">
            <Link className="nav-link text-white" to="/">Home</Link>
          </li>
          <li className="nav-item m-1">
            <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
          </li>

          {UserNav}
        </ul>
      </nav>
      <Outlet />

    </>
  )
};

export default Layout;