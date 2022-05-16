import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import BrandList from "./pages/brandList/BrandList";
import CouponList from "./pages/couponList/CouponList";
import Brand from "./pages/brand/Brand";
import Coupon from "./pages/coupon/Coupon";
import NewBrand from "./pages/newBrand/NewBrand";
import NewCoupon from "./pages/newCoupon/newCoupon";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SignIn from './pages/signin/SignIn.page';
import Layout from "./common/layout";
import CategoriesList from './pages/categoriesList/CategoriesList';
import NewCategory from "./pages/newCategory/NewCategory";
import Category from "./pages/category/Category"
import DeliveryList from "./pages/deliveryList/DeliveryList";
import Delivery from "./pages/delivery/Delivery";
import NewDelivery from "./pages/newDelivery/NewDelivery";
import ReviewList from "./pages/reviewList/ReviewList";
import OrdersList from './pages/ordersList/OrdersList';
import Order from './pages/order/Order';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        {user && user.role === "ROLE_ADMIN" ?
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />

              <Route path="/users" component={UserList} />
              <Route path="/user/:userId" component={User} />
              <Route path="/newUser" component={NewUser} />

              <Route path="/products" component={ProductList} />
              <Route path="/product/:productId" component={Product} />
              <Route path="/newproduct" component={NewProduct} />

              <Route path="/brands" component={BrandList} />
              <Route path="/brand/:brandId" component={Brand} />
              <Route path="/newbrand" component={NewBrand} />
              <Route path="/coupons" component={CouponList} />
              <Route path="/newcoupon" component={NewCoupon} />
              <Route path="/coupon/:couponId" component={Coupon} />
              
              <Route path="/categories" component={CategoriesList} />
              <Route path="/newcategory" component={NewCategory} />
              <Route path="/category/:categoryId" component={Category} />

              <Route path="/deliveries" component={DeliveryList} />
              <Route path="/delivery/:deliveryId" component={Delivery} />
              <Route path="/newdelivery" component={NewDelivery} />

              <Route path="/reviews" component={ReviewList} />

              <Route path="/orders" component={OrdersList} />
              <Route path="/order/:orderId" component={Order} />
              <Route path="/neworder/" component={Order} />

              <Redirect to="/" />
            </Switch>
          </Layout>
          :
          <Switch>
            <Route path="/signin" component={SignIn} exact />
            <Redirect to="/signin" />
          </Switch>

        }
      </Switch>

      {/* <Route path="/signin">{user ? <Redirect to="/" /> : <SignIn />}</Route>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={UserList} />
          <Route path="/user/:userId" component={User} />
          <Route path="/newUser" component={NewUser} />
          <Route path="/products" component={ProductList} />
          <Route path="/product/:productId" component={Product} />
          <Route path="/newproduct" component={NewProduct} />
          <Route path="/brands" component={BrandList} />
          <Route path="/brand/:brandId" component={Brand} />
          <Route path="/newbrand" component={NewBrand} />
        </Switch>
      </Layout> */}
    </Router>
  );
}

export default App;
