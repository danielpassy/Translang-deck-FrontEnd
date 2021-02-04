import React from 'react'
import { Link, animateScroll as scroll } from "react-scroll";

export default function Hero({ id }) {


    let verticalCenter = {
        paddingTop: '10vh'
    }

    return (
        <div id={id} className='babyBlue fullHeight align-items-center' >
            <div style={verticalCenter}>
                <div className='text-center title p-3 halfHeight'>
                    Create your Anki Deck to Study Hebrew on the Fly
                </div>
                <div className='d-flex justify-content-center'>
                    <div className='first m-3 pb-2 pt-2 w15 btn btn-primary babyYellow border-0 textShadow'>
                        <Link
                            activeClass="active"
                            to="Creator"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            <p className='p-0 m-0 text'>
                                Create my Deck
                            </p>
                        </Link>
                    </div>
                    <div className='    second m-3 pt-2 pb-2 w15 btn btn-primary babyYellow border-0 mb-3 textShadow'>
                        <Link
                            activeClass="active"
                            to="Description"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            <p className='p-0 m-0 text'>
                                What is Anki
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
