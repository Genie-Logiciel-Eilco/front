import React from 'react'
import Sidebar from '../../../Layout/Sidebar/Sidebar'
import Navbar from '../../../Layout/Navbar/Navbar'
import ViewPublishers from "./ViewPublishers/ViewPublishers"


import "./Publishers.css"

export default function Books() {

    return (
        <>
            <Navbar />
            <div className="bookContainer">
                <Sidebar />
                <ViewPublishers />
            </div>
        </>
    )
}
