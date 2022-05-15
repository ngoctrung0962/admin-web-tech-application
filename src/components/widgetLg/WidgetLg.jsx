import "./widgetLg.css";
import { useEffect, useState } from "react";
import homeApi from "../../api/homeApi";
export default function WidgetLg() {
  
  const [product, setProduct] = useState([]);

  const showListProduct = (product) => {
    let result = "";
    result = product.map((item, index) => {
      return (
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">{item.name}</span>
          </td>
          <td className="widgetLgDate"style={{paddingLeft:"15px"}}>{item.sold}</td>
          <td className="widgetLgAmount">{item.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
          <td className="widgetLgStatus" style={{paddingLeft:"24px"}}>
            {item.quantityInStock}
          </td>
        </tr>
      );
    })
    return result;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await homeApi.topProduct();
        setProduct(res);
        window.scrollTo(0, 0);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Top Product</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Name</th>
          <th className="widgetLgTh">Sold</th>
          <th className="widgetLgTh">Total</th>
          <th className="widgetLgTh">In Stock</th>
        </tr>
        {showListProduct(product)}
      </table>
    </div>
  );
}
