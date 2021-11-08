import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faTwitter,
    faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./Footer.scss";

export default function Footer() {
    const social = [
        {
            icon: faFacebook,
            href: "https://www.facebook.com/",
        },
        {
            icon: faDiscord,
            href: "https://www.discord.com/",
        },
        {
            icon: faTwitter,
            href: "https://www.twitter.com/",
        },
    ];

    const onClickScroll = () => {
        window.scrollTo(0, 0);
    };
    return (
        <footer className="footer-1">
            <div className="footer-social-icons">
                {social.map((s, index) => {
                    return (
                        <a href={s.href}>
                            <FontAwesomeIcon icon={s.icon} />
                        </a>
                    );
                })}
            </div>
            <div className="footer-copyright">
                <h3>&copy; Copyright 2021 - Tous Droits Réservés</h3>
            </div>
            <div className="footer-scroll">
                <button className="footer-scroll-btn" onClick={onClickScroll}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </div>
        </footer>
    );
}