import React from "react";

const FormRegister = (props) => {
  const { state, handleSubmit, handleValue } = props;
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign Up</h3>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => handleSubmit(e)}>
                <span className="text text-danger">{state.errors.name}</span>
                <div className="input-group form-group mt-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    onChange={(e) => handleValue(e)}
                  />
                </div>
                <span className="text text-danger">{state.errors.email}</span>
                <div className="input-group form-group mt-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => handleValue(e)}
                  />
                </div>
                <span className="text text-danger">
                  {state.errors.password}
                </span>
                <div className="input-group form-group mt-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handleValue(e)}
                  />
                </div>
                <span className="text text-danger">{state.errors.age}</span>
                <div className="input-group form-group mt-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Age"
                    name="age"
                    onChange={(e) => handleValue(e)}
                  />
                </div>

                <div
                  className="form-group d-flex justify-content-center"
                  style={{ marginTop: "45px" }}
                >
                  <button className="btn btn-success">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormRegister;
