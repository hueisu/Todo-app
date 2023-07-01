import { useEffect, useRef, useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const newTodo = useRef("");

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

  function createNewTodo() {
    const newTodoName = newTodo.current.value;
    if (newTodoName) {
      const newTodo = {
        id: todos.length,
        name: newTodoName,
        isCompleted: false,
      };

      // TODO:: post to api
      setTodos([...todos, newTodo]);
    }
  }
  useEffect(() => {
    newTodo.current.value = "";
  }, [todos]);

  return (
    <main id="todo-list">
      <div className="todo-card-wrapper">
        <div className="title-section row space-between">
          <h1 className="title">TODO</h1>
          <img alt="toggle-icon" src="/images/icon-moon.svg" width="100%" />
        </div>
        <div className="new-todo-section row center">
          <div>
            <button className="create-btn" onClick={createNewTodo}>
              +
            </button>
          </div>
          <input
            type="text"
            className="new-todo-name"
            placeholder="Create a new todo..."
            ref={newTodo}
          />
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
                      <div className="todo-name-wrapper row">
                        <span
                          className={`todo-name ${
                            todo.isCompleted ? "completed" : ""
                          }`}
                        >
                          {todo.name}
                        </span>
                        <button className="delete-btn btn">
                          <img src="/images/icon-cross.svg" />
                        </button>
                      </div>
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
