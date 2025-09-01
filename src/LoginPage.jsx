import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded login check
    if (username === "admin" && password === "password123") {
      onLogin(); // ✅ triggers App.jsx state change
    } else {
      setError("Invalid username or password.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    paddingLeft: "45px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "white",
    outline: "none",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
    transition: "border-color 0.3s ease, background-color 0.3s ease",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: 'url("/ba.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        fontFamily: "Lato, sans-serif",
        padding: "20px",
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
        }}
      ></div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "100px",
          zIndex: 1,
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        {/* Left Side: Intro Text */}
        <div
          style={{
            color: "white",
            textAlign: "left",
            textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
            width: "500px",
            padding: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "5rem",
              fontWeight: "bold",
              marginBottom: "15px",
              lineHeight: "1.1",
              letterSpacing: "2px",
              fontFamily: "Playfair Display, serif",
            }}
          >
            Welcome
          </h1>
          <p
            style={{
              fontSize: "1.8rem",
              opacity: 0.9,
              marginBottom: "25px",
              fontFamily: "Lato, sans-serif",
            }}
          >
            Your Personal AI Assistant is here to make life easier.
          </p>
          <p
            style={{
              fontSize: "1.2rem",
              lineHeight: "1.5",
              opacity: 0.8,
            }}
          >
            Get quick answers, spark new ideas, and enjoy personalized support.
          </p>
        </div>

        {/* Right Side: Login Card */}
        <div
          style={{
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            width: "400px",
            maxWidth: "90%",
            textAlign: "center",
            backdropFilter: "blur(25px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ marginBottom: "15px" }}>
            <img src="/ms.jpg" alt="PersonalAI Logo" style={{ width: "80px", marginBottom: "10px" }} />
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
                color: "white",
                textShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              PersonalAI
            </h2>
          </div>

          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "25px", fontSize: "1rem" }}>
            Login to Get Started
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ position: "relative" }}>
              <Mail
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,0.8)",
                }}
                size={20}
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                required
              />
            </div>
            <div style={{ position: "relative" }}>
              <Lock
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,0.8)",
                }}
                size={20}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                required
              />
            </div>
            {error && (
              <p style={{ color: "#ff6b6b", marginTop: "-10px", marginBottom: "10px" }}>{error}</p>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "1.1rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <LogIn size={20} /> Login
            </button>
          </form>

          <div style={{ marginTop: "20px", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>
            <a href="#" style={{ color: "#007bff", textDecoration: "none" }}>
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
