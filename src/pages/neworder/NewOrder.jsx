import { useState } from "react";

import brandApi from "../../api/brandApi";
import './newOrder.css';
import { useHistory } from "react-router-dom";
import categoryApi from "../../api/categoryApi";
import {showNotification} from '../../utils/showNotification';

export default function NewCategory() {
  let history = useHistory();
  const initValue = { name: "" }
  const [formvalues, setFormvalues] = useState(initValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await categoryApi.add(formvalues);
    if (res !== undefined && res !== null) {
      showNotification('success', 'Great', 'Add Category successful', 'OK', () => history.push("/categories") )
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Category</h1>
      <form onSubmit={handleSubmit} className="addProductForm">

        <div className="addProductItem">
          <label>Category Name</label>
          <input
            type="text"
            name="name"
            value={formvalues.name}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="addProductButton">Create</button>
      </form>
    </div>
  );
}
