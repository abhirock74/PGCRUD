import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Protected from "./Protected";
import Home from "../Home/Home";
import List from "../BenificaryForm/List";

const Router = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/home" element={<Protected Component={Home} />} />
          <Route path="/benificarylists" element={<Protected Component={List} />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
