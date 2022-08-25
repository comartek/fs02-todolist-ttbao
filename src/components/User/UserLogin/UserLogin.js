import React, { useState, useEffect } from "react";
import "./UserLogin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { notificationUser } from "../../../notification/notification";
import { User } from "../../../services/UserServices";
import FormLogin from "../../Form/FormLogin";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user_logged = localStorage.getItem("token");
    if (user_logged) {
      navigate("/todolist");
    } else {
      navigate("/");
    }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      notificationUser("error", "Email or Password is wrong!!!");
    } else {
      User.login(email, password).then((res) => {
        console.log(res);
        console.log(res.data);

        localStorage.setItem("token", res.data.token);
        console.log(localStorage.getItem("token"));
        navigate("/todolist");
        notificationUser("success", "Login success");
      });
    }
  };

  return (
    <>
      <FormLogin
        handleLogin={handleLogin}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </>
  );
};
export default UserLogin;
