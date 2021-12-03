import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react'
import bookService from '../../service/booksService';
import { useHistory } from 'react-router';
import BookNavbar from '../../Components/Common/BookNavbar/BookNavbar'
import BrowseNavbar from '../Browsepage/BrowseNavbar'
import Footer from '../../Layout/Footer/Footer';
import ReactAudioPlayer from 'react-audio-player';
// import sample from '../../Assets/sample.mp3'
import API_URL from '../../Helpers/API_URL';
import './BookAudio.scss';
export default function BookAudio() {
    let { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState({});
    const [authors, setAuthors] = useState([]);

    const getBookDetail = async (id) => {
        let res = await bookService.getOneBook(id);
        if (!res.data.data.hasOwnProperty("authors")) {
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
        if (response !== "Success") {
            history.push("/404");
        }
        else {
            setLoading(false);
        }
    }, [])


    return (
        <div className="book_audio">
            <BrowseNavbar />
            {loading
                ? "Veuillez patienter..."
                : <BookNavbar
                    title={book.name}
                    image={`${API_URL.STORAGE_ENDPOINT}/${book.id}/${book.imageLocation}`}
                    lire={false}
                    authors={authors.length > 0
                        ? authors
                        : [{
                            first_name: "Chargement d'auteur",
                            last_name: "",
                            id: -1
                        }]}
                />
            }

            <main>
                <div className="audio-container">
                    <img src={`${API_URL.STORAGE_ENDPOINT}/${book.id}/${book.imageLocation}`}
                        className="audio-container-img" />
                    <ReactAudioPlayer
                        src={`${API_URL.STORAGE_ENDPOINT}/${book.id}/${book.id}.mp3`}
                        controls
                    />
                </div>
            </main>
            <Footer />
        </div>
    )
}
