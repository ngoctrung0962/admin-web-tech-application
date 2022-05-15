import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import homeApi from "../../api/homeApi";

export default function WidgetSm() {

  const [customer, setCustomer] = useState([]);

  const formatTotal = (total) => {
    let temp = total.toString();
    let length = temp.length;
    if (length < 10) {
      for (let i = 0; i < 12 - length; i++) {
        temp = " " + temp;
      }
    }
    return temp;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await homeApi.topCustomer();
        console.log(res);
        setCustomer(res);
        window.scrollTo(0, 0);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  const showListCustomer = (customer) => {
    let result = "";
    result = customer.map((item, index) => {
      return (
        <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{item.name}</span>
            <span className="widgetSmUserTitle">{item.id}</span>
          </div>
          <div>
            <h3>{formatTotal(item.total.toLocaleString('vi', {style : 'currency', currency : 'VND'}))}</h3>
          </div>
        </li>
      );
    })
    return result;
  }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Top Customer</span>
      <ul className="widgetSmList">
        {showListCustomer(customer)}
      </ul>
    </div>
  );
}
