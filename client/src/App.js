import { Routes, Route } from 'react-router-dom';
import LoginManager from './Components/Manager/LoginManager/LoginManager';
import LoginWaiter from './Components/Waiter/LoginWaiter/LoginWaiter';
import MainWaiter from './Components/Waiter/MainWaiter/MainWaiter';
import Home from './Components/Home/Home';
import WrongPassword from './Components/WrongPassword/WrongPassword';
import MainManager from './Components/Manager/MainManager/MainManager';
import DashboardManager from './Components/Manager/DashboardManager/DashboardManager';
import UsersManager from './Components/Manager/UsersManager/UsersManager';
import LayoutWaiter from './Components/Waiter/LayoutWaiter/LayoutWaiter';
import CurrentOrdersWaiter from './Components/Waiter/CurrentOrdersWaiter/CurrentOrdersWaiter'
import ReservationsWaiter from './Components/Waiter/ReservationsWaiter/ReservationsWaiter'
import AllUsers from './Components/Manager/UsersManager/AllUsers';
import NewUserForm from './Components/Manager/UsersManager/NewUserForm';


function App() {
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
          </Route>
          <Route path='/manager/main' element={<MainManager />}>
            <Route path='dashboard' element={<DashboardManager />} />
            <Route path='users' element={<UsersManager />}>
              <Route path='all' element={<AllUsers />} />
              <Route path='new' element={<NewUserForm />} />
            </Route>
          </Route>
          <Route path='/wrong_password' element={<WrongPassword />} />
         </Routes>
    </>
  );
}

export default App;
