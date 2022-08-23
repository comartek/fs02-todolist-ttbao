import React, { useState } from "react";
import { Col, Row } from "antd";
import { Image, Input } from "antd";
import axios from "axios";
const UserInfo = (props) => {
  const { user } = props;
  const [picture, setPicture] = useState({});
  const [avatar, setAvatar] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const token = localStorage.getItem("token");
  const [infoEditting, setInfoEditting] = useState(false);
  const [edittingText, setEdittingText] = useState("");

  const uploadPicture = (e) => {
    setPicture({
      /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
      picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0],
    });
  };
  const setImageAction = async (event) => {
    event.preventDefault();

    const formData = new FormData().append("file", picture.pictureAsFile);

    console.log(picture.pictureAsFile);

    const data = await axios
      .post(
        `https://api-nodejs-todolist.herokuapp.com/user/me/avatar`,
        {
          body: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
    const uploadedImage = await data.json();
    if (uploadedImage) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
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
      <Row>
        <Col span={12}>
          {selectedImage ? (
            <>
              <img
                alt="not fount"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
            </>
          ) : (
            <>
              <Image
                width={200}
                src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
              />
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
                <input type="file" name="image" onChange={uploadPicture} />
                <br />
                <br />
                <button type="submit" name="upload">
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
