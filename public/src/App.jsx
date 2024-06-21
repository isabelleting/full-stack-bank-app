import { HashRouter, Route, Routes } from 'react-router-dom';
import { BankProvider } from './utils/BankContext';

import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import Withdraw from './pages/Withdraw';
import Login from './pages/Login';
import Deposit from './pages/Deposit';
import Data from './pages/Data';
import NotFound from './pages/NotFound';
import CreateAccount from './pages/CreateAccount';

function App() {
  return (
    <HashRouter>
      <BankProvider>
        <div className='container' style={{padding: "20px"}}>
        <MyNavbar/>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/home/" element={<Home />} />
            <Route path="/CreateAccount/" element={<CreateAccount />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/deposit/" element={<Deposit />} />
            <Route path="/withdraw/" element={<Withdraw />} />
            <Route path="/data/" element={<Data />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
     </BankProvider>
   </HashRouter>
  );
}

export default App;
