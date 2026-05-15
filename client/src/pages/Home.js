import React, { useEffect, useState } from "react";
import axios from "axios";
import ModelViewer from "../components/ModelViewer";

export default function Home() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const res = await axios.get(
        "https://mern-backend-v24l.onrender.com/api/models"
      );
      setModels(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", background: "#f0f2f5", minHeight: "100vh" }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: "10px",
        fontSize: "2rem",
        fontWeight: "800",
        color: "#1a1a2e",
      }}>
        🎮 3D Model Gallery
      </h1>

      <p style={{
        textAlign: "center",
        color: "#666",
        marginBottom: "40px",
        fontSize: "1rem",
      }}>
        Interact with 3D models — drag to rotate, scroll to zoom!
      </p>

      {loading ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          fontSize: "1.2rem",
          color: "#666",
        }}>
          ⏳ Loading models...
        </div>
      ) : models.length === 0 ? (
        <div style={{
          textAlign: "center",
          color: "#999",
          fontSize: "1.1rem",
          marginTop: "100px",
        }}>
          No models yet. Upload one from Admin page!
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}>
          {models.map((model) => (
            <div key={model._id} style={{
              background: "white",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}>
                <h2 style={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  color: "#1a1a2e",
                }}>
                  {model.name}
                </h2>
                <span style={{
                  background: "#e8f4fd",
                  color: "#2196F3",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                }}>
                  3D
                </span>
              </div>

              <ModelViewer
                modelUrl={
                  model.fileUrl.startsWith("http")
                    ? model.fileUrl
                    : `https://mern-backend-v24l.onrender.com/uploads/${model.fileUrl}`
                }
              />

              <p style={{
                textAlign: "center",
                color: "#999",
                fontSize: "0.8rem",
                marginTop: "10px",
              }}>
                🖱️ Drag to rotate • Scroll to zoom
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}