import React from 'react'
import './BookNew.scss';
import { Link } from 'react-router-dom';

export default function BookNew({ book }) {
    const { id, imgSrc, title, author, category, rating } = book;
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
                <h3 className="book_header_text">{title}</h3>
            </header>
            <Link to={`/books/${id}`}>
                <img 
                    src={imgSrc} 
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