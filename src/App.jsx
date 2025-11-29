import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from "./features/todos/todosSlice";
import "./styles/main.css";
import "./styles/corner.css";
import useTodos from "./hooks/useTodos";
import useTheme from "./hooks/useTheme";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import ThemeSelector from "./components/ThemeSelector";
import Clock from "./components/Clock";

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div id="header">
        <ThemeSelector setTheme={setTheme} />
        <h1 id="title">Just do it.<div id="border"></div></h1>
      </div>

      <div id="form">
        <TodoInput addTodo={addTodo} theme={theme} />
      </div>

      <Clock />

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        theme={theme}
      />
    </>
  );
}
