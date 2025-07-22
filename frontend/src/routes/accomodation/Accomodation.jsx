import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_BHEKINA2;
console.log(API_URL);

const emptyForm = {
  residence_id: "",
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  image5: "",
  image6: "",
  residence_type: "",
  description: "",
  rentals: "",
  location: "",
  deposit: "",
  rooms: "",
  owner: "",
  owner_email: "",
  owner_phone: "",
  owner_address: "",
  owner_id: "",
};

function AccommodationApp() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAccommodations();
  }, []);

  async function fetchAccommodations() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch accommodations.");
      const data = await res.json();
      setAccommodations(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation example:
    if (!form.residence_id || !form.residence_type || !form.location) {
      setError("Please fill residence ID, residence type, and location.");
      return;
    }
    // Convert numeric fields to numbers:
    const formattedForm = {
      ...form,
      rentals: Number(form.rentals),
      deposit: Number(form.deposit),
      rooms: Number(form.rooms),
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedForm),
        });
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedForm),
        });
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save accommodation.");
      }
      await fetchAccommodations();
      setForm(emptyForm);
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this accommodation?"))
      return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete accommodation.");
      await fetchAccommodations();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (acc) => {
    setForm({
      residence_id: acc.residence_id || "",
      image1: acc.image1 || "",
      image2: acc.image2 || "",
      image3: acc.image3 || "",
      image4: acc.image4 || "",
      image5: acc.image5 || "",
      image6: acc.image6 || "",
      residence_type: acc.residence_type || "",
      description: acc.description || "",
      rentals: acc.rentals?.toString() || "",
      location: acc.location || "",
      deposit: acc.deposit?.toString() || "",
      rooms: acc.rooms?.toString() || "",
      owner: acc.owner || "",
      owner_email: acc.owner_email || "",
      owner_phone: acc.owner_phone || "",
      owner_address: acc.owner_address || "",
      owner_id: acc.owner_id || "",
    });
    setEditingId(acc._id);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  };

  if (loading) return <p>Loading accommodations...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Accommodations</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
        <h2>{editingId ? "Edit Accommodation" : "Add New Accommodation"}</h2>

        {/* Text Inputs */}
        {[
          {
            label: "Residence ID",
            name: "residence_id",
            type: "text",
            required: true,
          },
          {
            label: "Residence Type",
            name: "residence_type",
            type: "text",
            required: true,
          },
          { label: "Location", name: "location", type: "text", required: true },
          { label: "Owner", name: "owner" },
          { label: "Owner Email", name: "owner_email", type: "email" },
          { label: "Owner Phone", name: "owner_phone" },
          { label: "Owner Address", name: "owner_address" },
          { label: "Owner ID", name: "owner_id" },
          { label: "Image 1 URL", name: "image1" },
          { label: "Image 2 URL", name: "image2" },
          { label: "Image 3 URL", name: "image3" },
          { label: "Image 4 URL", name: "image4" },
          { label: "Image 5 URL", name: "image5" },
          { label: "Image 6 URL", name: "image6" },
        ].map(({ label, name, type = "text", required }) => (
          <div key={name} style={{ marginBottom: 10 }}>
            <label
              htmlFor={name}
              style={{ display: "block", fontWeight: "bold", marginBottom: 4 }}
            >
              {label} {required && "*"}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              required={!!required}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </div>
        ))}

        {/* Textarea */}
        <div style={{ marginBottom: 10 }}>
          <label
            htmlFor="description"
            style={{ display: "block", fontWeight: "bold", marginBottom: 4 }}
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Number Inputs */}
        {[
          { label: "Rentals", name: "rentals" },
          { label: "Deposit", name: "deposit" },
          { label: "Rooms", name: "rooms" },
        ].map(({ label, name }) => (
          <div key={name} style={{ marginBottom: 10 }}>
            <label
              htmlFor={name}
              style={{ display: "block", fontWeight: "bold", marginBottom: 4 }}
            >
              {label} *
            </label>
            <input
              id={name}
              name={name}
              type="number"
              value={form[name]}
              onChange={handleChange}
              required
              min={0}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </div>
        ))}

        <div style={{ marginTop: 20 }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2>Accommodation List</h2>
      {accommodations.length === 0 ? (
        <p>No accommodations available.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }} border={1}>
          <thead style={{ backgroundColor: "#007bff", color: "white" }}>
            <tr>
              <th style={{ padding: 8 }}>Residence ID</th>
              <th style={{ padding: 8 }}>Residence Type</th>
              <th style={{ padding: 8 }}>Location</th>
              <th style={{ padding: 8 }}>Rentals</th>
              <th style={{ padding: 8 }}>Deposit</th>
              <th style={{ padding: 8 }}>Rooms</th>
              <th style={{ padding: 8 }}>Owner</th>
              <th style={{ padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accommodations.map((acc) => (
              <tr key={acc._id}>
                <td style={{ padding: 8 }}>{acc.residence_id}</td>
                <td style={{ padding: 8 }}>{acc.residence_type}</td>
                <td style={{ padding: 8 }}>{acc.location}</td>
                <td style={{ padding: 8 }}>{acc.rentals}</td>
                <td style={{ padding: 8 }}>{acc.deposit}</td>
                <td style={{ padding: 8 }}>{acc.rooms}</td>
                <td style={{ padding: 8 }}>{acc.owner}</td>
                <td style={{ padding: 8 }}>
                  <button
                    onClick={() => handleEdit(acc)}
                    style={{
                      marginRight: 8,
                      cursor: "pointer",
                      padding: "6px 12px",
                      backgroundColor: "#28a745",
                      border: "none",
                      borderRadius: 4,
                      color: "white",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(acc._id)}
                    style={{
                      cursor: "pointer",
                      padding: "6px 12px",
                      backgroundColor: "#dc3545",
                      border: "none",
                      borderRadius: 4,
                      color: "white",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AccommodationApp;
