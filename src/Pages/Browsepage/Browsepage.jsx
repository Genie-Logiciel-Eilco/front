import React from "react";
import "./Browsepage.scss";

// Components
import BrowseNavbar from "./BrowseNavbar";
import Categories from "../../Components/Common/Categories/Categories";
import Footer from "../../Layout/Footer/Footer";

import ListBooks from '../../Components/Common/ListBooks/ListBooks'

export default function Browsepage() {
    return (
        <>
            <BrowseNavbar />
            <Categories />
            <ListBooks categoryLabel={"Business & Money"}/>
            <ListBooks categoryLabel={"Self developement"}/>
            <ListBooks categoryLabel={"Novels"}/>
            <ListBooks categoryLabel={"Comedies"}/>
            <Footer />
        </>
    );
} 