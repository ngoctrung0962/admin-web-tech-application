import "./CouponList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import couponApi from "../../api/couponApi";
import { showNotification } from "../../utils/showNotification";

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
  // format date to yyyy-mm-dd
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
  const handleDelete = async (id) => {
    try {
      await couponApi.remove(id);
      showNotification('success', 'Delete coupon succes', '', 'OK');
      setData(data.filter((item) => item.couponId !== id));
      console.log(data);
    } catch (error) {
      showNotification('error', 'Delete coupon fail', '', 'OK');
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
        return (
          <div className="userListUser">
            {formatDate(params.row.expiredTime)}
          </div>
        );
      },
    },
    {
      field: "effectiveTime",
      headerName: "EffectiveTime",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {formatDate(params.row.effectiveTime)}
          </div>
        );
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
        />
      ) : (
        <div>No data</div>
      )}
    </div>
  );
}
