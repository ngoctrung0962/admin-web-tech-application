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
import "./profile.css";
import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import { formatDateToLocalInputDate } from "@material-ui/data-grid";
import { useSelector } from "react-redux";
import { showNotification } from "../../utils/showNotification";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/userRedux";

export default function Profile() {
  const userCurrent = useSelector((state) => state.user.currentUser);

  const [user, setUser] = useState(userCurrent);
  const [formvalues, setFormvalues] = useState(userCurrent);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userApi.getUserByUsername(userCurrent.username);
        // update role type 1 is admin, 0 is user
        setUser(res);
        setFormvalues(res);
        console.log(res);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userCurrent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await userApi.update(userCurrent.username, formvalues);
    setUser(res);
    setFormvalues(res);
    //update user.currentUser

    showNotification("success", "Great", "Update profile success!", "OK");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  };

  //handle change password
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [errorconfirm, setErrorconfirm] = useState("");
  const [erroroldpass, setErroroldpass] = useState("");
  const dispatch = useDispatch();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("oldPassword", oldpassword);
    formData.append("newPassword", newpassword);
    if (newpassword !== confirmpassword) {
      setErrorconfirm("Confirm was wrong!");
      setErroroldpass("");
    } else {
      try {
        const res = await userApi.changepassword(
          userCurrent.username,
          formData
        );
        console.log(res);
        showNotification(
          "success",
          "Great",
          "Change password success! Please login again",
          "OK"
        );
        dispatch(Logout());
        setErrorconfirm("");
        setErroroldpass("");
      } catch (error) {
        setErroroldpass("Wrong password!");
        setErrorconfirm("");
      }
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h2 className="userTitle">Profile</h2>
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
                  value={formvalues.username}
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
            </div>
            <div className="userUpdateRightProfile">
              {/* button back */}
              <button type="submit" className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Change password</span>
          <form className="userUpdateForm" onSubmit={handleChangePassword}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Old password</label>
                <input
                  type="password"
                  name="oldPassword"
                  onChange={(e) => setOldpassword(e.target.value)}
                  className="userUpdateInput"
                  required
                />
                <p style={{ color: "red" }}>{erroroldpass}</p>
              </div>
              <div className="userUpdateItem">
                <label>New password</label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  onChange={(e) => setNewpassword(e.target.value)}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  className="userUpdateInput"
                  required
                />
                <p style={{ color: "red" }}>{errorconfirm}</p>
              </div>
              <div className="userchangePassword">
                {/* button back */}
                <button type="submit" className="changePasswordButton">
                  Change password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
