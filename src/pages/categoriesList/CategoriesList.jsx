import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import "./categories.css";
import categoryApi from '../../api/categoryApi';
import { showNotification } from '../../utils/showNotification';

export default function CategoriesList() {

    const user = useSelector(state => state.user.currentUser);
    let history = useHistory();
    const [data, setData] = useState([]);

    useEffect(async () => {
        try {
            if (user) {
                const res = await categoryApi.getAll();
                if (res !== null && res !== undefined) {
                    setData(res);
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
        const res = await categoryApi.remove(id);
        if(res !== undefined && res !== null){
            showNotification('success', 'Great', 'Delete Category successful', 'OK');
            const newData = await categoryApi.getAll();
            if(newData !== undefined && newData !== null){
                setData(newData);
            }
        }
    };

    const columns = [
        {
            field: "categoryId",
            headerName: "ID",
            width: 300,
            renderCell: (params) => {
                return <span>{params.row.categoryId}</span>;
            },
        },
        {
            field: "name",
            headerName: "Category Name",
            width: 400,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.name}</div>;
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={'/category/' + params.row.categoryId}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.categoryId)}
                        />
                    </>
                );
            },
        }
    ];

    return (
        <div className="userList">
            <Link to="/newcategory">
                <button className="userAddButton">Create</button>
            </Link>
            {data?.length && (
                <DataGrid
                    rows={data}
                    disableSelectionOnClick
                    columns={columns}
                    getRowId={(row) => row.categoryId}
                    pageSize={10}
                    checkboxSelection
                />
            )}
        </div>
    );
}
