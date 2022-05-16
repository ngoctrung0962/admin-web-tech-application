import { Link } from "react-router-dom";
import "./delivery.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import brandApi from "../../api/brandApi";
import deliveryApi from "../../api/deliveryApi";

export default function Delivery() {
    const location = useLocation();
    const deliveryId = location.pathname.split("/")[2];
    const [delivery, setDelivery] = useState()
    const [formvalues, setFormvalues] = useState({ name: "", email: "", phoneNumber: "", location: "" });
    useEffect(() => {
        setFormvalues({
            name: delivery && delivery.name,
            email: delivery && delivery.email,
            phoneNumber: delivery && delivery.phoneNumber,
            location: delivery && delivery.location
        })
    }, [delivery])
    console.log("a", formvalues)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormvalues({ ...formvalues, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await deliveryApi.update(formvalues, deliveryId)
        setDelivery(res)
        window.alert("Update succes!!")
    };
    //get brand
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await deliveryApi.get(`${deliveryId}`);
                setDelivery(res)
                console.log(res)
                window.scrollTo(0, 0)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [deliveryId])

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Delivery</h1>
                <Link to="/newdelivery">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={productData} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productInfoImg" />
                        <span className="productName">{delivery ? delivery.name : ""}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Id:</span>
                            <span className="productInfoValue">{delivery ? delivery.deliveryId : ""}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Email:</span>
                            <span className="productInfoValue">{delivery ? delivery.email : ""}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Phone:</span>
                            <span className="productInfoValue">{delivery ? delivery.phoneNumber : ""}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Location:</span>
                            <span className="productInfoValue">{delivery ? delivery.location : ""}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm" onSubmit={handleSubmit}>
                    <div className="productFormLeft">
                        <label>Delivery Name</label>
                        <input
                            type="text"
                            placeholder={delivery ? delivery.name : ""}
                            name="name"
                            value={formvalues.name}
                            onChange={handleChange}
                            required
                        />
                        <label>Delivery Email</label>
                        <input
                            type="text"
                            placeholder={delivery ? delivery.email : ""}
                            name="email"
                            value={formvalues.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Delivery Phone</label>
                        <input
                            type="text"
                            placeholder={delivery ? delivery.phoneNumber : ""}
                            name="phoneNumber"
                            value={formvalues.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        <label>Delivery Location</label>
                        <input
                            type="text"
                            placeholder={delivery ? delivery.location : ""}
                            name="location"
                            value={formvalues.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button type="submit" className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
