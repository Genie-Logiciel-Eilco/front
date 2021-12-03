import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router';
import Footer from '../../Layout/Footer/Footer';
import BrowseNavbar from '../Browsepage/BrowseNavbar';
import BookNavbar from '../../Components/Common/BookNavbar/BookNavbar';
import bookService from '../../service/booksService';
import { useHistory } from 'react-router';
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import SecondaryBtn from "../../Components/Buttons/SecondaryBtn";
import { Link } from 'react-router-dom';
import { ReactReader } from "react-reader"
export default function BookReadNormal() {
    let {id} = useParams();

    const [loading, setLoading ] = useState(true);
    const [book, setBook] = useState({});
    const [authors, setAuthors] = useState([]);

    const getBookDetail = async (id) => {
        let res = await bookService.getOneBook(id);
        if(!res.data.data.hasOwnProperty("authors")){
            res.data.data.authors = ["FLan fertlen", "FLanix Fertlan"];
        }
        setBook(res.data.data);
        setAuthors(res.data.data.authors);
        setLoading(false);
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


    const [page, setPage] = useState('')
    const renditionRef = useRef(null)
    const tocRef = useRef(null)
    const locationChanged = (epubcifi) => {
        if (renditionRef.current && tocRef.current) {
            const { displayed, href } = renditionRef.current.location.start
            const chapter = tocRef.current.find((item) => item.href === href)
            setPage(`Page ${displayed.page} of ${displayed.total} in chapter ${chapter ? chapter.label : 'n/a'}`)
        }
    }
    return (
        <div className="read-page-container">
            <BrowseNavbar />
            {
            loading 
            ? "Veuillez patienter..." 
            : <BookNavbar 
                    title={book.name} 
                    image={book.imageLocation} 
                    lire={true}
                    authors={authors.length > 0 
                        ? authors 
                        : [{ 
                            first_name : "Chargement d'auteur", 
                            last_name : "", 
                            id : -1
                    }]} 
            />
            }
             
             {/* <div className="book__detail-cta inside">
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
                            </div> */}
            <div className="read-page-component text-center my-4" style={{ height: "70vh", width : "80vw", border: "2px #DDD solid", margin : "0 auto" }}> 
                <ReactReader
                    locationChanged={locationChanged}
                    url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
                    // url="files/pg66790.epub"
                    getRendition={(rendition) => renditionRef.current = rendition}
                    // tocChanged={toc => tocRef.current = toc}
                    showToc={false}
                />
            </div>
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1}}>
                {page}
            </div>

            <Footer />
        </div>
    )
}
