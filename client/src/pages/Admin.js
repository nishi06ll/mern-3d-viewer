import React, { useState } from "react";
import axios from "axios";

export default function Admin() {

  const [name, setName] = useState("");

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name || !file) {

      alert("Please fill all fields");

      return;
    }

    const formData = new FormData();

    formData.append("name", name);

    formData.append("model", file);

    try {

      await axios.post(
        "https://mern-backend-v24l.onrender.com/api/upload",
        formData
      );

      alert("Model Uploaded Successfully");
      
      window.location.href = "/";

      setName("");

      setFile(null);

    } catch (error) {

      console.log(error);

      alert("Upload Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Admin Dashboard
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter Model Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }

            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />

          <input
            type="file"
            accept=".glb"
            onChange={(e) =>
              setFile(e.target.files[0])
            }

            style={{
              marginBottom: "20px",
            }}
          />

          <button
            type="submit"

            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#111",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Upload Model
          </button>

        </form>
      </div>
    </div>
  );
}