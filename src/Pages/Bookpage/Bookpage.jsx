import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import "./Bookpage.scss";

import BrowseNavbar from "../Browsepage/BrowseNavbar";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import SecondaryBtn from "../../Components/Buttons/SecondaryBtn";
import Footer from "../../Layout/Footer/Footer";

function Bookpage({ match }) {
    const { books } = useContext(GlobalContext);
    let bookId = match.params.id;
    let bookDetail;

    const getBookDetail = (id) => {
        bookDetail = books[id - 1];
        if (bookDetail === undefined) {
            // return Component
            return alert("sorry, we don't have this book :(");
        }
        return bookDetail;
    };
    getBookDetail(bookId);

    return (
        <>
            <BrowseNavbar />

            <section className="book__detail">
                <div className="container">
                    <div className="flex-container">
                        <article className="book__detail-info">
                            <h2 className="book__detail-title">
                                {bookDetail.subInfo.completedTitle}
                            </h2>
                            <p className="book__detail-author">
                                {bookDetail.author}
                            </p>
                            <span className="book__detail-category-tag">
                                {bookDetail.category}
                            </span>
                            <p className="book__detail-desc">
                                {bookDetail.subInfo.desc}
                            </p>
                            <div className="book__detail-cta">
                                <h3>
                                    Comment Voulez-vous interagir avec le livre
                                    ?
                                </h3>
                                <div className="btns">
                                    <PrimaryBtn text="Lire" />
                                    <SecondaryBtn text="Ecouter" />
                                </div>
                            </div>
                        </article>

                        <div className="book__detail-img">
                            <img
                                className="book__detail-img-ele"
                                src={bookDetail.imgSrc}
                                alt={bookDetail.subInfo.completedTitle}
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