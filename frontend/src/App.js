import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentCrud from "./components/StudentCrud";
import Register2 from "./components/Register2";
//import { useEffect } from "react";
//import Navbar from "./components/Navbar";
//import { Toaster } from "react-hot-toast";

function App() {
  //const BASE_URL = "http://localhost:4000";

  

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/studentcrud" element={<StudentCrud />} />
          <Route path="/Register" element={<Register2/>} />

        </Routes>
      </BrowserRouter>
    );
  }

export default App;