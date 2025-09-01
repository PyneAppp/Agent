import React, { useState, useEffect } from "react";

const initialFormState = {
  residence_id: "",
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  image5: "",
  image6: "",
  residence_type: "",
  description: "",
  rentals: 0,
  location: "",
  deposit: 0,
  rooms: 0,
  owner: "",
  owner_email: "",
  owner_phone: "",
  owner_address: "",
  owner_id: "",
};

function AccommodationApp() {
  const [houses, setHouses] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editId, setEditId] = useState(null);
  const API_URL = "/accommodation";

  useEffect(() => {
    fetchHouses();
  }, []);

  async function fetchHouses() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setHouses(data);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rentals" || name === "deposit" || name === "rooms" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      // Update
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setEditId(null);
    } else {
      // Create
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    setFormData(initialFormState);
    fetchHouses();
  }

  async function handleEdit(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    setFormData(data);
    setEditId(id);
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this house?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchHouses();
    }
  }

  return (
    <div>
      <h1>Accommodation Management</h1>

      <form onSubmit={handleSubmit}>
        {Object.keys(initialFormState).map((key) => (
          <div key={key}>
            <label>{key}</label><br />
            {(key === "description") ? (
              <textarea name={key} value={formData[key]} onChange={handleChange} required />
            ) : (
              <input
                type={key === "rentals" || key === "deposit" || key === "rooms" ? "number" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}
        <button type="submit">{editId ? "Update" : "Add"} House</button>
      </form>

      <h2>Existing Houses</h2>
      {houses.map((house) => (
        <div key={house._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <strong>{house.residence_type} - {house.location}</strong>
          <p>{house.description}</p>
          <p>Rooms: {house.rooms}, Rentals: {house.rentals}, Deposit: {house.deposit}</p>
          <p>
            Owner: {house.owner} ({house.owner_email}, {house.owner_phone})
          </p>
          <div>
            {[house.image1, house.image2, house.image3, house.image4, house.image5, house.image6].map((img, idx) =>
              <img key={idx} src={img} alt="house" style={{ width: "100px", marginRight: "5px" }} />
            )}
          </div>
          <button onClick={() => handleEdit(house._id)}>Edit</button>
          <button onClick={() => handleDelete(house._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AccommodationApp;
