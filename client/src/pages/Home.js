import React, { useEffect, useState } from "react";
import axios from "axios";
import ModelViewer from "../components/ModelViewer";

export default function Home() {
  const [models, setModels] = useState([]);

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
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Explore 3D Models
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "30px",
        }}
      >
        {models.map((model) => (
  <div
    key={model._id}
    style={{
      background: "white",
      borderRadius: "20px",
      padding: "20px",
      boxShadow:
        "0 10px 25px rgba(0,0,0,0.1)",
      transition: "0.3s",
      cursor: "pointer",
    }}

    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-10px)";
    }}

    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0px)";
    }}
  >
    <h2
      style={{
        marginBottom: "20px",
        textAlign: "center",
      }}
    >
      {model.name}
    </h2>

    <ModelViewer
  modelUrl={
    model.fileUrl.startsWith("http")
      ? model.fileUrl
      : `https://mern-backend-v24l.onrender.com/uploads/${model.fileUrl}`
  }
/>
  </div>
))}
      </div>
    </div>
  );
}