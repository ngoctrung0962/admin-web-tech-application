import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import "./orders.css";
import categoryApi from '../../api/categoryApi';
import ordersApi from '../../api/ordersApi';
import { showNotification } from '../../utils/showNotification';

export default function OrdersList() {

    const user = useSelector(state => state.user.currentUser);
    let history = useHistory();
    const [data, setData] = useState([]);

    useEffect(async () => {
        try {
            if (user) {
                const res = await ordersApi.getAll();
                if (res !== null && res !== undefined) {
                    setData(res);
                    console.log(res);
                }
                window.scrollTo(0, 0);
            }
            else {
                history.push('/signin');
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() =>{
        if(!user){
            history.push('/signin');
        }
    }, [user])

    const handleDelete = async(id) => {
        const res = await ordersApi.remove(id);
        if(res !== undefined && res !== null){
            showNotification('success', 'Great', 'Delete Category successful', 'OK');
            const newData = await ordersApi.getAll();
            if(newData !== undefined && newData !== null){
                setData(newData);
            }
        }
    };

   

    const columns = [
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={'/order/' + params.row.orderId}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.orderId)}
                        />
                    </>
                );
            },
        },
        {
            field: "orderId",
            headerName: "ID",
            width: 100,
            renderCell: (params) => {
                return <span>{params.row.orderId}</span>;
            },
        },

        {
            field: "username",
            headerName: "Username",
            width: 140,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.user.username}</div>;
            },
        },
        {
            field: "name",
            headerName: "Name",
            width: 200,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.name}</div>;
            },
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.status}</div>;
            },
        },
        {
            field: "totalPrices",
            headerName: "TotalPrices",
            width: 200,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.totalPrices}</div>;
            },
        },
        {
            field: "phoneNumber",
            headerName: "Phone",
            width: 150,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.phoneNumber}</div>;
            },
        },
        {
            field: "address",
            headerName: "Address",
            width: 300,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.address}</div>;
            },
        },
        {
            field: "purchaseDate",
            headerName: "PurchaseDate",
            width: 200,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.purchaseDate}</div>;
            },
        },
        {
            field: "couponId",
            headerName: "CouponID",
            width: 140,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.couponId}</div>;
            },
        },
        {
            field: "discountPrice",
            headerName: "Discount",
            width: 150,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.discountPrice}</div>;
            },
        },
        {
            field: "deliveryId",
            headerName: "DeliveryID",
            width: 150,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.delivery.deliveryId}</div>;
            },
        },
    ];

    return (
        <div className="userList">
            <Link to="">
                <button className="userAddButton">Create</button>
            </Link>
            {data?.length && (
                <DataGrid
                    rows={data}
                    disableSelectionOnClick
                    columns={columns}
                    getRowId={(row) => row.orderId}
                    pageSize={10}
                    checkboxSelection
                />
            )}
        </div>
    );
}
