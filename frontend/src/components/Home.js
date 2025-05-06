import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>
          Join the Movement: Share the Love, Share the Food
        </h1>
        <p style={styles.description}>
          Together, we can make a difference in the world by fighting hunger and
          reducing waste.
        </p>
        <div style={styles.linkContainer}>
          <Link to="/login" style={styles.link}>
            Sign In
          </Link>
          <span style={styles.separator}>|</span>
          <Link to="/register" style={styles.link}>
            Get Started
          </Link>
        </div>
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
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "20px",
    textTransform: "uppercase",
    lineHeight: "1.2",
  },
  description: {
    fontSize: "1.2rem",
    color: "#7f8c8d",
    marginBottom: "30px",
    fontStyle: "italic",
  },
  linkContainer: {
    fontSize: "1.2rem",
    color: "#3498db",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#3498db",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
  separator: {
    fontSize: "1.5rem",
    color: "#7f8c8d",
  },
};

export default Home;
