import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import { useSelector, useDispatch } from 'react-redux'
import { setOpacity } from '../../followersSlice'

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(1080);
  const navPhoneRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [isNavOpen, setIsNavOpen] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize);
    const navDisable = (e) => {
      if (!(navPhoneRef && navPhoneRef.current.contains(e.target)) && isNavOpen && !(hamburgerRef && hamburgerRef.current.contains(e.target))) {
        const navPhone = document.getElementsByClassName('nav-phone')[0];
        navPhone.classList.remove("active");
        setIsNavOpen(false)
      }
    }
    window.addEventListener("click", navDisable)
    return () => window.removeEventListener("resize", handleResize);

  }, [])

  const handleNavOpenClose = () => {
    const navPhone = document.getElementsByClassName('nav-phone')[0];
    if (navPhone.classList.contains("active")) navPhone.classList.remove("active");
    else navPhone.classList.add("active")
    setIsNavOpen(!isNavOpen)
  }

  const opacity = useSelector((state) => state.followers.navOpacity)
  const dispatch = useDispatch()
  return (
    <div className="nav-container" style={{
      opacity: opacity,
      transition: '500ms ease-in-out'
    }} onMouseOver={() => dispatch(setOpacity(1))}>

      <div className='navbar'>
        <div className="logo-name">
          Twubric
        </div>
        {windowWidth <= 700 && <div style={{ color: "white", cursor: "pointer" }} onClick={handleNavOpenClose} ref={hamburgerRef}>
          <i className="fa-solid fa-bars"  ></i>
        </div>}
        <div className='nav-phone' >
          <div className="nav-items" ref={navPhoneRef}>
            {windowWidth <= 700 && <i className="fa-solid fa-arrow-right" style={{color:"white", cursor:"pointer"}} onClick={handleNavOpenClose}></i>}
            <div className="nav-item">Home</div>
            <div className="nav-item">About</div>
            <div className="nav-item">Profile</div>
            <div className="nav-item">Logout</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar;