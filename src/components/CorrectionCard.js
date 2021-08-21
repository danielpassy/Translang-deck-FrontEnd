import React, { useState } from 'react'


export default function CorrectionCard(props) {

    const [value, setValue] = useState("");

    function handleChange(event) {
        setValue(event.target.value);
        props.handleChange(event.target.value, props.i)
    }
    const labelOnTop = {
        display: 'block',
        textAlign: 'left'
    }

    const textAlignment = {
        textAlign: 'left'
    }

    const relative = {
        position: 'relative'
    }

    const absolute = {
        position: 'absolute',
        left: '-0.5rem',
        top: '-0.5rem',
        fontWeight: '600'
    }

    const input100 = {
        width: '100%'
    }


    return (
        <div className='marfim p-3 rounded m-3' style={relative}>
            <p className="number" style={absolute}>{props.i + 1}/{props.number}</p>
            <p className="text bold " style={textAlignment}>
                {props.message}: {props.word}
            </p>
            <label for="correction" style={labelOnTop}>Write a correction:</label>
            <input type="text"
                value={value}
                onChange={(handleChange)}
                name="correction"
                id="correction"
                placeholder={props.word}
                style={input100} />
        </div>
    )
}
