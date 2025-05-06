/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestFood.css"; // Import your CSS file

const RequestFood = () => {
  const [foods, setFoods] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchFoods = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/food", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoods(res.data);
    } catch (err) {
      console.error("Error fetching food:", err);
    }
  };

  const handleRequest = async (foodId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/food/request",
        { foodId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
      fetchFoods();
    } catch (err) {
      console.error("Request failed:", err);
      alert("Failed to request food.");
    }
  };

  const handleCancelRequest = async (foodId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/food/cancel-request",
        { foodId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
      fetchFoods();
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Failed to cancel request.");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="request-food-container">
      <h2>Available Food</h2>
      {foods.map((food) => {
        const isDonor = food.donatedBy?._id === userId;

        if (isDonor) {
          return (
            <div key={food._id} className="food-item">
              <p>
                <strong>Item:</strong> {food.foodItem}
              </p>
              <p>
                <strong>Type:</strong> {food.foodType}
              </p>
              <p>
                <strong>Quantity:</strong> {food.quantity}
              </p>
              <p>
                <strong>Expiry:</strong>{" "}
                {new Date(food.expiryDate).toDateString()}
              </p>
              <p>
                <strong>Status:</strong> {food.status}
              </p>
              <p>
                <strong>Donated by:</strong> You
              </p>
              {food.status === "reserved" && food.requestedBy?.firstName ? (
                <p className="reserved">
                  Requested by {food.requestedBy.firstName}
                </p>
              ) : (
                <p className="not-requested">Not yet requested</p>
              )}
            </div>
          );
        }

        if (food.status === "reserved" && food.requestedBy?._id === userId) {
          return (
            <div key={food._id} className="food-item">
              <p>
                <strong>Item:</strong> {food.foodItem}
              </p>
              <p>
                <strong>Status:</strong> Reserved by you
              </p>
              <button onClick={() => handleCancelRequest(food._id)}>
                Cancel Request
              </button>
            </div>
          );
        }

        if (food.status === "available") {
          return (
            <div key={food._id} className="food-item">
              <p>
                <strong>Item:</strong> {food.foodItem}
              </p>
              <p>
                <strong>Type:</strong> {food.foodType}
              </p>
              <p>
                <strong>Quantity:</strong> {food.quantity}
              </p>
              <p>
                <strong>Expiry:</strong>{" "}
                {new Date(food.expiryDate).toDateString()}
              </p>
              <p>
                <strong>Donated by:</strong> {food.donatedBy?.firstName}
              </p>
              <button onClick={() => handleRequest(food._id)}>Request</button>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default RequestFood;
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestFood.css";

const RequestFood = () => {
  const [foods, setFoods] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchFoods = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/food", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoods(res.data);
    } catch (err) {
      console.error("Error fetching food:", err);
    }
  };

  const handleRequest = async (foodId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/food/request",
        { foodId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
      fetchFoods();
    } catch (err) {
      console.error("Request failed:", err);
      alert("Failed to request food.");
    }
  };

  const handleCancelRequest = async (foodId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/food/cancel-request",
        { foodId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
      fetchFoods();
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Failed to cancel request.");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="request-food-container">
      <h2>Available Food</h2>
      {foods.map((food) => {
        const isDonor = food.donatedBy?._id === userId;

        // Donated by this user
        if (isDonor) {
          return (
            <div key={food._id} className="food-item">
              {food.image && (
                <img
                  src={food.image}
                  alt={food.foodItem}
                  className="food-image"
                />
              )}
              <p>
                <strong>Item:</strong> {food.foodItem}
              </p>
              <p>
                <strong>Type:</strong> {food.foodType}
              </p>
              <p>
                <strong>Quantity:</strong> {food.quantity}
              </p>
              <p>
                <strong>Expiry:</strong>{" "}
                {new Date(food.expiryDate).toDateString()}
              </p>
              <p>
                <strong>Status:</strong> {food.status}
              </p>
              <p>
                <strong>Donated by:</strong> You
              </p>
              {food.status === "reserved" && food.requestedBy?.firstName ? (
                <p className="reserved">
                  Requested by {food.requestedBy.firstName}
                </p>
              ) : (
                <p className="not-requested">Not yet requested</p>
              )}
            </div>
          );
        }

        // Reserved by this user
        if (food.status === "reserved" && food.requestedBy?._id === userId) {
          return (
            <div key={food._id} className="food-item">
              {food.image && (
                <img
                  src={food.image}
                  alt={food.foodItem}
                  className="food-image"
                />
              )}
              <p>
                <strong>Item:</strong> {food.foodItem}
              </p>
              <p>
                <strong>Status:</strong> Reserved by you
              </p>
              <button onClick={() => handleCancelRequest(food._id)}>
                Cancel Request
              </button>
            </div>
          );
        }

        // Available for request
        if (food.status === "available") {
          return (
            <div key={food._id} className="food-item">
              {food.image && (
                <img
                  src={food.image}
                  alt={food.foodItem}
                  className="food-image"
                />
              )}
              <p>
                <strong>Item:</strong> {food.foodItem}
              </p>
              <p>
                <strong>Type:</strong> {food.foodType}
              </p>
              <p>
                <strong>Quantity:</strong> {food.quantity}
              </p>
              <p>
                <strong>Expiry:</strong>{" "}
                {new Date(food.expiryDate).toDateString()}
              </p>
              <p>
                <strong>Donated by:</strong> {food.donatedBy?.firstName}
              </p>
              <button onClick={() => handleRequest(food._id)}>Request</button>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default RequestFood;
