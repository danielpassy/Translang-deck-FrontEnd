import React, { useState, useEffect } from 'react'
import CorrectionCard from '../CorrectionCard'
import './Corrections.css'
import CSRF from '../util/CSRF'

export default function Corrections(props) {


    let cardContainer = [];
    let i = 0;

    // building the grid system with the Correction cards
    while (i < props.words.length) {
        // if there`s an even number of corrections, push just one
        if (i + 2 > props.words.length) {
            cardContainer.push(
                <div className="row m-3">
                    <div className='col-12 col-md-6 '>
                        <CorrectionCard
                            handleChange={props.handleChange}
                            word={props.words[i].word}
                            message={props.words[i].message}
                            number={props.words.length}
                            key={i}
                            i={i} />
                    </div>
                </div>
            )
            break;
        }
        // otherwise, push 2 to form a row
        cardContainer.push(
            <div className="row m-3">
                <div className='col-12 col-md-6'>
                    <CorrectionCard
                        handleChange={props.handleChange}
                        word={props.words[i].word}
                        message={props.words[i].message}
                        number={props.words.length}
                        key={i}
                        i={i} />
                </div>
                <div className='col-12 col-md-6'>
                    <CorrectionCard
                        handleChange={props.handleChange}
                        word={props.words[i + 1].word}
                        message={props.words[i + 1].message}
                        number={props.words.length}
                        key={i + 1}
                        i={i + 1} />
                </div>
            </div>
        )

        i = i + 2;
    }

    // finaly, added the submit button
    return (
        <div className='fullHeight babyYellow p-3 Corrections'>
            <form id="correctionsForm " className='position-relative'>
                <CSRF />
                <div className="container lightBabyYellow seventyHeight" >
                    <p className='title textShadow'>
                        Corrections are Needed
                    </p>
                    <div className='ribbonGroup'>
                        <p className='text' id='discardText'>
                        Left empty to discard
                        
                        </p>
                        <svg id='discardBanner'
                            width="70vw" height="4vh" viewBox="0 0 70vw 4vh" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0.5H641V48H41.5L0 0.5Z" fill="#56CCF2" fill-opacity="0.75" />
                        </svg>
                    </div>

                    <div className="container  pt-2 ">
                        {cardContainer}
                        <div className='row  justify-content-end'>

                            {/* When on mobile, align buttons vertically on the center
                                When not, both on the same line to the right  */}
                            <p className='col-3 col-md-5 col-xl-7'></p>
                            <p className='col-6 col-md-3 col-xl-2 mr-md-3 greyBorder btn btn-primary marfim blackFont text'
                                onClick={props.submitCorrection}>
                                Create
                            </p>
                            <p className='col-3 d-md-none'></p>
                            <p className='col-3 d-md-none'></p>
                            <p className='col-6 col-md-3 col-xl-2 ml-md-3 mr-md-2 greyBorder btn btn-primary marfim blackFont text'
                                onClick={props.cancel}>
                                Cancel
                            </p>
                            <p className='col-3 d-md-none'></p>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

