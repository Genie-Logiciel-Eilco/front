import React from 'react'
import Sidebar from '../../../Layout/Sidebar/Sidebar'
import Navbar from '../../../Layout/Navbar/Navbar'
import ViewUsers from "./ViewUsers/ViewUsers"


import "./Users.css"

export default function Books() {

    return (
        <>
            <Navbar />
            <div className="bookContainer">
                <Sidebar />
                <ViewUsers />
            </div>
        </>
    )
}
