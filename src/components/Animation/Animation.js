import React from 'react';
import { Motion, spring } from 'react-motion';
import './Animation.css'
import CorrectionsView from '../Corrections'
import CreatorView from '../Creator'
import DownloadView from '../Download'



const springSettings = { stiffness: 170, damping: 26 };

export default class Animation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dimensions: [[500, 350], [800, 600], [800, 400], [700, 500], [200, 650], [600, 600]],
      currDimension: undefined,
      configs2: undefined,
      views: undefined
    };
    this.create = this.create.bind(this)
  };


  componentDidMount() {

    // always start with the first, obviously.
    const currDimension = 0

    // hypothesis, this is will be called only once
    const views = [
      document.querySelector(".Corrections"),
      document.querySelector(".Creator"),
      document.querySelector(".Download"),
      window.innerWidth
    ]
    // views
    const Block = [
      CorrectionsView,
      CreatorView,
      DownloadView
    ]


    // cool, so probably we're going to have this

    // drawm the left position

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



    let configs2 = []
    for (let i = 0; i < 3; i++) {
      configs2.push({
        style: {
          left: spring(leftPosition[i], springSettings),
          height: spring(height[i], springSettings),
          width: spring(width[i], springSettings),
        },
        view: DownloadView
      });
    }



    this.setState((oldState) => {
      oldState['dimensions'] = [height, width]
      oldState['configs2'] = configs2
      oldState['currDimension'] = 0
      oldState['views'] = Block
      return oldState
    })

  };

  create(data, method){
    this.props.submit(data, method)

  }
  handleChange = ({ target: { value } }) => {


    const currDimension = this.state['currDimension']
    const viewsDimension = this.state['dimensions']


    let height = viewsDimension[0]
    let width = viewsDimension[1]
    console.log(height, width)

    let leftPosition = []
    leftPosition[value] = 0
    console.log(leftPosition)
    // 

    for (let i = Number(value) + 1; i < 3; i++) {
      console.log(i)
      leftPosition[i] = leftPosition[i - 1] + width[i]
    }
    for (let i = value - 1; i >= 0; i--) {
      console.log(i)
      leftPosition[i] = leftPosition[i + 1] - width[i]
    }
    console.log(leftPosition)


    let configs2 = []
    for (let i = 0; i < 3; i++) {
      configs2.push({
        style: {
          left: spring(leftPosition[i], springSettings),
          height: spring(height[i], springSettings),
          width: spring(width[i], springSettings),
        },
        view: DownloadView
      });
    }

    this.setState((oldState) => {
      oldState['configs2'] = configs2
      oldState['currDimension'] = value
      return oldState
    })
  };


  render() {

    // wait for componentmount before rendering
    if ((typeof (this.state['currDimension'])) !== 'undefined'
      && (typeof (this.state['dimensions']) !== 'undefined')) {
      return (
        <div>
          <input
            type="range"
            min={0}
            max={this.state['dimensions'].length}
            value={this.state['currDimension']}
            onChange={this.handleChange} />

          <div className='d-flex justify-content-center'>
            <Motion style={{
              height: spring(this.state['dimensions'][0][this.state['currDimension']]),
              width: spring(this.state['dimensions'][1][this.state['currDimension']]),
            }}>
              {style =>
                <div className="demo4" style={style}>
                  <Motion style={style}>
                    {container =>
                      <div className="demo4-inner" style={container}>
                        <Motion key={0} style={this.state['configs2'][0]['style']}>
                          {style =>
                            <div className='demo4-photo' style={style}>
                              <CreatorView
                                id='Creator' submit={this.create} />
                            </div>
                          }
                        </Motion>
                        <Motion key={1} style={this.state['configs2'][1]['style']}>
                          {style =>
                            <div className='demo4-photo' style={style}>
                              <CorrectionsView
                                id='Creator'
                                cancel={this.props.cancelCorrection}
                                submitCorrection={this.props.submitCorrection}
                                words={this.props.words} />
                            </div>
                          }
                        </Motion>
                        <Motion key={2} style={this.state['configs2'][2]['style']}>
                          {style =>
                            <div className='demo4-photo' style={style}>
                              <DownloadView />
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
        </div>
      );
    }
    else {
      return (
        <>
        </>
      )
    }
  };
}