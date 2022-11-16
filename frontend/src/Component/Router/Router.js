import React , { Component }from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Protected from "./Protected";
import Home from "../Home/Home";

const Router = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/home" element={<Protected Component={Home} />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
