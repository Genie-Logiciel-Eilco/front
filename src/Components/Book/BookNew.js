import React from 'react'
import './BookNew.scss';
import { Link } from 'react-router-dom';
import API_ENDPOINT from '../../Helpers/API_URL';
// {

// ​​
// categories: Array(3) [ 2, 3, 5 ]
// ​​
// counter: 0
// ​​
// created_at: "2021-11-18T16:51:22.000000Z"
// ​​
// fileLocation: "0afdd536-7d3c-4977-b2e9-23e931a487b7.txt"
// ​​
// id: "0afdd536-7d3c-4977-b2e9-23e931a487b7"
// ​​
// imageLocation: "0afdd536-7d3c-4977-b2e9-23e931a487b7.jpg"
// ​​
// isReady: 1
// ​​
// isbn: "what"
// ​​
// name: "what"
// ​​
// publicationDate: null
// ​​
// publisher_id: 2
// ​​
// synopsis: "whatwhatwhatwhatwhat"
// ​​
// updated_at: "2021-11-18T16:51:51.000000Z"
// ​​
// ​
// }

export default function BookNew({ book }) {
    
    const { id, imageLocation, name, author, rating } = book;
    let stars = [];

    const bookRating = (number) => {
        for (let index = 0; index < number; index++) {
            stars.push(index);
            stars[index] = "⭐";
        }

        if (stars.length > 5) {
            stars.length = 5;
        }

        return stars.map((star, index) => <li key={index}>{star}</li>);
    };
    return (
        <article className="book">
            <header className="book_header">
                <h3 className="book_header_text">{name}</h3>
                {/* <i className="fas fa-eye"></i> */}
            </header>
            <Link to={`/books/${id}`}>
                <img 
                    src={`${API_ENDPOINT}/images/${imageLocation}`} 
                    alt={`Book id ${id}`} 
                    className="book_img" 
                />
            </Link>
            
        
            <div className="book_rating">
                <ul>
                    {bookRating(rating)}
                </ul>
            </div>
          
        </article>
    )
}