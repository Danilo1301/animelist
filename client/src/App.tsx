import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/home/Home';
import AnimePage from './pages/animePage/AnimePage';
import Data from './pages/data/Data';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="anime/:id" element={<AnimePage/>} />
        <Route path="/data" element={<Data/>} />

        {/*<Route path="*" element={<NoPage />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
