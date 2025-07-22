import React, { useEffect, useState } from "react";
import "./Professionals.scss";
import dotenv from "dotenv";

const API_BASE_URL = import.meta.env.VITE_BHEKINA;

const defaultFormData = {
  professional_id: "",
  name: "",
  age: "",
  experience: "",
  location: "",
  address: "",
  is_available: false,
  phone_number: "",
  next_of_kin: "",
  nok_phone_number: "",
  email: "",
  skills: "",
  profession: "",
  bio: "",
};

export default function Professionals() {
  const [professionals, setProfessionals] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch list of professionals on component mount
  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch professionals");
      const data = await res.json();
      setProfessionals(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add or update professional
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation example
    if (!formData.professional_id || !formData.name) {
      setError("professional_id and name are required");
      return;
    }

    try {
      const res = editingId
        ? await fetch(`${API_BASE_URL}/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          })
        : await fetch(API_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      // Refresh list and reset form
      setFormData(defaultFormData);
      setEditingId(null);
      fetchProfessionals();
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Start editing a professional
  const handleEdit = (professional) => {
    setFormData({
      professional_id: professional.professional_id,
      name: professional.name,
      age: professional.age,
      experience: professional.experience,
      location: professional.location,
      address: professional.address,
      is_available: professional.is_available,
      phone_number: professional.phone_number,
      next_of_kin: professional.next_of_kin,
      nok_phone_number: professional.nok_phone_number,
      email: professional.email,
      skills: professional.skills,
      profession: professional.profession,
      bio: professional.bio,
    });
    setEditingId(professional._id);
    setError("");
  };

  // Delete a professional
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this professional?"))
      return;

    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete professional");
      fetchProfessionals();
    } catch (err) {
      setError(err.message);
    }
  };

  // Cancel editing and reset form
  const handleCancel = () => {
    setEditingId(null);
    setFormData(defaultFormData);
    setError("");
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 16 }}>
      <h1>Professionals</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: 20, border: "1px solid #ccc", padding: 16 }}
      >
        <h3>{editingId ? "Edit Professional" : "Add New Professional"}</h3>

        <div>
          <label>
            Professional ID:*{" "}
            <input
              type="text"
              name="professional_id"
              value={formData.professional_id}
              onChange={handleChange}
              disabled={!!editingId} // cannot change professional_id on edit (since it's unique)
              required
            />
          </label>
        </div>

        <div>
          <label>
            Name:*{" "}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Age:{" "}
            <input
              type="number"
              name="age"
              min="0"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Experience (years):{" "}
            <input
              type="number"
              name="experience"
              min="0"
              value={formData.experience}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Location:{" "}
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Address:{" "}
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Available:{" "}
            <input
              type="checkbox"
              name="is_available"
              checked={formData.is_available}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Phone Number:{" "}
            <input
              type="number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Next of Kin:{" "}
            <input
              type="text"
              name="next_of_kin"
              value={formData.next_of_kin}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            NOK Phone Number:{" "}
            <input
              type="number"
              name="nok_phone_number"
              value={formData.nok_phone_number}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Email:{" "}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Skills:{" "}
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Profession:{" "}
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Bio:{" "}
            <textarea name="bio" value={formData.bio} onChange={handleChange} />
          </label>
        </div>

        <button type="submit" style={{ marginRight: 8 }}>
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>

      <h2>Professionals List</h2>
      {professionals.length === 0 ? (
        <p>No professionals found.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Profession</th>
              <th>Location</th>
              <th>Available</th>
              <th>Experience (years)</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {professionals.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.profession}</td>
                <td>{p.location}</td>
                <td>{p.is_available ? "Yes" : "No"}</td>
                <td>{p.experience}</td>
                <td>{p.phone_number}</td>
                <td>{p.email}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  {" | "}
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
