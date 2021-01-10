import React, { Component } from 'react'
import axios from 'axios'

import Footer from './Footer'
import NavBar from './NavBar'
import Cards from './Cards'
import Creator from './Creator'
import Hero from './Hero'
import Corrections from './Corrections'
import Description from './Description'
import "./../App.css";
import "./../css.css"
import 'bootstrap/dist/css/bootstrap.min.css';


export default class MainPage extends Component {
    constructor() {
        super()
        this.state = {
            words: [
                { word: 'hello', message:'has multiple meanings' },
                { word: 'שדגלן', message:'was not found' },
                { word: 'שדגשדג', message:'has multiple meanings' },
                { word: 'שדג', message:'was not found' },
            ]
        }

    }

    submitFile(file) {
        axios.post('/api/upload_file/', {
            'file': file
        })
        .then((response) => {
            
        }) 
        .catch((error) => {

        })
    }
    submitCorrection() { }



    render() {
        const styleStartWithAnki = {
            fontSize: '64px'
        }

        return (
            <div className='App'>
                <NavBar />
                <Corrections submitCorrection={this.submitCorrection} words={this.state.words} />
                <Hero id='Hero' />
                <Creator id='Creator' submitFile={this.submitFile} />
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
