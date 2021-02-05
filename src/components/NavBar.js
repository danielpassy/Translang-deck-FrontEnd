import React, { useState, useEffect, useRef } from 'react'
import logo from "./../logo_symbol_transparent.png";
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
      }, 300);
    }
    isFirstRun.current = true;
  }, [transitionIn]);

  function handleToggle() {

    // it can only work while in mobile mode
    if (document.body.clientWidth < 992) {
      if (isIdle.current) {
        setTransitioningIn(!transitionIn)
      }
    }
  }
  function navClassFunc() {
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
  function toggleClassFunc() {
    if (!isMenuOpen && !transitionIn) {
      return 'navbar-toggler-icon'
    }
    else if (!isMenuOpen && transitionIn) {
      return 'collapse'
    }
    else if (isMenuOpen && transitionIn) {
      return 'collapse'
    }
    else if (isMenuOpen && !transitionIn) {
      return 'navbar-toggler-icon'
    }
  }
  const toggleClass = toggleClassFunc()
  const navClass = navClassFunc()
  const XClass = toggleClass === 'collapse' ? 'close-icon' : "collapse"



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
        className="nav-logo ml-3"
        alt="Logo"
        onClick={scrollToTop}
      />
      <button class="navbar-toggler"
        onClick={handleToggle}
        type="button"
        style={{ zIndex: '100' }}>
        <span class={toggleClass}></span>
        <span class={XClass}>
          <div id="xIcon">✖</div>
        </span>

      </button>


      {/* Collapsed part 
      isMenuOpen handles the collapse, uncolapse */}
      <div className={"nav-content p-0 justify-content-center " + navClass} >

        <ul className="nav-items" style={navCorrection}>
          <li
            className="nav-item"
          >
            <Link
              activeClass="active"
              to="Hero"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={handleToggle}
              className='p-3 smallText'

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
              onClick={handleToggle}
              className='p-3 smallText'

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
              onClick={handleToggle}
              className='p-3 smallText'
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
              onClick={handleToggle}
              className='p-3 smallText'
            >
              Fast Facts
              </Link>
          </li>
        </ul>
      </div>
    </nav>

  );
}
