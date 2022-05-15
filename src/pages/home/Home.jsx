import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { useEffect, useState } from "react";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import homeApi from "../../api/homeApi";

export default function Home() {

  const [chart, setChart] = useState([]);


  const formatDataChart = (res) => {
    let temp=[];
    let days=new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate();
     for (let i = 1; i <= days; i++) {
       temp.push({ name: i, total: 0 })
     };
     
       res.forEach(item => {
         temp[item.name-1].total = item.total;
       }
       )
        return temp;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await homeApi.chartData();
        //setChart(res);
        setChart(await formatDataChart(res));
        console.log(chart);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      {console.log("check",chart)}
       <Chart data={chart} title="Revenue for the month" grid dataKey="total"/> 
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
