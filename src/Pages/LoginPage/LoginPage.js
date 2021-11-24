import React, { useState } from 'react'
import formGenerator from '../../Helpers/FormGenerator'
import Footer from '../../Layout/Footer/Footer'
import Navbar from '../../Layout/Navbar/Navbar'
import loginBG from '../../Assets/Login.jpg';
import './LoginPage.scss'
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';


import logo from '../../Assets/templogo.jpg'
import authService from '../../service/authService';
import { useHistory } from 'react-router-dom';
export default function LoginPage() {
    const [data, setData] = useState({
        usernameOrEmail: "",
        password: ""
    })
    const form = [{
        label: "Nom d'utilisateur ou email",
        type: "text",
        name: "usernameOrEmail",
        value: data.usernameOrEmail,
        onChange: (e) => setData(data => {
            return {
                ...data,
                usernameOrEmail: e.target.value
            };
        })
    },
    {
        label: "Mot de passe",
        type: "password",
        name: "password",
        value: data.password,
        onChange: (e) => setData(data => {
            return {
                ...data,
                password: e.target.value
            };
        })
    }]

    const [err, setErr] = useState(false);
    const [message, setMessage] = useState("Il y'a un problème avec la requête")
    
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await authService.login(data).then((res) => {
            localStorage.setItem('data', JSON.stringify(res?.data?.data));
            history.push('/signup');
        }, (er) => {
            setErr(true);
            console.log(er)
        })

        console.log(data);
    }

    return (
        <main className="login-page-wrapper">
            <Navbar />

            <img src={loginBG} className="login-page-bg" />
            <div className="login-form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="logo-login-wrapper">
                        <img src={logo} className="logo-login" />
                    </div>
                    <legend>
                        Rebienvenue parmis nous !
                    </legend>
                    {formGenerator(form)}
                    <button type="submit" className="btn-login" >
                        Se connecter
                    </button>
                    <Link to="/Forgot/Password">
                        <button type="button" role="button" className="btn-secondary-login">
                            Mot de passe oublié ?
                        </button>
                    </Link>
                    <Link to="/Signup">
                        <button type="button" role="button" className="btn-ternary-login">
                            Vous n'avez pas de compte ?
                        </button>
                    </Link>

                </form>
            </div>
            {err ? <Alert variant="filled" severity="error">
                        {message}
                    </Alert> : ""}
            <Footer />
        </main>
    )
}
