import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  Calendar, 
  DollarSign,
  Home,
  X,
  Loader
} from "lucide-react";
import "./viewing.scss";

const API_URL = import.meta.env.VITE_BHEKINA3;
const ACCOMMODATION_API_URL = import.meta.env.VITE_BHEKINA2;

const emptyForm = {
  residence_id: "",
  request_id: "",
  fee: "",
  date: new Date().toISOString().substring(0, 10),
};

function ViewingList() {
  const [viewings, setViewings] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [filteredViewings, setFilteredViewings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
      fetchViewings();
      fetchAccommodations();
    }, []);
  
    // Auto-refresh data every 30 seconds
        useEffect(() => {
          const interval = setInterval(() => {
            console.log('Auto-refreshing viewings data...');
            refreshData();
          }, 30000); // 30 seconds
      
          return () => clearInterval(interval);
        }, []);

  async function fetchViewings() {
      try {
        console.log('Fetching viewings from:', API_URL);
        const res = await fetch(API_URL);
        console.log('Viewings response status:', res.status);
        if (!res.ok) throw new Error(`Failed to fetch viewings. Status: ${res.status}`);
        const data = await res.json();
        console.log('Viewings data received:', data);
        setViewings(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching viewings:', err);
        setError(err.message);
        setLoading(false);
      }
    }

  async function fetchAccommodations() {
      try {
        console.log('Fetching accommodations from:', ACCOMMODATION_API_URL);
        const res = await fetch(ACCOMMODATION_API_URL);
        console.log('Accommodations response status:', res.status);
        if (!res.ok) throw new Error(`Failed to fetch accommodations. Status: ${res.status}`);
        const data = await res.json();
        console.log('Accommodations data received:', data);
        setAccommodations(data);
      } catch (err) {
        console.error('Error fetching accommodations:', err);
        setError(err.message);
      }
    }

  const handleChange = (e) => {
      const { name, value } = e.target;
      // Handle refresh accommodations option in the dropdown
      if (name === "residence_id" && value === "") {
        fetchAccommodations();
        return;
      }
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.residence_id || !form.request_id || !form.fee) {
      setError("Please fill all required fields.");
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
        throw new Error(errData.message || "Failed to save viewing.");
      }
      await fetchViewings();
      setForm(emptyForm);
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this viewing?"))
      return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete viewing.");
      await fetchViewings();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (viewing) => {
    setForm({
      residence_id: viewing.residence_id?._id || viewing.residence_id || "",
      request_id: viewing.request_id?.toString() || "",
      fee: viewing.fee?.toString() || "",
      date: viewing.date ? viewing.date.substring(0, 10) : new Date().toISOString().substring(0, 10),
    });
    setEditingId(viewing._id);
  };

  const handleCancel = () => {
      setForm(emptyForm);
      setEditingId(null);
      setError(null);
    };
  
    const refreshData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([fetchViewings(), fetchAccommodations()]);
      } catch (err) {
        console.error('Error refreshing data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  // Filter and search functionality
    useEffect(() => {
      console.log('Filtering viewings, viewings:', viewings);
      let filtered = viewings;
      
      // Search filter
      if (searchTerm) {
        console.log('Applying search filter:', searchTerm);
        filtered = filtered.filter(viewing =>
          viewing.request_id?.toString().includes(searchTerm) ||
          viewing.residence_id?.residence_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          viewing.residence_id?.location?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Location filter
      if (filterLocation) {
        console.log('Applying location filter:', filterLocation);
        filtered = filtered.filter(viewing => viewing.residence_id?.location === filterLocation);
      }
      
      // Sort
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'fee-low':
            return a.fee - b.fee;
          case 'fee-high':
            return b.fee - a.fee;
          case 'newest':
          default:
            return new Date(b.date || 0) - new Date(a.date || 0);
        }
      });
      
      console.log('Filtered viewings:', filtered);
      setFilteredViewings(filtered);
    }, [viewings, searchTerm, filterLocation, sortBy]);

  const openModal = (viewing = null) => {
    if (viewing) {
      handleEdit(viewing);
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
        <div className="viewings-page">
          <div className="loading-container">
            <Loader className="loading-spinner" />
            <p>Loading viewings...</p>
            <button onClick={refreshData} className="btn btn-primary" style={{ marginTop: '10px' }}>
                          Refresh
                        </button>
          </div>
        </div>
      );
    }

  if (error) {
      return (
        <div className="viewings-page">
          <div className="error-container">
            <p className="error-message">Error: {error}</p>
            <button onClick={refreshData} className="btn btn-primary">
                          Try Again
                        </button>
            <button onClick={fetchAccommodations} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
              Refresh Accommodations
            </button>
          </div>
        </div>
      );
    }

  return (
    <div className="viewings-page">
      <div className="container">
        {/* Page Header */}
                <div className="page-header">
                  <div className="page-title-section">
                    <h1 className="page-title">
                      <Eye className="title-icon" />
                      Viewing Management
                    </h1>
                    <p className="page-subtitle">
                      Manage property viewings, schedule appointments, and track fees
                    </p>
                  </div>
                  <div className="page-header-actions">
                    <button
                      onClick={() => openModal()}
                      className="btn btn-primary btn-add"
                    >
                      <Plus size={20} />
                      Add New Viewing
                    </button>
                    <button
                                  onClick={refreshData}
                                  className="btn btn-secondary"
                                  style={{ marginLeft: '10px' }}
                                >
                                  Refresh
                                </button>
                  </div>
                </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by request ID, property ID, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters">
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
              <option value="fee-low">Fee: Low to High</option>
              <option value="fee-high">Fee: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-header">
          <h2 className="results-title">
            Viewing Requests
            <span className="results-count">({filteredViewings.length})</span>
          </h2>
        </div>

        {/* Viewings Table */}
        {filteredViewings.length === 0 ? (
                  <div className="empty-state">
                    <Eye size={48} className="empty-icon" />
                    <h3>No viewings found</h3>
                    <p>Try adjusting your search criteria or add a new viewing.</p>
                    <div className="empty-state-actions">
                      <button
                        onClick={() => openModal()}
                        className="btn btn-primary"
                      >
                        <Plus size={20} />
                        Add New Viewing
                      </button>
                      <button
                                              onClick={refreshData}
                                              className="btn btn-secondary"
                                              style={{ marginLeft: '10px' }}
                                            >
                                              Refresh Viewings
                                            </button>
                    </div>
                  </div>
                ) : (
          <div className="viewings-table-container">
            <table className="viewings-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Property</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Fee ($)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredViewings.map((viewing) => (
                  <tr key={viewing._id}>
                    <td>#{viewing.request_id}</td>
                    <td>{viewing.residence_id?.residence_id || "Unknown Property"}</td>
                    <td>{viewing.residence_id?.location || "Unknown Location"}</td>
                    <td>{viewing.date ? new Date(viewing.date).toLocaleDateString() : "No Date"}</td>
                    <td>{viewing.fee}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => openModal(viewing)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(viewing._id)}
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
                  {editingId ? 'Edit Viewing' : 'Add New Viewing'}
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
                
                {/* Viewing Information */}
                <div className="form-section">
                  <h3 className="form-section-title">Viewing Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Property *</label>
                      <select
                        name="residence_id"
                        value={form.residence_id}
                        onChange={handleChange}
                        required
                        className="form-select"
                      >
                        <option value="">Select Property</option>
                        {accommodations.map((acc) => (
                                                    <option key={acc._id} value={acc._id}>
                                                      {acc.residence_id} - {acc.location}
                                                    </option>
                                                  ))}
                                                  <option value="">Refresh Accommodations</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Request ID *</label>
                      <input
                        name="request_id"
                        type="number"
                        value={form.request_id}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Viewing Fee ($) *</label>
                      <input
                        name="fee"
                        type="number"
                        value={form.fee}
                        onChange={handleChange}
                        required
                        min="0"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Viewing Date</label>
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Modal Actions */}
                <div className="modal-actions">
                  <button type="button" onClick={closeModal} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update Viewing' : 'Add Viewing'}
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

export default ViewingList;