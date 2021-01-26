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
                    <p style={{ position: 'absolute', right: '14vw', bottom: '5vh', zIndex: '10' }}
                        className='greyBorder btn btn-primary'
                        onClick={props.submitCorrection}>
                        return
                </p>
                    <p style={{ position: 'absolute', left: '14vw', height: '20vh' }} className=''>

                    </p>
                    <p className='title textShadow'>
                        Corrections are Needed
                </p>
                    <div className="container">
                        {cardContainer}
                    </div>
                </div>
            </form>
        </div>
    )
}

