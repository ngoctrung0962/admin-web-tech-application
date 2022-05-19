import { useEffect, useState } from "react";
import "./newProduct.css";
import brandApi from "../../api/brandApi";
import categoryApi from "../../api/categoryApi";
import { useHistory } from "react-router-dom";
import productApi from "../../api/productApi";
import axios from "axios";
import { showNotification } from "../../utils/showNotification";

export default function NewProduct() {
  let history = useHistory();
  const initValue = {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newsaledate = await new Date();

    const formdata = {
      name: formvalues.name,
      category: {
        categoryId: formvalues.categoryId,
      },
      brand: {
        brandId: formvalues.brandId,
      },
      image: JSON.stringify(formvalues.image),
      quantity: formvalues.quantity,
      saleDate: formatDate(newsaledate),
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
    // try {

    //   showNotification("success", "Great", "Add product successful", "OK");
    //   history.push("/products");
    // } catch (error) {
    //   showNotification("error", "Oh no", "Add product fail", "OK");
    // }
    const res = await productApi.add(formdata);
    if (!res.status || res.status === 200) {

      showNotification("success", "Great", "Add product successful", "OK");
      history.push("/products");
    }
    else {
      showNotification("error", "Oh no", "Add product fail", "OK");
    }
  };
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
    console.log(formvalues);
  };
  const [formvalues, setFormvalues] = useState(initValue);
  const [listbrands, setListbrands] = useState([]);
  const [listcategorys, setListcategorys] = useState([]);
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

  //get all category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryApi.getAll();
        setListcategorys(res);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [currenfileimage, setCurrentfileimage] = useState(null);
  const handlefilechange = (e) => {
    setCurrentfileimage(e.target.files);
  };
  const handleUploadfile = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (let i = 0; i < currenfileimage.length; i++) {
      formdata.append("image", currenfileimage[i]);
      console.log(currenfileimage[i]);
    }
    console.log(formdata);
    const res = await productApi.uploadfileimage(formdata);
    if (!res.status || res.status === 200) {
      setFormvalues({ ...formvalues, image: res });
      showNotification("success", "Great", "Add image successful", "OK");
    } else {
      showNotification(
        "error",
        "Oh No",
        "Add image fail! Error: " + res.message,
        "OK"
      );
    }
  };
  console.log(formvalues);
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form onSubmit={handleSubmit} className="addProductFormUpdate">
        <div className="col-flex">
          <div className="addProductItem">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formvalues.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="addProductItem">
            <label>Category</label>
            <select name="categoryId" id="categoryId" onChange={handleChange}>
              {listcategorys.map((category) => {
                return (
                  <option
                    key={category.categoryId}
                    value={
                      formvalues.categoryId === ""
                        ? (formvalues.categoryId = listcategorys[0].categoryId)
                        : category.categoryId
                    }
                  >
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="addProductItem">
            <label>Product Brand</label>
            <select name="brandId" id="brandId" onChange={handleChange}>
              {listbrands.map((brand) => {
                return (
                  <option
                    key={brand.brandId}
                    value={
                      formvalues.brandId === ""
                        ? (formvalues.brandId = listbrands[0].brandId)
                        : brand.brandId
                    }
                  >
                    {brand.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="addProductItem">
            <label>Product Quantity</label>
            <input
              type="text"
              placeholder={""}
              name="quantity"
              value={formvalues.quantity}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="addProductItem">
          <label>Product Sale Date</label>
          <input
            type="text"
            placeholder={""}
            name="saleDate"
            value={formvalues.saleDate}
            onChange={handleChange}
          />
        </div> */}
          <div className="addProductItem">
            <label>Product Image</label>
            <input
              type="file"
              name="image"
              multiple
              accept="image/*"
              onChange={handlefilechange}
            />
            {currenfileimage ? <button onClick={handleUploadfile}>Upload</button> : <button disabled onClick={handleUploadfile}>Upload</button>}
          </div>
        </div>
        <div className="col-flex">
          <div className="addProductItem">
            <label>Product ROM</label>
            <input
              type="text"
              placeholder={""}
              name="rom"
              value={formvalues.rom}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Product Front Camera</label>
            <input
              type="text"
              placeholder={""}
              name="frontCam"
              value={formvalues.frontCam}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Product Back Camera</label>
            <input
              type="text"
              placeholder={""}
              name="backCam"
              value={formvalues.backCam}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Product OS</label>
            <input
              type="text"
              placeholder={""}
              name="os"
              value={formvalues.os}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Product Screen</label>
            <input
              type="text"
              placeholder={""}
              name="screen"
              value={formvalues.screen}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Product CPU</label>
            <input
              type="text"
              placeholder={""}
              name="cpu"
              value={formvalues.cpu}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-flex">
          <div className="addProductItem">
            <label>Product Battery</label>
            <input
              type="text"
              placeholder={""}
              name="battery"
              value={formvalues.battery}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Product Weight</label>
            <input
              type="text"
              placeholder={""}
              name="weight"
              value={formvalues.weight}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Product VGA</label>
            <input
              type="text"
              placeholder={""}
              name="vga"
              value={formvalues.vga}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Product Description</label>
            <input
              type="text"
              placeholder={""}
              name="description"
              value={formvalues.description}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Product Price</label>
            <input
              type="text"
              placeholder={""}
              name="price"
              value={formvalues.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="addProductItem">
            <label>Product RAM</label>
            <input
              type="text"
              placeholder={""}
              name="ram"
              value={formvalues.ram}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="buttonAddProduct">
          <button className="addProductButton">Create</button>
        </div>
      </form>
    </div>
  );
}
