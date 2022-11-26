
import { Routes, Route } from 'react-router-dom';
import LoginManager from './Components/LoginManager/LoginManager';
import LoginServer from './Components/LoginServer/LoginServer';
import Main from './Components/Main/Main';

function App() {
  return (
    <>
        
         <Routes>
         {/* <Main /> */}
         <Route path='/' element={<Main />} />
          <Route path='/manager' element={<LoginManager />} />
          <Route path='/server' element={<LoginServer />} />
         </Routes>
    </>
  );
}

export default App;
