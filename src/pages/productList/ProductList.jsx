import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";

export default function ProductList() {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productApi.getAll();
        // setData(res)
        console.log(res)
        window.scrollTo(0, 0)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])


  const columns = [

    { field: "productId", headerName: "ID", width: 90 },
    // { field: "name", headerName: "Name", width: 90 },
    // { field: "category", headerName: "Category", width: 90 },
    // { field: "brand", headerName: "Brand", width: 90 },
    // { field: "price", headerName: "Price", width: 90 },
    // { field: "image", headerName: "Image", width: 90 },
    // { field: "quantity", headerName: "Quantity", width: 90 },
    // { field: "saleDate", headerName: "Sale Date", width: 90 },
    // { field: "ram", headerName: "RAM", width: 90 },
    // { field: "rom", headerName: "ROM", width: 90 },
    // { field: "frontCam", headerName: "Front Cam", width: 90 },
    // { field: "backCam", headerName: "Back Cam", width: 90 },
    // { field: "os", headerName: "OS", width: 90 },
    // { field: "screen", headerName: "Screen", width: 90 },
    // { field: "stock", headerName: "CPU", width: 90 },
    // { field: "stock", headerName: "Battery", width: 90 },
    // { field: "stock", headerName: "Weight", width: 90 },


    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
