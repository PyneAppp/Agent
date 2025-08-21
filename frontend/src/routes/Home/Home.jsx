import React, { useState } from "react";
import HeroCarousel from "../../components/Carousel/Carousel";
import "./Home.scss";
import Chatbot from "../../components/chatBot/Chatbot";
import Card from "../../components/Cards/Card";
import AccommodationApp from "../../components/Royce's/AccommodationApp";
import { TrendingUp, Users, Shield, Clock, Star, ArrowRight } from "lucide-react";
import NavBar from "../../routes/navBar/NavBar";

export default function Home() {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    priceRange: '',
    propertyType: '',
    bedrooms: ''
  });

  const handleFilterChange = (filterType, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const stats = [
    {
      icon: <TrendingUp className="stat-icon" />,
      value: "500+",
      label: "Properties Listed",
      color: "#3b82f6"
    },
    {
      icon: <Users className="stat-icon" />,
      value: "1200+",
      label: "Happy Tenants",
      color: "#f97316"
    },
    {
      icon: <Shield className="stat-icon" />,
      value: "100%",
      label: "Verified Properties",
      color: "#2563eb"
    },
    {
      icon: <Clock className="stat-icon" />,
      value: "24/7",
      label: "Support Available",
      color: "#ea580c"
    }
  ];

  const features = [
    {
      icon: "🏠",
      title: "Quality Accommodations",
      description: "Hand-picked properties with modern amenities and competitive prices"
    },
    {
      icon: "💼",
      title: "Professional Services",
      description: "Expert property management and maintenance services for all residents"
    },
    {
      icon: "📅",
      title: "Easy Viewing",
      description: "Schedule property viewings at your convenience with our booking system"
    },
    {
      icon: "🤖",
      title: "AI Assistant",
      description: "Get instant help and property recommendations from our AI chatbot"
    }
  ];

  return (
    <div className="home">
      {/*Navbar Section*/}
      <section className="navbar-section">
        <NavBar />
      </section>
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <HeroCarousel />
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon-container" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">Why Choose ToraBasa?</h2>
            <p className="section-subtitle">
              We provide comprehensive accommodation solutions with modern amenities and professional service
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
