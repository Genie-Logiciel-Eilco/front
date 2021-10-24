import React from 'react'
import Navbar from '../../../Layout/Navbar/Navbar'
import Sidebar from '../../../Layout/Sidebar/Sidebar'
import './Users.css'
import UserList from './UserList/UserList'

export default function Dashboard() {

    const navLinks = [

        {
            path: "/",
            label: "Back to Website"
        },
        {
            path: "/",
            label: "Bruh"
        },
        // {
        //     path : "/dash",
        //     label : "Admin Dashboard"
        // }
    ]

    return (
        <>
            <Navbar navLinks={navLinks} />
            <div className="dash-container">
                <Sidebar />
                <UserList />
            </div>
        </>
    )
}
