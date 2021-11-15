import React from 'react';
import './CardImage.scss';

export default function CardImage({ index, image, text }) {
    return (
        <div className="card-image-container">
            <div className="card-number">
                <h2>{index}</h2>
            </div>
            <div className="card-image">
                <img src={image} alt="bruh" />
            </div>
            <div className="card-text">
                <h4>{text}</h4>
            </div>
        </div>
    )
}
