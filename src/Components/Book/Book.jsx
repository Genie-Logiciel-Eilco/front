import React from "react";
import { Link } from "react-router-dom";
import "./Book.scss";

function Book({ book }) {
    const { id, imgSrc, title, author, category, price, rating } = book;
    let stars = [];

    const productRating = (number) => {
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
        <Link to={`/books/${id}`}>
            <div className="book">
                <div className="book__img">
                    <img
                        className="book__img-element"
                        src={imgSrc}
                        alt={title}
                    />
                </div>

                <div className="book__info">
                    <p className="book__info-title">{title}</p>
                    <small className="book__info-author">{author}</small>
                    <p className="book__info-category">{category}</p>
                    <h3 className="book__info-price">
                        <span>$</span>
                        {price}
                    </h3>
                    <ul className="book__info-rating">
                        {productRating(rating)}
                    </ul>
                </div>
            </div>
        </Link>
    );
}

export default Book;