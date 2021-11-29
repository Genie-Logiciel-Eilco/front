import React, { useState, useEffect, initialState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@mui/material/Tooltip";
import userService from "../../../../service/userService";
import AddPublisher from "./AddPublishers/AddPublisher";
import EditPublisher from "./EditPublishers/EditPublisher";
import Pagination from "react-js-pagination";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Snackbar from "@mui/material/Snackbar";
import "./ViewPublishers.css";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ViewPublishers() {

  const [id, setId] = useState()
  //addauthor modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //editauthor modal
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [editId, setEditId] = useState()

  const [perPageInput, setPerPageInput] = useState(2);
  const [publishers, setPublishers] = useState(initialState);
  const [success, setSuccess] = useState(false);

  //snackies
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (perPageInput) {
      userService.getPublishersInPaginate(perPageInput).then((res) => {
        setPublishers(res?.data?.data)
        console.log(res?.data?.data)
      })
    }
  }, [perPageInput, success]);

  useEffect(() => { }, [publishers, success]);

  const getPublishersInPaginate = (pageNumber) => {
    userService.getPublishersByPage(pageNumber, perPageInput).then(
      (res) => {
        setPublishers(res?.data?.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const deletePublisher = (id) => {
    console.log(id)
    return userService.deletePublisher(id).then(
      (res) => {
        setSuccess(!success)
        setMessage("Suppression avec succès");
        setSeverity("success");
        setOpenSnackbar(true);
      },
      (err) => {
        console.log(err)
        setSeverity("error");
        setMessage("Erreur dans la suppression");
        setOpenSnackbar(true);
      }
    );
  };

  return (
    <div className="userList">
      <Button
        variant="contained"
        style={{ margin: "10px 20px", alignSelf: "flex-end" }}
        onClick={handleOpen}
      >
        Ajouter un éditeur
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddPublisher
            success={success}
            onChange={(value) => {
              setSuccess(value);
              setSeverity("success");
              setOpen(false);
              setMessage("Livre ajouté avec succès");
              setOpenSnackbar(true);
            }}
          />
        </Box>
      </Modal>
      <Modal open={open2} onClose={handleClose2}>
        <Box sx={style}>
          <EditPublisher
            id={editId}
            success={success}
            onChange={(value) => {
              setSuccess(value);
              setSeverity("success");
              setOpen2(false);
              setMessage("Auteur modifié avec succès");
              setOpenSnackbar(true);
            }}
          />
        </Box>
      </Modal>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Date de création</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Modifier</TableCell>
            <TableCell align="center">Supprimer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {publishers?.data?.map((publisher, index) => (
            <TableRow key={index}>
              <TableCell>{publisher.id}</TableCell>
              <TableCell>{publisher.name}</TableCell>
              <TableCell>{publisher.foundationDate}</TableCell>
              <TableCell align="center">
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title={publisher.description}
                >
                  <button
                    style={{
                      background: "gray",
                      borderRadius: "10px",
                      width: "1vw",
                      padding: "10px",
                      border: "none",
                    }}
                  ></button>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => {
                    setEditId(publisher.id);
                    handleOpen2()
                  }}
                >
                  <EditIcon color="warning" />
                </Button>
              </TableCell>
              <TableCell align="center">
                {" "}
                <Button
                  onClick={() => {
                    deletePublisher(publisher.id);
                    setSuccess(!success);
                  }}
                >
                  <ClearIcon color="error" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: '10px' }}>
        <span></span>
        <Pagination
          activePage={publishers?.currentPage}
          totalItemsCount={publishers?.total}
          itemsCountPerPage={parseInt(publishers?.per_page)}
          onChange={(pageNumber) => {
            getPublishersInPaginate(pageNumber);
          }}
          itemClass="page-item"
          linkClass="page-link"
          activePage={publishers?.current_page}
          firstPageText="Première"
          lastPageText="Dernière"
        />
        <input
          type="text"
          className="per-page-input"
          value={perPageInput}
          onChange={(e) => {
            if (e.target.value.match("^[0-9]+$") || !e.target.value) {
              setPerPageInput(e.target.value);
            }
          }}
        />
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
