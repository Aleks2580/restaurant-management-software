
import { Routes, Route } from 'react-router-dom';
import LoginManager from './Components/LoginManager/LoginManager';
import LoginWaiter from './Components/LoginWaiter/LoginWaiter';
import Main from './Components/Main/Main';

function App() {
  return (
    <>
        
         <Routes>
         {/* <Main /> */}
         <Route path='/' element={<Main />} />
          <Route path='/manager' element={<LoginManager />} />
          <Route path='/waiter' element={<LoginWaiter />} />
         </Routes>
    </>
  );
}

export default App;
