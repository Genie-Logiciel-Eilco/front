import React, { useState, initialState, useEffect } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import userService from '../../../../../service/userService'
import "./AddBook.css"
import { Button } from '@mui/material'

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

    const onImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            console.log(img)
            setImage(URL.createObjectURL(img));
        }
        console.log(image)
    };

    // const upload = (e) => {
    //     e.preventDefault();
    //     imageUpload(image);
    //     const data = {
    //         isbn: isbn, name: name, subject: subject, synopsis: synopsis, publicationDate: publicationDate,
    //     }
    //     dataUpload(data);
    // }
    // const dataUpload = async (data) => {
    //     await axios.post("http://104.248.39.111/api/book/add/", data)
    // }

    // const imageUpload = (image) => {
    //     console.log(image);
    //     // const formData = { image }
    //     // return axios.post('http://104.248.39.111/api/book/uploadImage/', formData)
    //     //     .then(response => console.log(response))
    // }
    // const imageUpload = () => {
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     let value = "Bearer " + user?.accessToken;
    //     const config = {
    //         headers: {
    //             Authorization: userService.,
    //             "content-type": "multipart/form-data",
    //         },
    //     };
    //     return axios.post(url, formData, config).then(
    //         (response) => {
    //             setMessage(response.data.message);
    //             setSuccessful(true);
    //             props.onChange(true);
    //         },
    //         (error) => {
    //             const resMessage =
    //                 (error.response &&
    //                     error.response.data &&
    //                     error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();
    //             setMessage(resMessage);
    //             setSuccessful(false);
    //         }
    //     );
    // };

    // const onFileChange = (e) => {
    //     let files = e.target.files || e.dataTransfer.files;
    //     if (!files.length)
    //         return;
    //     createFile(files[0]);
    // }
    // const createFile = (file) => {
    //     let reader = new FileReader();
    //     reader.onload = (e) => {
    //         setFile(e.target.result)
    //     };
    //     reader.readAsDataURL(file);
    // }

    useEffect(() => {
        userService.getUsers().then((res) => {
            console.log(res?.data)
        })
    }, [])



    return (
        <>
            <div className="addbook-container">
                <div className="addbook-form">
                    <div className='addbook-item'>
                        <Button style={{ background: "rgb(176, 176, 238)", padding: "10px 20px", borderRadius: "10px" }} onClick={(e) => {
                            hiddenFileInput.current.click();
                        }}><PhotoCameraIcon style={{ marginRight: "10px" }} /> Upload Image</Button>
                        <input type="file" ref={hiddenFileInput} onChange={onImageChange} style={{ display: "none" }} accept=".jpeg,.png,.jpg,.tif,.jfif" />

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
