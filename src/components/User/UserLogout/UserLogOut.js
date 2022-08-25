import React from "react";
import { User } from "../../../services/UserServices";
import { notificationUser } from "../../../notification/notification";
import { useNavigate } from "react-router-dom";
const UserLogOut = () => {
  const navigate = useNavigate();
  const Logout = () => {
    User.logout().then((res) => {
      localStorage.clear();
      navigate("/");
      notificationUser("success", "Logout success");
    });
  };
  return (
    <>
      <button className="btn btn-danger" onClick={() => Logout()}>
        <i className="fas fa-sign-out-alt">Log out</i>
      </button>
    </>
  );
};

export default UserLogOut;
