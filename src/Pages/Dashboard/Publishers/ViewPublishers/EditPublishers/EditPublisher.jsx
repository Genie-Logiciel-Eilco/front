import React, { useState, initialState, useEffect } from "react";
import userService from "../../../../../service/userService";
import "./EditPublisher.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function EditPublisher({ id, success, onChange }) {
  //data to send
  const [data, setData] = useState({
    name: null,
    description: null,
    foundationDate: null
  })

  const updatePublisher = (id) => {
    return userService.updatePublisher(id, data).then((res) => {
      onChange(!success)
    }, (err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    userService.getPublisherById(id).then((res) => {
      setData({
        name: res?.data?.data?.name,
        description: res?.data?.data?.description,
        foundationDate: res?.data?.data?.foundationDate
      })
    })
  }, [])

  useEffect(() => { }, [data])

  return (
    <>
      <div className="addbook-container">
        <div className="addbook-form">
          <div className="addbook-item">
            <label>Nom</label>
            <input
              type="text"
              className="addbook-text"
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            />
          </div>
          <div className="addbook-item">
            <label>Description</label>
            <TextareaAutosize
              minRows={3}
              value={data.description}
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
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
                value={data.foundationDate}
                style={{ marginRight: "10px" }}
                onChange={(e) => {
                  if (e) {
                    setData({ ...data, foundationDate: `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}` });
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
          updatePublisher(id);
        }}
      >
        Terminer
      </Button>
    </>
  );
}
