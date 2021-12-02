import React from 'react'
import API_ENDPOINT from '../../../Helpers/API_URL';
import { useParams } from 'react-router';
import './BookNavbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
export default function BookNavbar({title, authors, image, lire}) {
    let {id} = useParams();
    let history = useHistory();
    const handleAction = () => {
        let url = (!lire ? `/books/read/${id}` : `/books/listen/${id}`);
        history.push(url);
    }
    return (
        <header className="book_navbar">
            <div className="book_navbar_actions">
                {lire 
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
                
                <button className="book_navbar_actions_two btn_action">
                    <FontAwesomeIcon icon={faHeart} />&nbsp;
                    Ajouter au favoris
                </button>
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
