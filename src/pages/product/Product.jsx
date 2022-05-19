import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import brandApi from "../../api/brandApi";
import categoryApi from "../../api/categoryApi";
import { showNotification } from "../../utils/showNotification";

export default function Product() {
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

  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState();
  const [listbrands, setListbrands] = useState([]);
  const [listcategorys, setListcategorys] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = {
      name: formvalues.name,
      category: {
        categoryId: formvalues.categoryId,
      },
      brand: {
        brandId: formvalues.brandId,
      },
      image: formvalues.image,
      quantity: formvalues.quantity,
      saleDate: formvalues.saleDate,
      ram: formvalues.ram,
      rom: formvalues.rom,
      frontCam: formvalues.frontCam,
      backCam: formvalues.backCam,
      os: formvalues.os,
      screen: formvalues.screen,
      cpu: formvalues.cpu,
      battery: formvalues.battery,
      weight: formvalues.weight,
      vga: formvalues.vga,
      description: formvalues.description,
      price: formvalues.price,
    };
    try {
      const res = await productApi.update(formdata, productId);
      setProduct(res);
      showNotification("success", "Great", "Update successful", "OK");
    } catch (error) {
      showNotification("error", "Oh no", "Update fail", "OK");
    }
  };

  const [formvalues, setFormvalues] = useState({
    name: "",
    categoryId: "",
    brandId: "",
    image: "",
    quantity: "",
    saleDate: "",
    ram: "",
    rom: "",
    frontCam: "",
    backCam: "",
    os: "",
    screen: "",
    cpu: "",
    battery: "",
    weight: "",
    vga: "",
    description: "",
    price: "",
  });
  useEffect(() => {
    setFormvalues({
      name: product && product.name,
      categoryId: product && product.category.categoryId,
      brandId: product && product.brand.brandId,
      image: product && product.image,
      quantity: product && product.quantity,
      saleDate: product && product.saleDate,
      ram: product && product.ram,
      rom: product && product.rom,
      frontCam: product && product.frontCam,
      backCam: product && product.backCam,
      os: product && product.os,
      screen: product && product.screen,
      cpu: product && product.cpu,
      battery: product && product.battery,
      weight: product && product.weight,
      vga: product && product.vga,
      description: product && product.description,
      price: product && product.price,
    });
  }, [product]);
  console.log("v", formvalues);
  //get product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productApi.get(`${productId}`);
        await setProduct(res);
        console.log("r", res);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [productId]);
  //get all brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await brandApi.getAll();
        await setListbrands(res);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log("lisst", listbrands);

  //get all category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryApi.getAll();
        setListcategorys(res);
        window.scrollTo(0, 0);
        console.log("c", res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  };
  console.log(formvalues);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
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
            <span className="productName">
              {product ? product.name : "Null"}
            </span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id: </span>
              <span className="productInfoValue">
                {" "}
                {product ? product.productId : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Category: </span>
              <span className="productInfoValue">
                {" "}
                {product ? product.category.name : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Brand:</span>
              <span className="productInfoValue">
                {product ? product.brand.name : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Image:</span>
              <span className="productInfoValue">
                {product ? product.image : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Quantity:</span>
              <span className="productInfoValue">
                {product ? product.quantity : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Sale Date: </span>
              <span className="productInfoValue">
                {product ? formatDate(product.saleDate) : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Ram: </span>
              <span className="productInfoValue">
                {product ? product.ram + "GB" : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Rom: </span>
              <span className="productInfoValue">
                {product ? product.rom + "GB" : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Front camera: </span>
              <span className="productInfoValue">
                {product ? product.frontCam + "MB" : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Back camera: </span>
              <span className="productInfoValue">
                {product ? product.backCam + "MB" : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">OS: </span>
              <span className="productInfoValue">
                {product ? product.os : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Screen: </span>
              <span className="productInfoValue">
                {product ? product.screen + "inch" : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">CPU: </span>
              <span className="productInfoValue">
                {product ? product.cpu : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Battery: </span>
              <span className="productInfoValue">
                {product ? product.battery : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Weight: </span>
              <span className="productInfoValue">
                {product ? product.weight : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">VGA: </span>
              <span className="productInfoValue">
                {product ? product.vga : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Description: </span>
              <span className="productInfoValue">
                {product ? product.description : "Null"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price: </span>
              <span className="productInfoValue">
                {product
                  ? product.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                  : "Null"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form onSubmit={handleSubmit} className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              placeholder={product ? product.name : ""}
              name="name"
              value={
                formvalues.name === ""
                  ? product
                    ? product.name
                    : ""
                  : formvalues.name
              }
              onChange={handleChange}
              required
            />
            <label>Product Category</label>
            <select
              name="categoryId"
              id="categoryId"
              value={
                formvalues.categoryId === ""
                  ? product
                    ? product.category.categoryId
                    : "null"
                  : formvalues.categoryId
              }
              onChange={handleChange}
              option={product ? product.category.categoryId : "null"}
            >
              {listcategorys.map((category) => {
                return (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            <label>Product Brand</label>
            <select
              name="brandId"
              id="brandId"
              value={
                formvalues.brandId === ""
                  ? product
                    ? product.brand.brandId
                    : "null"
                  : formvalues.brandId
              }
              onChange={handleChange}
              option={product ? product.brand.brandId : "null"}
            >
              {listbrands.map((brand) => {
                return (
                  <option key={brand.brandId} value={brand.brandId}>
                    {brand.name}
                  </option>
                );
              })}
            </select>
            <label>Product Image</label>
            <input
              type="text"
              placeholder={product ? product.image : ""}
              name="image"
              value={
                formvalues.image === ""
                  ? product
                    ? product.image
                    : ""
                  : formvalues.image
              }
              onChange={handleChange}
              required
            />
            <label>Product Quantity</label>
            <input
              type="text"
              placeholder={product ? product.quantity : ""}
              name="quantity"
              value={
                formvalues.quantity === ""
                  ? product
                    ? product.quantity
                    : ""
                  : formvalues.quantity
              }
              onChange={handleChange}
              required
            />
            <label>Product Sale Date</label>
            <input
              type="date"
              // placeholder={product ? product.saleDate : ""}
              name="saleDate"
              value={
                formvalues.saleDate === ""
                  ? product
                    ? formatDate(product.saleDate)
                    : ""
                  : formatDate(formvalues.saleDate)
              }
              onChange={handleChange}
            />
          </div>
          <div className="productFormLeft">
            <label>Product RAM</label>
            <input
              type="text"
              placeholder={product ? product.ram : ""}
              name="ram"
              value={
                formvalues.ram === ""
                  ? product
                    ? product.ram
                    : ""
                  : formvalues.ram
              }
              onChange={handleChange}
              required
            />
            <label>Product ROM</label>
            <input
              type="text"
              placeholder={product ? product.rom : ""}
              name="rom"
              value={
                formvalues.rom === ""
                  ? product
                    ? product.rom
                    : ""
                  : formvalues.rom
              }
              onChange={handleChange}
              required
            />
            <label>Product Front Camera</label>
            <input
              type="text"
              placeholder={product ? product.frontCam : ""}
              name="frontCam"
              value={
                formvalues.frontCam === ""
                  ? product
                    ? product.frontCam
                    : ""
                  : formvalues.frontCam
              }
              onChange={handleChange}
              required
            />
            <label>Product Back Camera</label>
            <input
              type="text"
              placeholder={product ? product.backCam : ""}
              name="backCam"
              value={
                formvalues.backCam === ""
                  ? product
                    ? product.backCam
                    : ""
                  : formvalues.backCam
              }
              onChange={handleChange}
              required
            />
            <label>Product OS</label>
            <input
              type="text"
              placeholder={product ? product.os : ""}
              name="os"
              value={
                formvalues.os === ""
                  ? product
                    ? product.os
                    : ""
                  : formvalues.os
              }
              onChange={handleChange}
              required
            />
            <label>Product Screen</label>
            <input
              type="text"
              placeholder={product ? product.screen : ""}
              name="screen"
              value={
                formvalues.screen === ""
                  ? product
                    ? product.screen
                    : ""
                  : formvalues.screen
              }
              onChange={handleChange}
              required
            />
          </div>
          <div className="productFormLeft">
            <label>Product CPU</label>
            <input
              type="text"
              placeholder={product ? product.cpu : ""}
              name="cpu"
              value={
                formvalues.cpu === ""
                  ? product
                    ? product.cpu
                    : ""
                  : formvalues.cpu
              }
              onChange={handleChange}
              required
            />
            <label>Product Battery</label>
            <input
              type="text"
              placeholder={product ? product.battery : ""}
              name="battery"
              value={
                formvalues.battery === ""
                  ? product
                    ? product.battery
                    : ""
                  : formvalues.battery
              }
              onChange={handleChange}
              required
            />
            <label>Product Weight</label>
            <input
              type="text"
              placeholder={product ? product.weight : ""}
              name="weight"
              value={
                formvalues.weight === ""
                  ? product
                    ? product.weight
                    : ""
                  : formvalues.weight
              }
              onChange={handleChange}
              required
            />
            <label>Product VGA</label>
            <input
              type="text"
              placeholder={product ? product.vga : ""}
              name="vga"
              value={
                formvalues.vga === ""
                  ? product
                    ? product.vga
                    : ""
                  : formvalues.vga
              }
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              type="text"
              placeholder={product ? product.description : ""}
              name="description"
              value={
                formvalues.description === ""
                  ? product
                    ? product.description
                    : ""
                  : formvalues.description
              }
              onChange={handleChange}
            />
            <label>Product Price</label>
            <input
              type="text"
              placeholder={product ? product.price : ""}
              name="price"
              value={
                formvalues.price === ""
                  ? product
                    ? product.price
                    : ""
                  : formvalues.price
              }
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
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                multiple
                accept="image/*"
                style={{ display: "none" }} />
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
