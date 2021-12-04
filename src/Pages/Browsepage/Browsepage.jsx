import React, { useEffect, useState } from "react";
import "./Browsepage.scss";

// Components
import BrowseNavbar from "./BrowseNavbar";
import Categories from "../../Components/Common/Categories/Categories";
import Footer from "../../Layout/Footer/Footer";

import ListBooks from '../../Components/Common/ListBooks/ListBooks'
import bookService from '../../service/booksService';
// import authService from "../../service/authService";

export default function Browsepage() {

    const [categories, setCategories] = useState([]);
    const [chosenCategory, setChosenCategory] = useState(-1)
    const [books, setBooks] = useState([]);
    const [bookies, setBookies] = useState([])
    const [reload, setReload] = useState(false)


    const [loaded, setLoaded] = useState(false);
    useEffect(async () => {
        // GET BOOKS
        bookService.getBooks().then((res) => {
            setBookies(res?.data?.data)
            setBooks(res?.data?.data)
        })
        let response = await bookService.getCategories();
        let cats = await response.data
        setCategories([{ name: "Toutes", id: -1 }
            , ...cats.data.map((cat) => {
                return {
                    name: cat.name,
                    id: cat.id
                };
            })]);
        setLoaded(true);
        setReload(!reload)
    }, [])

    useEffect(() => {
        displayBooksOfCategory(chosenCategory.id)
    }, [categories, chosenCategory])

    const displayBooksOfCategory = (categoryID) => {
        let res = []
        if (categoryID === -1) {
            setBookies(books)
        }
        else {
            let catName;
            for (let i = 0; i < books.length; i++) {
                for (let j = 0; j < books[i].categories.length; j++) {
                    catName = books[i].categories[j].name;
                    if (catName === chosenCategory.name) res = [...res, books[i]]
                }
            }
            setBookies(res)
        }
        setReload(!reload)
    }

    return (
        <>
            <BrowseNavbar />

            {loaded ?
                <main className="browsing_paage">
                    <Categories categoriesBase={categories} onChange={(value) => setChosenCategory(value)} />
                    {
                        bookies.length > 0
                            ? (
                                <ListBooks categoryLabel={chosenCategory.name} books={bookies} />)
                            : "Aucun résultat"
                    }
                    <Footer />
                </main>
                : <h3 className="mt-4 mb-3" align="center">Veuillez patienter</h3>}
        </>
    );
}