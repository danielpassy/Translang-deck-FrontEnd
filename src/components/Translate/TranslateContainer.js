import React from 'react';
import { Motion, spring } from 'react-motion';
import axios from 'axios'
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import './Animation.css'
import CorrectionsView from '../Correction/Corrections'
import CreatorView from '../Creator'
import DownloadView from '../Download'



const springSettings = { stiffness: 120, damping: 35 };

export default class Animation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dimensions: [],
      currDimension: undefined,
      configs2: undefined,
      words: [
        { word: 'hello', message: 'has multiple meanings' },
        { word: 'שדגלן', message: 'was not found' },
        { word: 'שדגשדג', message: 'has multiple meanings' },
        { word: 'שדג', message: 'was not found' },
      ],
      link: "",
      corrections: [],
      error: null
    };
    this.submitCorrectionWrapper = this.submitCorrectionWrapper.bind(this)
    this.submitWrapper = this.submitWrapper.bind(this)
    this.cancelCorrection = this.cancelCorrection.bind(this)
    this.submitCorrection = this.submitCorrection.bind(this)
    this.handleCorrection = this.handleCorrection.bind(this)
  };

  async submitWrapper(data, method) {

    // prevent users to see the words changing
    let response = await this.submit(data, method)
    response[0] ? this.changeView(response[1]) : console.log("error")

    this.setState({ error: response })
  };

  async submit(data, method) {

    // split input into list
    if (method === 'list') { data = data.split(/\r?\n/) }
    let body = (method === 'file') ? { 'file': data } : { 'word_list': data }

    try {
      const response = await axios.post(`/api/upload_${method}/`, body)

      if (response['status'] == 201) {
        this.setState((oldState) => {
          oldState['link'] = response.data['deck']
        })
        // 2 -> the download page
        return [true, 2];
      }
      // if there's corrections to be done
      else if (response['status'] == 200) {
        this.setState((oldState) => {

          // populate the words with api data
          oldState['words'] = []
          for (const error in response['data']['errors']) {
            oldState['words'].push({ word: response['data']['errors'][error]['word'], message: response['data']['errors'][error]['message'] })
          }

          // create an array equal of the number of errors to hold the corrections
          oldState['corrections'] = new Array(response['data']['errors'].length).fill("")
          oldState['id'] = response['data']['id']
          return oldState
        })
        // 1-> the correction page
        return [true, 1];
      }
    } catch (error) {
      console.log(error)
      return [false, error];
    }
  };

  async submitCorrectionWrapper() {
    // prevent users to see the view changing
    scroller.scrollTo("Creator", {
      spy: true,
      smooth: 'easeOutCubic',
      offset: -70,
      duration: 900,
    });
    let response = await this.submitCorrection()
    response ? this.changeView(response) : console.log("error")
  };

  async submitCorrection() {
    let body = {
      'id': this.state['id'],
      'errors': []
    }
    this.state['corrections'].map((entry) => {
      if (entry) {
        body['errors'].push({ 'correction': entry })
      }
    })
    // TODO:fetch resources in the BackEnd
    try {
      const response = await axios.post(`/api/correct/`, body)
      if (response['status'] == 201) {
        //TODO: redirect to file download page
        this.setState((oldState) => {
          oldState['link'] = response.data['deck']
        })
        return 2;
      }
      else if (response['status'] == 200) {
        this.setState((oldState) => {

          oldState['words'] = []
          for (const error in response['data']['errors']) {
            console.log(error)
            oldState['words'].push({ word: response['data']['errors'][error]['word'], message: response['data']['errors'][error]['message'] })
          }
          oldState['corrections'] = new Array(response['data']['errors'].length).fill("")
          return oldState
        })
        return 1;
      }
      else {
        throw new Error(`Unexpected response ${response['status']}`);
      }

    } catch (error) {
      console.log(error)
      return 0;
      // TODO: do something with the Error
    }
    // TODO:update state with the file Link
    return 2;
  };

  handleCorrection(value, index) {
    this.setState((oldState) => {
      oldState['corrections'][index] = value
    })
  }

  cancelCorrection() {
    this.changeView(0)
    // to avoid the user to see the transition
    setTimeout(() => { this.setState((oldState) => oldState[`words`] = []) }, 500)
  };

  changeView = (x) => {
    // 'object' in case it's triggered by a button,
    //  false if called by another ufnction
    let value;
    value = typeof (x) == 'object' ? x['target']['value'] : x

    //recalculate the view sizes
    const views = [
      document.querySelector(".Creator"),
      document.querySelector(".Corrections"),
      document.querySelector(".Download"),
    ]

    let height = views.slice(0, 3).map((view) => {
      return view.offsetHeight
    })
    let width = views.slice(0, 3).map((view) => {
      return window.innerWidth
    })

    const currDimension = this.state['currDimension']

    let leftPosition = []
    leftPosition[value] = 0
    // for values to the left of value, reduce left.
    // values on the right, increase left.  
    for (let i = Number(value) + 1; i < 3; i++) {
      leftPosition[i] = leftPosition[i - 1] + width[i]
    }
    for (let i = Number(value) - 1; i >= 0; i--) {
      leftPosition[i] = leftPosition[i + 1] - width[i]
    }


    let configs2 = []
    for (let i = 0; i < 3; i++) {
      configs2.push({
        style: {
          left: spring(leftPosition[i], springSettings),
          height: spring(height[i], springSettings),
          width: spring(width[i], springSettings),
        }
      });
    }

    this.setState((oldState) => {
      oldState['configs2'] = configs2
      oldState['currDimension'] = value
      oldState['dimensions'] = [height, width]
      return oldState
    })
  };
  componentDidMount() {

    // always start with the first, obviously.
    const currDimension = 0

    // hypothesis, this is will be called only once
    const views = [
      document.querySelector(".Creator"),
      document.querySelector(".Corrections"),
      document.querySelector(".Download"),
      window.innerWidth
    ]
    // views


    let height = views.slice(0, 3).map((view) => {
      return view.offsetHeight
    })
    let width = views.slice(0, 3).map((view) => {
      return window.innerWidth
    })
    let leftPosition = [0]
    for (let i = 1; i < 3; i++) {
      leftPosition[i] = leftPosition[i - 1] + width[i]
    }

    let ViewsStyles = []
    for (let i = 0; i < 3; i++) {
      ViewsStyles.push({
        style: {
          left: spring(leftPosition[i], springSettings),
          height: spring(height[i], springSettings),
          width: spring(width[i], springSettings),
        }
      });
    }
    this.setState((oldState) => {
      oldState['dimensions'] = [height, width]
      oldState['configs2'] = ViewsStyles
      oldState['currDimension'] = 0
      return oldState
    })
    window.addEventListener('resize', () => {
      this.changeView(this.state['currDimension'])
    })

  };

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.changeView(this.state['currDimension'])
    })
  }
  render() {

    // wait for component mount before rendering
    if ((typeof (this.state['currDimension'])) !== 'undefined'
      && (typeof (this.state['dimensions']) !== 'undefined')) {

      return (
        <>
          <div className='d-flex justify-content-center'>

            {/* Container of the container*/}
            <Motion style={{
              height: spring(this.state['dimensions'][0][this.state['currDimension']]),
              width: spring(this.state['dimensions'][1][this.state['currDimension']]),
            }}>
              {style =>
                <div className="view-container-container" style={style}>

                  {/* Container  */}
                  <Motion style={style}>
                    {container =>
                      <div className="view-container" style={container}>

                        {/* Actual view, only one at the time is visible */}
                        <Motion key={0} style={this.state['configs2'][0]['style']}>
                          {style =>
                            <div className='view' style={style}>
                              <CreatorView
                                id='Creator'
                                submit={this.submitWrapper}
                                error={this.state["error"]} />
                            </div>
                          }
                        </Motion>
                        <Motion key={1} style={this.state['configs2'][1]['style']}>
                          {style =>
                            <div className='view' style={style}>
                              <CorrectionsView
                                id='Creator'
                                cancel={this.cancelCorrection}
                                submitCorrection={this.submitCorrectionWrapper}
                                handleChange={this.handleCorrection}
                                words={this.state['words']}
                                error={this.state["error"]}
                              />
                            </div>
                          }
                        </Motion>
                        <Motion key={2} style={this.state['configs2'][2]['style']}>
                          {style =>
                            <div className='view' style={style}>
                              <DownloadView
                                link={this.state['link']} />
                            </div>
                          }
                        </Motion>

                      </div>
                    }
                  </Motion>
                </div>
              }
            </Motion>
          </div>
        </>
      );
    }
    else {
      // it pre renders to get the view size.
      return (
        <>
          <CorrectionsView
            id='Creator'
            cancel={this.cancelCorrection}
            submitCorrection={this.submitCorrection}
            words={this.state['words']} />
          <CreatorView id='Creator' submit={this.submit} />
          <DownloadView id='Creator' />
        </>
      )
    }
  };
}