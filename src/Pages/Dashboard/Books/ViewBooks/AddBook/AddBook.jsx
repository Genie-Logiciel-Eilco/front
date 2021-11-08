import React, { useState, initialState, useEffect } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import userService from '../../../../../service/userService'
import "./AddBook.css"
import { Button } from '@mui/material'
import axios from 'axios'

export default function AddBook() {

    const [isbn, setIsbn] = useState(initialState)
    const [name, setName] = useState(initialState)
    const [subject, setSubject] = useState(initialState)
    const [synopsis, setSynopsis] = useState(initialState)
    const [publicationDate, setPublicationDate] = useState(initialState)
    const [image, setImage] = useState(initialState);
    const [authors, setAuthors] = useState(initialState)
    const [file, setFile] = useState(initialState)

    const hiddenFileInput = React.useRef(null);

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setFile(e.target.files[0]);
            setImage(URL.createObjectURL(img));
        }
  };

  const imageUpload = () => {
        let formData = new FormData();
        console.log(file);
        formData.append("File", file);
        let value = "Bearer " + userService.accessToken;
        const config = {
            headers: {
                "Authorization": value,
                "content-type": "multipart/form-data",
            }
        };
      
        return axios.post("http://104.248.39.111/api/book/uploadImage", formData, config).then(
            (res) => {
                console.log("success")
                console.log(res)
            },
            (err) => {
                console.log(err)
            }
        );
    }

    return (
        <>
            <div className="addbook-container">
                <div className="addbook-form">
                    <div className='addbook-item'>
                        <Button style={{ background: "rgb(176, 176, 238)", padding: "10px 20px", borderRadius: "10px" }} onClick={(e) => {
                            hiddenFileInput.current.click();
                        }}><PhotoCameraIcon style={{ marginRight: "10px" }} /> Upload Image</Button>
                        <input type="file" ref={hiddenFileInput} onChange={onImageChange} style={{ display: "none" }} accept=".jpeg,.png,.jpg,.tif,.jfif" />
                        <img src={image} alt='' />
                        <button onClick={imageUpload}>upload image</button>
                    </div>
                    <div className="addbook-item">
                        <label>ISBN</label>
                        <input type="text" className="addbook-text" value={isbn} onChange={
                            (e) => {
                                setIsbn(e.target.value);
                            }
                        } />
                    </div>
                    <div className="addbook-item">
                        <label>Name</label>
                        <input type="text" className="addbook-text" value={name} onChange={
                            (e) => {
                                setName(e.target.value);
                            }} />
                    </div>
                    <div className="addbook-item">
                        <label>Sujet</label>
                        <input type="text" className="addbook-text" value={subject} onChange={
                            (e) => {
                                setSubject(e.target.value);
                            }} />
                    </div>
                    <div className="addbook-item">
                        <label>Synopsis</label>
                        <input type="text" className="addbook-text" value={synopsis} onChange={
                            (e) => {
                                setSynopsis(e.target.value);
                            }} />
                    </div>
                    <div className="addbook-item">
                        <label>Date de publication</label>
                        <input type="text" className="addbook-text" value={publicationDate} onChange={
                            (e) => {
                                setPublicationDate(e.target.value);
                            }} />
                    </div>
                    {/* <div className="addbook-item">
                        <label>Contenu</label>
                        <input type="file" onChange={onFileChange} />
                    </div> */}
                </div>



            </div>
            <button onClick={
                (e) => {
                    e.preventDefault();
                    console.log({ isbn: isbn, name: name, subjet: subject, synopsis: synopsis, publicationDate: publicationDate })
                }

            }>click here lol</button>
        </>
    )
}
