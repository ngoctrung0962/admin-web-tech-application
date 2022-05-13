import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
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
import Brand from "./pages/brand/Brand";
import NewBrand from "./pages/newBrand/NewBrand";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SignIn from './pages/signin/SignIn.page';
import Layout from "./common/layout";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  console.log("s", user)
  return (
    <Router>
      <Switch>
        {!user ? <Switch>

          <Route path="/signin" component={SignIn} exact />
          <Redirect to="/signin" />
        </Switch>
          :
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
              <Redirect to="/" />
            </Switch>
          </Layout>
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
