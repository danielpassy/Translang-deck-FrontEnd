import React from 'react'

export default function Download() {

    const absolute45 = {
        position: 'absolute',
        top: '45vh',
        width: '100%',
        zIndex: '-1'
    }

    const absolute0 = {
        position: 'absolute',
        top: '0vh',
        width: '100%',
        zIndex: '-1'
    }

    const imageModifier = {
        width: 'auto',
        height: '35vh'
    }

    return (
        <div className='fullHeight Download position-relative'>
            {/* the background beeing two colors */}
            <div className='fourtyFiveHeight babyBlue p-3 ' style={absolute45}></div>
            <div className='fourtyFiveHeight babyYellow' style={absolute0}></div>
            {/* actual content */}
            <div className='p-1'>
                <div className='eightyHeight rounded border grayBorder ml-3 mr-3 '>
                    <div className="d-flex flex-column">
                        <div className="top">
                            <div className="title">Enjoy your Deck</div>
                            <div className="subTitle">Download it and open with Anki Software</div>
                        </div>
                        <div className="middle">
                            <div className="img">
                                <img style={imageModifier} className=' fourtyFiveHeight' src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Anki-icon.svg/1200px-Anki-icon.svg.png" alt="Anki Logo" /></div>
                            <div className="download pt-3">
                                <label for="downloadBTN">
                                    <input type="button" value="Download" name="downloadBTN" className="subTitle btn marfim button grayBorder" />
                                </label>
                            </div>
                        </div>
                        <div className="botton">
                            <p className="subTitle">Don't know how to use it?</p>
                            <p className="text">Learn languages while having fun, click here to discover anki</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
