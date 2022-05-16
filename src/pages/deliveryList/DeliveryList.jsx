import "./deliveryList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import brandApi from "../../api/brandApi";
import deliveryApi from "../../api/deliveryApi";

export default function DeliveryList() {
  const [data, setData] = useState([]);
  const handleDelete = async (id) => {
    try {
      await deliveryApi.remove(id)
      window.alert("Delete delivery succes")
      const dataFilter = data.filter(item => item.deliveryId !== id)
      setData(dataFilter)
    } catch (error) {
      window.alert("Delete delivery fail!")
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
            <Link to={"/delivery/" + params.row.deliveryId}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.deliveryId)}
            />
          </>
        );
      },
    },
    { field: "deliveryId", headerName: "ID", width: 90 },
    {
      field: "name", headerName: "Name", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem" >
            {params.row.name ? params.row.name : "null"}
          </div >
        );
      },
    },
    {
      field: "email", headerName: "Email", width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem" >
            {params.row.email ? params.row.email : "null"}
          </div >
        );
      },
    },
    {
      field: "phoneNumber", headerName: "Phone", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem" >
            {params.row.phoneNumber ? params.row.phoneNumber : "null"}
          </div >
        );
      },
    },
    {
      field: "location", headerName: "Location", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem" >
            {params.row.location ? params.row.location : "null"}
          </div >
        );
      },
    }

  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await deliveryApi.getAll();
        setData(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])
  console.log(data)


  return (
    <div className="productList">
      <Link to="/newDelivery">
        <button className="productAddButton ">Create</button>
      </Link>
      {data?.length && (<DataGrid
        rowHeight={65}
        headerHeight={75}
        getRowId={(row) => row.deliveryId}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
      />)}

    </div>
  );
}
