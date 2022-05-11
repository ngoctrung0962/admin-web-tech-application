import { useState } from "react";
import brandApi from "../../api/brandApi";
import "./newBrand.css";

export default function NewBrand() {

  const initValue = { name: "", email: "", logo: "", location: "" }
  const [formvalues, setFormvalues] = useState(initValue);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await brandApi.add(formvalues)
    console.log(formvalues)
    window.alert("Update succes!!")
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Brand</h1>
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
          <label>Logo</label>
          <input
            type="text"
            name="logo"
            placeholder="Link"
            value={formvalues.logo}
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
        {/* <div className="addProductItem">
          <label>Stock</label>
          <input 
          type="text" 
          placeholder="123" />
        </div>
        <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button type="submit" className="addProductButton">Create</button>
      </form>
    </div>
  );
}
