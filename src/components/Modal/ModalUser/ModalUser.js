import React from "react";
import { Col, Row } from "antd";
import { Image, Input } from "antd";
const ModalUser = (props) => {
  const {
    avatar,
    image,
    user,
    picture,
    infoEditting,
    setEdittingText,
    edittingText,
    updateName,
    setInfoEditting,
    setImageAction,
    uploadPicture,
  } = props;
  return (
    <>
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

export default ModalUser;
