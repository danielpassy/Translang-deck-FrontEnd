import React, { Component } from 'react'

import Footer from './Footer'
import NavBar from './NavBar'
import Cards from './Cards'
import Hero from './Hero'
import Description from './Description'
import Animation from './Animation/Animation'

import "./../App.css";
import "./../css.css"
import 'bootstrap/dist/css/bootstrap.min.css';


export default class MainPage extends Component {
    constructor() {
        super()
    }

    render() {
        const styleStartWithAnki = {
            fontSize: '64px'
        }
        return (
            <div className='App'>
                <NavBar />
                <Animation
                    submit={this.submit} />
                <Hero id='Hero' />
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
