import React, { useState, useEffect } from "react";
import axios from "axios";

// Inline CSS styles for the History component
const historyStyles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "30px",
  },
  foodsSection: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "#2c3e50",
  },
  foodsList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  foodItem: {
    border: "1px solid #ddd",
    padding: "15px",
    width: "45%",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    borderRadius: "8px",
    display: "flex",
    gap: "20px",
  },
  foodImage: {
    flex: 1,
  },
  foodDetails: {
    flex: 2,
  },
  foodDetailsText: {
    margin: "5px 0",
  },
  strong: {
    color: "#333",
  },
  img: {
    borderRadius: "8px",
  },
  button: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "10px",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#3498db",
  },
  error: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#e74c3c",
  },
};

const History = () => {
  const [donatedFoods, setDonatedFoods] = useState([]);
  const [requestedFoods, setRequestedFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get donation history from backend
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/food/history",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the correct auth token
            },
          }
        );
        setDonatedFoods(response.data.donatedFoods);
        setRequestedFoods(response.data.requestedFoods);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch history.");
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleAcceptRequest = async (foodId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/food/accept-request",
        { foodId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the food status in your UI
      const updatedFood = response.data.food;

      setDonatedFoods((prevFoods) =>
        prevFoods.map((food) =>
          food._id === updatedFood._id ? updatedFood : food
        )
      );
      setRequestedFoods((prevFoods) =>
        prevFoods.map((food) =>
          food._id === updatedFood._id ? updatedFood : food
        )
      );
      alert("Food request accepted!");
    } catch (err) {
      console.error("Error accepting request:", err);
      alert("Failed to accept the request.");
    }
  };

  if (loading) {
    return <div style={historyStyles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={historyStyles.error}>{error}</div>;
  }

  return (
    <div style={historyStyles.container}>
      <h2 style={historyStyles.title}>Your Donation History</h2>

      {/* Donated Foods Section */}
      <div style={historyStyles.foodsSection}>
        <h3 style={historyStyles.sectionTitle}>Donated Foods</h3>
        <div style={historyStyles.foodsList}>
          {donatedFoods.length > 0 ? (
            donatedFoods.map((food) => (
              <div style={historyStyles.foodItem} key={food._id}>
                <div style={historyStyles.foodImage}>
                  <img
                    src={food.image}
                    alt={food.foodItem}
                    width="150"
                    style={historyStyles.img}
                  />
                </div>
                <div style={historyStyles.foodDetails}>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Food Item:</strong>{" "}
                    {food.foodItem}
                  </p>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Food Type:</strong>{" "}
                    {food.foodType}
                  </p>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Quantity:</strong>{" "}
                    {food.quantity}
                  </p>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Expiry Date:</strong>{" "}
                    {new Date(food.expiryDate).toLocaleDateString()}
                  </p>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Description:</strong>{" "}
                    {food.description}
                  </p>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Status:</strong>{" "}
                    {food.status}
                  </p>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Donated By:</strong>{" "}
                    {food.donatedBy.firstName}
                  </p>
                  {food.status === "reserved" && (
                    <button
                      style={
                        food.status === "reserved"
                          ? historyStyles.button
                          : {
                              ...historyStyles.button,
                              ...historyStyles.buttonDisabled,
                            }
                      }
                      onClick={() => handleAcceptRequest(food._id)}
                      disabled={food.status !== "reserved"}
                    >
                      Accept Request
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No donated foods found.</p>
          )}
        </div>
      </div>

      {/* Requested Foods Section */}
      <div style={historyStyles.foodsSection}>
        <h3 style={historyStyles.sectionTitle}>Requested Foods</h3>
        <div style={historyStyles.foodsList}>
          {requestedFoods.length > 0 ? (
            requestedFoods.map((food) => (
              <div style={historyStyles.foodItem} key={food._id}>
                <div style={historyStyles.foodImage}>
                  <img
                    src={food.image}
                    alt={food.foodItem}
                    width="150"
                    style={historyStyles.img}
                  />
                </div>
                <div style={historyStyles.foodDetails}>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Food Item:</strong>{" "}
                    {food.foodItem}
                  </p>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Food Type:</strong>{" "}
                    {food.foodType}
                  </p>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Quantity:</strong>{" "}
                    {food.quantity}
                  </p>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Expiry Date:</strong>{" "}
                    {new Date(food.expiryDate).toLocaleDateString()}
                  </p>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Description:</strong>{" "}
                    {food.description}
                  </p>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Status:</strong>{" "}
                    {food.status}
                  </p>
                  <p style={historyStyles.foodDetailsText}>
                    <strong style={historyStyles.strong}>Requested By:</strong>{" "}
                    {food.requestedBy.firstName}
                  </p>
                  {food.status === "reserved" && (
                    <span>Request Pending...</span>
                  )}
                  {food.status === "accepted" && <span>Request Accepted!</span>}
                </div>
              </div>
            ))
          ) : (
            <p>No requested foods found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
