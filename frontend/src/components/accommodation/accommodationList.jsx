import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Home as HomeIcon, 
  MapPin, 
  DollarSign,
  Bed,
  User,
  Eye,
  X,
  Loader
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import "./accommodationList.scss";

const API_URL = import.meta.env.VITE_BHEKINA2;

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
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortBy, setSortBy] = useState('newest');

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

  // Filter and search functionality
  useEffect(() => {
    let filtered = accommodations;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(acc => 
        acc.residence_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.residence_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.owner?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Type filter
    if (filterType) {
      filtered = filtered.filter(acc => acc.residence_type === filterType);
    }
    
    // Location filter
    if (filterLocation) {
      filtered = filtered.filter(acc => acc.location === filterLocation);
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.rentals - b.rentals;
        case 'price-high':
          return b.rentals - a.rentals;
        case 'rooms':
          return b.rooms - a.rooms;
        case 'newest':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });
    
    setFilteredAccommodations(filtered);
  }, [accommodations, searchTerm, filterType, filterLocation, sortBy]);

  const openModal = (accommodation = null) => {
    if (accommodation) {
      handleEdit(accommodation);
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
      <div className="accommodations-page">
        <div className="loading-container">
          <Loader className="loading-spinner" />
          <p>Loading accommodations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="accommodations-page">
        <div className="error-container">
          <p className="error-message">Error: {error}</p>
          <button onClick={fetchAccommodations} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="accommodations-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">
              <HomeIcon className="title-icon" />
              Accommodations Management
            </h1>
            <p className="page-subtitle">
              Manage your property listings, view details, and track bookings
            </p>
          </div>
          <button 
            onClick={() => openModal()} 
            className="btn btn-primary btn-add"
          >
            <Plus size={20} />
            Add New Property
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by ID, location, type, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters">
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Cottage">Cottage</option>
              <option value="Townhouse">Townhouse</option>
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
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rooms">Most Rooms</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-header">
          <h2 className="results-title">
            Property Listings 
            <span className="results-count">({filteredAccommodations.length})</span>
          </h2>
        </div>

        {/* Accommodations Grid */}
        {filteredAccommodations.length === 0 ? (
          <div className="empty-state">
            <HomeIcon size={48} className="empty-icon" />
            <h3>No accommodations found</h3>
            <p>Try adjusting your search criteria or add a new property.</p>
            <button 
              onClick={() => openModal()} 
              className="btn btn-primary"
            >
              <Plus size={20} />
              Add New Property
            </button>
          </div>
        ) : (
          <div className="accommodations-grid">
            {filteredAccommodations.map((acc) => (
              <div key={acc._id} className="accommodation-card">
                {/* Card Image */}
                <div className="card-image">
                  <img
                    src={acc.image1 || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'}
                    alt={`${acc.residence_type} in ${acc.location}`}
                    onError={(e) => {
                      e.target.src = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
                    }}
                  />
                  <div className="card-badge">{acc.residence_type}</div>
                </div>
                
                {/* Card Content */}
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="card-title">{acc.residence_id}</h3>
                    <div className="card-price">
                      <DollarSign size={16} />
                      {acc.rentals}/month
                    </div>
                  </div>
                  
                  <div className="card-location">
                    <MapPin size={16} />
                    <span>{acc.location}</span>
                  </div>
                  
                  <div className="card-details">
                    <div className="detail-item">
                      <Bed size={16} />
                      <span>{acc.rooms} Rooms</span>
                    </div>
                    <div className="detail-item">
                      <User size={16} />
                      <span>{acc.owner || 'No Owner'}</span>
                    </div>
                    <div className="detail-item deposit">
                      <span>Deposit: ${acc.deposit}</span>
                    </div>
                  </div>
                  
                  <div className="card-description">
                    <p>{acc.description?.substring(0, 100)}{acc.description?.length > 100 ? '...' : ''}</p>
                  </div>
                </div>
                
                {/* Card Actions */}
                <div className="card-actions">
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => openModal(acc)}
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(acc._id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingId ? 'Edit Accommodation' : 'Add New Accommodation'}
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
                      <label>Residence ID *</label>
                      <input
                        name="residence_id"
                        type="text"
                        value={form.residence_id}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Property Type *</label>
                      <select
                        name="residence_type"
                        value={form.residence_type}
                        onChange={handleChange}
                        required
                        className="form-select"
                      >
                        <option value="">Select Type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Cottage">Cottage</option>
                        <option value="Townhouse">Townhouse</option>
                      </select>
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
                    <div className="form-group">
                      <label>Number of Rooms *</label>
                      <input
                        name="rooms"
                        type="number"
                        value={form.rooms}
                        onChange={handleChange}
                        required
                        min="1"
                        max="10"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Pricing */}
                <div className="form-section">
                  <h3 className="form-section-title">Pricing</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Monthly Rent ($) *</label>
                      <input
                        name="rentals"
                        type="number"
                        value={form.rentals}
                        onChange={handleChange}
                        required
                        min="0"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Security Deposit ($) *</label>
                      <input
                        name="deposit"
                        type="number"
                        value={form.deposit}
                        onChange={handleChange}
                        required
                        min="0"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div className="form-section">
                  <h3 className="form-section-title">Description</h3>
                  <div className="form-group form-group-full">
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe the property features, amenities, etc."
                      className="form-textarea"
                    />
                  </div>
                </div>
                
                {/* Owner Information */}
                <div className="form-section">
                  <h3 className="form-section-title">Owner Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Owner Name</label>
                      <input
                        name="owner"
                        type="text"
                        value={form.owner}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Owner Email</label>
                      <input
                        name="owner_email"
                        type="email"
                        value={form.owner_email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Owner Phone</label>
                      <input
                        name="owner_phone"
                        type="tel"
                        value={form.owner_phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Owner ID</label>
                      <input
                        name="owner_id"
                        type="text"
                        value={form.owner_id}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group form-group-full">
                    <label>Owner Address</label>
                    <textarea
                      name="owner_address"
                      value={form.owner_address}
                      onChange={handleChange}
                      rows={2}
                      className="form-textarea"
                    />
                  </div>
                </div>
                
                {/* Images */}
                <div className="form-section">
                  <h3 className="form-section-title">Property Images</h3>
                  <div className="form-grid">
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <div key={num} className="form-group">
                        <label>Image {num} URL</label>
                        <input
                          name={`image${num}`}
                          type="url"
                          value={form[`image${num}`]}
                          onChange={handleChange}
                          placeholder="https://example.com/image.jpg"
                          className="form-input"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Modal Actions */}
                <div className="modal-actions">
                  <button type="button" onClick={closeModal} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update Property' : 'Add Property'}
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

export default AccommodationApp;
