import React from 'react'
import BookNew from '../../Book/BookNew.js'
import './ListBooks.scss';

export default function ListBooks({categoryLabel, books}) {
    return (
        <section className="books_section">
            <header className="books_header">
                <h3 className="books_header_text">{categoryLabel}</h3>
            </header>

            <div className="books_container">
                {books.map((b,i)=>{
                    return <BookNew book={b} key={i} />
                })}
            </div>

        </section>
    )
}

