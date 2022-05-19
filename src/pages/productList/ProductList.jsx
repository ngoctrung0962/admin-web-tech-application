import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import { showNotification } from "../../utils/showNotification";

export default function ProductList() {
  const formatDate = (date) => {
    var d = new Date(date),
      month =
        "" + (d.getMonth() + 1) > 9
          ? d.getMonth() + 1
          : "0" + (d.getMonth() + 1),
      day = "" + d.getDate() > 9 ? d.getDate() : "0" + d.getDate(),
      year = d.getFullYear();
    return [year, month, day].join("-");
  };
  const [data, setData] = useState([]);

  const handleDelete = async (id) => {
    try {
      const res = await productApi.remove(id)
      if (!res.status || res.status === 200) {
        showNotification('success', 'Great', 'Delete product successful', 'OK')
        const dataFilter = data.filter(item => item.productId !== id)
        setData(dataFilter)
      }
      else {
        showNotification('error', 'Oh no', 'Delete product fail', 'OK')
      }

    } catch (error) {

    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productApi.getAll();
        setData(res)
        console.log("ListProduct", res)
        window.scrollTo(0, 0)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])


  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.productId}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.productId)}
            />
          </>
        );
      }
    },
    {
      field: "productId", headerName: "ID", width: 90,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.productId ? params.row.productId : "null"}
          </div>
        );
      },
    },
    {
      field: "name", headerName: "Name", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.name ? params.row.name : "null"}
          </div>
        );
      },
    },
    {
      field: "category", headerName: "Category", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.category.name ? params.row.category.name : "null"}
          </div>
        );
      },
    },
    {
      field: "brand", headerName: "Brand", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.brand.name ? params.row.brand.name : "null"}
          </div>
        );
      },
    },
    {
      field: "image", headerName: "Image", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.image ? params.row.image : "null"}
          </div>
        );
      },
    },
    {
      field: "quantity", headerName: "Quantity", width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.quantity ? params.row.quantity : "null"}
          </div>
        );
      },
    },
    {
      field: "saleDate", headerName: "Sale Date", width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.saleDate ? formatDate(params.row.saleDate) : "null"}
          </div>
        );
      },
    },
    {
      field: "ram", headerName: "RAM", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.ram ? params.row.ram : "null"}
          </div>
        );
      },
    },
    {
      field: "rom", headerName: "ROM", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.rom ? params.row.rom : "null"}
          </div>
        );
      },
    },
    {
      field: "frontCam", headerName: "Front Cam", width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.frontCam ? params.row.frontCam : "null"}
          </div>
        );
      },
    },
    {
      field: "backCam", headerName: "Back Cam", width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.backCam ? params.row.backCam : "null"}
          </div>
        );
      },
    },
    {
      field: "os", headerName: "OS", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.os ? params.row.os : "null"}
          </div>
        );
      },
    },
    {
      field: "screen", headerName: "Screen", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.screen ? params.row.screen : "null"}
          </div>
        );
      },
    },
    {
      field: "cpu", headerName: "CPU", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.cpu ? params.row.cpu : "null"}
          </div>
        );
      },
    },
    {
      field: "battery", headerName: "Battery", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.battery ? params.row.battery : "null"}
          </div>
        );
      },
    },
    {
      field: "weight", headerName: "Weight", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.weight ? params.row.weight : "null"}
          </div>
        );
      },
    },
    {
      field: "vga", headerName: "VGA", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.vga ? params.row.vga : "null"}
          </div>
        );
      },
    },
    {
      field: "price", headerName: "Price", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.price ? params.row.price : "null"}
          </div>
        );
      },
    }

    // {
    //   field: "product",
    //   headerName: "Product",
    //   width: 200,
    // renderCell: (params) => {
    //   return (
    //     <div className="productListItem">
    //       <img className="productListImg" src={params.row.img} alt="" />
    //       {params.row.name}
    //     </div>
    //   );
    // },
    // },
    // { field: "stock", headerName: "Stock", width: 200 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    // {
    //   field: "price",
    //   headerName: "Price",
    //   width: 160,
    // },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={"/product/" + params.row.id}>
    //           <button className="productListEdit">Edit</button>
    //         </Link>
    //         <DeleteOutline
    //           className="productListDelete"
    //           onClick={() => handleDelete(params.row.id)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <div className="productList">
      <Link to="/newproduct">
        <button className="productAddButton ">Create</button>
      </Link>
      {data.length ? (<DataGrid
        // rowHeight={65}
        // headerHeight={75}
        getRowId={(row) => row.productId}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
      />) : <>No Data</>}

    </div>
  );
}
