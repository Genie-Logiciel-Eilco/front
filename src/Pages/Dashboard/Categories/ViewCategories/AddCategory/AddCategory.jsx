import React, { useState, initialState } from "react";
import userService from "../../../../../service/userService";
import "./AddCategory.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function AddPublisher({ success, onChange }) {
  //data to send
  const [name, setName] = useState(initialState)

  const uploadCategory = () => {
    return userService.uploadCategory({ name: name }).then((res) => {
      onChange(!success)
    }, (err) => {
      console.log(err)
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
        </div>
      </div>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          uploadCategory();
        }}
      >
        Terminer
      </Button>
    </>
  );
}
