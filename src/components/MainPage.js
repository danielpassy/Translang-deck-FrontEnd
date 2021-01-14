import React, { Component } from 'react'
import axios from 'axios'

import Footer from './Footer'
import NavBar from './NavBar'
import Cards from './Cards'
import Creator from './Creator'
import Hero from './Hero'
import Corrections from './Corrections'
import Description from './Description'
import Download from './Download'
import "./../App.css";
import "./../css.css"
import 'bootstrap/dist/css/bootstrap.min.css';


export default class MainPage extends Component {
    constructor() {
        super()
        this.state = {
            creator: true,
            corrections: false,
            download: false,
            words: [
                { word: 'hello', message: 'has multiple meanings' },
                { word: 'שדגלן', message: 'was not found' },
                { word: 'שדגשדג', message: 'has multiple meanings' },
                { word: 'שדג', message: 'was not found' },
            ]
        }
        this.submit = this.submit.bind(this)
        this.cancel = this.cancelCorrection.bind(this)

    }

    async submit(file, method) {
        const formData = new FormData();
        formData.append('file', file)
        try {
            const response = await axios.post(`/api/upload_${method}/`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            if (response['status'] == 201) {
                //TODO: redirect to file download page
            }
            this.setState((oldState) => {

                //TODO: fix this
                oldState['words'] = []
                for (const error in response['data']['errors']) {
                    oldState['word'].push({ word: error['word'], message: error['message'] })
                }
                return oldState
            })



            console.log(response)
        } catch (error) {
            console.log(error)
            // TODO: do something with the Error
        }

        // change screen
        const CreatorView = document.querySelector('.Creator')
        const CorrectionsView = document.querySelector('.Corrections')
        CreatorView.classList.add("slideOutLR");
        CorrectionsView.classList.add("slideInLR");
        setTimeout(() => {
            CreatorView.classList.add("hideRight")
            CorrectionsView.classList.add("unhide")

            CreatorView.classList.remove("slideOutLR")
            CorrectionsView.classList.remove("slideInLR", "hideLeft")
        }, 3000);

    }


    cancelCorrection() {
        // clean the state 
        // animate backwards
        const CreatorView = document.querySelector('.Creator')
        const CorrectionsView = document.querySelector('.Corrections')
        CorrectionsView.classList.remove("unhide")
        CreatorView.classList.remove("hideRight");
        CreatorView.classList.add("slideInRL", "positionHelper");
        CorrectionsView.classList.add("slideOutRL", "positionHelper");
        setTimeout(() => {
            CreatorView.classList.add("unhide")
            CorrectionsView.classList.add("hideLeft")

            //  positionHelper is a non ideal fix, 
            // ideally there should be something to keep the position of the site below
            CreatorView.classList.remove("slideInRL", "positionHelper")
            CorrectionsView.classList.remove("slideOutRL", "positionHelper")
        }, 3000);

    }


    submitCorrection() { }



    render() {
        const styleStartWithAnki = {
            fontSize: '64px'
        }



        return (
            <div className='App'>
                <NavBar />
                <Hero id='Hero' />
                <Download id='Creator' />
                <Corrections id='Creator' cancel={this.cancelCorrection} submitCorrection={this.submitCorrection} words={this.state.words} />
                <Creator id='Creator' submit={this.submit} />
                <Description id='Description' />
                <Cards id='Cards' />
                <div id='Action' style={styleStartWithAnki} className='fullHeight babyBlue text-center'>
                    <div className='w-100' style={{ height: `20vh` }}></div>
                    <div className="btn btn-primary babyYellow blackFont  rounded title pl-3 pr-3"> Start with Anki </div>
                </div>
                <Footer />
            </div>
        )
    }
}
