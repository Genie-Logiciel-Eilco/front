import React from 'react'
import './Sidebar.css'
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

export default function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/69420/home" style={{ textDecoration: "none", color: "#555" }}>
                            <li className="sidebarListItem" >
                                <HomeIcon className="sidebarIcon" /> Home
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <FormatListBulletedIcon className="sidebarIcon" /> Books
                        </li>

                    </ul>

                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Livres</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <HomeIcon className="sidebarIcon" /> Home
                        </li>
                        <li className="sidebarListItem">
                            <FormatListBulletedIcon className="sidebarIcon" /> Books
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Utilisateurs</h3>
                    <ul className="sidebarList">
                        <Link to="/69420/users" style={{ textDecoration: "none", color: "#555" }}>
                            <li className="sidebarListItem">
                                <PersonIcon className="sidebarIcon" /> Utilisatuers
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <FormatListBulletedIcon className="sidebarIcon" /> Books
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
