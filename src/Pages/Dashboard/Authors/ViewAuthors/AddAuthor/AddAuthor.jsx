import React, { useState, initialState, useEffect, useRef } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import userService from "../../../../../service/userService";
import "./AddAuthor.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DatePicker from '@mui/lab/DatePicker';



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

export default function AddBook({ success, onChange }) {
  //data to send
  const [firstName, setFirstName] = useState(initialState)
  const [lastName, setLastName] = useState(initialState)
  const [biography, setBiography] = useState(initialState);
  const [birthPlace, setBirthPlace] = useState(initialState)
  const [birthDate, setBirthDate] = useState("")
  const [deathDate, setDeathDate] = useState("")

  //decede checkbox
  const [checkedBox, setCheckedBox] = useState(false)

  //image
  const [image, setImage] = useState(initialState)
  const [file, setFile] = useState(initialState)
  //uxd
  const [imageCheckColor, setImageCheckColor] = useState("disabled");


  const theme = useTheme();

  const hiddenFileInput = useRef(null);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(img));
      setImageCheckColor("warning");
    }
  };

  const handleCheckChange = (e) => {
    setCheckedBox(e.target.checked)
  }

  const imageUpload = (id) => {
    let formData = new FormData();
    formData.append("File", file);
    let value = "Bearer " + userService.accessToken;
    const config = {
      headers: {
        Authorization: value,
        "content-type": "multipart/form-data",
      },
    };
    return userService.uploadAuthorImage(id, formData, config)
      .then(
        (res) => {
          setImage(null);
        },
        (err) => {
          setImageCheckColor("error");
          console.log(err)
          console.log(id)
        }
      );
  };

  const uploadAuthor = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      biography: biography,
      birthDate: birthDate,
      deathDate: deathDate,
      birthplace: birthPlace
    }
    return userService.uploadAuthor(data).then((res) => {
      onChange(!success)
      imageUpload(res?.data?.data?.id)
    }, (err) => {
      console.log(err)
      console.log(data)
    })
  }

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
                variant="contained"
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
            <img src={image} alt="" className="uploaded-book-image" />
          </div>
          <div className="addbook-item">
            <label>Prénom</label>
            <input
              type="text"
              className="addbook-text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="addbook-item">
            <label>Nom</label>
            <input
              type="text"
              className="addbook-text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="addbook-item">
            <label>Lieu de Naissance</label>
            <input
              type="text"
              className="addbook-text"
              value={birthPlace}
              onChange={(e) => {
                setBirthPlace(e.target.value);
              }}
            />
          </div>
          <div className="addbook-item">
            <label>Biographie</label>
            <TextareaAutosize
              minRows={3}
              value={biography}
              onChange={(e) => {
                setBiography(e.target.value);
              }}
              className='addbook-text2'
              style={{ width: 220, maxHeight: 220 }}
            />
          </div>
          <div className="addbook-item">
            <label>Date de naissance</label>
            <Checkbox
              checked={checkedBox}
              onChange={handleCheckChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <label>Décédé(e)</label>

            <div className="flex-datepickers">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {!checkedBox ?
                  (<DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Naissance"
                    value={birthDate}
                    style={{ marginRight: "10px" }}
                    onChange={(e) => {
                      setBirthDate(`${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`);
                      setDeathDate(null);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />) :
                  (<>
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      label="Naissance"
                      value={birthDate}
                      onChange={(e) => {
                        setBirthDate(`${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      label="Décés"
                      value={deathDate}
                      onChange={(e) => {
                        setDeathDate(`${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </>)
                }
              </LocalizationProvider>
            </div>

          </div>
        </div>
      </div>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          uploadAuthor();
        }}
      >
        Terminer
      </Button>
    </>
  );
}
