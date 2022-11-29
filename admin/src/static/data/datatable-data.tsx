import {GridColDef} from '@mui/x-data-grid'

export const ordersColumns: GridColDef[] = [
    {
        field: "_id",
        headerName: "Order ID",
        width: 250
    },
    {
        field: "amount",
        headerName: "$Amount",
        width: 100,
    },
    {
        field: "userId",
        headerName: "User ID",
        width: 150,
    },
    {
        field: "status",
        headerName: "Status",
        width: 100,
    },
    {
        field: "createdAt",
        headerName: "Created",
        width: 250,
    },
]

export const userColumns: GridColDef[] = [
    {
        field: "_id",
        headerName: "ID",
        width: 120
    },
    {
        field: "username",
        // field: "user",
        headerName: "User",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.profilePic} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },
    {
        field: "isAdmin",
        headerName: "Admin",
        width: 120,
    },
    {
        field: "status",
        headerName: "Status",
        width: 160,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            );
        },
    },
]
