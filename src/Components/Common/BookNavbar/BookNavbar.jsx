import React from 'react'
import API_ENDPOINT from '../../../Helpers/API_URL';
import { useParams } from 'react-router';
import './BookNavbar.scss'
export default function BookNavbar({title, authors, image}) {
    let {id} = useParams();
    return (
        <header className="book_navbar">
            <div className="book_navbar_left">
                <h3 className="book_navbar_left_title">{title}</h3>
                <h3 className="book_navbar_left_authors">{authors 
                ? authors.map((auth, key) => {
                    return <span className="one_author" key={key}>{auth}</span>;
                })
                : <span className="one_author">Chargement de l'auteur</span>}</h3>
            </div>
            <div className="book_navbar_right">
                <img 
                    src={`${API_ENDPOINT}/images/${image}`} 
                    alt={`Book id ${id}`} 
                    className="book_navbar_right_image"
                />
            </div>
        </header>
    )
}
