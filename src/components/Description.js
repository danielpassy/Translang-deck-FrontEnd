import React from 'react'
import { Link, animateScroll as scroll } from "react-scroll";

export default function Description({ id }) {
    return (
        <div id={id} className='fullHeight babyBlue pt-3'>
            <div className="text-center container">
                <div className="title">
                    What the Heck is Anki?
                </div>
                <div className="subTitle  pb-3 pr-3 pl-3 mb-3 mr-3 ml-3 mt-2">
                    Anki is an app that drastically improve you learning rate using the science of learning
                </div>
                <div className="text whiteFont p-3 ">
                    <p className="p-0 m-0">Have you ever tried learning something just to forget it the day after?</p>
                    <p className="p-0 m-0">
                        With its Spaced Repetition System (SRS) Anki tackles this problem
                   </p> Anki controls when you review a certain subject to make sure you study just enough, no more, no less.
                </div><Link
                    activeClass="active"
                    to="Cards"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                ><div className="btn ">
                        <p className='text whiteFont transparentWhite p-2 rounded'>
                            Discover More!
                    </p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
