import React, { useState, useEffect } from "react";
import "./UserLogin.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const openNotificationWithIcon = (type) => {
    if (type === "success") {
      notification["success"]({
        message: "Login SuccessFully!!!",
        description: "Welcome to Todolist",
      });
    } else if (type === "error") {
      notification["error"]({
        message: "Login Fail!",
        description: "Email or Password is wrong!!",
      });
    }
  };

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
      openNotificationWithIcon("error");
    } else {
      axios
        .post(`https://api-nodejs-todolist.herokuapp.com/user/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);

          localStorage.setItem("token", res.data.token);
          navigate("/todolist");
          openNotificationWithIcon("success");
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => handleLogin(e)}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div className="form-group">
                  <div className="form-group d-flex justify-content-center">
                    <button className="btn btn-success">Login</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<NavLink to="/register">Sign up</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserLogin;
