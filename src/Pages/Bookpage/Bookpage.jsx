import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./Bookpage.scss";
import BrowseNavbar from "../Browsepage/BrowseNavbar";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import SecondaryBtn from "../../Components/Buttons/SecondaryBtn";
import Footer from "../../Layout/Footer/Footer";
import bookService from '../../service/booksService';
import { useHistory } from 'react-router-dom';
import API_ENDPOINT from "../../Helpers/API_URL";
// import userService from '../../service/userService'
import EditPublisher from '../Dashboard/Publishers/ViewPublishers/EditPublishers/EditPublisher';
import isFavorite from "../../Helpers/isFavorite";
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { Alert } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Bookpage() {
    let { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState({});

    const [success, setSuccess] = useState(false);  
    const [deleted, setDeleted] = useState(false);
    const [favorite, setFavorite] = useState(false);


    const getBookDetail = async (id) => {
        let res = await bookService.getOneBook(id);
        if (!res.data.data.hasOwnProperty("authors")) {
            res.data.data.authors = [{
                first_name: "FLan",
                last_name: "fertlen"
            }];
        }
        setBook(res.data.data);
        return res.data.message;
    };

    let history = useHistory();

    useEffect(async () => {
        let response = await getBookDetail(id);
        if (response !== "Success") {
            history.push("/404");
        }
        else {
            console.log(book);
            setLoading(false);
        }
    }, [])
    useEffect( async () => {
        let isFavRes = await isFavorite(id);
        setFavorite(isFavRes);
        
    } , [success, deleted])


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
    const getAuthorsList = () => {
        return book.authors.map((auth, id) => {
            return <p className="book__detail-author" key={id}>
                {auth.first_name} {auth.last_name}
            </p>
        });

    }

    const getCategories = () => {
        let res = [];
        let { categories } = book;
        if (!loading)
            res = categories.map((cat) => {
                let { id, name } = cat;
                return <span className="book__detail-category-tag" key={id}>
                    {name}
                </span>
            });
        console.log(book);
        return res;

    }
    return (
        <>
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
            <BrowseNavbar />
            <section className="book__detail">
                <div className="container">
                    <div className="flex-container">
                        <article className="book__detail-info">
                            <h2 className="book__detail-title">
                                {book.name}
                            </h2>
                            <p className="text-dark mt-4 font-weight-bold title">Ecrit par</p>
                            <div className="authors_container">
                                {loading ? "Patientez s'il vous plaît..." : getAuthorsList()}
                            </div>
                            <p className="text-dark mt-4 font-weight-bold title">Catégories</p>
                            <div className="book__detail-category">
                                {!loading ? getCategories() : "Patientez s'il vous plaît... "}

                            </div>
                            <p className="book__detail-desc">
                                <p className="text-dark mt-4 font-weight-bold text-lg title">De quoi s'agit-il ?</p>
                                {book.synopsis}
                            </p>
                            <p className="text-dark mt-4 font-weight-bold text-lg title">Publié en</p>
                            <p className="book__detail-date">

                                {book.publicationDate}
                            </p>
                            <div className="book__detail-cta">
                                <h3>
                                    Comment Voulez-vous interagir avec le livre
                                    ?
                                </h3>
                                <div className="btns">
                                    <Link to={`/books/read/${id}`}>
                                        <PrimaryBtn text="Lire" />
                                    </Link>
                                    <Link to={`/books/read/${id}`}>
                                        <SecondaryBtn text="Ecouter" />
                                    </Link>
                                    {
                                        !favorite 
                                        ?  <button className="book_navbar_actions_two btn_action add_two" 
                                                    onClick={addToFav}>
                                                <FontAwesomeIcon icon={faHeart} />&nbsp;
                                                    Ajouter au favoris
                                                </button>
                                        :  <button className="book_navbar_actions_two btn_action del_two" 
                                                    onClick={removeFromFav}>
                                            <FontAwesomeIcon icon={faHeartBroken} />&nbsp;
                                                Retirer des favoris
                                            </button>
                                    }
                                </div>
                            </div>
                        </article>

                        <div className="book__detail-img">
                            <img
                                className="book__detail-img-ele"
                                src={`${API_ENDPOINT}/images/${book.imageLocation}`}
                                alt={book.name}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Bookpage;