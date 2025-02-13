import "./App.css";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect, useRef, useState } from "react";
import Register from "./pages/Register";
import jwt_decoded from "jwt-decode"
import Game from "./pages/Playing";



const App = () => {
  const [name, setUserName] = useState("");

  return (
    <>
      <div className="content h-screen bg-gradient-to-tl from-slate-950 from-10% via-slate-900 via-40% to-slate-800 to-90%">
        {/* <button onClick={GetInfo}>{name.current}</button> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout name={name} setUserName={setUserName}/>}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="login/:signEmail" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="game" element={<Game />} />
              <Route path="dashboard" element={<Dashboard name={name} setUserName={setUserName}/>} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
