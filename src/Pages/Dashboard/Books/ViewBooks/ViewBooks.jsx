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
import AddBook from "./AddBook/AddBook";
import EditBook from "./EditBook/EditBook";
import Pagination from "react-js-pagination";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Snackbar from "@mui/material/Snackbar";
import "./ViewBooks.css";
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

export default function ViewBooks() {

  const [editUuid, setEditUuid] = useState()
  //addbook modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //editbook modal
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [perPageInput, setPerPageInput] = useState(10);
  const [books, setBooks] = useState([]);
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
      userService.getBooks(perPageInput).then(
        (res) => {
          setBooks(res?.data?.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [perPageInput, success]);

  useEffect(() => { }, [books, success]);

  const getBooksInPaginate = (pageNumber) => {
    userService.getBooksByPage(pageNumber, perPageInput).then(
      (res) => {
        setBooks(res?.data?.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const deleteBook = (uuid) => {
    return userService.deleteBook(uuid).then(
      (res) => {
        setSuccess(!success)
        setMessage("Suppression avec succ??s");
        setSeverity("success");
        setOpenSnackbar(true);
      },
      (err) => {
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
        Ajouter un livre
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddBook
            success={success}
            onChange={(value) => {
              setSuccess(value);
              setSeverity("success");
              setOpen(false);
              setMessage("Livre ajout?? avec succ??s");
              setOpenSnackbar(true);
            }}
          />
        </Box>
      </Modal>
      <Modal open={open2} onClose={handleClose2}>
        <Box sx={style}>
          <EditBook
            uuid={editUuid}
            success={success}
            onChange={(value) => {
              setSuccess(value);
              setSeverity("success");
              setOpen2(false);
              setMessage("Livre modifi?? avec succ??s");
              setOpenSnackbar(true);
            }}
          />
        </Box>
      </Modal>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ISBN</TableCell>
            <TableCell>Titre</TableCell>
            <TableCell align="center">Synopsis</TableCell>
            <TableCell align="center">Disponible</TableCell>
            <TableCell align="center">Modifier</TableCell>
            <TableCell align="center">Supprimer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books?.data?.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell align="center">
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title={book.synopsis}
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
                {book.isReady === 1 ? (
                  <span style={{ color: "#00c853" }}>Oui</span>
                ) : (
                  <span style={{ color: "#d50000" }}>Non</span>
                )}
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => {
                    setEditUuid(book.id);
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
                    deleteBook(book.id);
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
          activePage={books?.currentPage}
          totalItemsCount={books?.total}
          itemsCountPerPage={parseInt(books?.per_page)}
          onChange={(pageNumber) => {
            getBooksInPaginate(pageNumber);
          }}
          itemClass="page-item"
          linkClass="page-link"
          activePage={books?.current_page}
          firstPageText="Premi??re"
          lastPageText="Derni??re"
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
