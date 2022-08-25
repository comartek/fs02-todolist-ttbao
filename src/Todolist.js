import React, { useState, useEffect } from "react";
import "./Todo.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import PaginationTodo from "./components/PaginationTodo";
import UserInfo from "./components/User/UserInfo/UserInfo";
import { Modal, Popconfirm } from "antd";
import { Avatar } from "antd";
import SpinLoading from "./components/SpinLoading/SpinLoading";
import { TodoListService } from "./services/TodoServices";
import { notificationTodo } from "./notification/notification";
import UserLogOut from "./components/User/UserLogout/UserLogOut";
const Todolist = () => {
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState("");

  const [taskCompletd, setTaskCompleted] = useState([]);
  const [todoEditing, setTodoEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todoPerPage] = useState(10);
  const [user, setUser] = useState("");
  const token = localStorage.getItem("token");
  const [checked, setChecked] = useState(true);
  const [image, setImage] = useState("");

  //loading
  const [loading, setLoading] = useState(false);

  //popup delete todo
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const conFirmDeleteTodo = (todo) => {
    removeTask(todo);
  };

  const cancelDeleteTodo = (id) => {};

  //pagination
  const indexOfLastTodo = currentPage * todoPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todoPerPage;
  const currentTodo = data.slice(indexOfFirstTodo, indexOfLastTodo);

  //modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getTask = () => {
    TodoListService.getAllTask(token).then((res) => {
      setData(res.data.data);
    });
  };

  const getTaskCompleted = () => {
    TodoListService.getAllTaskComplete(token).then((res) => {
      setTaskCompleted(res.data.data);
    });
  };

  useEffect(() => {
    getTask();
    getUserInfo();
    getTaskCompleted();
    fetchPagination();
  }, []);

  const addTask = () => {
    if (newItem === "") {
      notificationTodo("warning", "Input cannot Blank!!!");
    } else {
      setLoading(true);
      TodoListService.add(newItem).then((res) => {
        setData((prev) => [res.data.data, ...prev]);
        setNewItem("");
        setLoading(false);
        notificationTodo("success", "Create Task success");
      });
    }
  };

  const removeTask = (todo) => {
    setLoading(true);
    TodoListService.delete(todo._id).then((res) => {
      console.log(res);
      console.log(res.data);
      setLoading(false);
      notificationTodo("success", "Remove Task Success");
      const newData = data.filter((item) => item._id !== todo._id);
      setData(newData);
      getTaskCompleted();
    });
  };

  const editTodo = (id) => {
    console.log(id);
    setLoading(true);
    TodoListService.edit(editingText, id).then((res) => {
      setTodoEditing(null);
      getTask();
      setLoading(false);
      notificationTodo("success", "Edit Task Success");
    });
  };

  const toggleComplete = (todo) => {
    setLoading(true);
    setChecked(true);
    TodoListService.checkDoneTask(todo._id).then((res) => {
      getTask();
      console.log(res.data);
      setData(data);
      setLoading(false);
      setChecked(false);
      notificationTodo("success", "Check task Complete");
    });
  };

  // const Logout = () => {
  //   localStorage.clear();
  //   navigate("/");
  // };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchPagination = async () => {
    const res = await axios.get(
      `https://api-nodejs-todolist.herokuapp.com/task`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
    setData(res.data.data);
  };

  const getUserInfo = () => {
    axios
      .get(
        `https://api-nodejs-todolist.herokuapp.com/user/me`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        getAvatarUser(res.data._id);
      });
  };

  const getAvatarUser = (id) => {
    setLoading(true);
    axios
      .get(`https://api-nodejs-todolist.herokuapp.com/user/${id}/avatar`)
      .then((res) => {
        console.log(res.request.responseURL);
        setImage(res.request.responseURL);
        setLoading(false);
      });
  };
  return (
    <>
      {loading ? <SpinLoading /> : ""}
      <Modal
        title="User Info"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UserInfo user={user} image={image} />
      </Modal>

      <div className="container-fluid">
        <UserLogOut />
        <div className="info-user d-flex justify-content-end align-items-center">
          <Avatar src={image} onClick={showModal} size={64} />
        </div>

        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <div className="todo-container">
              <div className="tasks"></div>
              <div className="create-task d-flex">
                <input
                  className="form-control"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <button className="btn btn-success" onClick={() => addTask()}>
                  Add Task
                </button>
              </div>

              <table className="table  table-dark mt-5 text-center">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Content</th>
                    <th scope="col">Time</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTodo
                    .filter((todo) => todo.completed === false)
                    .map((todo, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>

                            {todoEditing === todo._id ? (
                              <>
                                <td>
                                  <input
                                    style={{ color: "black" }}
                                    type="text"
                                    value={editingText}
                                    onChange={(e) =>
                                      setEditingText(e.target.value)
                                    }
                                  />
                                </td>
                                <td></td>
                                <td>
                                  <i
                                    class="fas fa-upload"
                                    onClick={() => editTodo(todo._id)}
                                  ></i>
                                </td>
                              </>
                            ) : (
                              <>
                                <td
                                  style={{
                                    textDecoration: todo.completed
                                      ? "line-through"
                                      : "none",
                                  }}
                                >
                                  {todo.description}
                                </td>
                                <td>{todo?.createdAt?.slice(0, 10)}</td>
                                <td className="d-flex justify-content-center">
                                  <i
                                    className="fas fa-edit ml-3"
                                    onClick={() => setTodoEditing(todo._id)}
                                  ></i>
                                  <input
                                    type="checkbox"
                                    className="ml-3"
                                    onChange={() => toggleComplete(todo)}
                                  />

                                  <Popconfirm
                                    placement="bottomLeft"
                                    title="Are you sure delete this task?"
                                    onConfirm={() => {
                                      conFirmDeleteTodo(todo);
                                    }}
                                    onCancel={() => {
                                      cancelDeleteTodo();
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <i className="fas fa-trash ml-3"></i>
                                  </Popconfirm>
                                </td>
                              </>
                            )}
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>

              <h5 className="text-center text-success">Task Completed</h5>
              <table className="table table-dark mt-3 text-center">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Content</th>
                    <th scope="col">Time</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentTodo
                    .filter((todo) => todo.completed === true)
                    .map((todo, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>

                            {todoEditing === todo._id ? (
                              <>
                                <td>
                                  {" "}
                                  <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) =>
                                      setEditingText(e.target.value)
                                    }
                                    checked={checked}
                                  />
                                </td>
                                <td>
                                  <button
                                    className="btn btn-success"
                                    onClick={() => editTodo(todo)}
                                  >
                                    Update
                                  </button>
                                </td>
                              </>
                            ) : (
                              <>
                                <td
                                  style={{
                                    textDecoration: todo.completed
                                      ? "line-through"
                                      : "none",
                                  }}
                                >
                                  {todo.description}
                                </td>
                                <td>{todo?.createdAt?.slice(0, 10)}</td>
                                <td>
                                  <Popconfirm
                                    placement="bottomLeft"
                                    title="Are you sure delete this task?"
                                    onConfirm={() => {
                                      conFirmDeleteTodo(todo);
                                    }}
                                    onCancel={() => {
                                      cancelDeleteTodo();
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <i className="fas fa-trash ml-3"></i>
                                  </Popconfirm>
                                </td>
                              </>
                            )}
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <PaginationTodo
          todoPerPage={todoPerPage}
          totalTodo={data.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};
export default Todolist;
