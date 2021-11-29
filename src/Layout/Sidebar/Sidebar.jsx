import React from 'react'
import './Sidebar.css'
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonIcon from '@mui/icons-material/Person';
import { Link, NavLink } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <NavLink to="/69420/home" className="dashlink" activeClassName="active-dashlink" style={{ textDecoration: "none" }} exact>
                    <div className="sidebarMenu">
                        <HomeIcon className="sidebarIcon" /> Home
                    </div>
                </NavLink>
                <NavLink to="/69420/books" className="dashlink" activeClassName="active-dashlink" style={{ textDecoration: "none" }} exact>
                    <div className="sidebarMenu">
                        <MenuBookIcon className="sidebarIcon" /> Livres
                    </div>
                </NavLink>
                <NavLink to="/69420/authors" className="dashlink" activeClassName="active-dashlink" style={{ textDecoration: "none" }} exact>
                    <div className="sidebarMenu">
                        <BorderColorIcon className="sidebarIcon" /> Auteurs
                    </div>

                </NavLink>
                <NavLink to="/69420/publishers" className="dashlink" activeClassName="active-dashlink" style={{ textDecoration: "none" }} exact>
                    <div className="sidebarMenu">
                        <PersonIcon className="sidebarIcon" /> Editeur
                    </div>
                </NavLink>
                <NavLink to="/69420/categories" className="dashlink" activeClassName="active-dashlink" style={{ textDecoration: "none" }} exact>
                    <div className="sidebarMenu">
                        <PersonIcon className="sidebarIcon" /> Catégories
                    </div>
                </NavLink>
                <NavLink to="/69420/users" className="dashlink" activeClassName="active-dashlink" style={{ textDecoration: "none" }} exact>
                    <div className="sidebarMenu">
                        <PersonIcon className="sidebarIcon" /> Utilisateurs
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
