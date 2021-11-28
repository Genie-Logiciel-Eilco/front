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
    
    useEffect(async ()=>{
        // GET BOOKS
        let resp = await bookService.getBooks();
        let books = await resp.data.data;
        setBooks(books);
        

        let response = await bookService.getCategories();
        let cats = await response.data;
        // let catego
        setCategories([{name : "Toutes", id : -1}
        ,...cats.data.map((cat) => {
            return {
                name : cat.name,
                id : cat.id
            };
        })]);
    
    }, [])
    
    useEffect(() => {
        console.log("DEBUG: BOOKS: ", books);
    }, [categories])

    const displayBooksOfCategory = (categoryID) => {
        let res = [];
        for(let i = 0; i < books.length; i++){
            let book = books[i];
            for(let j = 0; j < book.categories.length; j++){
                let cat = book.categories[j];
                if(cat === categoryID){
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
            <Categories categoriesBase={categories}/>
            {categories.map((cat, ind) => {
                let books = displayBooksOfCategory(cat.id);
                return books.length > 0 
                ? <ListBooks categoryLabel={cat.name} 
                             books={displayBooksOfCategory(cat.id)} 
                             key={ind} />
                : "";
            })}
            <Footer />
        </>
    );
} 