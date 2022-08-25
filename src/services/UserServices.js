import axios from "axios";
import { DOMAIN } from "../contants/contants";

export class UserService {
  login = (email, password) => {
    return axios({
      url: `${DOMAIN}/user/login`,
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  resgister = (name, email, password, age) => {
    return axios({
      url: `${DOMAIN}/user/register`,
      method: "POST",
      data: {
        email: email,
        password: password,
        age: age,
        name: name,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  logout = (token) => {
    return axios({
      url: `${DOMAIN}/user/logout`,
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  getUserLogged = () => {
    console.log();
    const token = localStorage.getItem("token");
    return axios({
      url: `${DOMAIN}/user/me`,
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  getAvatar = (id) => {
    return axios({
      url: `${DOMAIN}/user/${id}/avatar`,
      method: "GET",
    });
  };
}

export const User = new UserService();
