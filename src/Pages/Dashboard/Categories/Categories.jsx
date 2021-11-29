import React from 'react'
import Sidebar from '../../../Layout/Sidebar/Sidebar'
import Navbar from '../../../Layout/Navbar/Navbar'
import ViewCategories from "./ViewCategories/ViewCategories"


import "./Categories.css"

export default function Categories() {

    return (
        <>
            <Navbar />
            <div className="bookContainer">
                <Sidebar />
                <ViewCategories />
            </div>
        </>
    )
}
