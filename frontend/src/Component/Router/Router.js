import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Protected from "./Protected";
import Home from "../Home/Home";
import List from "../BenificaryForm/List";
import FieldOfficer from "../FieldOfficer/FieldOfficer";
import AddFieldOfficer from "../FieldOfficer/AddFieldOfficer";
import State from "../State/State";
import District from "../District/District";
import Blocks from "../Blocks/Blocks";
import Village from "../Village/Village";
import Addbenificary from "../BenificaryForm/Addbenificary";

const Router = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/home" element={<Protected Component={Home} />} />
          <Route path="/benificarylists" element={<Protected Component={List} />} />
          <Route path="/fieldofficer" element={<Protected Component={FieldOfficer} />} />
          <Route path="/fieldofficer/add" element={<Protected Component={AddFieldOfficer} />} />
          <Route path="/state" element={<Protected Component={State} />} />
          <Route path="/district" element={<Protected Component={District} />} />
          <Route path="/blocks" element={<Protected Component={Blocks} />} />
          <Route path="/village" element={<Protected Component={Village} />} />
          <Route path="/addbenificary" element={<Protected Component={Addbenificary} />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
