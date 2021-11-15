import React, { useState } from "react";
// Layout
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";
// Helper
import formGenerator from "../../Helpers/FormGenerator";
import { Link, useHistory } from "react-router-dom";

// Imgs
import logo from "../../Assets/templogo.jpg";

// Styling
import "./SignupPage.scss";

// Backend
import axios from "axios";
import API_ENDPOINT from "../../Helpers/API_URL";

export default function SignupPage() {
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const form = [
        {
            label: "Nom",
            type: "text",
            name: "last_name",
            value: data.last_name,
            onChange: (e) =>
                setData((data) => {
                    return {
                        ...data,
                        last_name: e.target.value,
                    };
                }),
        },
        {
            label: "Prénom",
            type: "text",
            name: "first_name",
            value: data.first_name,
            onChange: (e) =>
                setData((data) => {
                    return {
                        ...data,
                        first_name: e.target.value,
                    };
                }),
        },
        {
            label: "Nom d'utilisateur",
            type: "text",
            name: "username",
            value: data.username,
            onChange: (e) =>
                setData((data) => {
                    return {
                        ...data,
                        username: e.target.value,
                    };
                }),
        },
        {
            label: "Email",
            type: "email",
            name: "email",
            value: data.email,
            onChange: (e) =>
                setData((data) => {
                    return {
                        ...data,
                        email: e.target.value,
                    };
                }),
        },
        {
            label: "Mot de passe",
            type: "password",
            name: "password",
            value: data.password,
            onChange: (e) =>
                setData((data) => {
                    return {
                        ...data,
                        password: e.target.value,
                    };
                }),
        },
        {
            label: "Confirmation du mot de passe",
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            onChange: (e) =>
                setData((data) => {
                    return {
                        ...data,
                        password_confirmation: e.target.value,
                    };
                }),
        },
    ];


    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        try {
            let request = await axios.post(
                `${API_ENDPOINT}/api/register`,
                data
            );
            let response = await request.data;
            if(response.success){
                history.push('/Unverified');
            }
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <main className="signup-page-wrapper">
            <Navbar />
            <div className="signup-form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="logo-login-wrapper">
                        <img src={logo} className="logo-login" />
                    </div>
                    <legend>
                        On est très content de vous avoir <br />
                        parmis nous !
                    </legend>
                    {formGenerator(form)}
                    <button type="submit" className="btn-login">
                        S'enregistrer
                    </button>

                    <Link to="/Signup">
                        <button
                            type="button"
                            role="button"
                            className="btn-ternary-login"
                        >
                            Vous avez déja un compte ?
                        </button>
                    </Link>
                </form>
            </div>

            
            <Footer />
        </main>
    );
}