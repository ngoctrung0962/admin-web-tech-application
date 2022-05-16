import { useState } from "react";

import brandApi from "../../api/brandApi";
import "./newDelivery.css";
import { useHistory } from "react-router-dom";
import deliveryApi from "../../api/deliveryApi";

export default function NewDelivery() {
  let history = useHistory();
  const initValue = { name: "", email: "", phoneNumber: "", location: "" }
  const [formvalues, setFormvalues] = useState(initValue);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({name, value});
    setFormvalues({ ...formvalues, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await deliveryApi.add(formvalues)
    console.log(formvalues)
    window.alert("Add succes!!")
    history.push("/deliveries")
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Delivery</h1>
      <form onSubmit={handleSubmit} className="addProductForm">
        {/* <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div> */}
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
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formvalues.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Phone</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Link"
            value={formvalues.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formvalues.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="addProductButton">Create</button>
      </form>
    </div>
  );
}
