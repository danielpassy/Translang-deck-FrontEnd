import React from 'react'

export default function Cards({ id }) {

    const extraPadding = {
        paddingLeft: `3vw`,
        paddingRight: `3vw`,
        paddingTop: `2vh`,
        paddingBottom: `2vh`
    }


    return (
        <div id={id} className='text-center babyBlue '>
            <div className="">
                <div className="row ml-2 mr-2 pt-3 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-md-5  babyYellow mb-3 mt-3 rounded" style={extraPadding}>
                        <div className="subTitle blackFont pb-3 ">
                            Study less
                        </div>
                        <p className='text' >
                            Anki uses Flash Cards, it challenges you to remember information, helping you retaining knowledge in the long term.
                            Widely Used by medicine students and language learners
                        </p>
                    </div>
                    <div className="col-md-1 col-0"></div>
                    <img src="https://remembereverything.org/wp-content/uploads/2016/10/Vocabulary-card-Anki-2.jpg" alt="anki card example" className='img-fluid col-12 p-0 col-md-5 text-center' />
                </div>
                <div className="row mr-2 ml-2 pt-2 pb-3 d-flex align-items-center justify-content-center">

                    <div className="col-12 col-md-5  p-3 order-last order-md-first rounded">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Anki-icon.svg/1200px-Anki-icon.svg.png" alt="anki symbol" className='img-fluid' />
                    </div>
                    <div className="col-md-1 col-0"></div>
                    <div className="col-12 col-md-5 babyYellow mb-3 mt-3 " style={extraPadding}>
                        <div className="subTitle blackFont pb-3 rounded">
                            Polyglots use it to learn vocabulary
                            </div>
                        <p className='text'>
                            Pairing Anki with exposure to the language is the fastest way to acquire a new Language.
                            <p className="m-0 p-0">Get fluent in less than 2 Years!</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
