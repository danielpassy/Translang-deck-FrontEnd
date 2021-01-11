import React from 'react'
import CorrectionCard from './CorrectionCard'


export default function corrections(props) {

    let cardContainer = [];
    let i = 0;

    // building the grid system with the Correction cards
    while (i < props.words.length) {
        // if there`s an even number of corrections, push just one
        if (i + 2 > props.words.length) {
            cardContainer.push(
                <div className="row ">
                    <div className='col-12 col-md-6 '>
                        <CorrectionCard
                            word={props.words[i].word}
                            number={props.words.length}
                            i={i + 1} />
                    </div>
                </div>
            )
            break;
        }

        cardContainer.push(
            <div className="row m-3">
                <div className='col-12 col-md-6'>
                    <CorrectionCard
                        word={props.words[i].word}
                        number={props.words.length}
                        i={i + 1} />
                </div>
                <div className='col-12 col-md-6'>
                    <CorrectionCard
                        word={props.words[i + 1].word}
                        number={props.words.length}
                        i={i + 2} />
                </div>
            </div>
        )

        i = i + 2;
    }





    return (
        <div className='fullHeight babyYellow p-3 hideLeft Corrections'
        // style={{ display: 'none' }} 
        >
            <div className="container lightBabyYellow seventyHeight">
                <p className='title textShadow'>
                    Corrections are Needed
                </p>
                <div className="container">
                    {cardContainer}
                </div>
            </div>
        </div>
    )
}

