import React, { useState } from 'react'
import formGenerator from '../../Helpers/FormGenerator'
import Footer from '../../Layout/Footer/Footer'
import Navbar from '../../Layout/Navbar/Navbar'
import loginBG from '../../Assets/Login.jpg';
import './ForgotPassword.scss'
import { Link } from 'react-router-dom';
import logo from '../../Assets/templogo.jpg'
import authService from '../../service/authService';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useHistory } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginPage() {
    const [email, setEmail] = useState()
    const [bigSuccess, setBigSuccess] = useState(false)
    //disable button and wait for response(jeton)
    const [disabled, setDisabled] = useState(false)
    //snackbar
    const [open, setOpen] = useState(false)

    let history = useHistory()

    const [data, setData] = useState({
        token: "",
        email: "",
        password: "",
        password_confirmation: ""
    })
    const [nextStep, setNextStep] = useState(false)
    const form = [{
        label: "Saisissez votre email",
        type: "text",
        name: "email",
        value: email,
        onChange: (e) => setEmail(e.target.value)
    }]

    const form2 = [
        {
            label: "Jeton de vérification",
            type: "text",
            name: "token",
            value: data.token,
            onChange: (e) => setData({ ...data, token: e.target.value })
        },
        {
            label: "Email",
            type: "text",
            name: "email",
            value: data.email,
            onChange: (e) => setData({ ...data, email: e.target.value })
        },
        {
            label: "Mot de passe",
            type: "password",
            name: "password",
            value: data.password,
            onChange: (e) => setData({ ...data, password: e.target.value })
        },
        {
            label: "Confirmation de mot de passe",
            type: "password",
            name: "passwordConfirmation",
            value: data.password_confirmation,
            onChange: (e) => setData({ ...data, password_confirmation: e.target.value })
        }

    ]


    const [severity, setSeverity] = useState("error")
    const [message, setMessage] = useState("")

    const handlePassword = () => {
        if (data.password_confirmation !== data.password) setMessage("La confirmation de correspond pas au mot de passe")
    }

    const closeAlert = () => {
        setTimeout(() => { setOpen(false) }, 3000)
    }

    const handleSubmitForgot = async (e) => {
        e.preventDefault();
        setDisabled(true)
        await authService.forgotPassword({ email: email }).then((res) => {
            console.log(res?.data)
            setMessage("Votre code de confirmation a été envoyé par email.")
            setSeverity("success")
            setOpen(true);
            setNextStep(true)
            setDisabled(false)
        }, (er) => {
            setMessage("Email invalide")
            setSeverity("error")
            setOpen(true);
            console.log(er)
            setDisabled(false)
        })
        closeAlert()
    }

    const handleSubmitReset = async (e) => {
        e.preventDefault();
        await authService.resetPassword(data).then((res) => {
            setBigSuccess(true)
            setTimeout(() => {
                history.push('/login');
            }, 3500)
        }, (er) => {
            setMessage("Données invalides")
            handlePassword();
            setSeverity("error")
            setOpen(true);
        })
        closeAlert()
    }

    return (
        <main className="login-page-wrapper">
            <Navbar />

            <img src={loginBG} className="login-page-bg" />
            <div className="login-form-wrapper">
                {!bigSuccess && (<>
                    {!nextStep ? (<form onSubmit={handleSubmitForgot}>
                        <div className="logo-login-wrapper">
                            <img src={logo} className="logo-login" />
                        </div>
                        <legend>
                            Réinitialiser le mot de passe
                        </legend>
                        {formGenerator(form)}
                        <button type="submit" role="button" className="btn-login" disabled={disabled}>
                            Envoyer
                        </button>
                        <Link to="/login">
                            <button type="button" role="button" className="btn-secondary-login">
                                Retourner à la page Login
                            </button>
                        </Link>

                    </form>) :
                        (<form onSubmit={handleSubmitReset}>
                            <div className="logo-login-wrapper">
                                <img src={logo} className="logo-login" />
                            </div>
                            <legend>
                                Réinitialiser le mot de passe
                            </legend>
                            {formGenerator(form2)}
                            <button type="submit" role="button" className="btn-login">
                                Envoyer
                            </button>
                            <Link to="/login">
                                <button type="button" role="button" className="btn-secondary-login">
                                    Retourner à la page Login
                                </button>
                            </Link>
                        </form>)
                    }</>)}
                {bigSuccess && (
                    <div style={{ background: "#5cb85c", color: "#fff", padding: "20px 40px", fontSize: "1.5rem", borderRadius: "10px" }}>
                        <CheckCircleIcon /> Mot de passe réinitialisé avec succès, vous allez être redirigé à la page du Login
                    </div>
                )}
            </div>
            {open &&
                <Alert severity={severity} sx={{ width: '50%' }}>
                    {message}
                </Alert>
            }
            <Footer />
        </main>
    )
}
