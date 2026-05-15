import React, { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !file) {
      setMessage("⚠️ Please fill all fields!");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("model", file);

    try {
      await axios.post(
        "https://mern-backend-v24l.onrender.com/api/upload",
        formData
      );
      setMessage("✅ Model Uploaded Successfully!");
      setName("");
      setFile(null);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      console.log(error);
      setMessage("❌ Upload Failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "450px",
        background: "white",
        padding: "40px",
        borderRadius: "24px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🎮</div>
          <h1 style={{
            fontSize: "1.8rem",
            fontWeight: "800",
            color: "#1a1a2e",
            marginBottom: "5px",
          }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            Upload 3D models to the gallery
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#333",
              fontSize: "0.9rem",
            }}>
              Model Name
            </label>
            <input
              type="text"
              placeholder="Enter model name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "2px solid #e0e0e0",
                fontSize: "1rem",
                outline: "none",
                transition: "border 0.3s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => e.target.style.border = "2px solid #0f3460"}
              onBlur={(e) => e.target.style.border = "2px solid #e0e0e0"}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#333",
              fontSize: "0.9rem",
            }}>
              GLB File
            </label>
            <div style={{
              border: "2px dashed #e0e0e0",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              transition: "border 0.3s",
            }}>
              <input
                type="file"
                accept=".glb"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📁</div>
                <div style={{ color: "#666", fontSize: "0.9rem" }}>
                  {file ? `✅ ${file.name}` : "Click to choose .glb file"}
                </div>
              </label>
            </div>
          </div>

          {message && (
            <div style={{
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
              textAlign: "center",
              background: message.includes("✅") ? "#e8f5e9" : "#fce4ec",
              color: message.includes("✅") ? "#2e7d32" : "#c62828",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: loading
                ? "#ccc"
                : "linear-gradient(135deg, #1a1a2e, #0f3460)",
              color: "white",
              fontSize: "1rem",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.3s",
              letterSpacing: "0.5px",
            }}
          >
            {loading ? "⏳ Uploading..." : "🚀 Upload Model"}
          </button>
        </form>
      </div>
    </div>
  );
}