import React, { useState, useEffect } from 'react'
import CorrectionCard from './CorrectionCard'


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
        <div className='fullHeight babyYellow p-3 Corrections position-relative'>
            <form id="correctionsForm">
                <div className="container lightBabyYellow seventyHeight" >
                    <p style={{ position: 'absolute', left: '14vw' }}
                        className='greyBorder btn btn-primary'
                        onClick={props.cancel}
                        form="myForm">
                        return
                    </p>
                    <p className='title textShadow'>
                        Corrections are Needed
                    </p>
                    <p className='text' style={{ position: 'absolute', left: '55vw', top: '14vh', zIndex: '2' }}>
                        Left empty to discard
                    </p>
                    <svg style={{ position: 'absolute', right: '0vw', top: '14vh' }}
                        width="50vw" height="4vh" viewBox="0 0 60vw 4vh" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0.5H641V48H41.5L0 0.5Z" fill="#56CCF2" fill-opacity="0.75" />
                    </svg>

                    <div className="container">
                        {cardContainer}
                        <div className='row  justify-content-end'>
                            <p className=' col-6 col-md-4 col-xl-2 greyBorder btn btn-primary marfim blackFont subTitle'
                                onClick={props.submitCorrection}>
                                Create
                            </p>
                            <p className='col-2'></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

