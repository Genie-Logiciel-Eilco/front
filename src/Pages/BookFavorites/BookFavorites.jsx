import React from 'react'
import BrowseNavbar from '../Browsepage/BrowseNavbar'
import Footer from '../../Layout/Footer/Footer'
import { useState, useEffect } from 'react';
import bookService from '../../service/booksService';
import API_ENDPOINT from '../../Helpers/API_URL';
import { faBookmark, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './BookFavorites.scss'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
export default function BookFavorites() {
    const [loaded, setLoaded] = useState(false);

    const [books, setBooks] = useState([]);
    useEffect(async () => {
        let response = await bookService.getFavoriteBooks("nada");
        let succ = await response.data.success;
        if(succ){
            setBooks( response.data.data);
            console.log( response.data.data);
        }
    }, []);

    let history = useHistory();

    const removeFromFav = async (book) => {
        let response = await bookService.deleteFromFavorite(book);
        let succ = await response.data.success;
        if(succ){
            history.go(0);
        }
    }
    return (
        <div>
            <BrowseNavbar />
            <main className="book_favorites">
                <header className="book_favorites_header">
                    <h2>
                        <FontAwesomeIcon icon={faBookmark}/>&nbsp; Liste des favoris
                    </h2>
                </header>
                <div className="book_favorites_section row">
                    {
                        books.length > 0 
                        ?   
                            books.map((b)=> {
                                return <div className="favorite-books-book col-md-3" key={b.id}>
                                    
                                    <Link to={`/books/${b.id}`}>
                                        <img src={`${API_ENDPOINT}/images/${b.imageLocation}`} />
                                    </Link>
                                    <br />
                                    <p align="center" style={{marginTop : "1rem"}}>
                                    <button className="favorite-books-book-remove" onClick={() => removeFromFav(b.id)}>
                                        <FontAwesomeIcon icon={faHeartBroken}/>&nbsp;
                                        Retirer de la liste
                                    </button>
                                    </p>
                                    
                                    </div>
                            })
                        : <div><h3 align={"center"} className="mt-5 mb-4">Pensez à ajouter des livres à vos favoris" </h3>
                            
                        </div>
                    }
           
                </div>
            </main>
            <Footer />
        </div>
    )
}
