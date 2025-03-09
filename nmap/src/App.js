import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home';
import BasicCommand from './pages/BasicCommand';
import AdvanceCommand from './pages/AdvanceCommand';
import Simulator from './pages/Simulator';
function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BasicCommand" element={<BasicCommand />} />
        <Route path="/AdvanceCommand" element={<AdvanceCommand />} />
        <Route path="/Simulator" element={<Simulator />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
