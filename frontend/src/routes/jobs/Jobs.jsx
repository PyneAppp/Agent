import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  User,
  Briefcase,
  Filter,
  ChevronRight,
  MessageCircle,
  ExternalLink,
  Star,
  AlertCircle
} from "lucide-react";
import "./Jobs.scss";

// Mock data for job opportunities
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
  },
  {
    id: 4,
    title: "Electrical Wiring for New Extension",
    client: "Engineer Chikwati",
    location: "Chitungwiza Unit L",
    type: "Electrical",
    description: "Seeking certified electrician for complete electrical wiring of new house extension. Must provide COC certificate upon completion.",
    budget: 800,
    duration: "2 weeks",
    urgency: "urgent",
    skills: ["House Wiring", "COC Certification", "Safety Compliance"],
    postedDate: "2025-08-15",
    clientRating: 4.7,
    clientReviews: 22,
    whatsapp: "+263771234503",
    verified: true
  },
  {
    id: 5,
    title: "Traditional Wear Tailoring",
    client: "Grace Muchabaiwa",
    location: "Chitungwiza Unit A",
    type: "Tailoring",
    description: "Need experienced tailor for traditional wedding attire. Must be skilled in beadwork and traditional Shona designs.",
    budget: 200,
    duration: "1 month",
    urgency: "normal",
    skills: ["Traditional Wear", "Beadwork", "Shona Designs", "Wedding Attire"],
    postedDate: "2025-08-12",
    clientRating: 4.5,
    clientReviews: 6,
    whatsapp: "+263771234504",
    verified: true
  },
  {
    id: 6,
    title: "Plumbing Repairs and Installation",
    client: "David Zinyama",
    location: "Chitungwiza Unit B",
    type: "Plumbing",
    description: "Multiple plumbing issues need fixing including leak repairs, toilet installation, and pipe replacement. Experience with geyser installation preferred.",
    budget: 400,
    duration: "3-4 days",
    urgency: "urgent",
    skills: ["Leak Repairs", "Toilet Installation", "Pipe Replacement", "Geyser Installation"],
    postedDate: "2025-08-15",
    clientRating: 4.8,
    clientReviews: 19,
    whatsapp: "+263771234505",
    verified: true
  }
];

const JobCard = ({ job }) => {
  const handleContact = () => {
    const message = `Hello ${job.client}, I saw your job posting "${job.title}" on ToraBasa. I am interested and available for this ${job.type.toLowerCase()} job. Could we discuss the details?`;
    const whatsappUrl = `https://wa.me/${job.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
    <div className="job-card">
      <div className="job-header">
        <div className="job-title-section">
          <h3 className="job-title">{job.title}</h3>
          <div className="job-meta">
            <div className="client-info">
              <User size={14} />
              <span>{job.client}</span>
              {job.verified && <span className="verified-tag">✓ Verified</span>}
            </div>
            <div className="job-location">
              <MapPin size={14} />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
        <div className="job-urgency" style={{ color: getUrgencyColor(job.urgency) }}>
          {job.urgency === 'urgent' && <AlertCircle size={16} />}
          <span>{job.urgency === 'urgent' ? 'URGENT' : 'Normal Priority'}</span>
        </div>
      </div>

      <div className="job-description">
        <p>{job.description}</p>
      </div>

      <div className="job-skills">
        {job.skills.slice(0, 3).map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
        {job.skills.length > 3 && (
          <span className="skill-more">+{job.skills.length - 3} more</span>
        )}
      </div>

      <div className="job-details">
        <div className="detail-item">
          <DollarSign size={16} />
          <span>${job.budget} total</span>
        </div>
        <div className="detail-item">
          <Clock size={16} />
          <span>{job.duration}</span>
        </div>
        <div className="detail-item">
          <Calendar size={16} />
          <span>Posted {getDaysAgo(job.postedDate)}</span>
        </div>
      </div>

      <div className="job-client-rating">
        <div className="rating-section">
          <Star size={14} fill="currentColor" />
          <span className="rating-value">{job.clientRating}</span>
          <span className="rating-reviews">({job.clientReviews} reviews)</span>
        </div>
      </div>

      <button className="apply-btn" onClick={handleContact}>
        <MessageCircle size={18} />
        Apply via WhatsApp
        <ExternalLink size={14} />
      </button>
    </div>
  );
};

export default function Jobs() {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const jobTypes = [...new Set(jobs.map(j => j.type))];
  const locations = [...new Set(jobs.map(j => j.location))];

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
    if (selectedType) {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    // Urgency filter
    if (selectedUrgency) {
      filtered = filtered.filter(job => job.urgency === selectedUrgency);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.postedDate) - new Date(a.postedDate);
        case 'budget-high':
          return b.budget - a.budget;
        case 'budget-low':
          return a.budget - b.budget;
        case 'urgent':
          return a.urgency === 'urgent' ? -1 : 1;
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedType, selectedLocation, selectedUrgency, sortBy]);

  const stats = [
    { label: "Active Jobs", value: jobs.length, icon: <Briefcase size={20} /> },
    { label: "Avg. Budget", value: `$${Math.round(jobs.reduce((sum, job) => sum + job.budget, 0) / jobs.length)}`, icon: <DollarSign size={20} /> },
    { label: "Urgent Jobs", value: jobs.filter(j => j.urgency === 'urgent').length, icon: <AlertCircle size={20} /> },
    { label: "Verified Clients", value: jobs.filter(j => j.verified).length, icon: <User size={20} /> }
  ];

  return (
    <div className="jobs-page">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Find Work Opportunities</h1>
            <p className="hero-subtitle">
              Browse available jobs in Chitungwiza. Connect directly with clients and grow your business.
            </p>
          </div>
          
          {/* Stats */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="">All Job Types</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="filter-select"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location.replace('Chitungwiza ', '')}</option>
              ))}
            </select>

            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
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
              <option value="urgent">Urgent First</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          <div className="results-header">
            <h2 className="results-title">
              Available Jobs
              <span className="results-count">({filteredJobs.length})</span>
            </h2>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="empty-state">
              <Briefcase size={48} className="empty-icon" />
              <h3>No jobs found</h3>
              <p>Try adjusting your search criteria or check back later for new opportunities.</p>
            </div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
