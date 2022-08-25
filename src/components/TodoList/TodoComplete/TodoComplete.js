import React from "react";

const TodoComplete = (props) => {
  const {
    currentTodo,
    todoEditing,
    setEditingText,
    checked,
    editTodo,
    Popconfirm,
    conFirmDeleteTodo,
    cancelDeleteTodo,
    editingText,
  } = props;
  return (
    <>
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
                        onChange={(e) => setEditingText(e.target.value)}
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
    </>
  );
};

export default TodoComplete;
