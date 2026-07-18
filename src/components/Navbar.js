import React, { useEffect } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login")

  }
  let location = useLocation();
  useEffect(() => {
  }, [location]);
  return (

    <nav className="navbar navbar-expand-lg bg-white border-bottom py-2 ">
      <div className="container-fluid container">
        <i className="fa-solid fa-book mx-4"></i>
        <Link className="navbar-brand fixed" to="/">iNoteBook</Link>
        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end mx-4" id="navbarSupportedContent">
          {localStorage.getItem('token') ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
         
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
               </ul> : "" }
          
          {!localStorage.getItem('token') ? <div className="w-100 d-flex justify-content-center mt-2 justify-content-lg-end">
            <form className="d-flex">
              <button type="button"className="btn hoovr" data-bs-toggle="modal" data-bs-target="#loginModal"> Login</button>
              <button type="button"className="btn btn-primary ms-2 rounded-3" data-bs-toggle="modal" data-bs-target="#signupModal">Get Started</button> </form>
          </div> : <button className='btn btn-primary' onClick={handleLogout}> Logout</button>}
        </div>
      </div>
      <LoginModal showAlert={props.showAlert} />
      <SignupModal showAlert={props.showAlert} />
    </nav>

  )
}

export default Navbar
