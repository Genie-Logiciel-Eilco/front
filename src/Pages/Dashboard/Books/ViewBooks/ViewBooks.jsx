import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import userService from '../../../../service/userService'
import AddBook from './AddBook/AddBook';
import Pagination from 'react-js-pagination';

import './ViewBooks.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function UserList() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [perPageInput, setPerPageInput] = useState(2)
    const [books, setBooks] = useState([])

    useEffect(() => {
        if (perPageInput) {
            userService.getBooks(perPageInput).then((res) => {
                setBooks(res?.data?.data)
            }, (err) => {
                console.log(err)
            })
        }
    }, [perPageInput])

    useEffect(() => {
    }, [books])

    const getBooksInPaginate = (pageNumber) => {
        userService.getBooksByPage(pageNumber, perPageInput).then((res) => {
            setBooks(res?.data?.data)
            console.log(res?.data?.data)
        }, (err) => {
            console.log(err)
        })
    }


    return (
        <div className="userList">
            <Button onClick={handleOpen}>Add Book</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddBook />
                </Box>
            </Modal>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ISBN</TableCell>
                        <TableCell>Titre</TableCell>
                        <TableCell align="center">Synopsis</TableCell>
                        <TableCell align="center">Disponible</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books?.data?.map(
                        (book, index) =>
                            <TableRow key={book.id}>
                                <TableCell>{book.isbn}</TableCell>
                                <TableCell>{book.name}</TableCell>
                                <TableCell align="center"><Tooltip disableFocusListener disableTouchListener title={book.synopsis}>
                                    <button style={{ background: "#000", borderRadius: "10px", width: "1vw", padding: "10px", border: "none" }}></button>
                                </Tooltip></TableCell>
                                <TableCell align="center">
                                    {book.isReady == 1 ? <span style={{ color: '#00c853' }}>Oui</span> : <span style={{ color: '#d50000' }}>Non</span>}
                                </TableCell>
                            </TableRow>
                    )}
                </TableBody>
            </Table>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span></span>
                <Pagination activePage={books?.currentPage}
                    totalItemsCount={books?.total}
                    itemsCountPerPage={books?.per_page}
                    onChange={(pageNumber) => { getBooksInPaginate(pageNumber) }}
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={books?.current_page}
                    firstPageText="First"
                    lastPageText="Last"
                />
                <input  type="text" className="per-page-input" defaultValue={perPageInput} value={perPageInput} onChange={(e) => {
                    if (e.target.value.match("^[0-9]+$") || !e.target.value) {
                        setPerPageInput(e.target.value)
                    }
                }} />
            </div>
        </div>
    )
}
