import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Briefcase, 
  MapPin, 
  DollarSign,
  Clock,
  User,
  AlertCircle,
  X,
  Loader
} from "lucide-react";
import "./jobs.scss";

// Since there's no backend API for jobs yet, we'll use mock data
const mockJobs = [
  {
    id: 1,
    title: "Experienced Welder Needed",
    client: "Munyaradzi Moyo",
    location: "Chitungwiza Unit A",
    type: "Welding",
    description: "Need a skilled welder to install security gates and burglar bars for a residential property. Must have experience with mild steel welding.",
    budget: 150,
    duration: "2-3 days",
    urgency: "urgent",
    skills: ["Gate Installation", "Burglar Bars", "Mild Steel Welding"],
    postedDate: "2025-08-15",
    clientRating: 4.8,
    clientReviews: 12,
    whatsapp: "+263771234500",
    verified: true
  },
  {
    id: 2,
    title: "House Cleaning Service Required",
    client: "Patricia Chigoba",
    location: "Chitungwiza Unit B",
    type: "Cleaning",
    description: "Looking for a reliable domestic worker for weekly house cleaning. Must be trustworthy and detail-oriented. Long-term opportunity available.",
    budget: 50,
    duration: "Ongoing",
    urgency: "normal",
    skills: ["House Cleaning", "Reliability", "Attention to Detail"],
    postedDate: "2025-08-14",
    clientRating: 4.9,
    clientReviews: 8,
    whatsapp: "+263771234501",
    verified: true
  },
  {
    id: 3,
    title: "Garden Landscaping Project",
    client: "Thomas Makoni",
    location: "Chitungwiza Unit C",
    type: "Gardening",
    description: "Need a professional gardener to redesign front yard landscaping. Includes lawn preparation, planting, and irrigation setup.",
    budget: 300,
    duration: "1 week",
    urgency: "normal",
    skills: ["Landscaping", "Lawn Preparation", "Irrigation", "Plant Selection"],
    postedDate: "2025-08-13",
    clientRating: 4.6,
    clientReviews: 15,
    whatsapp: "+263771234502",
    verified: false
  }
];

const emptyForm = {
  title: "",
  client: "",
  location: "",
  type: "",
  description: "",
  budget: "",
  duration: "",
  urgency: "normal",
  skills: "",
};

function JobsList() {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterUrgency, setFilterUrgency] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const jobTypes = [...new Set(jobs.map(j => j.type))];
  const locations = [...new Set(jobs.map(j => j.location))];

  // Filter and search functionality
  useEffect(() => {
    let filtered = jobs;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Type filter
    if (filterType) {
      filtered = filtered.filter(job => job.type === filterType);
    }
    
    // Location filter
    if (filterLocation) {
      filtered = filtered.filter(job => job.location === filterLocation);
    }
    
    // Urgency filter
    if (filterUrgency) {
      filtered = filtered.filter(job => job.urgency === filterUrgency);
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'budget-high':
          return b.budget - a.budget;
        case 'budget-low':
          return a.budget - b.budget;
        case 'newest':
        default:
          return new Date(b.postedDate || 0) - new Date(a.postedDate || 0);
      }
    });
    
    setFilteredJobs(filtered);
  }, [jobs, searchTerm, filterType, filterLocation, filterUrgency, sortBy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.title || !form.client || !form.location || !form.type) {
      setError("Please fill all required fields.");
      return;
    }
    
    try {
      const newJob = {
        ...form,
        id: editingId || Date.now(),
        budget: Number(form.budget),
        postedDate: editingId ? jobs.find(j => j.id === editingId)?.postedDate : new Date().toISOString().split('T')[0],
        clientRating: editingId ? jobs.find(j => j.id === editingId)?.clientRating : 0,
        clientReviews: editingId ? jobs.find(j => j.id === editingId)?.clientReviews : 0,
        whatsapp: "+263771234500", // Default value
        verified: false, // Default value
        skills: form.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
      };
      
      if (editingId) {
        setJobs(jobs.map(job => job.id === editingId ? newJob : job));
      } else {
        setJobs([...jobs, newJob]);
      }
      
      setForm(emptyForm);
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?"))
      return;

    try {
      setJobs(jobs.filter(job => job.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (job) => {
    setForm({
      title: job.title || "",
      client: job.client || "",
      location: job.location || "",
      type: job.type || "",
      description: job.description || "",
      budget: job.budget?.toString() || "",
      duration: job.duration || "",
      urgency: job.urgency || "normal",
      skills: job.skills?.join(', ') || "",
    });
    setEditingId(job.id);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  };

  const openModal = (job = null) => {
    if (job) {
      handleEdit(job);
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

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent':
        return '#ef4444';
      case 'normal':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const getDaysAgo = (dateString) => {
    const posted = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  };

  return (
    <div className="jobs-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">
              <Briefcase className="title-icon" />
              Jobs Management
            </h1>
            <p className="page-subtitle">
              Manage job listings, connect professionals with clients
            </p>
          </div>
          <button 
            onClick={() => openModal()} 
            className="btn btn-primary btn-add"
          >
            <Plus size={20} />
            Add New Job
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search jobs by title, type, or skills..."
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
              <option value="">All Job Types</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select 
              value={filterLocation} 
              onChange={(e) => setFilterLocation(e.target.value)}
              className="filter-select"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location.replace('Chitungwiza ', '')}</option>
              ))}
            </select>
            
            <select 
              value={filterUrgency} 
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="filter-select"
            >
              <option value="">All Priorities</option>
              <option value="urgent">Urgent Jobs</option>
              <option value="normal">Normal Priority</option>
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="budget-high">Highest Budget</option>
              <option value="budget-low">Lowest Budget</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-header">
          <h2 className="results-title">
            Job Listings 
            <span className="results-count">({filteredJobs.length})</span>
          </h2>
        </div>

        {/* Jobs Table */}
        {filteredJobs.length === 0 ? (
          <div className="empty-state">
            <Briefcase size={48} className="empty-icon" />
            <h3>No jobs found</h3>
            <p>Try adjusting your search criteria or add a new job.</p>
            <button
              onClick={() => openModal()}
              className="btn btn-primary"
            >
              <Plus size={20} />
              Add New Job
            </button>
          </div>
        ) : (
          <div className="jobs-table-container">
            <table className="jobs-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Budget ($)</th>
                  <th>Duration</th>
                  <th>Posted</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>
                      <div className="client-cell">
                        <User size={14} />
                        <span>{job.client}</span>
                        {job.verified && <span className="verified-tag">✓ Verified</span>}
                      </div>
                    </td>
                    <td>{job.location}</td>
                    <td>{job.type}</td>
                    <td>${job.budget}</td>
                    <td>{job.duration}</td>
                    <td>{getDaysAgo(job.postedDate)}</td>
                    <td>
                      <span className={`urgency-badge ${job.urgency}`}>
                        {job.urgency === 'urgent' ? 'URGENT' : 'Normal'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => openModal(job)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(job.id)}
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
                  {editingId ? 'Edit Job' : 'Add New Job'}
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
                
                {/* Job Information */}
                <div className="form-section">
                  <h3 className="form-section-title">Job Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Job Title *</label>
                      <input
                        name="title"
                        type="text"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Client Name *</label>
                      <input
                        name="client"
                        type="text"
                        value={form.client}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Job Type *</label>
                      <input
                        name="type"
                        type="text"
                        value={form.type}
                        onChange={handleChange}
                        required
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
                    <div className="form-group">
                      <label>Budget ($)</label>
                      <input
                        name="budget"
                        type="number"
                        value={form.budget}
                        onChange={handleChange}
                        min="0"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Duration</label>
                      <input
                        name="duration"
                        type="text"
                        value={form.duration}
                        onChange={handleChange}
                        placeholder="e.g., 2-3 days, Ongoing"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Urgency</label>
                      <select
                        name="urgency"
                        value={form.urgency}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="normal">Normal Priority</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <div className="form-group form-group-full">
                      <label>Skills (comma-separated)</label>
                      <input
                        name="skills"
                        type="text"
                        value={form.skills}
                        onChange={handleChange}
                        placeholder="e.g., Welding, Security, Installation"
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
                      placeholder="Describe the job requirements in detail"
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
                    {editingId ? 'Update Job' : 'Add Job'}
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

export default JobsList;