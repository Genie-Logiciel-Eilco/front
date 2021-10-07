import React from 'react';
import './BlueButton.scss';

export default function BlueButton({clickHandler, text}) {
    return (
        <button className="blue-button" onClick={clickHandler}>
            {text}
        </button>
    )
}
