import "./CouponList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import couponApi from "../../api/couponApi";

export default function CouponList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await couponApi.getAll();
        setData(res);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await couponApi.remove(id);
      window.alert("Delete coupon succes");
      setData(data.filter((item) => item.couponId !== id));
      console.log(data);
    } catch (error) {
      window.alert("Delete coupon fail!");
    }
  };
  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 100,
      renderCell: (params) => {
        return <span>{params.id}</span>;
      },
    },
    {
      field: "couponId",
      headerName: "CouponId",
      width: 150,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.couponId}</div>;
      },
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 170,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.discount}</div>;
      },
    },
    {
      field: "expiredTime",
      headerName: "ExpiredTime",
      width: 170,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.expiredTime}</div>;
      },
    },
    {
      field: "effectiveTime",
      headerName: "EffectiveTime",
      width: 170,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.effectiveTime}</div>;
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.description}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/coupon/" + params.row.couponId}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.couponId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Link to="/newcoupon">
        <button className="userAddButton">Create</button>
      </Link>
      {data.length ? (
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row.couponId}
          pageSize={10}
          checkboxSelection
        />
      ) : (
        <div>No data</div>
      )}
    </div>
  );
}
