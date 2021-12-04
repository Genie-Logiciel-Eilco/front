import React, { useState, initialState, useEffect, useRef } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import userService from "../../../../../service/userService";
import "./EditBook.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FormControl from "@mui/material/FormControl";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import imgplaceholder from '../../../../../Assets/imgplaceholder.png'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import API_URL from "../../../../../Helpers/API_URL";
import authHeader from "../../../../../service/authHeader";


const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function EditBook({ uuid, success, onChange }) {
    //data to send
    const [isbn, setIsbn] = useState(initialState);
    const [name, setName] = useState(initialState);
    const [synopsis, setSynopsis] = useState(initialState);
    const [publicationDate, setPublicationDate] = useState(new Date());
    const [chosenAuthors, setChosenAuthors] = useState([]);
    const [chosenPublisher, setChosenPublisher] = useState(initialState);
    const [chosenCategories, setChosenCategories] = useState([]);

    //image
    const [image, setImage] = useState(initialState);
    const [file, setFile] = useState(initialState);

    //file
    const [contentFile, setContentFile] = useState(initialState);

    //data to fill selects
    const [authors, setAuthors] = useState(initialState);
    const [publishers, setPublishers] = useState(initialState);
    const [categories, setCategories] = useState([]);

    //uxd
    const [imageCheckColor, setImageCheckColor] = useState("disabled");
    const [fileCheckColor, setFileCheckColor] = useState("disabled");

    const theme = useTheme();

    const handleCategory = (event) => {
        const {
            target: { value },
        } = event;
        setChosenCategories(typeof value === "string" ? value.split(",") : value);
    };

    const handleAuthor = (event) => {
        const {
            target: { value },
        } = event;
        setChosenAuthors(typeof value === "string" ? value.split(",") : value);
    };

    useEffect(() => {
        userService.getBook(uuid).then((res) => {
            setIsbn(res?.data?.data?.isbn);
            setName(res?.data?.data?.name);
            setSynopsis(res?.data?.data?.synopsis);
            setPublicationDate(res?.data?.data?.publicationDate);
            setChosenAuthors(res?.data?.data?.authors);
            setChosenPublisher(res?.data?.data?.publisher_id);
            setImage(`${API_URL.STORAGE_ENDPOINT}/${res?.data?.data?.id}/${res?.data?.data?.imageLocation}`)
            setContentFile(`${API_URL.STORAGE_ENDPOINT}/${res?.data?.data?.id}/${res?.data?.data?.fileLocation}`)
        });
        userService.getAuthors().then((res) => {
            setAuthors(res?.data?.data);
        });
        userService.getPublishers().then((res) => {
            setPublishers(res?.data?.data);
        });
        userService.getCategories().then((res) => {
            setCategories(res?.data?.data);
        });
    }, []);

    useEffect(() => { }, [authors, publishers, categories, image]);

    const hiddenFileInput = useRef(null);
    const hiddenContentFileInput = useRef(null);

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setFile(e.target.files[0]);
            setImage(URL.createObjectURL(img));
            setImageCheckColor("warning");
        }
    };

    const imageUpload = () => {
        let formData = new FormData();
        formData.append("File", file);
        const config = {
            headers: {
                Authorization: authHeader(),
                "content-type": "multipart/form-data",
            },
        };
        return axios
            .post(
                `${API_URL.API_ENDPOINT}/api/book/uploadImage/${uuid}`,
                formData,
                config
            )
            .then(
                (res) => {
                    setImageCheckColor("success");
                    console.log(res?.data)
                    setImage(null);
                },
                (err) => {
                    setImageCheckColor("error");
                }
            );
    };

    const onContentFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setContentFile(e.target.files[0]);
            setFileCheckColor("warning");
        }
    };

    // const handleCategory = (newElement) => {
    //   setChosenCategories(chosenCategories => [...chosenCategories, newElement])
    //   setCategories(categories.filter(e => e.id != newElement))
    //   console.log(chosenCategories)
    // }

    const contentFileUpload = () => {
        let formData = new FormData();
        formData.append("File", contentFile);
        const config = {
            headers: {
                Authorization: authHeader(),
                "content-type": "multipart/form-data",
            },
        };
        return axios
            .post(
                `${API_URL.API_ENDPOINT}/api/book/uploadFile/${uuid}`,
                formData,
                config
            )
            .then(
                (res) => {
                    console.log(res?.data)
                    setFileCheckColor("success");
                },
                (err) => {
                    setFileCheckColor("error");
                }
            );
    };

    const uploadBook = () => {
        const data = {
            isbn: isbn,
            name: name,
            synopsis: synopsis,
            authors: chosenAuthors,
            publicationDate: publicationDate,
            publisher_id: chosenPublisher,
            categories: chosenCategories,
        };
        return userService.uploadBook(uuid, data).then((res) => {
            onChange(!success);
        });
    };

    function getStyles(name, obj, theme) {
        return {
            fontWeight:
                obj.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    return (
        <>
            <div className="addbook-container">
                <div className="addbook-form">
                    <div className="addbook-item">
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                "& > *": {
                                    m: 1,
                                },
                            }}
                        >
                            <ButtonGroup
                                variant="outlined"
                                aria-label="outlined button group"
                            >
                                <Button
                                    onClick={(e) => {
                                        hiddenFileInput.current.click();
                                    }}
                                    size="small"
                                >
                                    {" "}
                                    <PhotoCameraIcon /> Choisir
                                </Button>
                                <Button onClick={imageUpload}>Confirmer</Button>
                                <CloudDoneIcon
                                    fontSize="small"
                                    style={{ marginTop: "7px" }}
                                    color={imageCheckColor}
                                />
                            </ButtonGroup>
                        </Box>
                        <input
                            type="file"
                            ref={hiddenFileInput}
                            onChange={onImageChange}
                            style={{ display: "none" }}
                            accept=".jpeg,.png,.jpg,.tif,.jfif"
                        />
                    </div>
                    <div className="addbook-item">
                        <label>ISBN</label>
                        <input
                            type="text"
                            className="addbook-text"
                            value={isbn}
                            onChange={(e) => {
                                setIsbn(e.target.value);
                            }}
                        />
                    </div>
                    <div className="addbook-item">
                        <label>Name</label>
                        <input
                            type="text"
                            className="addbook-text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="addbook-item">
                        <label>Synopsis</label>
                        <TextareaAutosize
                            minRows={3}
                            value={synopsis}
                            onChange={(e) => {
                                setSynopsis(e.target.value);
                            }}
                            className='addbook-text'
                            style={{ width: 220, maxHeight: 220 }}
                        />
                    </div>
                    <div className="addbook-item">
                        <label>Date de publication</label>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                style={{ marginTop: "200px" }}
                                inputFormat="dd/MM/yyyy"
                                value={publicationDate}
                                onChange={(e) => {
                                    if (e) setPublicationDate(e);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="addbook-item">
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="demo-simple-select-standard-label">
                                Editeur
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={chosenPublisher}
                                onChange={(e) => {
                                    setChosenPublisher(e.target.value);
                                }}
                                label="Editeur"
                            >
                                {publishers?.map((publisher, index) => (
                                    <MenuItem
                                        value={publisher?.id}
                                        key={index}
                                    >{`${publisher?.name}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ marginRight: "7px", width: 120 }}>
                            <InputLabel>Auteurs</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={chosenAuthors}
                                onChange={handleAuthor}
                                input={<OutlinedInput label="Auteurs" />}
                                MenuProps={MenuProps}
                            >
                                {authors?.map((author) => (
                                    <MenuItem
                                        key={author?.id}
                                        value={author?.id}
                                        style={getStyles(name, chosenAuthors, theme)}
                                    >
                                        {`${author?.first_name} ${author?.last_name}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: 200 }}>
                            <InputLabel>Catégories</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={chosenCategories}
                                onChange={handleCategory}
                                input={<OutlinedInput label="Catégories" />}
                                MenuProps={MenuProps}
                            >
                                {categories?.map((category) => (
                                    <MenuItem
                                        key={category?.id}
                                        value={category?.id}
                                        style={getStyles(name, chosenCategories, theme)}
                                    >
                                        {category?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="addbook-item">
                        <input
                            type="file"
                            ref={hiddenContentFileInput}
                            style={{ display: "none" }}
                            onChange={onContentFileChange}
                            accept=".epub"
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                "& > *": {
                                    m: 1,
                                },
                            }}
                        >
                            <ButtonGroup
                                variant="outlined"
                                aria-label="outlined button group"
                            >
                                <Button
                                    onClick={(e) => {
                                        hiddenContentFileInput.current.click();
                                    }}
                                    size="small"
                                >
                                    {" "}
                                    <FileUploadIcon /> Choisir
                                </Button>
                                <Button onClick={contentFileUpload}>Confirmer</Button>
                                <CloudDoneIcon
                                    fontSize="small"
                                    style={{ marginTop: "7px" }}
                                    color={fileCheckColor}
                                />
                            </ButtonGroup>

                            <a href={contentFile} rel="noreferrer" target="_blank">Visualiser</a>
                        </Box>
                    </div>
                </div>
                <div>
                    <img className="imayge-desu" src={image ? image : imgplaceholder} alt="Bug bruh" />
                </div>
            </div>
            <Button
                variant="contained"
                onClick={(e) => {
                    e.preventDefault();
                    uploadBook();
                }}
            >
                Terminer
            </Button>
        </>
    );
}
