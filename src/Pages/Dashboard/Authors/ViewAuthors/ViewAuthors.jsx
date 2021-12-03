import React, { useState, useEffect } from "react";
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
import AddAuthor from "./AddAuthor/AddAuthor";
import EditAuthor from "./EditAuthor/EditAuthor";
import Pagination from "react-js-pagination";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Snackbar from "@mui/material/Snackbar";
import "./ViewAuthors.css";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ViewAuthors() {

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

  const [perPageInput, setPerPageInput] = useState(10);
  const [authors, setAuthors] = useState([]);
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
      userService.getAuthorsInPaginate(perPageInput).then(
        (res) => {
          setAuthors(res?.data?.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [perPageInput, success]);

  useEffect(() => { }, [authors, success]);

  const getAuthorsInPaginate = (pageNumber) => {
    userService.getAuthorsByPage(pageNumber, perPageInput).then(
      (res) => {
        setAuthors(res?.data?.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const deleteAuthor = (id) => {
    return userService.deleteAuthor(id).then(
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
        Ajouter un auteur
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddAuthor
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
          <EditAuthor
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
            <TableCell>Prénom</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Lieu de naissance</TableCell>
            <TableCell align="center">Biographie</TableCell>
            <TableCell align="center">Modifier</TableCell>
            <TableCell align="center">Supprimer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors?.data?.map((author, index) => (
            <TableRow key={index}>
              <TableCell>{author.id}</TableCell>
              <TableCell>{author.first_name}</TableCell>
              <TableCell>{author.last_name}</TableCell>
              <TableCell>
                {author.birthplace}
              </TableCell>
              <TableCell align="center">
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title={author.biography}
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
                    setEditId(author.id);
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
                    deleteAuthor(author.id);
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
          activePage={authors?.currentPage}
          totalItemsCount={authors?.total}
          itemsCountPerPage={parseInt(authors?.per_page)}
          onChange={(pageNumber) => {
            getAuthorsInPaginate(pageNumber);
          }}
          itemClass="page-item"
          linkClass="page-link"
          activePage={authors?.current_page}
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
