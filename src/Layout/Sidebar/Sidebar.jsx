import React from 'react'
import './Sidebar.css'
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
//import AddBoxIcon from '@mui/icons-material/AddBox';

import BorderColorIcon from '@mui/icons-material/BorderColor';

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

                        <Link to="/69420/books/book" style={{ textDecoration: "none", color: "#555" }}>
                            <li className="sidebarListItem">
                                <MenuBookIcon className="sidebarIcon" /> Livres
                            </li>
                        </Link>
                        <Link to="/69420/books/author" style={{ textDecoration: "none", color: "#555" }}>
                            <li className="sidebarListItem">
                                <BorderColorIcon className="sidebarIcon" /> Auteurs
                            </li>
                        </Link>
                        <Link to="/69420/books/publisher" style={{ textDecoration: "none", color: "#555" }}>
                            <li className="sidebarListItem">
                                <PersonIcon className="sidebarIcon" /> Editeur
                            </li>
                        </Link>
                    </ul>

                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Utilisateurs</h3>
                    <ul className="sidebarList">
                        <Link to="/69420/users" style={{ textDecoration: "none", color: "#555" }}>
                            <li className="sidebarListItem">
                                <PersonIcon className="sidebarIcon" /> Utilisateurs
                            </li>
                        </Link>

                    </ul>
                </div>
            </div>
        </div>
    )
}
