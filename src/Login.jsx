import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.email) emailRef.current.focus();
      else if (validationErrors.password) passwordRef.current.focus();
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const user = users.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (!user) {
      setErrors({ general: "❌ Invalid email or password" });
      return;
    }

    // Save logged-in user
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert(`✅ Welcome back, ${user.name}!`);
    navigate("/cart");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>🔐 Welcome Back</h2>
        <p className="subtitle">Please login to continue</p>

        {errors.general && <p className="error-text">{errors.general}</p>}

        <input
          type="email"
          name="email"
          placeholder="📧 Enter your Email"
          value={loginData.email}
          onChange={handleChange}
          ref={emailRef}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="🔑 Enter your Password"
          value={loginData.password}
          onChange={handleChange}
          ref={passwordRef}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit">Login 🚀</button>
        <p className="signup-text">
          Don’t have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
