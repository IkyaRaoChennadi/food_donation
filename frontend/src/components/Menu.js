import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🌱 Share the Love, Fight Food Waste! 🌍</h2>

      <div style={styles.buttonContainer}>
        <Link to="/donate" style={styles.link}>
          <button style={styles.button}>Donate Food</button>
        </Link>

        <Link to="/request" style={styles.link}>
          <button style={styles.button}>Request Food</button>
        </Link>

        {/* ✅ Add History button */}
        <Link to="/history" style={styles.link}>
          <button style={styles.button}>View Donation History</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#ecf0f1",
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "40px",
    textTransform: "uppercase",
    fontFamily: "'Pacifico', cursive", // Added a custom font for a more unique style
    letterSpacing: "2px", // Added letter spacing for extra flair
    lineHeight: "1.4", // Gives the title a more open feel
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
  },
  button: {
    backgroundColor: "#3498db",
    color: "#fff",
    fontSize: "1.2rem",
    padding: "15px 30px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    fontWeight: "600",
  },
};

export default Menu;
