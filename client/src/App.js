import { useEffect } from "react";
import { loginUser } from "./store/loginUser/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoginManager from "./Components/Manager/LoginManager/LoginManager";
import LoginWaiter from "./Components/Waiter/LoginWaiter/LoginWaiter";
import MainWaiter from "./Components/Waiter/MainWaiter/MainWaiter";
import Home from "./Components/Home/Home";
import MainManager from "./Components/Manager/MainManager/MainManager";
import DashboardManager from "./Components/Manager/DashboardManager/DashboardManager";
import UsersManager from "./Components/Manager/UsersManager/UsersManager";
import LayoutWaiter from "./Components/Waiter/LayoutWaiter/LayoutWaiter";
import CurrentOrdersWaiter from "./Components/Waiter/CurrentOrdersWaiter/CurrentOrdersWaiter";
import ReservationsWaiter from "./Components/Waiter/ReservationsWaiter/ReservationsWaiter";
import AllUsers from "./Components/Manager/UsersManager/AllUsers";
import NewUserForm from "./Components/Manager/UsersManager/NewUserForm";
import EditUser from "./Components/Manager/UsersManager/EditUser";
import ReservationsManager from "./Components/Manager/ReservationsManager/ReservationsManager";
import UpcomingReservations from "./Components/Manager/ReservationsManager/UpcomingReservations";
import NewReservation from "./Components/Manager/ReservationsManager/NewReservation";
import EditReservation from "./Components/Manager/ReservationsManager/EditReservation";
import CreateOrder from "./Components/Waiter/CreateOrder/CreateOrder";
import ViewOrder from "./Components/Waiter/ViewOrder/ViewOrder";
import MenuCategories from "./Components/Waiter/CreateOrder/Menu/MenuCategories";
import MenuItems from "./Components/Waiter/CreateOrder/Menu/MenuItems";
import EditOrder from "./Components/Waiter/EditOrder/EditOrder";
import ProductsManager from "./Components/Manager/ProductsManager/ProductsManager";
import StatisticsManager from "./Components/Manager/StatisticsManager/StatisticsManager";
import StockManager from "./Components/Manager/StockManager/StockManager";
import AllProducts from "./Components/Manager/ProductsManager/AllProducts";
import NewProduct from "./Components/Manager/ProductsManager/NewProduct";
import NewSection from "./Components/Manager/ProductsManager/NewSection";
import NewCategory from "./Components/Manager/ProductsManager/NewCategory";
import EditProduct from "./Components/Manager/ProductsManager/EditProduct";
import Revenue from "./Components/Manager/StatisticsManager/Revenue";
import Waiters from "./Components/Manager/StatisticsManager/Waiters";
import Products from "./Components/Manager/StatisticsManager/Products";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginUser);

  useEffect(() => {
    (async function () {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/check_user`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      dispatch(loginUser(result));
    })();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manager" element={<LoginManager />} />
        {user.name && user.role === "manager" ? (
          <Route path="/manager/main" element={<MainManager />}>
            <Route path="dashboard" element={<DashboardManager />} />
            <Route path="users" element={<UsersManager />}>
              <Route path="all" element={<AllUsers />} />
              <Route path="new" element={<NewUserForm />} />
              <Route path="edit" element={<EditUser />} />
            </Route>
            <Route path="statistics" element={<StatisticsManager />}>
              <Route path="revenue" element={<Revenue />} />
              <Route path="waiters" element={<Waiters />} />
              <Route path="products" element={<Products />} />
            </Route>
            <Route path="products" element={<ProductsManager />}>
              <Route path="all" element={<AllProducts />} />
              <Route path="new_product" element={<NewProduct />} />
              <Route path="new_section" element={<NewSection />} />
              <Route path="new_category" element={<NewCategory />} />
              <Route path="edit" element={<EditProduct />} />
            </Route>
            <Route path="stock" element={<StockManager />} />
            <Route path="reservations" element={<ReservationsManager />}>
              <Route path="new" element={<NewReservation />} />
              <Route path="upcoming" element={<UpcomingReservations />} />
              <Route path="edit" element={<EditReservation />} />
            </Route>
          </Route>
        ) : (
          ""
        )}

        <Route path="/waiter" element={<LoginWaiter />} />
        {user.name ? (
          <Route path="/waiter/main" element={<MainWaiter />}>
            <Route path="layout" element={<LayoutWaiter />} />
            <Route path="orders" element={<CurrentOrdersWaiter />} />
            <Route path="reservations" element={<ReservationsWaiter />} />
            <Route path="create_order" element={<CreateOrder />}>
              <Route path=":id" element={<MenuCategories />}>
                <Route path=":item" element={<MenuItems />} />
              </Route>
            </Route>
            <Route path="view_order" element={<ViewOrder />} />
            <Route path="edit_order" element={<EditOrder />}>
              <Route path=":id" element={<MenuCategories />}>
                <Route path=":item" element={<MenuItems />} />
              </Route>
            </Route>
          </Route>
        ) : (
          ""
        )}
      </Routes>
    </>
  );
}

export default App;
