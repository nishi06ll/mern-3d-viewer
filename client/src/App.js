import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>

      <div
        style={{
          padding: "20px",
          background: "#111",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "white" }}>
          3D Model Viewer
        </h2>

        <div>
          <Link
            to="/"
            style={{
              color: "white",
              marginRight: "20px",
              textDecoration: "none",
            }}
          >
            Home
          </Link>

          <Link
            to="/admin"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Admin
          </Link>
        </div>
      </div>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<Admin />} />

      </Routes>

      <div
  style={{
    background: "#111",
    color: "white",
    textAlign: "center",
    padding: "15px",
  }}
>
  MERN 3D Viewer © 2026
</div>

    </BrowserRouter>
  );
}

export default App;