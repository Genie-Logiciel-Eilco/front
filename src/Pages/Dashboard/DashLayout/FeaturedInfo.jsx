import React, { useState, useEffect } from 'react'
import './FeaturedInfo.css'
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { Link } from 'react-router-dom';
import userService from '../../../service/userService'
import MenuItem from '@mui/material/MenuItem';

export default function FeaturedInfo() {
    const [users, setUsers] = useState([])
    const [books, setBooks] = useState([])

    useEffect(() => {
        userService.getAllBooks().then((res) => {
            setBooks(res?.data?.data);
            console.log(res?.data?.data)
        });
        userService.getAllUsers().then((res) => {
            setUsers(res?.data?.data?.data);
            console.log(res?.data?.data)

        });
    }, [])
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Utilisateurs</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{users?.length}</span>
                    <span className="featuredMoneyRate">
                        +11.4% <TrendingUp className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Comparé au mois passé</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Livres</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{books?.length}</span>
                    <span className="featuredMoneyRate">
                        +13.4% <TrendingUp className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Comparé au mois passé</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Lectures</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">1549</span>
                    <span className="featuredMoneyRate">
                        +34.4% <TrendingUp className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Comparé au mois passé</span>
            </div>
        </div>
    )
}
