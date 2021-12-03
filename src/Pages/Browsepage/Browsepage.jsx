import React,{useEffect, useState} from "react";
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

    const [books, setBooks] = useState([]);
    
    const [loaded, setLoaded] = useState(false);
    useEffect(async ()=>{
        // GET BOOKS
        let resp = await bookService.getBooks();
        let books = await resp.data.data;
        setBooks(books);
        
        let response = await bookService.getCategories();
        let cats = await response.data;
        
        setCategories([{name : "Toutes", id : -1}
        ,...cats.data.map((cat) => {
            return {
                name : cat.name,
                id : cat.id
            };
        })]);

        setLoaded(true);
    
    }, [])
    
    useEffect(() => {
        // console.log("DEBUG: BOOKS: ", books);
    }, [categories])

    const displayBooksOfCategory = (categoryID) => {
        if(categoryID === -1) return books;
        let res = [];
        for(let i = 0; i < books.length; i++){
            let book = books[i];
            for(let j = 0; j < book.categories.length; j++){
                let cat = book.categories[j];
                if(cat.id === categoryID){
                    res.push(book);
                    break;
                }
            }
        }
        return res;
    }

    return (
        <>
            <BrowseNavbar />

            {loaded ? 
            <main className="browsing_paage">
                <Categories categoriesBase={categories}/> 

                {
                categories.map((cat, ind) => {
                        let bookss = displayBooksOfCategory(cat.id);
                        
                        return bookss.length > 0 
                                ?   <ListBooks categoryLabel={cat.name} 
                                    books={bookss} 
                                    key={ind} />
                                :   ""
                    })
                }
                            <Footer />

            </main>
            : <h3 className="mt-4 mb-3" align="center">Veuillez patienter</h3>  }
        </>
    );
} 