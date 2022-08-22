import React, { useState, useEffect } from "react";
import "./Todo.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaginationTodo from "./components/PaginationTodo";
const Todolist = () => {
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState("");

  const [taskCompletd, setTaskCompleted] = useState([]);
  const [todoEditing, setTodoEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todoPerPage] = useState(10);

  const token = localStorage.getItem("token");

  const indexOfLastTodo = currentPage * todoPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todoPerPage;
  const currentTodo = data.slice(indexOfFirstTodo, indexOfLastTodo);

  const getTask = () => {
    axios
      .get(`https://api-nodejs-todolist.herokuapp.com/task`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      });
  };

  const getTaskCompleted = () => {
    axios
      .get(`https://api-nodejs-todolist.herokuapp.com/task?completed=true`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTaskCompleted(res.data.data);
      });
  };

  useEffect(() => {
    getTask();
    getTaskCompleted();
    fetchPagination();
  }, []);

  const addTask = () => {
    if (newItem === "") {
      alert("Xin hãy nhập gì đó");
    } else {
      axios
        .post(
          `https://api-nodejs-todolist.herokuapp.com/task`,
          {
            description: newItem,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setData((prev) => [res.data.data, ...prev]);
          setNewItem("");
        });
    }
  };

  const removeTask = (todo) => {
    axios
      .delete(`https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);

        getTask();
        getTaskCompleted();
      });
  };

  const editTodo = (id) => {
    console.log(id);
    axios
      .put(
        `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
        {
          description: editingText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setTodoEditing(null);
        getTask();
      });
  };

  const toggleComplete = (todo) => {
    axios
      .put(
        `https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`,
        {
          completed: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getTask();
        getTaskCompleted();
      });
  };

  const Logout = () => {
    localStorage.clear();
    navigate("/");
  };

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
  return (
    <>
      <div className="container-fluid">
        <button className="btn btn-danger" onClick={() => Logout()}>
          <i class="fas fa-sign-out-alt">Log out</i>
        </button>
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
                                  {" "}
                                  <input
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
                                <td className="d-flex">
                                  <i
                                    className="fas fa-edit ml-3"
                                    onClick={() => setTodoEditing(todo._id)}
                                  ></i>
                                  <input
                                    type="checkbox"
                                    className="ml-3"
                                    onChange={() => toggleComplete(todo)}
                                  />
                                  <i
                                    className="fas fa-trash ml-3"
                                    onClick={() => removeTask(todo)}
                                  ></i>
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
                                  <i
                                    className="fas fa-trash"
                                    onClick={() => removeTask(todo)}
                                  ></i>
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
