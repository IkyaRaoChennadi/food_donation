import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation to check the current route

const Header = () => {
  const navigate = useNavigate(); // Corrected to useNavigate
  const location = useLocation(); // Get the current route

  const handleLogout = () => {
    // Remove the token from localStorage or sessionStorage
    localStorage.removeItem("token");

    // Redirect the user to the login page
    navigate("/login"); // Corrected to use navigate instead of history.push
  };

  // Don't render the logout button on the Home page
  if (location.pathname === "/") {
    return (
      <header style={headerStyles.container}>
        <h1>Food Donation Platform</h1>
        {/* You can add additional elements like Login/Register links here */}
      </header>
    );
  }

  // Render the logout button on all other pages
  return (
    <header style={headerStyles.container}>
      <h1>Food Donation Platform</h1>
      <div style={headerStyles.nav}>
        <button onClick={handleLogout} style={headerStyles.logoutButton}>
          Logout
        </button>
      </div>
    </header>
  );
};

const headerStyles = {
  container: {
    backgroundColor: "#3498db",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Header;
