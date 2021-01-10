import React from 'react'

export default function Description({ id }) {
    return (
        <div id={id} className='fullHeight babyBlue pt-3'>
            <div className="text-center container">
                <div className="title">
                    What the Heck is Anki?
                </div>
                <div className="subTitle p-3 m-3">
                    Anki is a Spaced Repetition System (SRS) app, that drastically improve you learning rate
                </div>
                <div className="text whiteFont p-3 ">
                    Have you ever tried learning something just to forget it the day after?
                    Anki tackles this problem. Learn and never forget.
                </div>
            </div>
        </div>
    )
}
