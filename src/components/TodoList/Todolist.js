import React, { useState, useEffect } from "react";
import "./Todo.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import PaginationTodo from "../Pagination/PaginationTodo";
import UserInfo from "../User/UserInfo/UserInfo";
import { Modal, Popconfirm } from "antd";
import { Avatar } from "antd";
import SpinLoading from "../SpinLoading/SpinLoading";
import { TodoListService } from "../../services/TodoServices";
import { notificationTodo } from "../../notification/notification";
import UserLogOut from "../User/UserLogout/UserLogOut";
import Todo from "./Todo/Todo";
import TodoComplete from "./TodoComplete/TodoComplete";
import { User } from "../../services/UserServices";

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

  const getTask = async () => {
    await TodoListService.getAllTask(token).then((res) => {
      setData(res.data.data);
    });
  };

  // const getTaskCompleted = () => {
  //   TodoListService.getAllTaskComplete(token).then((res) => {
  //     setTaskCompleted(res.data.data);
  //   });
  // };

  useEffect(() => {
    getTask();
    getUserInfo();
    // getTaskCompleted();
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
      // getTaskCompleted();
    });
  };

  const editTodo = (id) => {
    console.log(id);
    setLoading(true);
    TodoListService.edit(editingText, id, token)
      .then((res) => {
        return getTask();
      })
      .then(() => {
        setTodoEditing(null);
        setLoading(false);
        notificationTodo("success", "Edit Task Success");
      });
  };

  const toggleComplete = (todo) => {
    setLoading(true);
    setChecked(true);
    TodoListService.checkDoneTask(todo._id)
      .then((res) => {
        console.log(res);
        setData((prev) => [res.data.data, ...prev]);
        return getTask();
      })
      .then((res) => {
        // setData(data);
        console.log(res);
        setLoading(false);
        setChecked(false);
        notificationTodo("success", "Check task Complete");
      });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchPagination = async () => {
    // const res = await axios.get(
    //   `https://api-nodejs-todolist.herokuapp.com/task`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    await TodoListService.getAllTask(token).then((res) => {
      console.log(res.data);
      setData(res.data.data);
    });
  };

  const getUserInfo = () => {
    User.getUserLogged().then((res) => {
      console.log(res.data);
      setUser(res.data);
      getAvatarUser(res.data._id);
    });
  };

  const getAvatarUser = (id) => {
    setLoading(true);
    User.getAvatar(id).then((res) => {
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
                  <Todo
                    currentTodo={currentTodo}
                    todoEditing={todoEditing}
                    editingText={editingText}
                    setEditingText={setEditingText}
                    editTodo={editTodo}
                    setTodoEditing={setTodoEditing}
                    toggleComplete={toggleComplete}
                    Popconfirm={Popconfirm}
                    conFirmDeleteTodo={conFirmDeleteTodo}
                    cancelDeleteTodo={cancelDeleteTodo}
                  />
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
                  <TodoComplete
                    currentTodo={currentTodo}
                    todoEditing={todoEditing}
                    editingText={editingText}
                    checked={checked}
                    editTodo={editTodo}
                    Popconfirm={Popconfirm}
                    conFirmDeleteTodo={conFirmDeleteTodo}
                    cancelDeleteTodo={cancelDeleteTodo}
                  />
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
