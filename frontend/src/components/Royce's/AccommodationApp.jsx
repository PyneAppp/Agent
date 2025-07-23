import React, { useState, useEffect } from "react";
import {
  Heart,
  MapPin,
  Search,
  Calendar,
  Filter,
  Home,
  Settings,
  Wifi,
  Car, //post
  Droplets,
  Bed,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Chatbot from "./Chatbot";
import "./AccommodationApp.css";

// Assuming API_URL is correctly defined in your environment
const API_URL = import.meta.env.VITE_BHEKINA2;
console.log("API_URL:", API_URL);

// Check if API_URL is available, if not use mock data
const USE_MOCK_DATA = !API_URL || API_URL === "undefined";

if (USE_MOCK_DATA) {
  console.log("No API URL configured, using mock data");
}

// Mock data for demonstration
const mockAccommodations = [
  {
    _id: "1",
    residence_id: "RES001",
    residence_type: "Apartment",
    rooms: 3,
    location: "Chitungwiza Unit A",
    rentals: 800,
    deposit: 400,
    description:
      "Modern 3-bedroom apartment with Wi-Fi, carpark, and borehole water. Fully furnished with modern amenities.",
    image1:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    image3:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    owner: "John Doe",
    owner_email: "john@example.com",
    owner_phone: "+263 771 234 567",
  },
  {
    _id: "2",
    residence_id: "RES002",
    residence_type: "House",
    rooms: 5,
    location: "Chitungwiza Unit B",
    rentals: 1200,
    deposit: 600,
    description:
      "Spacious 5-bedroom house with Wi-Fi, carpark, borehole water, and garden space.",
    image1:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&h=300&fit=crop",
    owner: "Jane Smith",
    owner_email: "jane@example.com",
    owner_phone: "+263 771 987 654",
  },
  {
    _id: "3",
    residence_id: "RES003",
    residence_type: "Cottage",
    rooms: 2,
    location: "Chitungwiza Unit C",
    rentals: 600,
    deposit: 300,
    description:
      "Cozy 2-bedroom cottage with Wi-Fi and carpark. Perfect for small families.",
    image1:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    owner: "Mike Johnson",
    owner_email: "mike@example.com",
    owner_phone: "+263 771 555 123",
  },
  {
    _id: "4",
    residence_id: "RES004",
    residence_type: "Apartment",
    rooms: 4,
    location: "Chitungwiza Unit L",
    rentals: 1000,
    deposit: 500,
    description:
      "Modern 4-bedroom apartment with all amenities including Wi-Fi, carpark, and borehole water.",
    image1:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    owner: "Sarah Wilson",
    owner_email: "sarah@example.com",
    owner_phone: "+263 771 777 888",
  },
  {
    _id: "5",
    residence_id: "RES005",
    residence_type: "Townhouse",
    rooms: 3,
    location: "Chitungwiza Unit L",
    rentals: 900,
    deposit: 450,
    description:
      "Beautiful 3-bedroom townhouse with Wi-Fi, carpark, borehole water, and modern fittings.",
    image1:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    owner: "David Brown",
    owner_email: "david@example.com",
    owner_phone: "+263 771 333 444",
  },
];

// Empty form state for adding/editing accommodations
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

// Placeholder image for when an image URL is not available
const PLACEHOLDER_IMAGE =
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1";

// Accommodation Card Component
const AccommodationCard = ({ accommodation, onEdit, onDelete }) => {
  // Get all image URLs, filter out empty ones, and provide a fallback
  const images = [
    accommodation.image1,
    accommodation.image2,
    accommodation.image3,
    accommodation.image4,
    accommodation.image5,
    accommodation.image6,
  ].filter(Boolean); // Filters out null, undefined, empty strings

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="accommodation-card">
      {/* Image Carousel */}
      <div className="image-carousel">
        <img
          src={images[currentImageIndex] || PLACEHOLDER_IMAGE}
          alt={`${accommodation.residence_type} accommodation`}
          className="accommodation-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_IMAGE;
          }}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="carousel-btn carousel-btn-left"
            >
              <ChevronLeft className="icon-small" />
            </button>
            <button
              onClick={nextImage}
              className="carousel-btn carousel-btn-right"
            >
              <ChevronRight className="icon-small" />
            </button>
          </>
        )}
        <div className="heart-icon">
          <Heart className="icon-small" />
        </div>
      </div>

      {/* Card Body */ find}
      <div className="card-body">
        <h3 className="card-title">
          {accommodation.rooms} Roomed {accommodation.residence_type}
        </h3>

        <div className="location-info">
          <MapPin className="icon-small" />
          <span>{accommodation.location}</span>
        </div>

        {/* Amenities */}
        <div className="amenities">
          {accommodation.description?.includes("Wi-Fi") && (
            <div className="amenity">
              <Wifi className="icon-tiny" />
              <span>Wi-Fi</span>
            </div>
          )}
          {accommodation.description?.includes("carpark") && (
            <div className="amenity">
              <Car className="icon-tiny" />
              <span>Carpark</span>
            </div>
          )}
          {accommodation.description?.includes("borehole") && (
            <div className="amenity">
              <Droplets className="icon-tiny" />
              <span>Borehole</span>
            </div>
          )}
          {accommodation.rooms > 0 && (
            <div className="amenity">
              <Bed className="icon-tiny" />
              <span>{accommodation.rooms} Bedrooms</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="price">
          ${accommodation.rentals}
          <span className="price-period">/month</span>
        </div>

        {/* Admin Actions */}
        <div className="admin-actions">
          <button
            onClick={() => onEdit(accommodation)}
            className="btn btn-edit"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(accommodation._id)}
            className="btn btn-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Main AccommodationApp Component
function AccommodationApp() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    fetchAccommodations();
  }, []);

  // Function to fetch accommodations from the API or use mock data
  async function fetchAccommodations() {
    try {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        setTimeout(() => {
          setAccommodations(mockAccommodations);
          setLoading(false);
        }, 1000);
        return;
      }

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

  // Handles input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handles form submission (add/edit accommodation)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.residence_id || !form.residence_type || !form.location) {
      setError("Please fill residence ID, residence type, and location.");
      return;
    }

    const formattedForm = {
      ...form,
      rentals: Number(form.rentals),
      deposit: Number(form.deposit),
      rooms: Number(form.rooms),
    };

    try {
      if (USE_MOCK_DATA) {
        // Simulate adding/editing in mock data
        const newAccommodation = {
          ...formattedForm,
          _id: editingId || Date.now().toString(),
        };

        if (editingId) {
          setAccommodations((prev) =>
            prev.map((acc) => (acc._id === editingId ? newAccommodation : acc))
          );
        } else {
          setAccommodations((prev) => [...prev, newAccommodation]);
        }
      } else {
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
      }

      setForm(emptyForm);
      setEditingId(null);
      setError(null);
      setShowFormModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handles deletion of an accommodation
  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this accommodation?")
    ) {
      return;
    }

    try {
      if (USE_MOCK_DATA) {
        setAccommodations((prev) => prev.filter((acc) => acc._id !== id));
      } else {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete accommodation.");
        await fetchAccommodations();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Sets the form for editing an existing accommodation
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
    setShowFormModal(true);
  };

  // Cancels form editing/addition
  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
    setShowFormModal(false);
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading accommodations...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <div className="error-content">
          <p className="error-text">Error: {error}</p>
          <button onClick={fetchAccommodations} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );

  // Filter accommodations for sections
  const locatedNearYou = accommodations.slice(0, 3);
  const availableInChitungwiza = accommodations.slice(3);

  return (
    <div className="app-container">
      {/* Header/Hero Section */}

      <main className="main-content">
        {/* Navigation Tabs and Filters */}
        <div className="nav-section">
          <div className="nav-tabs">
            <button className="nav-tab nav-tab-active">
              <Home className="nav-icon" />
              Accommodation
            </button>
            <button className="nav-tab">
              <Settings className="nav-icon" />
              Services
            </button>
          </div>
          <button className="filter-button">
            <Filter className="nav-icon" />
            Filters
          </button>
        </div>

        {/* Located Near You Section */}
        <section className="section">
          <h2 className="section-title">Located Near You</h2>
          {locatedNearYou.length === 0 ? (
            <div className="empty-state">
              <p>No accommodations found near you.</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {locatedNearYou.map((acc) => (
                <AccommodationCard
                  key={acc._id}
                  accommodation={acc}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>

        {/* Available in Chitungwiza Unit L Section */}
        <section className="section">
          <h2 className="section-title">Available in Chitungwiza Unit L</h2>
          {availableInChitungwiza.length === 0 ? (
            <div className="empty-state">
              <p>No accommodations found in Chitungwiza Unit L.</p>
            </div>
          ) : (
            <div className="grid grid-4">
              {availableInChitungwiza.map((acc) => (
                <AccommodationCard
                  key={acc._id}
                  accommodation={acc}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>

        {/* Add New Accommodation Button */}
        <div className="add-button-container">
          <button
            onClick={() => setShowFormModal(true)}
            className="btn btn-primary btn-large"
          >
            Add New Accommodation
          </button>
        </div>

        {/* Form Modal for Add/Edit */}
        {showFormModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2 className="modal-title">
                {editingId ? "Edit Accommodation" : "Add New Accommodation"}
              </h2>
              {error && (
                <div className="error-banner">
                  <p>{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="form">
                <div className="form-section">
                  <h3 className="form-section-title">Basic Information</h3>
                </div>

                <div className="form-grid">
                  {[
                    {
                      label: "Residence ID",
                      name: "residence_id",
                      required: true,
                    },
                    {
                      label: "Residence Type",
                      name: "residence_type",
                      required: true,
                    },
                    { label: "Location", name: "location", required: true },
                    {
                      label: "Rentals ($)",
                      name: "rentals",
                      type: "number",
                      required: true,
                    },
                    {
                      label: "Deposit ($)",
                      name: "deposit",
                      type: "number",
                      required: true,
                    },
                    {
                      label: "Number of Rooms",
                      name: "rooms",
                      type: "number",
                      required: true,
                    },
                  ].map(({ label, name, type = "text", required }) => (
                    <div key={name} className="form-group">
                      <label htmlFor={name} className="form-label">
                        {label}{" "}
                        {required && <span className="required">*</span>}
                      </label>
                      <input
                        id={name}
                        name={name}
                        type={type}
                        value={form[name]}
                        onChange={handleChange}
                        required={!!required}
                        className="form-input"
                      />
                    </div>
                  ))}
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="description" className="form-label">
                    Description <span className="required">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="form-textarea"
                    placeholder="Describe the accommodation features, amenities, etc."
                  ></textarea>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">Owner Information</h3>
                </div>

                <div className="form-grid">
                  {[
                    { label: "Owner Name", name: "owner" },
                    {
                      label: "Owner Email",
                      name: "owner_email",
                      type: "email",
                    },
                    { label: "Owner Phone", name: "owner_phone" },
                    { label: "Owner ID", name: "owner_id" },
                  ].map(({ label, name, type = "text" }) => (
                    <div key={name} className="form-group">
                      <label htmlFor={name} className="form-label">
                        {label}
                      </label>
                      <input
                        id={name}
                        name={name}
                        type={type}
                        value={form[name]}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  ))}
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="owner_address" className="form-label">
                    Owner Address
                  </label>
                  <textarea
                    id="owner_address"
                    name="owner_address"
                    value={form.owner_address}
                    onChange={handleChange}
                    rows={3}
                    className="form-textarea"
                  ></textarea>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">Property Images</h3>
                </div>

                <div className="form-grid">
                  {[
                    { label: "Image 1 URL", name: "image1" },
                    { label: "Image 2 URL", name: "image2" },
                    { label: "Image 3 URL", name: "image3" },
                    { label: "Image 4 URL", name: "image4" },
                    { label: "Image 5 URL", name: "image5" },
                    { label: "Image 6 URL", name: "image6" },
                  ].map(({ label, name }) => (
                    <div key={name} className="form-group">
                      <label htmlFor={name} className="form-label">
                        {label}
                      </label>
                      <input
                        id={name}
                        name={name}
                        type="url"
                        value={form[name]}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  ))}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingId ? "Update Accommodation" : "Add Accommodation"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
}

export default AccommodationApp;
