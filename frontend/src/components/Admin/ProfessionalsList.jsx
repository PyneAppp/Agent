import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  User, 
  MapPin, 
  Phone, 
  Mail,
  X,
  Loader
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import "./ProfessionalsList.scss";

const API_URL = import.meta.env.VITE_BHEKINA;

const emptyForm = {
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

function ProfessionalsList() {
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProfession, setFilterProfession] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchProfessionals();
  }, []);

  async function fetchProfessionals() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch professionals.");
      const data = await res.json();
      setProfessionals(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation example:
    if (!form.professional_id || !form.name) {
      setError("Please fill professional ID and name.");
      return;
    }
    
    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save professional.");
      }
      await fetchProfessionals();
      setForm(emptyForm);
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this professional?"))
      return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete professional.");
      await fetchProfessionals();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (professional) => {
    setForm({
      professional_id: professional.professional_id || "",
      name: professional.name || "",
      age: professional.age?.toString() || "",
      experience: professional.experience?.toString() || "",
      location: professional.location || "",
      address: professional.address || "",
      is_available: professional.is_available || false,
      phone_number: professional.phone_number?.toString() || "",
      next_of_kin: professional.next_of_kin || "",
      nok_phone_number: professional.nok_phone_number?.toString() || "",
      email: professional.email || "",
      skills: professional.skills || "",
      profession: professional.profession || "",
      bio: professional.bio || "",
    });
    setEditingId(professional._id);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  };

  // Filter and search functionality
  useEffect(() => {
    let filtered = professionals;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(prof => 
        prof.professional_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.profession?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Profession filter
    if (filterProfession) {
      filtered = filtered.filter(prof => prof.profession === filterProfession);
    }
    
    // Location filter
    if (filterLocation) {
      filtered = filtered.filter(prof => prof.location === filterLocation);
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'experience-low':
          return a.experience - b.experience;
        case 'experience-high':
          return b.experience - a.experience;
        case 'newest':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });
    
    setFilteredProfessionals(filtered);
  }, [professionals, searchTerm, filterProfession, filterLocation, sortBy]);

  const openModal = (professional = null) => {
    if (professional) {
      handleEdit(professional);
    } else {
      setForm(emptyForm);
      setEditingId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    if (!error) {
      closeModal();
    }
  };

  if (loading) {
    return (
      <div className="professionals-page">
        <div className="loading-container">
          <Loader className="loading-spinner" />
          <p>Loading professionals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="professionals-page">
        <div className="error-container">
          <p className="error-message">Error: {error}</p>
          <button onClick={fetchProfessionals} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="professionals-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">
              <User className="title-icon" />
              Professionals Management
            </h1>
            <p className="page-subtitle">
              Manage your professional listings, view details, and track availability
            </p>
          </div>
          <button 
            onClick={() => openModal()} 
            className="btn btn-primary btn-add"
          >
            <Plus size={20} />
            Add New Professional
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by ID, name, location, or profession..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters">
            <select 
              value={filterProfession} 
              onChange={(e) => setFilterProfession(e.target.value)}
              className="filter-select"
            >
              <option value="">All Professions</option>
              <option value="Housekeeper">Housekeeper</option>
              <option value="Gardener">Gardener</option>
              <option value="Security Guard">Security Guard</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Carpenter">Carpenter</option>
            </select>
            
            <select 
              value={filterLocation} 
              onChange={(e) => setFilterLocation(e.target.value)}
              className="filter-select"
            >
              <option value="">All Locations</option>
              <option value="Chitungwiza Unit A">Unit A</option>
              <option value="Chitungwiza Unit B">Unit B</option>
              <option value="Chitungwiza Unit C">Unit C</option>
              <option value="Chitungwiza Unit L">Unit L</option>
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="experience-low">Experience: Low to High</option>
              <option value="experience-high">Experience: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-header">
          <h2 className="results-title">
            Professional Listings
            <span className="results-count">({filteredProfessionals.length})</span>
          </h2>
        </div>

        {/* Professionals Table */}
        {filteredProfessionals.length === 0 ? (
          <div className="empty-state">
            <User size={48} className="empty-icon" />
            <h3>No professionals found</h3>
            <p>Try adjusting your search criteria or add a new professional.</p>
            <button
              onClick={() => openModal()}
              className="btn btn-primary"
            >
              <Plus size={20} />
              Add New Professional
            </button>
          </div>
        ) : (
          <div className="professionals-table-container">
            <table className="professionals-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Profession</th>
                  <th>Location</th>
                  <th>Experience</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfessionals.map((prof) => (
                  <tr key={prof._id}>
                    <td>{prof.professional_id}</td>
                    <td>{prof.name}</td>
                    <td>{prof.profession}</td>
                    <td>{prof.location}</td>
                    <td>{prof.experience} years</td>
                    <td>{prof.phone_number}</td>
                    <td>{prof.email}</td>
                    <td>
                      <span className={`status-badge ${prof.is_available ? 'available' : 'unavailable'}`}>
                        {prof.is_available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => openModal(prof)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(prof._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingId ? 'Edit Professional' : 'Add New Professional'}
                </h2>
                <button onClick={closeModal} className="modal-close">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="modal-form">
                {error && (
                  <div className="error-banner">
                    <p>{error}</p>
                  </div>
                )}
                
                {/* Basic Information */}
                <div className="form-section">
                  <h3 className="form-section-title">Basic Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Professional ID *</label>
                      <input
                        name="professional_id"
                        type="text"
                        value={form.professional_id}
                        onChange={handleChange}
                        required
                        disabled={!!editingId}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Name *</label>
                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        name="age"
                        type="number"
                        value={form.age}
                        onChange={handleChange}
                        min="18"
                        max="80"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Profession *</label>
                      <select
                        name="profession"
                        value={form.profession}
                        onChange={handleChange}
                        required
                        className="form-select"
                      >
                        <option value="">Select Profession</option>
                        <option value="Housekeeper">Housekeeper</option>
                        <option value="Gardener">Gardener</option>
                        <option value="Security Guard">Security Guard</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Carpenter">Carpenter</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="form-section">
                  <h3 className="form-section-title">Contact Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        name="phone_number"
                        type="tel"
                        value={form.phone_number}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Location *</label>
                      <select
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        required
                        className="form-select"
                      >
                        <option value="">Select Location</option>
                        <option value="Chitungwiza Unit A">Chitungwiza Unit A</option>
                        <option value="Chitungwiza Unit B">Chitungwiza Unit B</option>
                        <option value="Chitungwiza Unit C">Chitungwiza Unit C</option>
                        <option value="Chitungwiza Unit L">Chitungwiza Unit L</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Availability */}
                <div className="form-section">
                  <h3 className="form-section-title">Availability</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <input
                          name="is_available"
                          type="checkbox"
                          checked={form.is_available}
                          onChange={handleChange}
                          className="form-checkbox"
                        />
                        Currently Available
                      </label>
                    </div>
                    <div className="form-group">
                      <label>Experience (years)</label>
                      <input
                        name="experience"
                        type="number"
                        value={form.experience}
                        onChange={handleChange}
                        min="0"
                        max="50"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Address */}
                <div className="form-section">
                  <h3 className="form-section-title">Address</h3>
                  <div className="form-group form-group-full">
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Enter full address"
                      className="form-textarea"
                    />
                  </div>
                </div>
                
                {/* Emergency Contact */}
                <div className="form-section">
                  <h3 className="form-section-title">Emergency Contact</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Next of Kin</label>
                      <input
                        name="next_of_kin"
                        type="text"
                        value={form.next_of_kin}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Next of Kin Phone</label>
                      <input
                        name="nok_phone_number"
                        type="tel"
                        value={form.nok_phone_number}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Skills and Bio */}
                <div className="form-section">
                  <h3 className="form-section-title">Skills & Bio</h3>
                  <div className="form-group">
                    <label>Skills</label>
                    <input
                      name="skills"
                      type="text"
                      value={form.skills}
                      onChange={handleChange}
                      placeholder="Comma-separated skills"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group form-group-full">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Professional biography"
                      className="form-textarea"
                    />
                  </div>
                </div>
                
                {/* Modal Actions */}
                <div className="modal-actions">
                  <button type="button" onClick={closeModal} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update Professional' : 'Add Professional'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfessionalsList;