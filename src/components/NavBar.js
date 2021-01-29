import React, { Component, useState } from 'react'
import logo from "./../logo.svg";
import { Link, animateScroll as scroll } from "react-scroll";

export default function NavBar(props) {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleToggle(){
    const menuState = isMenuOpen
    setIsMenuOpen(!menuState)
  }

  function scrollToTop() {
    scroll.scrollToTop();
  };

  const navCorrection = {
    paddingLeft: `0px`
  }


  return (

    <nav class="nav navbar navbar-expand-lg navbar-light bg-light">

      {/* toggler  */}
      <button class="navbar-toggler"
        onClick={handleToggle}
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <img
          src={logo}
          className="nav-logo"
          alt="Logo"
          onClick={scrollToTop}
        />

      {/* Collapsed part */}
      <div className={"nav-content p-0 " + (isMenuOpen ?"" :" collapse navbar-collapse")} id="navbarTogglerDemo03 navbar" >
        
        <ul className="nav-items" style={navCorrection}>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="Hero"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Home
              </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="Creator"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Create
              </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="Description"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Discover Anki
              </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="Cards"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Fast Facts
              </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
