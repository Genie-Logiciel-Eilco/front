import React from 'react'
import Footer from '../../Layout/Footer/Footer'
import Navbar from '../../Layout/Navbar/Navbar'
import './Unverified.scss';

export default function Unverified({img, header, text, unverified}) {

    const resendVerification = () => {
        alert('Sendi zmr')
    }

    const renderButton = () => {
        
        if(unverified)
            return <button 
                        className="btn btn-call" 
                        onClick={resendVerification} 
                    >
                        Renvoyer le lien
                    </button>
            else 
                return ""
        
    }

    return (
        <>
            <Navbar />

            <main className="unverified">
                <img src={img} className="error-img" />
                <div className="text-container">
                    <h3 className="text-container-header">
                        {header}
                    </h3>
                    <p className="text-container-message">
                        {text}
                    </p>

                </div>
            </main>

            <Footer />
        </>
    )
}
