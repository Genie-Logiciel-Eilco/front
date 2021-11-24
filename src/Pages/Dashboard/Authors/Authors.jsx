import React from 'react'
import Sidebar from '../../../Layout/Sidebar/Sidebar'
import Navbar from '../../../Layout/Navbar/Navbar'
import ViewAuthors from "./ViewAuthors/ViewAuthors"


import "./Authors.css"

export default function Books() {

    return (
        <>
            <Navbar />
            <div className="bookContainer">
                <Sidebar />
                <ViewAuthors />
            </div>
        </>
    )
}
