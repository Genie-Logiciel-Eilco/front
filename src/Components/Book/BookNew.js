import React, {useEffect} from 'react'
import './BookNew.scss';
import { Link } from 'react-router-dom';
import API_ENDPOINT from '../../Helpers/API_URL';
// import bookService from '../../service/booksService';

export default function BookNew({ book}) {
    
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

            <div className="book_author">
                <h3 className="book_author_text">{author}</h3>
            </div>

        </article>
    )
}