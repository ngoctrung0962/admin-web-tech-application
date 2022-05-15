import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import homeApi from "../../api/homeApi";

export default function FeaturedInfo() {

  const [laptop, setLaptop] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [all, setAll] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await homeApi.totalAll();
        const res1 = await homeApi.totalLaptop();
        const res2 = await homeApi.totalMobile();
        await setAll(res);
        await setLaptop(res1);
        await setMobile(res2);
        window.scrollTo(0, 0);
        console.log(res);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  return (

    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Revenue</span>
        <div className="featuredMoneyContainer">
          {all.map((item, index) => {
            return (<span className="featuredMoney">{item.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>)
          })
          }
          
        </div>
        <span className="featuredSub"></span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Revenue Of Laptop</span>
        <div className="featuredMoneyContainer">
        {laptop.map((item, index) => {
            return (<span className="featuredMoney">{item.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>)
          })
          }
        </div>
        <span className="featuredSub"></span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Revenue Of Phone</span>
        <div className="featuredMoneyContainer">
        {mobile.map((item, index) => {
            return (<span className="featuredMoney">{item.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>)
          })
          }
          
        </div>
        <span className="featuredSub"></span>
      </div>
    </div>
  );
}
