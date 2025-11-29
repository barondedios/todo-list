import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme"; // optional, if you want theme styles

export default function Login() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme(); // optional theme hook

  // ✅ Use Vite environment variables
  const USERS_URL = import.meta.env.VITE_USERS_URL;
  const VALID_PASSWORD = import.meta.env.VITE_PASSWORD;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(USERS_URL);
        setUsers(response.data.slice(0, 3)); // Limit to first 3 users
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [USERS_URL]);

  const handleLogin = (e) => {
    e.preventDefault();

    const userExists = users.find((user) => user.username === username);

    if (!userExists) {
      setError("Invalid username");
      return;
    }

    if (password !== VALID_PASSWORD) {
      setError("Invalid password");
      return;
    }

    setError("");
    navigate("/home"); // Redirect to Home page instead of /todos
  };

  return (
    <div className={`login-container ${theme}`}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
