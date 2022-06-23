// import logo from './logo.svg';
import React from "react";
import "./App.css";
// import Navbar from './components/Navbar';
import Textarea from "./components/Textarea";
import About from "./components/About";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Textarea TThide="none"/> } />
        <Route path="about" element={ <About/> } />
      </Routes>
    </>
  );
}

export default App;
