import React from 'react'

import { DataGrid } from '@mui/x-data-grid';


export default function UserList() {

    const columns = [
        { field: 'id', headerName: 'ISBN', width: 100 },
        { field: 'name', headerName: 'Nom', width: 200 },
        { field: 'subject', headerName: 'Sujet', width: 200 },
        { field: 'synopsis', headerName: 'Synopsis', width: 200 },
        { field: 'publicationDate', headerName: 'Date de publication', width: 300 },
        { field: 'counter', headerName: 'Vues', width: 300 },
    ];

    const rows = [
        { id: "83131A", name: "Livre", subject: 'Snow', synopsis: 'Ce roman parle d\'un pecheur et son', publicationDate: "03/01/1987", counter: 4 },
        { id: "0912ej01", name: "Livre", subject: 'Lannister', synopsis: 'Ce roman parle d\'un pecheur et son', publicationDate: "03/01/1987", counter: 4 },
        { id: "0912ej01", name: "Livre", subject: 'Lannister', synopsis: 'Ce roman parle d\'un pecheur et son', publicationDate: "03/01/1987", counter: 4 },
        { id: "0912ej01", name: "Livre", subject: 'Stark', synopsis: 'Ce roman parle d\'un pecheur et son', publicationDate: "03/01/1987", counter: 4 },
        { id: "0912ej01", name: "Livre", subject: 'Targaryen', synopsis: 'Ce roman parle d\'un pecheur et son', publicationDate: "03/01/1987", counter: 4 },
        { id: "0912ej01", name: "Livre", subject: 'Melisandre', synopsis: "Ce roman parle d\'un pecheur et son", publicationDate: "03/01/1987", counter: 4 },
        { id: "0912ej01", name: "Livre", subject: 'Clifford', synopsis: 'Ce roman parle d\'un pecheur et son', publicationDate: "03/01/1987", counter: 4 },
        { id: "0912ej01", name: "Livre", subject: 'Frances', synopsis: 'Ce roman parle d\'un pecheur et son', publicationDate: "03/01/1987", counter: 4 },
        { id: "0912ej01", name: "Livre", subject: 'Roxie', synopsis: 'Ce roman parle d\'un pecheur et son', publicationDate: "03/01/1987", counter: 4 },
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
