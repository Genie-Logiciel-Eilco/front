import React, { useEffect } from 'react'
import Navbar from '../../../Layout/Navbar/Navbar'
import Sidebar from '../../../Layout/Sidebar/Sidebar'
import './Users.css'
import UserList from './UserList/UserList'
import userService from '../../../service/userService'

export default function Dashboard() {


    useEffect(() => {
        userService.getUsers(2).then((res) => {
            console.log(res)
        }, (err) => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <Navbar />
            <div className="dash-container">
                <Sidebar />
                <UserList />
            </div>
        </>
    )
}
