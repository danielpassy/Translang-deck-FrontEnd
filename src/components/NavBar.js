import React, { Component } from 'react'
import logo from "./../logo.svg";
import { Link, animateScroll as scroll } from "react-scroll";

class NavBar extends Component {
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  
  render() {
    const navCorrection = {
      paddingLeft: `0px`
    } 
    return (
      <nav className="nav" id="navbar">
        <div className="nav-content p-0">
          <img
            src={logo}
            className="nav-logo"
            alt="Logo"
            onClick={this.scrollToTop}
          />
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
}

export default NavBar;