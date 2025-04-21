/** @format */
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SkateboardDetails from './pages/SkateboardDetails';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/skateboards/:id" element={<SkateboardDetails />}></Route>
    </Routes>
  );
}

export default App;
