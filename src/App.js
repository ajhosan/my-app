import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/Home/Home.page';
import MasterUser from './pages/MasterUser/MasterUser.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/master-user" element={<MasterUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
