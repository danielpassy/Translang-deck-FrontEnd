import React, { useState, useEffect, useRef } from 'react'
import logo from "./../logo.svg";
import { Link, animateScroll as scroll } from "react-scroll";


export default function NavBar(props) {


  // 4 states
  // Close, transitioning in, open, transition out

  // Close // TransIn  //   navBar   // Toggle // X
  // True  //  false   //   hidden   // Toggle // hidden
  // True  //  true    //   fadein  //  toggle // fadein
  // False //  true    //   fadein  //  hidden // fadein 
  // False //  false   //   Fadeout //  toggle // fadeout  

  // fullscreen => fadein and toggle
  // noscreen => Fadeout
  const [transitionIn, setTransitioningIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // prevents rerendering on pageload
  const isFirstRun = useRef(false);
  // prevents reclicking and fuckinup the state
  const isIdle = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isIdle.current = false
      setTimeout(() => {
        // TODO: remove it after making sure the rest is working
        setIsMenuOpen(!isMenuOpen)
        isIdle.current = true
      }, 1000);
    }
    isFirstRun.current = true;
  }, [transitionIn]);

  function handleToggle() {
    if (isIdle.current) {
      setTransitioningIn(!transitionIn)
    }
  }
  const navClass = function () {
    if (!isMenuOpen && !transitionIn) {
      return 'collapse navbar-collapse'
    }
    else if (!isMenuOpen && transitionIn) {
      return 'fullscreen babyBlue'
    }
    else if (isMenuOpen && transitionIn) {
      return 'fullscreen babyBlue'
    }
    else if (isMenuOpen && !transitionIn) {
      return 'noscreen babyBlue'
    }
  }
  const toggleClass = () => {
    if (!isMenuOpen && !transitionIn) {
      return 'navbar-toggler-icon'
    }
    else if (!isMenuOpen && transitionIn) {
      return 'navbar-toggler-icon'
    }
    else if (isMenuOpen && transitionIn) {
      return 'collapse'
    }
    else if (isMenuOpen && !transitionIn) {
      return 'navbar-toggler-icon'
    }
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
      <img
        src={logo}
        className="nav-logo"
        alt="Logo"
        onClick={scrollToTop}
      />
      <button class="navbar-toggler"
        onClick={handleToggle}
        type="button"
        style={{ zIndex: '100' }}>
        <span class={isMenuOpen ? "collapse" : "navbar-toggler-icon"}></span>
        <span class={isMenuOpen ? "close-icon" : "collapse"}>
          <div id="xIcon">✖</div>
        </span>

      </button>


      {/* Collapsed part 
      isMenuOpen handles the collapse, uncolapse */}
      <div className={"nav-content p-0 " + navClass()} >

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
