import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function Navbar() {
  const location = useLocation();

  return (
    <nav style={{
      background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
      padding: "0 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "65px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    }}>
      <Link to="/" style={{
        color: "white",
        textDecoration: "none",
        fontSize: "1.4rem",
        fontWeight: "800",
        letterSpacing: "1px",
      }}>
        🎮 3D Viewer
      </Link>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/" style={{
          color: location.pathname === "/" ? "white" : "rgba(255,255,255,0.6)",
          textDecoration: "none",
          padding: "8px 20px",
          borderRadius: "25px",
          fontWeight: "600",
          fontSize: "0.9rem",
          background: location.pathname === "/" ? "rgba(255,255,255,0.15)" : "transparent",
          transition: "all 0.3s",
        }}>
          🏠 Home
        </Link>

        <Link to="/admin" style={{
          color: location.pathname === "/admin" ? "white" : "rgba(255,255,255,0.6)",
          textDecoration: "none",
          padding: "8px 20px",
          borderRadius: "25px",
          fontWeight: "600",
          fontSize: "0.9rem",
          background: location.pathname === "/admin" ? "rgba(255,255,255,0.15)" : "transparent",
          transition: "all 0.3s",
        }}>
          ⚙️ Admin
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}