import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Book from "./pages/Book";
import Meetings from "./pages/Meetings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(null);

  const theme = {
    light: { bg: "#f5f6fa", card: "#ffffff", text: "#000000", border: "#e0e0e0" },
    dark:  { bg: "#121212", card: "#1e1e1e", text: "#ffffff", border: "#333" },
  };

  const current = dark ? theme.dark : theme.light;

  const btnStyle = (filled) => ({
    padding: "6px 16px",
    borderRadius: "8px",
    border: filled ? "none" : `1px solid ${current.border}`,
    background: filled ? "#4f46e5" : current.card,
    color: filled ? "#fff" : current.text,
    cursor: "pointer",
    fontWeight: "500",
    marginLeft: "10px",
  });

  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          background: current.bg,
          color: current.text,
          fontFamily: "Inter, Arial, sans-serif",
          transition: "all 0.2s ease",
        }}
      >
        {/* NAVBAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 30px",
            background: current.card,
            borderBottom: `1px solid ${current.border}`,
            borderRadius: "0 0 12px 12px",
          }}
        >
          {/* LOGO */}
          <div style={{ fontWeight: "bold", fontSize: "18px" }}>Calendly Clone</div>

          {/* NAV LINKS */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ marginRight: "20px", textDecoration: "none", color: current.text, fontWeight: "500" }}>
              Dashboard
            </Link>
            <Link to="/meetings" style={{ marginRight: "20px", textDecoration: "none", color: current.text, fontWeight: "500" }}>
              Meetings
            </Link>

            <button onClick={() => setDark(!dark)} style={btnStyle(false)}>
              {dark ? "Light" : "Dark"}
            </button>

            {user ? (
              <>
                <span style={{ marginLeft: 14, fontSize: 14, color: current.text }}>
                  Hi, {user.name}
                </span>
                <button onClick={() => setUser(null)} style={btnStyle(false)}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login"><button style={btnStyle(false)}>Log In</button></Link>
                <Link to="/signup"><button style={btnStyle(true)}>Sign Up</button></Link>
              </>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ padding: "30px" }}>
          <Routes>
            <Route path="/" element={<Dashboard theme={current} />} />
            <Route path="/book/:slug" element={<Book theme={current} />} />
            <Route path="/meetings" element={<Meetings theme={current} />} />
            <Route path="/login" element={<Login theme={current} onLogin={setUser} />} />
            <Route path="/signup" element={<Signup theme={current} onLogin={setUser} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
