import React from 'react'
import './UserList.css'
import { DataGrid } from '@mui/x-data-grid';


export default function UserList() {

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'username', headerName: 'Username', width: 200 },
        { field: 'firstName', headerName: 'First name', width: 200 },
        { field: 'lastName', headerName: 'Last name', width: 200 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'verified', headerName: 'Verified', width: 300 },
    ];

    const rows = [
        { id: 1, username: "BruhBuyaXD", firstName: 'Snow', lastName: 'Jon', email: "bruh@420.com", verified: "Yes" },
        { id: 2, username: "BruhBuyaXD", firstName: 'Lannister', lastName: 'Cersei', email: "bruh@420.com", verified: "Yes" },
        { id: 3, username: "BruhBuyaXD", firstName: 'Lannister', lastName: 'Jaime', email: "bruh@420.com", verified: "Yes" },
        { id: 4, username: "BruhBuyaXD", firstName: 'Stark', lastName: 'Arya', email: "bruh@420.com", verified: "Yes" },
        { id: 5, username: "BruhBuyaXD", firstName: 'Targaryen', lastName: 'Daenerys', email: "bruh@420.com", verified: "Yes" },
        { id: 6, username: "BruhBuyaXD", firstName: 'Melisandre', lastName: "Man", email: "bruh@420.com", verified: "Yes" },
        { id: 7, username: "BruhBuyaXD", firstName: 'Clifford', lastName: 'Ferrara', email: "bruh@420.com", verified: "Yes" },
        { id: 8, username: "BruhBuyaXD", firstName: 'Frances', lastName: 'Rossini', email: "bruh@420.com", verified: "Yes" },
        { id: 9, username: "BruhBuyaXD", firstName: 'Roxie', lastName: 'Harvey', email: "bruh@420.com", verified: "Yes" },
    ];


    return (
        <div className="userList">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    )
}
