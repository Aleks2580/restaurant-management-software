import { Routes, Route } from 'react-router-dom';
import LoginManager from './Components/Manager/LoginManager/LoginManager';
import LoginWaiter from './Components/Waiter/LoginWaiter/LoginWaiter';
import MainWaiter from './Components/Waiter/MainWaiter/MainWaiter';
import Home from './Components/Home/Home';
import MainManager from './Components/Manager/MainManager/MainManager';
import DashboardManager from './Components/Manager/DashboardManager/DashboardManager';
import UsersManager from './Components/Manager/UsersManager/UsersManager';
import LayoutWaiter from './Components/Waiter/LayoutWaiter/LayoutWaiter';
import CurrentOrdersWaiter from './Components/Waiter/CurrentOrdersWaiter/CurrentOrdersWaiter'
import ReservationsWaiter from './Components/Waiter/ReservationsWaiter/ReservationsWaiter'
import AllUsers from './Components/Manager/UsersManager/AllUsers';
import NewUserForm from './Components/Manager/UsersManager/NewUserForm';
import EditUser from './Components/Manager/UsersManager/EditUser';
import ReservationsManager from './Components/Manager/ReservationsManager/ReservationsManager';
import UpcomingReservations from './Components/Manager/ReservationsManager/UpcomingReservations';
import NewReservation from './Components/Manager/ReservationsManager/NewReservation';
import { useEffect } from 'react';
import {loginUser} from "./store/loginUser/actionCreators"; 
import { useDispatch } from "react-redux";  
import EditReservation from './Components/Manager/ReservationsManager/EditReservation';
import CreateOrder from './Components/Waiter/CreateOrder/CreateOrder';
import ViewOrder from './Components/Waiter/ViewOrder/ViewOrder';
import MenuCategories from './Components/Waiter/CreateOrder/Menu/MenuCategories';
import MenuItems from './Components/Waiter/CreateOrder/Menu/MenuItems';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:4000/check_user", {
          method: "GET",
          credentials: "include",
        });
      const result = await response.json()  
      dispatch(loginUser(result))
    })()
  }, [])


  return (
    <>
        
         <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/manager' element={<LoginManager />} />
          <Route path='/waiter' element={<LoginWaiter />} />
          <Route path='/waiter/main' element={<MainWaiter />}>
            <Route path='layout' element={<LayoutWaiter />} />
            <Route path='orders' element={<CurrentOrdersWaiter />} />
            <Route path='reservations' element={<ReservationsWaiter />} />
            <Route path='create_order' element={<CreateOrder />}>
              <Route path='/waiter/main/create_order/:id' element={<MenuCategories />}>
                <Route path='/waiter/main/create_order/:id/:id' element={<MenuItems />} />
              </Route>
            </Route>
            <Route path='view_order' element={<ViewOrder />} />
          </Route>
          <Route path='/manager/main' element={<MainManager />}>
            <Route path='dashboard' element={<DashboardManager />} />
            <Route path='users' element={<UsersManager />}>
              <Route path='all' element={<AllUsers />} />
              <Route path='new' element={<NewUserForm />} />
              <Route path='edit' element={<EditUser />} />
            </Route>
            <Route path='reservations' element={<ReservationsManager />}>
              <Route path='new' element={<NewReservation />} />
              <Route path='upcoming' element={<UpcomingReservations />} />
              <Route path='edit' element={<EditReservation />} />
            </Route>
          </Route>
         </Routes>
    </>
  );
}

export default App;
