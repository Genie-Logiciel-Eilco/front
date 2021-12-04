import React, { useState } from "react";
import "./Categories.scss";

export default function Categories({ categoriesBase, onChange }) {
    const [active, setActive] = useState("Toutes");
    const [categories, setCategories] = useState([...categoriesBase]);

    const toggleActiveClass = (category) => {
        setActive(category.name);
        onChange(category)
    }

    const toggleActiveClassStyles = (name) => {
        return name === active
            ? "categories__list-item active"
            : "categories__list-item inactive";
    }


    return (
        <section className="categories">
            <div className="container">
                <h2>Categories</h2>

                <ul className="categories__list">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className={toggleActiveClassStyles(category.name)}
                            onClick={() => toggleActiveClass(category)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
