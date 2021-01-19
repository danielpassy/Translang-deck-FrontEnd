import React from 'react';
import { Motion, spring } from 'react-motion';
import './Animation.css'
import logo1 from './1.jpg'
import CorrectionsView from '../Corrections'
import CreatorView from '../Creator'
import DownloadView from '../Download'



const springSettings = { stiffness: 170, damping: 26 };
const NEXT = 'show-next';

export default class Animation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: [[500, 350], [800, 600], [800, 400], [700, 500], [200, 650], [600, 600]],
      currPhoto: 0,
      dimensions: undefined,
      currDimension: 0,
      configs2: undefined
    };
  };


  componentDidMount() {

    // get width/height of views, as they're dynamic
    const views = [
      document.querySelector(".Corrections"),
      document.querySelector(".Creator"),
      document.querySelector(".Download"),
    ]
    const Block = [
      CorrectionsView,
      CreatorView,
      DownloadView
    ]


    let viewsDimension = views.map((view) => {
      return [view.offsetHeight, view.offsetWidth]
    })
    // write then to state

    const currDimension = 0
    let [currWidth, currHeight] = viewsDimension[currDimension]


    // calculate 
    const widths = viewsDimension.map(([origW, origH]) => {
      return currHeight / origH * origW
    });

    const leftStartCoords = widths
      .slice(0, currDimension)
      .reduce((sum, width) => sum - width, 0);

    let configs2 = [];
    viewsDimension.reduce((prevLeft, [origW, origH], i) => {
      configs2.push({
        style: {
          left: spring(prevLeft, springSettings),
          height: spring(currHeight, springSettings),
          width: spring(widths[i], springSettings),
        },
        view: DownloadView
      });
      return prevLeft + widths[i];
    }, leftStartCoords);

    this.setState((oldState) => {
      oldState['dimensions'] = [[100, 200], [123, 232], [500, 500]]
      oldState['configs2'] = configs2
      oldState['currDimensions'] = 0
      return oldState
    })

  }


  handleChange = ({ target: { value } }) => {

    this.setState({
      currDimension: value
    });
  };


  render() {
    // wait for componentmount before rendering
    if ((typeof (this.state['currDimensions'])) !== 'undefined'
      && (typeof (this.state['dimensions']) !== 'undefined')) {
      return (
        <>
          <input
            type="range"
            min={0}
            max={this.state['dimensions'].length - 1}
            value={this.state['currDimension']}
            onChange={this.handleChange} />

          <div className='d-flex justify-content-center'>
            <Motion style={{
              height: spring(this.state['dimensions'][this.state['currDimension']][0]),
              width: spring(this.state['dimensions'][this.state['currDimension']][1]),

            }}>
              {style =>
                <div className="demo4" style={style}>
                  <Motion style={{
                    height: spring(this.state['dimensions'][this.state['currDimension']][0]),
                    width: spring(this.state['dimensions'][this.state['currDimension']][1])
                  }}>
                    {container =>
                      <div className="demo4-inner" style={container}>
                        {this.state['configs2'].map((data, i) =>
                          <Motion key={i} style={data['style']}>
                            {style =>
                              <div className='red  demo4-photo' style={style}>
                                asdasd
                            </div>
                            }
                          </Motion>
                        )}
                      </div>
                    }
                  </Motion>
                </div>
              }
            </Motion>
          </div>



          {/* <div className="demo4">
          <Motion style={{ height: spring(currHeight), width: spring(currWidth) }}>
            {container =>
              <div className="demo4-inner" style={container}>
                {configs.map((style, i) =>
                  <Motion key={i} style={style}>

                    {style =>
                      <>
                        <img className="demo4-photo" src={`./${i}.jpg`} style={style} />
                      </>
                    }
                  </Motion>
                )}
              </div>
            }
          </Motion>
        </div> */}
        </>
      );
    }
    else {
      return (
        <></>
      )
    }
  };
}