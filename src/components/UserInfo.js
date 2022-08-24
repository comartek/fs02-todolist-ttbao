import React, { useState } from "react";
import { Col, Row } from "antd";
import { Image, Input } from "antd";
import axios from "axios";
import SpinLoading from "./SpinLoading";
import { notification } from "antd";

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
      <Row>
        <Col span={12}>
          {!avatar ? (
            <>
              <Image width={200} src={image} />
            </>
          ) : (
            <>
              <Image width={200} src={avatar} />
            </>
          )}
        </Col>
        <Col span={12}>
          <div className="name d-flex align-items-center justify-content-between">
            {infoEditting ? (
              <>
                Name:{" "}
                <Input
                  placeholder=""
                  onChange={(e) => setEdittingText(e.target.value)}
                  value={edittingText}
                />
                <i class="fas fa-upload ml-2" onClick={() => updateName()}></i>
              </>
            ) : (
              <>
                <span>Name: {user.name || edittingText} </span>
                <i
                  class="fas fa-edit"
                  onClick={() => setInfoEditting(true)}
                ></i>
              </>
            )}
          </div>
          <div className="age d-flex align-items-center justify-content-between mt-2">
            <span>Age: {user.age} </span>
            <i class="fas fa-edit"></i>
          </div>
          <div className="email d-flex align-items-center justify-content-between mt-2">
            <span>Email: {user.email} </span>
            <i class="fas fa-edit"></i>
          </div>

          <div>
            <div className="content landing">
              <form onSubmit={setImageAction}>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => uploadPicture(e)}
                />
                <br />
                <br />
                <button type="submit" name="upload" className="btn btn-success">
                  Upload
                </button>
              </form>
            </div>
          </div>
          <div className="image-preview mt-3">
            <Image width={200} src={picture.picturePreview} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UserInfo;
