import React from 'react'
import Sidebar from '../../../Layout/Sidebar/Sidebar'
import Navbar from '../../../Layout/Navbar/Navbar'
import ViewBooks from "./ViewBooks/ViewBooks"


import "./Books.css"

export default function Books() {

    return (
        <>
            <Navbar />
            <div className="bookContainer">
                <Sidebar />
                <ViewBooks />
            </div>
        </>
    )
}
