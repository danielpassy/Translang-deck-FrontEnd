import React, { Component } from 'react'
import CSRF from './util/CSRF'


export default class Creator extends Component {

    constructor() {
        super()
        this.state = {
            dragging: false,
            file: [],
            word_list: ""
        }
        this.selectFile = this.selectFile.bind(this)
        this.handleTextInput = this.handleTextInput.bind(this)
        this.submitInput = this.submitInput.bind(this)
    }

    dropRef = React.createRef()

    componentDidMount() {
        this.dragCounter = 0
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }

    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }

    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter++
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({ dragging: true })
        }
    }

    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter--
        if (this.dragCounter > 0) return
        this.setState({ dragging: false })
    }

    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        this.setState({ drag: false })
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.inputFile(e.dataTransfer.files[0])
        }
    }

    selectFile = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const selectedFile = document.querySelector('.chooseFile').files[0];
        this.inputFile(selectedFile)
    }

    inputFile(e) {

        // check for wrong file extension
        const lastDot = e['name'].lastIndexOf('.');
        const ext = e['name'].substring(lastDot + 1);
        if (ext !== 'csv' && ext !== 'xls' && ext !== 'xlsx') {
            this.dragCounter--
            if (this.dragCounter > 0) return
            return this.setState({ dragging: false })
        }


        document.querySelector('.inputBox').setAttribute('style', 'display: none !important')
        document.querySelector('.inputtedBox').style.display = 'flex'
        document.querySelector('.inputtedBox').className = document.querySelector('.inputtedBox').className + ' flex-column border border-primary'
        document.querySelector('.fileName').innerHTML = e['name']
        this.setState((oldState) => {
            oldState.file = e
        })
        this.dragCounter = 0
    }

    handleTextInput(e) {
        const { name, value } = e.target
        this.setState(oldState => {
            oldState[name] = value
            return oldState
        })
    }


    submitInput(e) {
        e.preventDefault()
        e.stopPropagation()
        if (this.state['file'].length == 0 && !this.state["word_list"]) {
            return alert('Enter a file or write words')
        }
        if (this.state['file'].length != 0 && this.state['word_list']) {
            return alert('Choose either file or write the words, not both')
        }

        this.state['file'].length === 0 ? this.props.submit(this.state['word_list'], 'list') : this.props.submit(this.state['file'], 'file')
    }

    render() {

        const dashBorder = {
            borderStyle: 'dotted'
        }

        return (
            <div id={'Creator'} className='fullHeight babyYellow Creator TEST' >
                <form className="createBox ">
                    <CSRF />

                    <div className="container">
                        <div className="title blackFont row d-flex justify-content-center whiteFont textShadow">
                            Create your Anki Deck
                        </div>
                    </div>
                    <div className="container lightBabyYellow rounded mt-3">

                        <div className="row  p-3 justify-content-center">
                            {/* Input Box */}
                            {/* inputtedBox overlay display only after user input the file */}
                            <div className="inputtedBox input  col-10 col-md-5 textInput justify-content-center white" style={{ display: 'none' }}>
                                <div style={{ display: 'inline-block' }}>
                                    <svg width="25" height="50" viewBox="0 0 110 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M105 62.75V121H5V4.5H55M105 62.75L55 4.5M105 62.75H55V4.5" stroke="black" stroke-opacity="0.65" stroke-width="9" />
                                    </svg>
                                </div>
                                <div className="text-center blackFont fileName p-3" style={{ wordBreak: 'break-all' }}>
                                </div>
                            </div>
                            {/* End of inputtedBox */}

                            <div className="input inputBox col-10 col-md-5 flex-column textInput d-flex justify-content-center white" style={dashBorder}>

                                {/* box overlay that accepts drag'n'drop */}
                                <div className='inputBox' ref={this.dropRef} style={{ display: 'inline-block', position: 'relative' }}>
                                    {this.state.dragging &&
                                        <div
                                            style={{
                                                border: 'dashed grey 4px',
                                                backgroundColor: 'rgba(255,255,255,.8)',
                                                position: 'absolute',
                                                top: 0,
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                zIndex: 9999
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    right: 0,
                                                    left: 0,
                                                    textAlign: 'center',
                                                    color: 'grey',
                                                    fontSize: 36
                                                }}
                                            >
                                            </div>
                                        </div>
                                    }
                                    {/* end of box overlay */}

                                    <div className="subTitle text-center blackFont ">

                                        Drag and Drop a File
                                    </div>
                                    <div className="icon text-center">
                                        <svg width="25" height="50" viewBox="0 0 110 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M105 62.75V121H5V4.5H55M105 62.75L55 4.5M105 62.75H55V4.5" stroke="black" stroke-opacity="0.65" stroke-width="9" />
                                        </svg>

                                    </div>
                                    <label class="btn-primary babyBlue btn noBorder mb-2">
                                        Select a .csv<input className="chooseFile" type='file' onChange={this.selectFile} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" hidden />
                                    </label>
                                </div>
                            </div>
                            {/* End of input box */}
                            {/* Or */}
                            <div className=" align-self-center or col-10 col-md-2 d-flex justify-content-center">
                                Or
                            </div>
                            {/* end of Or */}
                            {/* Input List */}
                            <div className="input col-10 col-md-5 flex-column textInput d-flex justify-content-center babyBlue">
                                <div className="form-group">
                                    <div className="subTitle text-center">
                                        Enter (Hebrew) words
                                    </div>
                                    <textarea
                                        placeholder={'שלום \n שחרתי\n קרתי'}
                                        className="form-control text-right"
                                        name='word_list'
                                        rows='4'
                                        onChange={this.handleTextInput}
                                        value={this.state.word_list}>
                                    </textarea>
                                </div>
                            </div>
                            {/* End Input List */}
                        </div>
                        <div className="text-center row d-flex justify-content-center  p-3">
                            <div className="submit input marfim noBorder">
                                <div className="btn btn-primary marfim blackFont subTitle" onClick={this.submitInput}>
                                    Create my Deck
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
