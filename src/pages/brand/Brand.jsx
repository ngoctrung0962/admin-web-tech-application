import { Link } from "react-router-dom";
import "./brand.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import brandApi from "../../api/brandApi";
import { showNotification } from "../../utils/showNotification";

export default function Brand() {
  const location = useLocation();
  const brandId = location.pathname.split("/")[2];
  const [brand, setBrand] = useState();
  const initValue = { name: "", email: "", logo: "", location: "" };

  const [formvalues, setFormvalues] = useState({
    name: "",
    email: "",
    logo: "",
    location: "",
  });
  useEffect(() => {
    setFormvalues({
      name: brand && brand.name,
      email: brand && brand.email,
      logo: brand && brand.logo,
      location: brand && brand.location,
    });
  }, [brand]);
  console.log("a", formvalues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await brandApi.update(formvalues, brandId);
      setBrand(res);
      showNotification('success', 'Great', 'Update successful', 'OK')
    } catch (error) {
      showNotification('error', 'Oh no', 'Update fail', 'OK')
    }

  };
  //get brand
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await brandApi.get(`${brandId}`);
        setBrand(res);
        console.log(res);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [brandId]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Brand</h1>
        <Link to="/newbrand">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{brand ? brand.name : ""}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">
                {brand ? brand.brandId : ""}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Email:</span>
              <span className="productInfoValue">
                {brand ? brand.email : ""}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Logo:</span>
              <span className="productInfoValue">
                {brand ? brand.logo : ""}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Location:</span>
              <span className="productInfoValue">
                {brand ? brand.location : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label>Brand Name</label>
            <input
              type="text"
              placeholder={brand ? brand.name : ""}
              name="name"
              value={formvalues.name}
              onChange={handleChange}
              required
            />
            <label>Brand Email</label>
            <input
              type="text"
              placeholder={brand ? brand.email : ""}
              name="email"
              value={formvalues.email}
              onChange={handleChange}
              required
            />
            <label>Brand Logo</label>
            <input
              type="text"
              placeholder={brand ? brand.logo : ""}
              name="logo"
              value={formvalues.logo}
              onChange={handleChange}
              required
            />
            <label>Brand Location</label>
            <input
              type="text"
              placeholder={brand ? brand.location : ""}
              name="location"
              value={formvalues.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button type="submit" className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
