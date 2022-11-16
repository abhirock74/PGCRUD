import React , { Component }from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Protected from "./Protected";

const Router = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/home" element={<Protected Component={HomePage} />} /> */}

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
