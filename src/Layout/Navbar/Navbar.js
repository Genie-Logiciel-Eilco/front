import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../Assets/templogo.jpg';
import './Navbar.scss';

export default function Navbar() {
    const baseURL = "http://localhost:3000/";
    const navLinks = [
        {
            path: baseURL + "#how",
            label: "Comment ça marche"
        },
        {
            path: baseURL + "#about",
            label: "Qui sommes-nous ?"
        },
        {
            path: baseURL + "#feedback",
            label: "Feedback"
        }
    ]
    return (
        <nav className="nav-0">
            <div className="logo-container">
                <Link to="/">
                    <img
                        src={logo}
                        alt="lazy library logo"
                        className="nav-logo"
                    />
                </Link>
            </div>
            <ul className="nav-items">
                {navLinks.map((navlink, i) => {
                    return <li key={i}>
                        <Link to={navlink.path}>
                            {navlink.label}
                        </Link>
                    </li>
                })}
            </ul>
        </nav>
    )
}