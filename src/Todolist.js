import React, { useState } from "react";
import "./Todo.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Todolist = () => {
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState("");
  const [item, setItem] = useState([]);
  const [todoEditing, setTodoEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const addTask = () => {
    const date = new Date();
    const item = {
      id: Math.floor(Math.random() * 1000),
      content: newItem,
      complete: false,
      time: `${date.getHours()}:${
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      }`,
    };
    if (newItem === "") {
      alert("Xin hãy nhập gì đó");
    } else {
      setItem((prev) => [...prev, item]);
      setNewItem("");
    }
  };

  const removeTask = (todo) => {
    const newArr = item.filter((item) => item.id !== todo.id);
    setItem(newArr);
  };

  const editTodo = (id) => {
    const updateTodos = item.map((todo) => {
      if (todo.id === id) {
        todo.content = editingText;
      }
      return todo;
    });

    setItem(updateTodos);
    setTodoEditing(null);
    setEditingText("");
  };

  const toggleComplete = (id) => {
    const taskComplete = item.map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    setItem(taskComplete);
  };

  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="todo-container">
      <button className="btn btn-danger" onClick={() => Logout()}>
        Log Out
      </button>
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

      <table className="table  table-dark mt-5">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Content</th>
            <th scope="col">Time</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {item.map((todo) => {
            return (
              <>
                <tr>
                  <td>{todo.id}</td>

                  {todoEditing === todo.id ? (
                    <>
                      <td>
                        {" "}
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => editTodo(todo.id)}
                        >
                          Update
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td
                        style={{
                          textDecoration: todo.complete
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {todo.content}
                      </td>
                      <td>{todo.time}</td>
                      <td>
                        <i
                          className="fas fa-trash"
                          onClick={() => removeTask(todo)}
                        ></i>
                        <i
                          className="fas fa-edit ml-3"
                          onClick={() => setTodoEditing(todo.id)}
                        ></i>
                        <input
                          type="checkbox"
                          className="ml-3"
                          onChange={() => toggleComplete(todo.id)}
                        />
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
  );
};

export default Todolist;
