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
import Pagination from "react-js-pagination";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Snackbar from "@mui/material/Snackbar";
import "./ViewUsers.css";
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

export default function ViewUsers() {
  const [perPageInput, setPerPageInput] = useState(2);
  const [users, setUsers] = useState(initialState);
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
      userService.getUsers(perPageInput).then((res) => {
        setUsers(res?.data?.data?.data)
        console.log(res?.data?.data?.data)
      })
    }
  }, [perPageInput, success]);

  useEffect(() => { }, [users, success]);

  const getUsersInPaginate = (pageNumber) => {
    userService.getUsers(pageNumber, perPageInput).then(
      (res) => {
        setUsers(res?.data?.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const deleteUser = (id) => {
    console.log(id)
    return userService.deleteUser(id).then(
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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom d'utilisateur</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date de création</TableCell>
            <TableCell align="center">Supprimer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{`${new Date(user.created_at).getDate()}-${new Date(user.created_at).getMonth()}-${new Date(user.created_at).getFullYear()}`}</TableCell>
              <TableCell align="center">
                {" "}
                <Button
                  onClick={() => {
                    deleteUser(user.id);
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
          activePage={users?.currentPage}
          totalItemsCount={users?.total}
          itemsCountPerPage={parseInt(users?.per_page)}
          onChange={(pageNumber) => {
            getUsersInPaginate(pageNumber);
          }}
          itemClass="page-item"
          linkClass="page-link"
          activePage={users?.current_page}
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
