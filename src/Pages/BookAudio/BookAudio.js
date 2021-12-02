import { useParams } from 'react-router';
import React, {useEffect, useState} from 'react'
import bookService from '../../service/booksService';
import { useHistory } from 'react-router';
import BookNavbar from '../../Components/Common/BookNavbar/BookNavbar'
import BrowseNavbar from '../Browsepage/BrowseNavbar'
import Footer from '../../Layout/Footer/Footer';
export default function BookAudio() {
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
        console.log("SETAUTHORS DEBUG", authors);
        console.log("SETBOOK DEBUG: ", book);
    }, [])
    return (
        <div>
            <BrowseNavbar />
            {loading 
            ? "Veuillez patienter..." 
            : <BookNavbar 
                    title={book.name} 
                    image={book.imageLocation} 
                    lire={false}
                    authors={authors.length > 0 
                            ? authors 
                            : [{ 
                                first_name : "Chargement d'auteur", 
                                last_name : "", 
                                id : -1
                            }]} 
                    />
            }
            audio page
            <Footer />
        </div>
    )
}
