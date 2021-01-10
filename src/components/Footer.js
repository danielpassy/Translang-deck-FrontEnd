import React from 'react'
import { SocialIcon } from 'react-social-icons';

function Footer(props) {

    const styleFooter = {
        backgroundColor: 'red',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(40, 30, 40, 0.7)',
        color: 'white',
        textAlign: 'center'
    }

    const styleIcons = {}
    const fgColorIcons = "rgba(200, 200, 200, 0.3)"
    const bgColorIcons = "rgba(200, 200, 200, 1)"

    return (
        <div style={styleFooter} className='footer'>
            <div className="container">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col d-flex  justify-content-end pt-1 pb-1">Me dê um oi!
                        <div className="pl-2 "><SocialIcon style={{ height: 25, width: 25 }} fgColor={fgColorIcons} bgColor={bgColorIcons} url="mailto:daniel.passy@gmail.com" /></div>
                        <div className="pl-2 "><SocialIcon style={{ height: 25, width: 25 }} fgColor={fgColorIcons} bgColor={bgColorIcons} url="https://github.com/danielpassy" /></div>
                        <div className="pl-2 "><SocialIcon style={{ height: 25, width: 25 }} fgColor={fgColorIcons} bgColor={bgColorIcons} url="https://www.linkedin.com/in/daniel-mattos-passy-671b8a69/" /></div>
                        <div className="pl-2 "><SocialIcon style={{ height: 25, width: 25 }} fgColor={fgColorIcons} bgColor={bgColorIcons} url="https://api.whatsapp.com/send/?phone=5521997570933&text&app_absent=0" /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;