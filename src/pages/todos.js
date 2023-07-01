import { useEffect, useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos(data.todoInfo);
      });
  }, []);

  function toggleComplete(id) {
    const newTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodos(newTodos);
  }

  return (
    <main id="todo-list">
      <div className="todo-card-wrapper">
        <div className="title-section row space-between">
          <h1 className="title">TODO</h1>
          <img alt="toggle-icon" src="/images/icon-moon.svg" width="100%" />
        </div>
        <div className="new-todo-section">
          <input placeholder="Create a new todo..." />
        </div>
        <div className="todo-section">
          <div className="todo-wrapper">
            <ol>
              {todos.length &&
                todos.map((todo) => {
                  return (
                    <li className="row nowrap" key={todo.id}>
                      <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => toggleComplete(todo.id)}
                      />
                      <span
                        className={`todo-name ${
                          todo.isCompleted ? "completed" : ""
                        }`}
                      >
                        {todo.name}
                      </span>
                    </li>
                  );
                })}
            </ol>
          </div>
          <div className="todo-info row space-between">
            <span>5 items left</span>
            <div className="filter-section row">
              <button className="option-active">All</button>
              <button>Active</button>
              <button>Completed</button>
            </div>
            <div>
              <button className="clear-btn btn">Clear Completed</button>
            </div>
          </div>
        </div>
        <div className="todo-bottom">
          {/*TODO: <span>Drag and drop to reorder list</span> */}
        </div>
      </div>
    </main>
  );
}
