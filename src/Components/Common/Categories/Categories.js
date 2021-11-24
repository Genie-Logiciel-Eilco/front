import React, { useState, useEffect } from "react";
import "./Categories.scss";

export default function Categories({categoriesBase}) {
    const [active, setActive] = useState("Toutes");
    const [categories, setCategories] = useState([...categoriesBase]);
    //const [flag, setFlag] = useState(0);
    useEffect(()=>{
    }, [])



    const toggleActiveClass = (name) => {
        setActive(name);
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
                            onClick={() => toggleActiveClass(category.name)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
