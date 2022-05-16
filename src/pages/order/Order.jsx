import { useLocation, useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import "./order.css";
import categoryApi from '../../api/categoryApi';
import ordersApi from '../../api/ordersApi';
import orderDetailApi from '../../api/orderDetailApi';
import { showNotification } from '../../utils/showNotification';

export default function Order() {

    const user = useSelector(state => state.user.currentUser);
    let history = useHistory();
    const location = useLocation();
    const orderId = location.pathname.split("/")[2];
    const [order, setOrder] = useState('');
    const [orderDetails, setOrderDetails] = useState([]);
    const [formvalues, setFormvalues] = useState({ orderId: orderId, name: "" });

    useEffect(async () => {
        if (user) {
            const res = await ordersApi.getById(orderId);
            if (res !== null && res !== undefined) {
                const orderDetails = await orderDetailApi.getById(orderId);
                console.log(orderDetails)
                res ? setOrderDetails(orderDetails): console.log(res);
                setOrder(res);
            }
        }
        else {
            history.push('/signin');
        }
    }, [])

    useEffect(() => {
        if (!user) {
            history.push('/signin');
        }
    }, [user])

    useEffect(() => {
        setFormvalues({
            order
        })
    }, [order])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormvalues({ ...order, [name]: value });
        //console.log(formvalues);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await ordersApi.update(order.orderId, order.user.username, formvalues)
        if (res !== undefined && res !== null) {
            setOrder(res);
            showNotification('success', 'Great', 'Update Category successful', 'OK')
        }
    };

    const columns = [
        {
            field: "orderId",
            headerName: "ID",
            width: 100,
            renderCell: (params) => {
                return <span>{params.row.id.orderId}</span>;
            },
        },
        {
            field: "productId",
            headerName: "ProductID",
            width: 150,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.product.productId}</div>;
            },
        },
        {
            field: "productName",
            headerName: "ProductName",
            width: 250,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.product.name}</div>;
            },
        },
        {
            field: "quantity",
            headerName: "Quantity",
            width: 130,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.quantity}</div>;
            },
        },
        {
            field: "price",
            headerName: "Price",
            width: 150,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.price}</div>;
            },
        },
        {
            field: "totalPrice",
            headerName: "TotalPrice",
            width: 200,
            renderCell: (params) => {
                return <div className="userListUser">{params.row.totalPrice}</div>;
            },
        }
    ];

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Order</h1>
            </div>

            <div className="productTop">
                <div className="productTopLeft">
                    <div className="productTopRight">
                        <div className="productInfoItem">
                            <span className="productInfoKey">OrderID:</span>
                            <span className="productInfoValue">{order ? order.orderId : ""}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Username:</span>
                            <span className="productInfoValue">{order ? order.user.username : ""}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Name:</span>
                            <span className="productInfoValue">{order ? order.name : ""}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">PhoneNumber:</span>
                            <span className="productInfoValue">{order ? order.phoneNumber : ""}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Address:</span>
                            <span className="productInfoValue">{order ? order.address : ""}</span>
                        </div>
                    </div>
                </div>
                <div className="productTopRight">
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Status:</span>
                            <span className="productInfoValue">{order ? order.status : ""}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">TotalPrice</span>
                            <span className="productInfoValue">{order ? order.totalPrices : ""}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">PurchaseDate:</span>
                            <span className="productInfoValue">{order ? order.purchaseDate : ""}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">CouponID:</span>
                            <span className="productInfoValue">{order.couponId ? order.couponId : "No coupon"}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">DiscountPrice:</span>
                            <span className="productInfoValue">{order.discountPrice !== 0 ? `-${order.discountPrice}` : 0}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">DeliveryID:</span>
                            <span className="productInfoValue">{order ? order.delivery.deliveryId : ""}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="productBottom">
                <form className="productForm" >
                    <div className="productFormLeft">
                        <label>Status</label>
                        <input
                            type="text"
                            placeholder={""}
                            name="status"
                            value={formvalues.status}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </form>
                <button onClick={handleSubmit} className="productAddButton">Edit</button>
            </div>
            <br></br>

            <div className="productTitleContainer">
                <h3 className="productTitle">OrderDetails</h3>
            </div>
            <br></br>
            {orderDetails?.length && (
                    <DataGrid
                            rows={orderDetails}
                            disableSelectionOnClick
                            columns={columns}
                            getRowId={(row) => row.id.productId}
                            pageSize={10}
                        />
                )}
        </div>


    );
}
