import Todolist from "./Todolist";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import React, { useEffect } from "react";
import PrivateRoutes from "./components/PrivateRoutes";
import UserInfo from "./components/UserInfo";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLogin />} />

        <Route path="/register" element={<UserRegister />} />
        <Route element={<PrivateRoutes />}>
          <Route path="todolist" element={<Todolist />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="userinfo" element={<UserInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
