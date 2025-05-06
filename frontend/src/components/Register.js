import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, password, confirmPassword } =
      formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Create Account</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {[
          "firstName",
          "lastName",
          "email",
          "phone",
          "password",
          "confirmPassword",
        ].map((field) => (
          <input
            key={field}
            type={
              field.toLowerCase().includes("password")
                ? "password"
                : field === "email"
                ? "email"
                : "text"
            }
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={
              field === "confirmPassword"
                ? "Confirm Password"
                : field === "firstName"
                ? "First Name"
                : field === "lastName"
                ? "Last Name"
                : field === "phone"
                ? "Phone Number"
                : field.charAt(0).toUpperCase() + field.slice(1)
            }
            style={styles.input}
          />
        ))}
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    marginTop: "10px",
    color: "red",
    textAlign: "center",
  },
};

export default Register;
