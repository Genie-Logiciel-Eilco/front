import React, { useState, initialState } from 'react'
import Navbar from '../../../../Layout/Navbar/Navbar'
import Sidebar from '../../../../Layout/Sidebar/Sidebar'

import axios from 'axios'

import "./AddBook.css"

export default function AddBook() {

    const [isbn, setIsbn] = useState(initialState)
    const [name, setName] = useState(initialState)
    const [subject, setSubject] = useState(initialState)
    const [synopsis, setSynopsis] = useState(initialState)
    const [publicationDate, setPublicationDate] = useState(initialState)
    const [image, setImage] = useState(initialState);
    const [authors, setAuthors] = useState(initialState)
    const [file, setFile] = useState(initialState)


    const onImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage(URL.createObjectURL(img));
        }
    };

    const upload = (e) => {
        e.preventDefault();
        imageUpload(image);
        const data = {
            isbn: isbn, name: name, subject: subject, synopsis: synopsis, publicationDate: publicationDate,
        }
        dataUpload(data);
    }
    const dataUpload = async (data) => {
        await axios.post("http:localhost:8000/api/book/add/", data)
    }

    const imageUpload = (image) => {
        const formData = { image }
        return axios.post('http://localhost:8000/api/book/uploadFile/', formData)
            .then(response => console.log(response))
    }

    const onFileChange = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        createFile(files[0]);
    }
    const createFile = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            setFile(e.target.result)
        };
        reader.readAsDataURL(file);
    }



    return (
        <>
            <Navbar />
            <div className="addbook-container">
                <Sidebar />
                <div className="addbook-form">
                    <div className="addbook-item">
                        <label>ISBN</label>
                        <input type="text" value={isbn} onChange={
                            (e) => {
                                setIsbn(e.target.value);
                            }
                        } />
                    </div>
                    <div className="addbook-item">
                        <label>Name</label>
                        <input type="text" value={name} onChange={
                            (e) => {
                                setName(e.target.value);
                            }} />
                    </div>
                    <div className="addbook-item">
                        <label>Sujet</label>
                        <input type="text" value={subject} onChange={
                            (e) => {
                                setSubject(e.target.value);
                            }} />
                    </div>
                    <div className="addbook-item">
                        <label>Synopsis</label>
                        <input type="text" value={synopsis} onChange={
                            (e) => {
                                setSynopsis(e.target.value);
                            }} />
                    </div>
                    <div className="addbook-item">
                        <label>Date de publication</label>
                        <input type="text" value={publicationDate} onChange={
                            (e) => {
                                setPublicationDate(e.target.value);
                            }} />
                    </div>
                    <div className="addbook-item">
                        <label>Contenu</label>
                        <input type="file" onChange={onFileChange} />
                    </div>
                    <div className="addbook-item">
                        <label>Page de garde</label>
                        <input type="file" class="opacity-0" onChange={onImageChange} accept=".jpeg,.png,.jpg,.tif,.jfif" />
                    </div>

                </div>

                <button onClick={
                    (e) => {
                        e.preventDefault();
                        console.log({ isbn: isbn, name: name, subjet: subject, synopsis: synopsis, publicationDate: publicationDate })
                    }

                }>click here lol</button>

            </div>
        </>
    )
}
