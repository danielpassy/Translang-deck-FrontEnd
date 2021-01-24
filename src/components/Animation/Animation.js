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
    // cool, so probably we're going to have this
    let viewsDimension = views.map((view) => {
      return [window.innerWidth, view.offsetHeight]
    })

    const Block = [
      CorrectionsView,
      CreatorView,
      DownloadView
    ]
    const [currWidth, currHeight] = viewsDimension[currDimension]

    const widths = viewsDimension.map(([origW, origH]) => {
      return currHeight / origH * origW
    });

    const leftStartCoords = widths
      .slice(0, currDimension)
      .reduce((sum, width) => sum - width, 0);

    let configs2 = [];
    viewsDimension.reduce((prevLeft, _, i) => {
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
      oldState['dimensions'] = viewsDimension
      oldState['configs2'] = configs2
      oldState['currDimension'] = 0
      oldState['views'] = Block
      return oldState
    })

  };


  handleChange = ({ target: { value } }) => {
    const currDimension = this.state['currDimension']
    const viewsDimension = this.state['dimensions']

    let [currHeight, currWidth] = viewsDimension[currDimension]


    // this
    // const widths = viewsDimension.map(([origW, origH]) => {
    //   return currHeight / origH * origW
    // });

    // const leftStartCoords = widths
    //   .slice(0, currDimension)
    //   .reduce((sum, width) => sum - width, 0);
    let accumulator = 0
    let configs2 = [];
    // // for (let i = 0; i < 3; i++) {
    // //   configs2.push({
    // //     style: {
    // //       left: spring(accumulator, springSettings),
    // //       height: spring(currHeight, springSettings),
    // //       width: spring(this.state['dimensions'][i][0], springSettings),
    // //     },
    // //     view: DownloadView
    // //   });
    // //   accumulator = accumulator + this.state['dimensions'][i][0]

  

    // viewsDimension.reduce((prevLeft, _, i) => {
    //   configs2.push({
    //     style: {
    //       left: spring(prevLeft, springSettings),
    //       height: spring(currHeight, springSettings),
    //       width: spring(widths[i], springSettings),
    //     },
    //     view: DownloadView
    //   });
    //   return prevLeft + widths[i];
    // }, leftStartCoords);

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
            max={this.state['dimensions'].length - 1}
            value={this.state['currDimension']}
            onChange={this.handleChange} />

          <div className='d-flex justify-content-center'>
            <Motion style={{
              height: spring(this.state['dimensions'][this.state['currDimension']][1]),
              width: spring(this.state['dimensions'][this.state['currDimension']][0]),

            }}>
              {style =>
                <div className="demo4" style={style}>
                  <Motion style={{
                    height: spring(this.state['dimensions'][this.state['currDimension']][1]),
                    width: spring(this.state['dimensions'][this.state['currDimension']][0])
                  }}>
                    {container =>
                      <div className="demo4-inner" style={container}>
                        <Motion key={0} style={this.state['configs2'][0]['style']}>
                          {style =>
                            <div className='demo4-photo' style={style}>
                              <CreatorView />
                            </div>
                          }
                        </Motion>
                        <Motion key={1} style={this.state['configs2'][1]['style']}>
                          {style =>
                            <div className='demo4-photo' style={{
                              height: spring(this.state['dimensions'][this.state['currDimension']][1]),
                              width: spring(this.state['dimensions'][this.state['currDimension']][0]),
                              left: spring(860)
                            }}>
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