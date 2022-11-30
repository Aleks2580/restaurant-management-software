
import { Routes, Route } from 'react-router-dom';
import LoginManager from './Components/LoginManager/LoginManager';
import LoginWaiter from './Components/LoginWaiter/LoginWaiter';
import MainWaiter from './Components/MainWaiter/MainWaiter';
import Home from './Components/Home/Home';
import WrongPassword from './Components/WrongPassword/WrongPassword';

function App() {
  return (
    <>
        
         <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/manager' element={<LoginManager />} />
          <Route path='/waiter' element={<LoginWaiter />} />
          <Route path='/waiter/main' element={<MainWaiter />} />
          <Route path='/wrong_password' element={<WrongPassword />} />
         </Routes>
    </>
  );
}

export default App;
