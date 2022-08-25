import Todolist from "./Todolist";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./components/User/UserLogin/UserLogin";
import UserRegister from "./components/User/UserRegister/UserRegister";
import React, { useEffect } from "react";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import UserInfo from "./components/User/UserInfo/UserInfo";
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
