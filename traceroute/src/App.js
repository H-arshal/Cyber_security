import './App.css';
import Home from './pages/Home';
import BasicCommand from './pages/BasicCommand';
import AdvanceCommand from './pages/AdvanceCommand';
import Simulator from './pages/Simulator';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
function App() {
  return (
    <div >
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/advance' element={<AdvanceCommand/>}/>
          <Route path='/basic' element={<BasicCommand/>}/>
          <Route path='/simulator' element={<Simulator/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
