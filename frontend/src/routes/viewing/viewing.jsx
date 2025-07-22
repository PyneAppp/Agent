import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_BHEKINA3;
const ACC_API = import.meta.env.VITE_BHEKINA2;

function ViewingForm({ onAdd, accommodations }) {
  const [form, setForm] = useState({
    residence_id: "",
    request_id: "",
    fee: "",
    date: new Date().toISOString().substring(0, 10),
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAdd(form);
      setForm({
        residence_id: "",
        request_id: "",
        fee: "",
        date: new Date().toISOString().substring(0, 10),
      });
    } catch (err) {
      alert(
        "Error adding viewing: " + err?.response?.data?.message ?? err.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Viewing</h3>
      <select
        name="residence_id"
        value={form.residence_id}
        onChange={handleChange}
        required
      >
        <option value="">Select Accommodation</option>
        {accommodations.map((acc) => (
          <option key={acc._id} value={acc._id}>
            {acc.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="request_id"
        value={form.request_id}
        placeholder="Request ID"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="fee"
        value={form.fee}
        placeholder="Fee"
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <button type="submit">Add Viewing</button>
    </form>
  );
}

export default function View() {
  const [viewings, setViewings] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Load data
  useEffect(() => {
    axios.get(API).then((res) => setViewings(res.data));
    axios.get(ACC_API).then((res) => setAccommodations(res.data));
  }, []);

  // Add viewing
  async function addViewing(form) {
    form.fee = Number(form.fee);
    form.request_id = Number(form.request_id);
    await axios.post(API, form);
    const res = await axios.get(API);
    setViewings(res.data);
  }

  // Delete viewing
  async function deleteViewing(id) {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`${API}/${id}`);
    setViewings((vs) => vs.filter((v) => v._id !== id));
  }

  // Edit viewing
  function startEdit(viewing) {
    setEditId(viewing._id);
    setEditForm({
      ...viewing,
      residence_id: viewing.residence_id._id || viewing.residence_id,
      date: viewing.date
        ? viewing.date.substring(0, 10)
        : new Date().toISOString().substring(0, 10),
    });
  }

  function stopEdit() {
    setEditId(null);
    setEditForm({});
  }

  async function submitEdit(e) {
    e.preventDefault();
    const { _id, ...toSend } = editForm;
    toSend.fee = Number(toSend.fee);
    toSend.request_id = Number(toSend.request_id);
    await axios.put(`${API}/${editId}`, toSend);
    const res = await axios.get(API);
    setViewings(res.data);
    stopEdit();
  }

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "sans-serif",
        maxWidth: 700,
        margin: "auto",
      }}
    >
      <h2>Viewings</h2>
      <ViewingForm onAdd={addViewing} accommodations={accommodations} />
      <hr />
      <table border="1" cellPadding="6" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Residence</th>
            <th>Request ID</th>
            <th>Fee</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {viewings.map((v) =>
            editId === v._id ? (
              <tr key={v._id}>
                <td>
                  <select
                    name="residence_id"
                    value={editForm.residence_id}
                    onChange={(e) =>
                      setEditForm((f) => ({
                        ...f,
                        residence_id: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Accommodation</option>
                    {accommodations.map((acc) => (
                      <option key={acc._id} value={acc._id}>
                        {acc.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    name="request_id"
                    value={editForm.request_id}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, request_id: e.target.value }))
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="fee"
                    value={editForm.fee}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, fee: e.target.value }))
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, date: e.target.value }))
                    }
                  />
                </td>
                <td>
                  <button onClick={submitEdit}>Save</button>
                  <button onClick={stopEdit}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={v._id}>
                <td>{v.residence_id?.name || "Unknown"}</td>
                <td>{v.request_id}</td>
                <td>{v.fee}</td>
                <td>{v.date ? v.date.substring(0, 10) : ""}</td>
                <td>
                  <button onClick={() => startEdit(v)}>Edit</button>
                  <button onClick={() => deleteViewing(v._id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
