import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ok");
    axios
      .post(`https://api-nodejs-todolist.herokuapp.com/user/register`, {
        name: name,
        email: email,
        password: password,
        age: age,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/todolist");
        localStorage.setItem("token", res.data.token);
      });
  };
  return (
    <div className="container">
      <div
        className="d-flex justify-content-center h-100"
        style={{ marginTop: "100px" }}
      >
        <div className="card">
          <div className="card-header">
            <h3>Sign Up</h3>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fas fa-envelope"></i>
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
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="form-group d-flex justify-content-center">
                <button className="btn btn-success">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
