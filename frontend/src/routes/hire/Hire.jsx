import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Star,
  Phone,
  MessageCircle,
  Filter,
  User,
  Clock,
  DollarSign,
  Shield,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import "./Hire.scss";

// Mock data for service providers (in real app, this would come from API)
const mockServiceProviders = [
  {
    id: 1,
    name: "John Mutambanadzo",
    profession: "Welder",
    location: "Chitungwiza Unit A",
    rating: 4.8,
    reviews: 24,
    hourlyRate: 15,
    description: "Experienced welder with 8+ years in metal fabrication, gates, burglar bars, and general welding services.",
    skills: ["Gate Installation", "Burglar Bars", "Metal Fabrication", "Pipe Welding"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    whatsapp: "+263771234567",
    verified: true,
    responseTime: "Within 2 hours"
  },
  {
    id: 2,
    name: "Mary Chidziva",
    profession: "Maid",
    location: "Chitungwiza Unit B",
    rating: 4.9,
    reviews: 31,
    hourlyRate: 8,
    description: "Professional house cleaner and domestic worker. Reliable, trustworthy, and detail-oriented with excellent references.",
    skills: ["House Cleaning", "Laundry", "Cooking", "Child Care"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c6635fc6?w=150&h=150&fit=crop&crop=face",
    whatsapp: "+263771234568",
    verified: true,
    responseTime: "Within 1 hour"
  },
  {
    id: 3,
    name: "Peter Mukamuri",
    profession: "Gardener",
    location: "Chitungwiza Unit C",
    rating: 4.7,
    reviews: 18,
    hourlyRate: 10,
    description: "Professional gardener specializing in landscape design, lawn maintenance, and agricultural consulting.",
    skills: ["Landscaping", "Lawn Care", "Tree Trimming", "Vegetable Gardens"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    whatsapp: "+263771234569",
    verified: true,
    responseTime: "Within 3 hours"
  },
  {
    id: 4,
    name: "Grace Mandaza",
    profession: "Maid",
    location: "Chitungwiza Unit L",
    rating: 4.6,
    reviews: 15,
    hourlyRate: 9,
    description: "Experienced domestic worker with expertise in house management, cooking traditional meals, and elderly care.",
    skills: ["House Management", "Traditional Cooking", "Elderly Care", "Organization"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    whatsapp: "+263771234570",
    verified: false,
    responseTime: "Within 4 hours"
  },
  {
    id: 5,
    name: "James Chikwanha",
    profession: "Electrician",
    location: "Chitungwiza Unit A",
    rating: 4.8,
    reviews: 27,
    hourlyRate: 20,
    description: "Certified electrician with expertise in residential wiring, solar installations, and electrical repairs.",
    skills: ["Electrical Wiring", "Solar Installation", "Fault Finding", "Electrical Repairs"],
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    whatsapp: "+263771234571",
    verified: true,
    responseTime: "Within 2 hours"
  },
  {
    id: 6,
    name: "Susan Mapfumo",
    profession: "Tailor",
    location: "Chitungwiza Unit B",
    rating: 4.5,
    reviews: 22,
    hourlyRate: 12,
    description: "Professional tailor specializing in traditional wear, alterations, and custom clothing design.",
    skills: ["Traditional Wear", "Alterations", "Custom Design", "Embroidery"],
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    whatsapp: "+263771234572",
    verified: true,
    responseTime: "Within 1 hour"
  }
];

const ServiceProviderCard = ({ provider }) => {
  const handleWhatsAppContact = () => {
    const message = `Hello ${provider.name}, I found your profile on ToraBasa and would like to hire you for ${provider.profession.toLowerCase()} services. Could you please share your availability?`;
    const whatsappUrl = `https://wa.me/${provider.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="service-provider-card">
      <div className="provider-header">
        <div className="provider-avatar">
          <img src={provider.avatar} alt={provider.name} />
          {provider.verified && (
            <div className="verified-badge">
              <Shield size={16} />
            </div>
          )}
        </div>
        <div className="provider-info">
          <h3 className="provider-name">{provider.name}</h3>
          <p className="provider-profession">{provider.profession}</p>
          <div className="provider-location">
            <MapPin size={14} />
            <span>{provider.location}</span>
          </div>
        </div>
        <div className="provider-rating">
          <Star size={16} fill="currentColor" />
          <span className="rating-value">{provider.rating}</span>
          <span className="rating-count">({provider.reviews})</span>
        </div>
      </div>

      <div className="provider-description">
        <p>{provider.description}</p>
      </div>

      <div className="provider-skills">
        {provider.skills.slice(0, 3).map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
        {provider.skills.length > 3 && (
          <span className="skill-more">+{provider.skills.length - 3} more</span>
        )}
      </div>

      <div className="provider-details">
        <div className="detail-item">
          <DollarSign size={16} />
          <span>${provider.hourlyRate}/hour</span>
        </div>
        <div className="detail-item">
          <Clock size={16} />
          <span>{provider.responseTime}</span>
        </div>
      </div>

      <button 
        className="contact-btn"
        onClick={handleWhatsAppContact}
      >
        <MessageCircle size={18} />
        Contact via WhatsApp
        <ExternalLink size={14} />
      </button>
    </div>
  );
};

export default function Hire() {
  const [providers, setProviders] = useState(mockServiceProviders);
  const [filteredProviders, setFilteredProviders] = useState(mockServiceProviders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const professions = [...new Set(providers.map(p => p.profession))];
  const locations = [...new Set(providers.map(p => p.location))];

  useEffect(() => {
    let filtered = providers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Profession filter
    if (selectedProfession) {
      filtered = filtered.filter(provider => provider.profession === selectedProfession);
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(provider => provider.location === selectedLocation);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.hourlyRate - b.hourlyRate;
        case 'price-high':
          return b.hourlyRate - a.hourlyRate;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    setFilteredProviders(filtered);
  }, [providers, searchTerm, selectedProfession, selectedLocation, sortBy]);

  const stats = [
    { label: "Service Providers", value: providers.length, icon: <User size={20} /> },
    { label: "Average Rating", value: "4.7", icon: <Star size={20} /> },
    { label: "Verified Providers", value: providers.filter(p => p.verified).length, icon: <Shield size={20} /> },
    { label: "Locations Covered", value: locations.length, icon: <MapPin size={20} /> }
  ];

  return (
    <div className="hire-page">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Hire Local Service Providers</h1>
            <p className="hero-subtitle">
              Connect with skilled professionals in Chitungwiza. From welders to maids, find trusted service providers in your area.
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
              placeholder="Search by name, profession, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters">
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="filter-select"
            >
              <option value="">All Professions</option>
              {professions.map(profession => (
                <option key={profession} value={profession}>{profession}</option>
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="rating">Highest Rated</option>
              <option value="price-low">Lowest Price</option>
              <option value="price-high">Highest Price</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          <div className="results-header">
            <h2 className="results-title">
              Available Service Providers
              <span className="results-count">({filteredProviders.length})</span>
            </h2>
          </div>

          {filteredProviders.length === 0 ? (
            <div className="empty-state">
              <User size={48} className="empty-icon" />
              <h3>No service providers found</h3>
              <p>Try adjusting your search criteria or browse all available providers.</p>
            </div>
          ) : (
            <div className="providers-grid">
              {filteredProviders.map(provider => (
                <ServiceProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
