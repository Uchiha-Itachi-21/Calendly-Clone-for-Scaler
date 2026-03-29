import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login({ theme, onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("http://localhost:3000/auth/login", form);
      onLogin(data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <div
        style={{
          background: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 12,
          padding: 32,
        }}
      >
        <h2 style={{ marginBottom: 24, color: theme.text }}>Log In</h2>
        <form onSubmit={handleSubmit}>
          {["email", "password"].map((field) => (
            <input
              key={field}
              type={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required
              style={{
                display: "block",
                width: "100%",
                marginBottom: 14,
                padding: "10px 12px",
                borderRadius: 8,
                border: `1px solid ${theme.border}`,
                background: theme.bg,
                color: theme.text,
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
          ))}
          {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "none",
              background: "#4f46e5",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 15,
            }}
          >
            Log In
          </button>
        </form>
        <p style={{ marginTop: 16, color: theme.text, fontSize: 14 }}>
          No account?{" "}
          <Link to="/signup" style={{ color: "#4f46e5" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
