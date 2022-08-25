import React, { useState } from "react";
import { Col, Row } from "antd";
import { Image, Input } from "antd";
import axios from "axios";
import SpinLoading from "../../SpinLoading/SpinLoading";
import { notification } from "antd";
import ModalUser from "../../Modal/ModalUser/ModalUser";

const UserInfo = (props) => {
  const { user, image } = props;
  const [picture, setPicture] = useState({});
  const [avatar, setAvatar] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const token = localStorage.getItem("token");
  const [infoEditting, setInfoEditting] = useState(false);
  const [edittingText, setEdittingText] = useState("");
  const [loading, setLoading] = useState(false);

  const openNotificationWithIcon = (type) => {
    if (type === "success") {
      notification["success"]({
        message: "Success",
      });
    } else if (type === "warning") {
      notification["warning"]({
        message: "Warning!!!",
        description: "File upload is blank!",
      });
    }
  };

  const uploadPicture = (e) => {
    setPicture({
      /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
      picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0],
    });
    console.log(picture);
  };
  const setImageAction = async (event) => {
    event.preventDefault();
    if (picture.pictureAsFile === undefined) {
      openNotificationWithIcon("warning");
    } else {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const formdata = new FormData();
      formdata.append("avatar", picture.pictureAsFile);
      axios
        .post(
          `https://api-nodejs-todolist.herokuapp.com/user/me/avatar`,
          formdata,
          { headers }
        )
        .then((res) => {
          openNotificationWithIcon("success");
          setLoading(false);
          setAvatar(picture.picturePreview);
          setPicture("");
        });
    }
  };

  const updateName = () => {
    axios
      .put(
        `https://api-nodejs-todolist.herokuapp.com/user/me`,
        {
          name: edittingText,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setInfoEditting(null);
        setInfoEditting(res.data.name);
      });
  };

  return (
    <>
      {loading ? <SpinLoading /> : ""}
      <ModalUser
        avatar={avatar}
        image={image}
        user={user}
        picture={picture}
        infoEditting={infoEditting}
        setEdittingText={setEdittingText}
        edittingText={edittingText}
        updateName={updateName}
        setInfoEditting={setInfoEditting}
        setImageAction={setImageAction}
        uploadPicture={uploadPicture}
      />
    </>
  );
};

export default UserInfo;
