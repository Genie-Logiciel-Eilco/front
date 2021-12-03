import React from "react";
import Navbar from "../../Layout/Navbar/Navbar";

// Hero Images
//import hero from "../../Assets/hero-three.jpg";
import heroTwo from "../../Assets/hero-one.jpg";
import "./Homepage.scss";
import BlueButton from "../../Components/BlueButton/BlueButton";

// How it works images
import howOne from "../../Assets/create-account.jpg";
import howTwo from "../../Assets/browse-books.jpg";
import howThree from "../../Assets/read-book.jpg";
import CardImage from "../../Components/Card/CardImage";

// About
import AboutImg from "../../Assets/about.jpg";
import CardSecondary from "../../Components/CardSecondary/CardSecondary";

// Feedback
import user from "../../Assets/user.jpg";
import Footer from "../../Layout/Footer/Footer";
import { useHistory } from "react-router";

export default function Homepage() {
    const hows = [
        {
            index: 1,
            image: howOne,
            text: "Créez un compte et authentifiez-vous !",
        },
        {
            index: 2,
            image: howTwo,
            text: "Parcourez notre collection de livres disponible !",
        },
        {
            index: 3,
            image: howThree,
            text: "Amusez-vous soit en lisant par vous-même ou en utilisant la version audible !",
        },
    ];

    const feedBackArr = [
        {
            pdp: user,
            fullName: "Zineb Moukir",
            text: "Je n'aime pas cette plateforme, trop lente.",
            status: "Etudiante EILCO",
            stars: 0,
        },
        {
            pdp: user,
            fullName: "Oumaima Safi",
            text: "Je passe un bon moment ici mais je pense qu'il faudra apporter des améliorations",
            status: "Etudiante EILCO",
            stars: 3,
        },
        {
            pdp: user,
            fullName: "Iliass Foukhar",
            text: "La meilleure plateforme de lecture ! Gratuite et enrichissante !",
            status: "Etudiant EIL",
            stars: 5,
        },
        {
            pdp: user,
            fullName: "Saad Errazgouni",
            text: "Je m'appelle mr developpeur",
            status: "Etudiant EILCO",
            stars: 5,
        },
    ];

    const generateFeedBack = () => {
        let output = feedBackArr.map((feedback, index) => {
            return (
                <CardSecondary
                    text={feedback.text}
                    pdp={feedback.pdp}
                    fullName={feedback.fullName}
                    stars={feedback.stars}
                    status={feedback.status}
                    key={index}
                />
            );
        });

        return output;
    };
    let history = useHistory();
    return (
        <>
            <Navbar />

            <div className="hero-section">
                <div className="slider">
                    <div className="black-bg"></div>
                    <img src={heroTwo} alt="hero-one" />
                </div>
                <div className="hero-content">
                    <h3>Votre premier livre audio gratuit</h3>
                    <h4>Vous êtes prêt ? Bénéficiez automatiquement de 2 livres audio offerts.</h4>
                    {localStorage.getItem("data")
                        ? <BlueButton
                            text="Commencer"
                            clickHandler={() => history.push("/Signup")}
                        />
                        : <div className="buttons_home">
                            <BlueButton
                                text="Commencer"
                                clickHandler={() => history.push("/Signup")}
                            />
                            <button className="blue-button two" onClick={() => history.push('/Login')}>
                                S'authentifier
                            </button>
                        </div>

                    }

                </div>
            </div>

            <div className="how-it-works" id="how">
                <div className="section-header">
                    <h1>Comment ça marche ?</h1>
                </div>
                <div className="how-it-works-cards">
                    {hows.map((how) => {
                        return (
                            <CardImage
                                index={how.index}
                                image={how.image}
                                text={how.text}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="about-us" id="about">
                <div className="section-header">
                    <h1>Qui sommes-nous ?</h1>
                </div>
                <div className="about-wrapper">
                    <div className="about-img-container">
                        <img src={AboutImg} alt="" />
                    </div>
                    <div className="about-text">
                        <p>
                            Nous sommes un groupe d’étudiants, au sein de l’EILCO
                            passionnés par la lecture, qui met en valeur des
                            problèmes rencontrés par une catégorie de personnes.
                        </p>
                        <p>
                            En fait, plusieurs personnes n’arrivent pas à
                            trouver des livres gratuits et ne peuvent pas se
                            permettre d’en acheter vu le prix élevé. De plus, la
                            portabilité de plusieurs livres physiques constitue
                            un problème puisqu’elle n’offre pas un confort pour
                            les adeptes de lecture. Permettre à ces partisans
                            d’écouter les différents passages du livre en
                            conduisant, cuisinant, marchant etc. serait une
                            solution favorable pour eux.
                        </p>
                    </div>
                </div>
            </div>

            <div className="feedback" id="feedback">
                <div className="section-header">
                    <h1>Consultez les avis récents</h1>
                </div>

                <div className="cards-wrapper">{generateFeedBack()}</div>
            </div>

            <Footer />
        </>
    );
}