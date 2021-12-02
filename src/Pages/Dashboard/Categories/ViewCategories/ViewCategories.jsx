import React, { useState, useEffect, initialState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import userService from "../../../../service/userService";
import AddCategory from "./AddCategory/AddCategory";
import EditCategory from "./EditCategory/EditCategory";
import Pagination from "react-js-pagination";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Snackbar from "@mui/material/Snackbar";
import "./ViewCategories.css";
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

export default function ViewCategories() {

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
  const [categories, setCategories] = useState(initialState);
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
      userService.getCategoriesInPaginate(perPageInput).then((res) => {
        setCategories(res?.data?.data)
        console.log(res?.data?.data)
      })
    }
  }, [perPageInput, success]);

  useEffect(() => { }, [categories, success]);

  const getCategoriesInPaginate = (pageNumber) => {
    userService.getCategoriesByPage(pageNumber, perPageInput).then(
      (res) => {
        setCategories(res?.data?.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const deleteCategory = (id) => {
    console.log(id)
    return userService.deleteCategory(id).then(
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
        Ajouter une catégorie
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddCategory
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
          <EditCategory
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
            <TableCell align="center">Modifier</TableCell>
            <TableCell align="center">Supprimer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.data?.map((category, index) => (
            <TableRow key={index}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => {
                    setEditId(category.id);
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
                    deleteCategory(category.id);
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
          activePage={categories?.currentPage}
          totalItemsCount={categories?.total}
          itemsCountPerPage={parseInt(categories?.per_page)}
          onChange={(pageNumber) => {
            getCategoriesInPaginate(pageNumber);
          }}
          itemClass="page-item"
          linkClass="page-link"
          activePage={categories?.current_page}
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
