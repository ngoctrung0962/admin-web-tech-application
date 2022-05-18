import "./newUser.css";
import { useState } from "react";
import userApi from "../../api/userApi";
import { formatDateToLocalInputDate } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { showNotification } from "../../utils/showNotification";

export default function NewUser() {
  let history = useHistory();
  const initValue = {
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: formatDateToLocalInputDate(new Date()),
    address: "",
    gender: true,
    role: 0,
  };

  const [formvalues, setFormvalues] = useState(initValue);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await userApi.add(
      formvalues.username,
      formvalues.password,
      formvalues
    );

    if (!res.status || res.status === 200) {

      showNotification('success', 'Đăng kí thành công !', 'Vui lòng đăng nhập lại', 'OK')
      history.push("/users");
    }
    else {
      showNotification('error', 'Đăng kí thất bại !', `Lỗi: ${res.message}`, 'OK')
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formvalues.username}
            onChange={handleChange}
            required
            placeholder="john"
          />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Smith"
            name="name"
            value={formvalues.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={formvalues.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            name="email"
            value={formvalues.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            placeholder="+1 123 456 78"
            name="phoneNumber"
            value={formvalues.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            type="text"
            placeholder="New York | USA"
            name="address"
            value={formvalues.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Date Of Birth</label>
          <input
            type="date"
            placeholder="2020-01-01"
            className="userUpdateInput"
            name="dateOfBirth"
            value={formvalues.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <select
              id="gender"
              name="gender"
              className="userUpdateInput"
              value={formvalues.gender}
              onChange={handleChange}
              required
            >
              <option value={true}>Male</option>
              <option value={false}>Felmale</option>
              <option value="Khac">Orther</option>
            </select>
          </div>
        </div>
        {/* button back */}
        <Link to="/users">
          <button className="NewUserBack">Back</button>
        </Link>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
