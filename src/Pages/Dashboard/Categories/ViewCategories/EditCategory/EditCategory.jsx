import React, { useState, initialState, useEffect } from "react";
import userService from "../../../../../service/userService";
import "./EditCategory.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function EditCategory({ id, success, onChange }) {
  //data to send
  const [name, setName] = useState(null)
  const updateCategory = (id) => {
    return userService.updateCategory(id, { name: name }).then((res) => {
      onChange(!success)
    }, (err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    userService.getCategoryById(id).then((res) => {
      setName(res?.data?.data?.name)
    })
  }, [])

  useEffect(() => { }, [name])

  return (
    <>
      <div className="addbook-container">
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
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          updateCategory(id);
        }}
      >
        Terminer
      </Button>
    </>
  );
}
