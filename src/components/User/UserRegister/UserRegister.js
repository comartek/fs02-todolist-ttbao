import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../../services/UserServices";
import { regex } from "../../../contants/contants";
import { notificationUser } from "../../../notification/notification";
import FormRegister from "../../Form/FormRegister";

const UserRegister = () => {
  const [state, setState] = useState({
    values: {
      name: "",
      age: "",
      password: "",
      email: "",
    },
    errors: {
      name: "",
      age: "",
      password: "",
      email: "",
    },
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { values, errors } = state;
    let valid = true;
    let message = "";

    for (let key in values) {
      if (values[key] === "") {
        valid = false;
        message += ` ${key} is invalid!`;
      }
    }

    for (let key in errors) {
      if (errors[key] !== "") {
        valid = false;
        message += ` ${key} is invalid!`;
      }
    }

    if (!valid) {
      notificationUser("error", "Error", message);
    } else {
      User.resgister(
        state.values.age,
        state.values.email,
        state.values.name,
        state.values.password
      ).then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/todolist");
        localStorage.setItem("token", res.data.token);
        notificationUser("success", "Register Success");
      });
    }
  };

  const handleValue = (e) => {
    let { name, value, type } = e.target;

    let newValue = { ...state.values, [name]: value };
    let newErrors = { ...state.errors };

    console.log(newValue);
    if (value.trim() === "") {
      newErrors[name] = name + " can not blank !";
    } else {
      newErrors[name] = "";
    }

    if (type === "email") {
      const regexEmail = regex;

      if (!regexEmail.test(value)) {
        newErrors[name] = name + " is invalid !";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "age") {
      const regexNumber = /[0-9]|\./;
      if (!regexNumber.test(value)) {
        newErrors[name] = name + " is invalid !";
      } else {
        newErrors[name] = "";
      }
    }

    if (type === "password") {
      if (value.length < 9) {
        newErrors[name] = name + " is short !";
      } else {
        newErrors[name] = "";
      }
    }

    setState({
      values: newValue,
      errors: newErrors,
    });
  };

  return (
    <FormRegister
      state={state}
      handleSubmit={handleSubmit}
      handleValue={handleValue}
    />
  );
};

export default UserRegister;
