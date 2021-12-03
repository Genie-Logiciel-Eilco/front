import React from 'react'
import API_ENDPOINT from '../../../Helpers/API_URL';
import { useParams } from 'react-router';
import './BookNavbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import { Alert } from '@mui/material';
import { useState , useEffect} from 'react';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import bookService from '../../../service/booksService';
import isFavorite from '../../../Helpers/isFavorite';

export default function BookNavbar({title, authors, image, lire}) {
    let {id} = useParams();
    const [success, setSuccess] = useState(false);  
    const [deleted, setDeleted] = useState(false);
    const [favorite, setFavorite] = useState(false);


    useEffect( async () => {
        let isFavRes = await isFavorite(id);
        setFavorite(isFavRes);
        
    } , [success, deleted])


    let history = useHistory();
    const handleAction = () => {
        let url = (!lire ? `/books/read/${id}` : `/books/listen/${id}`);
        history.push(url);
    }

    const addToFav = async () => {
        let response = await bookService.addToFavorite(id);
        if(response.data.success){
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            }, 3000);
        }
    }

    const removeFromFav = async () => {
        let response = await bookService.deleteFromFavorite(id);
        if(response.data.success){
            setDeleted(true);
            setTimeout(()=>{
                setDeleted(false);
            }, 3000);
        }
    }
    return (
        <header className="book_navbar">
            {
            success ? <div className="alert-container">
                            <Alert severity="success">Livre est ajouté au favoris avec succès!</Alert> 
                        </div>: "" 
            }
             {
            deleted ? <div className="alert-container">
                            <Alert severity="success">Livre est retiré des favoris avec succès!</Alert> 
                        </div>: "" 
            }
            <div className="book_navbar_actions">
                {!lire 
                ?   <button className="book_navbar_actions_one btn_action"
                            onClick={handleAction}>
                        <FontAwesomeIcon icon={faReadme} />&nbsp;
                        Lire
                    </button>
                :   <button className="book_navbar_actions_one btn_action"
                            onClick={handleAction}>
                        <FontAwesomeIcon icon={faVolumeUp} />&nbsp;
                        Ecouter
                    </button>
                }
                
                {
                    !favorite 
                    ?  <button className="book_navbar_actions_two btn_action" 
                                onClick={addToFav}>
                            <FontAwesomeIcon icon={faHeart} />&nbsp;
                                Ajouter au favoris
                            </button>
                    :  <button className="book_navbar_actions_two btn_action del" 
                                onClick={removeFromFav}>
                        <FontAwesomeIcon icon={faHeartBroken} />&nbsp;
                            Retirer des favoris
                        </button>
                }
               
            </div>
            <div className="book_navbar_left">
                <h3 className="book_navbar_left_title">{title}</h3>
                <h3 className="book_navbar_left_authors">
                {
                 authors.map((auth, key) => {
                    return <span className="one_author" key={key}>{auth.first_name} {auth.last_name}</span>
                })
                }
                </h3>
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
