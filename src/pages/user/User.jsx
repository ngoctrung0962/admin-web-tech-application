import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  EmojiPeopleTwoTone,
  ViewAgenda,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import { formatDateToLocalInputDate } from "@material-ui/data-grid";
import { showNotification } from "../../utils/showNotification";

export default function User() {
  const location = useLocation();
  const username = location.pathname.split("/")[2];
  const [user, setUser] = useState({});
  const initValue = {
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: formatDateToLocalInputDate(new Date()),
    address: "",
    gender: true,
    role: 0,
  };
  const [formvalues, setFormvalues] = useState(initValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userApi.getUserByUsername(`${username}`);
        // update role type 1 is admin, 0 is user
        if (res.role === "ROLE_ADMIN") {
          res.role = 1;
        } else {
          res.role = 0;
        }
        setUser(res);
        setFormvalues(res);
        console.log(res);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Role .......", formvalues.role, user.role);
    const currentRole = user.role === "ROLE_ADMIN" ? 1 : 0;
    if (formvalues.role !== currentRole) {
      await userApi.changeRole(username);
      console.log("change role");
    }
    const res = await userApi.update(username, formvalues);
    console.log(res);
    // update role type 1 is admin, 0 is user
    if (res.role === "ROLE_ADMIN") {
      res.role = 1;
    } else {
      res.role = 0;
    }
    setUser(res);
    setFormvalues(res);
    showNotification('success', 'Update success', '', 'OK');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.dateOfBirth}</span>
            </div>
            <div className="userShowInfo">
              <ViewAgenda className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.gender === true ? "Male" : "Felmale"}
              </span>
            </div>
            <div className="userShowInfo">
              <EmojiPeopleTwoTone className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.role === 1 ? "ROLE_ADMIN" : "ROLE_USER"}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phoneNumber}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  //enable editing
                  disabled
                  placeholder="annabeck99"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formvalues.name}
                  onChange={handleChange}
                  name="name"
                  placeholder={user.name}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={formvalues.email}
                  name="email"
                  onChange={handleChange}
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  value={formvalues.phoneNumber}
                  onChange={handleChange}
                  name="phoneNumber"
                  placeholder={user.phoneNumber}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  value={formvalues.address}
                  onChange={handleChange}
                  name="address"
                  placeholder={user.address}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Date Of Birth</label>
                <input
                  type="date"
                  value={formvalues.dateOfBirth}
                  name="dateOfBirth"
                  onChange={handleChange}
                  placeholder={user.dateOfBirth}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Gender</label>
                <select
                  id="gender"
                  name="gender"
                  className="userUpdateInput"
                  onChange={handleChange}
                  value={formvalues.gender}
                >
                  <option value={true}>Male</option>
                  <option value={false}>Felmale</option>
                  <option value="Khac">Orther</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Role</label>
                <select
                  id="role"
                  name="role"
                  className="userUpdateInput"
                  onChange={handleChange}
                  value={formvalues.role}
                >
                  <option value={1}>ROLE_ADMIN</option>
                  <option value={0}>ROLE_USER</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              {/* button back */}
              <Link to="/users">
                <button className="ButtonBack">Back</button>
              </Link>
              <button type="submit" className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
