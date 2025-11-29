export default function TodoList({ todos, toggleTodo, deleteTodo, theme }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={`todo ${theme}-todo ${todo.completed ? "completed" : ""}`}>
          <span className="todo-text">{todo.text}</span>
          <div className="todo-buttons">
            <button className={`check-btn ${theme}-button`} onClick={() => toggleTodo(todo.id)}>✔</button>
            <button className={`delete-btn ${theme}-button`} onClick={() => deleteTodo(todo.id)}>🗑</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
