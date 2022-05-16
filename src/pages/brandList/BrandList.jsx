import "./brandList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import brandApi from "../../api/brandApi";

export default function BrandList() {
  const [data, setData] = useState([]);
  const handleDelete = async (id) => {
    try {
      await brandApi.remove(id)
      window.alert("Delete brand succes")
      const dataFilter = data.filter(item => item.brandId !== id)
      setData(dataFilter)
    } catch (error) {
      window.alert("Delete brand fail!")
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
            <Link to={"/brand/" + params.row.brandId}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.brandId)}
            />
          </>
        );
      },
    },
    {
      field: "brandId", headerName: "ID", width: 90,
      renderCell: (params) => {
        return (
          <div className="productListItem" >
            {params.row.brandId ? params.row.brandId : "null"}
          </div >
        );
      },
    },
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
      field: "logo", headerName: "Logo", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem" >
            {params.row.logo ? params.row.logo : "null"}
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
        const res = await brandApi.getAll();
        setData(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])
  console.log(data)

  const datafake = [{ brandId: 'B01', name: 'Samsung', email: 'samsung@email.com', logo: 'link', location: 'Korea' },
  { brandId: 'B02', name: 'Apple', email: 'apple@gmail.com', logo: 'link ne', location: 'USA' }]


  return (
    <div className="productList">
      <Link to="/newbrand">
        <button className="productAddButton ">Create</button>
      </Link>
      {data?.length && (<DataGrid
        rowHeight={65}
        headerHeight={75}
        getRowId={(row) => row.brandId}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
      />)}

    </div>
  );
}
