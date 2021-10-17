import React from 'react';
import './CardSecondary.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarTafi} from '@fortawesome/free-regular-svg-icons';

export default function CardSecondary({pdp, fullName, status, text, stars}) {
    const generateStars = (stars) => {
        if(stars > 5 || stars < 0){
            return ["An error occured !"];
        }
        let output = [];

        for(let i = 0; i < stars; i++){
            output.push(
                <FontAwesomeIcon icon={faStar} />
            );
        }

        for(let i = stars; i < 5; i++){
            output.push(
                <FontAwesomeIcon icon={faStarTafi} />
            );
        }
        
        return output;
    }
    
    return (
        <div className="card-secondary-wrapper">
            <div className="card-secondary-header">
                <img src={pdp} className="card-secondary-pdp" />
                <h3>{fullName}</h3>
            </div>
            <div className="card-secondary-content">
                <h3 className="card-secondary-status">{status}</h3>
                <h3 className="card-secondary-text">{text}</h3>
            </div>
            <div className="card-secondary-footer">
                {generateStars(stars)}
            </div>
        </div>
    )
}
