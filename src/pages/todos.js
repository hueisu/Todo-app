export default function Todos() {
  const todoArray = [
    "Complete online JavaScript course",
    "Jog around the park 3x",
    "10 minutes meditation",
    "Read for 1 hour",
    "Pick up groceries",
    "Complete Todo App on Frontend Mentor",
  ];
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
              {todoArray.map((todo, index) => {
                return (
                  <li className="row nowrap" key={index}>
                    <input type="checkbox" />
                    <span
                      className={`todo-name ${index === 0 ? "completed" : ""}`}
                    >
                      {todo}
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
