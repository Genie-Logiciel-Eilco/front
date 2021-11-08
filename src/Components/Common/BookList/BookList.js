import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import Book from "../../Book/Book";
import "./BookList.scss";

function BookList({ category }) {
    const { books } = useContext(GlobalContext);

    return (
        <section className="books">
            <div className="container">
                <h2 className="books__category-title">{category}</h2>

                <div className="row">
                    {books.map((book) => (
                        <Book key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BookList;
