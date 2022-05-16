import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  EmojiPeopleTwoTone,
  ViewAgenda,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./Coupon.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import couponApi from "../../api/couponApi";

export default function User() {
  const location = useLocation();
  const couponId = location.pathname.split("/")[2];
  const [coupon, setCoupon] = useState({});
  const initValue = {
    couponId: "",
    discount: "",
    expiredTime: new Date(),
    effectiveTime: new Date(),
    description: "",
  };
  const [formvalues, setFormvalues] = useState(initValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await couponApi.getCouponByCode(couponId);
        setFormvalues(res);
        setCoupon(res);
        console.log(res);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [couponId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await couponApi.update(couponId, formvalues);
    setCoupon(res);
    window.alert("Update succes!!");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Coupom</h1>
        <Link to="/newCoupon">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowBottom">
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{coupon.couponId}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{coupon.discount}</span>
            </div>
            <div className="userShowInfo">
              <EmojiPeopleTwoTone className="userShowIcon" />
              <span className="userShowInfoTitle">{coupon.expiredTime}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{coupon.effectiveTime}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{coupon.description}</span>
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
                  value={couponId}
                  //enable editing
                  disabled
                  placeholder="annabeck99"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Discount</label>
                <input
                  type="text"
                  value={formvalues.discount}
                  onChange={handleChange}
                  name="discount"
                  placeholder={coupon.discount}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>ExpiredTime</label>
                <input
                  type="date"
                  value={formvalues.expiredTime}
                  name="expiredTime"
                  onChange={handleChange}
                  placeholder={coupon.expiredTime}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>EffectiveTime</label>
                <input
                  type="date"
                  value={formvalues.effectiveTime}
                  onChange={handleChange}
                  name="effectiveTime"
                  placeholder={coupon.effectiveTime}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Description</label>
                <input
                  type="text"
                  value={formvalues.description}
                  onChange={handleChange}
                  name="description"
                  placeholder={coupon.description}
                  className="userUpdateInput"
                />
              </div>
            </div>

            <div className="userUpdateRight">
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
