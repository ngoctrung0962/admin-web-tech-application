import "./categories.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import { getAllCategories, getCategory, insertCategory, deleteCategory, updateCategories } from '../../api/categoriesApi'

export default function CategoriesList() {

    const user = useSelector(state => state.user.currentUser);
    let history = useHistory();
    const [data, setData] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            try {
                if (user) {
                    const res = await getAllCategories();
                    if(res !== null && res !== undefined) {
                        setData(res);
                    }
                    window.scrollTo(0, 0);
                }
                else {
                    history.push('/signin')
                }
            } catch (error) {
                console.log(error);
            }
        }
    
        fetchData();

    }, []);

    useEffect(() => {
        console.log(data);
    }, [data])

    const handleDelete = (id) => {
        setData(data.filter((item) => item.categoryId !== id));
    };

    const columns = [
        {
            field: "categoryId",
            headerName: "ID",
            width: 300,
            renderCell: (params) => {
                return <span>{params.id + 1}</span>;
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
                        <Link to={"/categories/" + params.row.categoryId}>
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
            <Link to="/newuser">
                <button className="userAddButton">Create</button>
            </Link>
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row.categoryId}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}
