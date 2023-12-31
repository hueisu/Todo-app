import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [statusFiler, setStatusFilter] = useState("all");
  const newTodo = useRef("");
  const [activeTodoCounts, setActiveTodoCounts] = useState(0);

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
        id: uuidv4(),
        name: newTodoName,
        isCompleted: false,
      };

      // TODO:: post to api
      setTodos([...todos, newTodo]);
    }
  }
  useEffect(() => {
    newTodo.current.value = "";
    setActiveTodoCounts(todos.filter((todo) => !todo.isCompleted).length);
  }, [todos]);

  function deleteTodo(id) {
    const newTodos = [...todos].filter((todo) => {
      return todo.id !== id;
    });

    // TODO: post to api
    setTodos(newTodos);
  }

  function toggleStatusFilter(status = "all") {
    setStatusFilter(status);
  }
  function clearCompleted() {
    const newTodos = [...todos].filter(function (todo) {
      return !todo.isCompleted;
    });
    setTodos(newTodos);
  }

  function todoList() {
    const todoList = todos.filter((todo) => {
      if (statusFiler === "active") {
        return todo.isCompleted == false;
      } else if (statusFiler === "completed") {
        return todo.isCompleted == true;
      } else {
        return todo;
      }
    });

    return todoList.map((todo) => {
      return (
        <li className="row nowrap" key={todo.id}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => toggleComplete(todo.id)}
          />
          <div className="todo-name-wrapper row">
            <span
              className={`todo-name ${todo.isCompleted ? "completed" : ""}`}
            >
              {todo.name}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-btn btn"
            >
              <img src="/images/icon-cross.svg" />
            </button>
          </div>
        </li>
      );
    });
  }

  function filterButtons() {
    return (
      <div className="filter-section row">
        <button
          onClick={() => toggleStatusFilter("all")}
          className={statusFiler === "all" ? "option-active" : ""}
        >
          All
        </button>
        <button
          onClick={() => toggleStatusFilter("active")}
          className={statusFiler === "active" ? "option-active" : ""}
        >
          Active
        </button>
        <button
          onClick={() => toggleStatusFilter("completed")}
          className={statusFiler === "completed" ? "option-active" : ""}
        >
          Completed
        </button>
      </div>
    );
  }

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
            <ol>{todos.length !== 0 && todoList()}</ol>
          </div>
          <div className="todo-info row space-between">
            <span>{activeTodoCounts} items left</span>
            <div className="mobile-hide">{filterButtons()}</div>
            <div>
              <button onClick={clearCompleted} className="clear-btn btn">
                Clear Completed
              </button>
            </div>
          </div>
        </div>
        <div className="mobile-show">{filterButtons()}</div>
        <div className="todo-bottom">
          {/*TODO: <span>Drag and drop to reorder list</span> */}
        </div>
      </div>
    </main>
  );
}
