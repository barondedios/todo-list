import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

export default function Home() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const goToTodos = () => {
    navigate("/todos");
  };

  const handleLogout = () => {
    // Clear any stored auth info here if needed
    navigate("/"); // Go back to login
  };

  return (
    <div className={`home-container ${theme}`} style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Your Todo App!</h1>
      <p>Select below to continue:</p>
      <div style={{ marginTop: "20px" }}>
        <button
          className={`${theme}-button`}
          onClick={goToTodos}
          style={{ marginRight: "10px", padding: "10px 20px", fontSize: "16px" }}
        >
          Go to Todos
        </button>
        <button
          className={`${theme}-button`}
          onClick={handleLogout}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
