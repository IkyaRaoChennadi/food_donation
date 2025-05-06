import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DonateFood = () => {
  const [donations, setDonations] = useState([
    {
      foodItem: "",
      foodType: "Veg",
      quantity: "",
      expiryDate: "",
      description: "",
      image: null, // New field for the image
    },
  ]);

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (index, field, value) => {
    const updatedDonations = [...donations];
    updatedDonations[index][field] = value;
    setDonations(updatedDonations);
  };

  const handleImageChange = (index, file) => {
    const updatedDonations = [...donations];
    updatedDonations[index].image = file;
    setDonations(updatedDonations);
  };

  const addDonation = () => {
    setDonations([
      ...donations,
      {
        foodItem: "",
        foodType: "Veg",
        quantity: "",
        expiryDate: "",
        description: "",
        image: null,
      },
    ]);
  };

  const removeDonation = (index) => {
    const updatedDonations = donations.filter((_, i) => i !== index);
    setDonations(updatedDonations);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    donations.forEach((donation) => {
      formData.append("donations", JSON.stringify(donation)); // JSON string per donation
      if (donation.image) {
        formData.append("image", donation.image); // Attach file
      }
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/food/donate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);
      setDonations([
        {
          foodItem: "",
          foodType: "Veg",
          quantity: "",
          expiryDate: "",
          description: "",
          image: null,
        },
      ]);

      // Redirect to the menu page upon success
      navigate("/menu"); // Use navigate to redirect to the menu page
    } catch (err) {
      console.error(err);
      alert("Error donating food");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Donate Food</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {donations.map((donation, index) => (
          <div key={index} style={styles.donationContainer}>
            <input
              type="text"
              placeholder="Food Item"
              value={donation.foodItem}
              onChange={(e) => handleChange(index, "foodItem", e.target.value)}
              style={styles.input}
              required
            />

            <select
              value={donation.foodType}
              onChange={(e) => handleChange(index, "foodType", e.target.value)}
              style={styles.input}
              required
            >
              <option value="Veg">Vegetarian</option>
              <option value="Non-Veg">Non-Vegetarian</option>
            </select>

            <input
              type="number"
              placeholder="Quantity"
              value={donation.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              style={styles.input}
              required
            />

            <input
              type="date"
              placeholder="Expiry Date"
              value={donation.expiryDate}
              onChange={(e) =>
                handleChange(index, "expiryDate", e.target.value)
              }
              style={styles.input}
              required
            />

            <textarea
              placeholder="Additional Description"
              value={donation.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              style={styles.textarea}
            />

            <div style={styles.fileInputWrapper}>
              <label style={styles.fileLabel}>Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                style={styles.fileInput}
              />
            </div>

            {donations.length > 1 && (
              <button
                type="button"
                onClick={() => removeDonation(index)}
                style={styles.removeButton}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addDonation} style={styles.addButton}>
          + Add More
        </button>

        <br />
        <button type="submit" style={styles.submitButton}>
          Donate Now
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  header: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "30px",
    textAlign: "center",
    textTransform: "uppercase",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  donationContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "15px",
    border: "1px solid #e2e2e2",
    borderRadius: "8px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    resize: "vertical",
    minHeight: "80px",
  },
  fileInputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  fileLabel: {
    fontSize: "1rem",
    color: "#333",
  },
  fileInput: {
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  submitButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "15px 30px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "bold",
    width: "100%",
    transition: "background-color 0.3s ease",
  },
};

export default DonateFood;

/*
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
const DonateFood = () => {
  const [donations, setDonations] = useState([
    {
      foodItem: "",
      foodType: "Veg",
      quantity: "",
      expiryDate: "",
      description: "",
      image: null,
    },
  ]);

  const navigate = useNavigate();

  const handleChange = (index, field, value) => {
    const updated = [...donations];
    updated[index][field] = value;
    setDonations(updated);
  };

  const handleImageChange = (index, file) => {
    const updated = [...donations];
    updated[index].image = file;
    setDonations(updated);
  };

  const addDonation = () => {
    setDonations([
      ...donations,
      {
        foodItem: "",
        foodType: "Veg",
        quantity: "",
        expiryDate: "",
        description: "",
        image: null,
      },
    ]);
  };

  const removeDonation = (index) => {
    const updated = donations.filter((_, i) => i !== index);
    setDonations(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    donations.forEach((donation, index) => {
      formData.append(`donations`, JSON.stringify(donation));
      if (donation.image) {
        formData.append("images", donation.image);
      }
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/food/donate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(res.data.message);
      setDonations([
        {
          foodItem: "",
          foodType: "Veg",
          quantity: "",
          expiryDate: "",
          description: "",
          image: null,
        },
      ]);
      navigate("/menu");
    } catch (err) {
      console.error(err);
      alert("Error donating food");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Donate Food</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {donations.map((donation, index) => (
          <div key={index} style={styles.donationContainer}>
            <input
              type="text"
              placeholder="Food Item"
              value={donation.foodItem}
              onChange={(e) => handleChange(index, "foodItem", e.target.value)}
              style={styles.input}
              required
            />

            <select
              value={donation.foodType}
              onChange={(e) => handleChange(index, "foodType", e.target.value)}
              style={styles.input}
              required
            >
              <option value="Veg">Vegetarian</option>
              <option value="Non-Veg">Non-Vegetarian</option>
            </select>

            <input
              type="number"
              placeholder="Quantity"
              value={donation.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              style={styles.input}
              required
            />

            <input
              type="date"
              placeholder="Expiry Date"
              value={donation.expiryDate}
              onChange={(e) =>
                handleChange(index, "expiryDate", e.target.value)
              }
              style={styles.input}
              required
            />

            <textarea
              placeholder="Additional Description"
              value={donation.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              style={styles.textarea}
            />

            <div style={styles.fileInputWrapper}>
              <label style={styles.fileLabel}>Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                style={styles.fileInput}
              />
            </div>

            {donations.length > 1 && (
              <button
                type="button"
                onClick={() => removeDonation(index)}
                style={styles.removeButton}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addDonation} style={styles.addButton}>
          + Add More
        </button>

        <br />
        <button type="submit" style={styles.submitButton}>
          Donate Now
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  header: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "30px",
    textAlign: "center",
    textTransform: "uppercase",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  donationContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "15px",
    border: "1px solid #e2e2e2",
    borderRadius: "8px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    resize: "vertical",
    minHeight: "80px",
  },
  fileInputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  fileLabel: {
    fontSize: "1rem",
    color: "#333",
  },
  fileInput: {
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  submitButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "15px 30px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "bold",
    width: "100%",
    transition: "background-color 0.3s ease",
  },
};

export default DonateFood;
*/
