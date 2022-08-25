import React from "react";

const Todo = (props) => {
  const {
    currentTodo,
    todoEditing,
    editingText,
    setEditingText,
    editTodo,
    setTodoEditing,
    toggleComplete,
    Popconfirm,
    conFirmDeleteTodo,
    cancelDeleteTodo,
  } = props;
  return (
    <>
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
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                    </td>
                    <td></td>
                    <td>
                      <i
                        className="fas fa-upload"
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
    </>
  );
};

export default Todo;
