import React from "react";
import "./Browsepage.scss";

// Components
import BrowseNavbar from "./BrowseNavbar";
import Categories from "../../Components/Common/Categories/Categories";
import BookList from "../../Components/Common/BookList/BookList";
import Footer from "../../Layout/Footer/Footer";

export default function Browsepage() {
    return (
        <>
            <BrowseNavbar />
            <Categories />
            <BookList category="Business & Money" />
            <BookList category="Business & Money" />
            <BookList category="Business & Money" />
            <BookList category="Business & Money" />
            <Footer />
        </>
    );
}