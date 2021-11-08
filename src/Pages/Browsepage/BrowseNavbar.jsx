import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/templogo.jpg";
import "./BrowseNavbar.scss";

function BrowseNavbar() {
    const [navToggle, setNavToggle] = useState(false);

    return (
        <nav className="nav">
            <div className="nav-container">
                <div className="nav__logo">
                    <Link to="/" className="link">
                        <img src={logo} alt="" className="nav__logo-img" />
                    </Link>
                </div>

                <div className="nav__searchBox">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="nav__searchBox-icon"
                    />
                    <input
                        className="nav__searchBox-input"
                        placeholder="Search"
                    />
                </div>

                <div
                    className="nav__toggle hide-for-desktop"
                    onClick={() => setNavToggle(!navToggle)}
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        className="nav__toggle-btn"
                    />
                </div>

                <ul
                    className={
                        navToggle ? "nav__links open" : "nav__links close"
                    }
                >
                    <li>
                        <Link to="/" className="nav__links-item">
                            explorer
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="nav__links-item">
                            Link
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="nav__links-item">
                            Link
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default BrowseNavbar;