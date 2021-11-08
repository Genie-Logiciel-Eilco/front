import React, { useState, useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import "./Categories.scss";

export default function Categories() {
    const { books } = useContext(GlobalContext);
    let categories = [];

    for (let index = 0; index < books.length; index++) {
        let category = {
            id: index,
            activeObject: false,
            categoryText: books[index].category,
        };
        categories.push(category);
        categories = ["Toutes", ...new Set(books.map((book) => book.category))];
    }

    const [items, setItems] = useState({
        activeObject: "Toutes",
        categories: categories,
    });

    const toggleActiveClass = (index) =>
        setItems({ ...items, activeObject: items.categories[index] });

    const toggleActiveClassStyles = (index) =>
        items.categories[index] === items.activeObject
            ? "categories__list-item active"
            : "categories__list-item inactive";

    return (
        <section className="categories">
            <div className="container">
                <h2>Categories</h2>

                <ul className="categories__list">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className={toggleActiveClassStyles(index)}
                            onClick={() => toggleActiveClass(index)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
