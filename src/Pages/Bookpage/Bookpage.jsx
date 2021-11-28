import React,{useState, useEffect} from "react";
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

function Bookpage() {
    let {id} = useParams();

    const [loading, setLoading ] = useState(true);
    const [book, setBook] = useState({});
    const getBookDetail = async (id) => {
        let res = await bookService.getOneBook(id);
        if(res.data.data.hasOwnProperty("authors")){
            res.data.data.authors = ["FLan fertlen", "FLanix Fertlan"];
        }
        setBook(res.data.data);
        return res.data.message;
    };
    
    let history = useHistory();

    useEffect(async () => {
        let response = await getBookDetail(id); 
        if(response !== "Success"){
            history.push("/404");
        }
        else{
            console.log(book);
            setLoading(false);
        }
    }, [])
    
    const getAuthorsList = () => {
        let res = [];
        for(let i = 0; loading === false && i < book.authors.length; i++){
            let instance = <span key={i} className="author_name">{book.authors[i]}</span>;
            res.push(instance);
        }
        return res;
    }
    return (
        <>
            <BrowseNavbar />

            <section className="book__detail">
                <div className="container">
                    <div className="flex-container">
                        <article className="book__detail-info">
                            <h2 className="book__detail-title">
                                {book.name}
                            </h2>
                            <p className="text-dark mt-4 font-weight-bold title">Ecrit par</p>
                            <p className="book__detail-author">
                                {/* Ecrit par: <br/>  */}
                                <div className="authors_container">
                                {loading ? "Patientez s'il vous plaît..." : getAuthorsList()}
                                </div>
                            </p>
                            <p className="text-dark mt-4 font-weight-bold title">Catégories</p>

                            <span className="book__detail-category-tag">
                                {book.category} ss
                            </span>
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
                                    <SecondaryBtn text="Ecouter" />
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