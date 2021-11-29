import React, { useState, initialState } from "react";
import userService from "../../../../../service/userService";
import "./AddPublisher.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function AddPublisher({ success, onChange }) {
  //data to send
  const [name, setName] = useState(initialState)
  const [description, setDescription] = useState(initialState);
  const [foundationDate, setFoundationDate] = useState("")

  const uploadPublisher = () => {
    const data = {
      name: name,
      description: description,
      foundationDate: foundationDate,
    }
    return userService.uploadPublisher(data).then((res) => {
      onChange(!success)
    }, (err) => {
      console.log(err)
      console.log(data)
    })
  }

  return (
    <>
      <div className="addbook-container">
        <div className="addbook-form">
          <div className="addbook-item">
            <label>Nom</label>
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
            <label>Description</label>
            <TextareaAutosize
              minRows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className='addbook-text2'
              style={{ width: 220, maxHeight: 220 }}
            />
          </div>
          <div className="addbook-item">
            <label>Date de création</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="dd/MM/yyyy"
                label=""
                value={foundationDate}
                style={{ marginRight: "10px" }}
                onChange={(e) => {
                  if (e) {
                    setFoundationDate(`${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`);
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          uploadPublisher();
        }}
      >
        Terminer
      </Button>
    </>
  );
}
