import React, { useState, useEffect } from "react";
import { Heart, MapPin, Bed, Wifi, Car, Droplets, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import "./Card.scss";

// Mock data for featured properties
const featuredProperties = [
  {
    id: 1,
    title: "Modern 3-Bedroom Apartment",
    location: "Chitungwiza Unit A",
    price: 800,
    bedrooms: 3,
    type: "Apartment",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop"
    ],
    amenities: ["Wi-Fi", "Parking", "Water"],
    rating: 4.8,
    reviews: 24,
    featured: true
  },
  {
    id: 2,
    title: "Spacious 5-Bedroom House",
    location: "Chitungwiza Unit B",
    price: 1200,
    bedrooms: 5,
    type: "House",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&h=300&fit=crop"
    ],
    amenities: ["Wi-Fi", "Parking", "Water", "Garden"],
    rating: 4.9,
    reviews: 18,
    featured: true
  },
  {
    id: 3,
    title: "Cozy 2-Bedroom Cottage",
    location: "Chitungwiza Unit C",
    price: 600,
    bedrooms: 2,
    type: "Cottage",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop"
    ],
    amenities: ["Wi-Fi", "Parking"],
    rating: 4.6,
    reviews: 12,
    featured: false
  },
  {
    id: 4,
    title: "Modern 4-Bedroom Apartment",
    location: "Chitungwiza Unit L",
    price: 1000,
    bedrooms: 4,
    type: "Apartment",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop"
    ],
    amenities: ["Wi-Fi", "Parking", "Water"],
    rating: 4.7,
    reviews: 31,
    featured: true
  }
];

const PropertyCard = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wi-fi':
      case 'wifi':
        return <Wifi size={16} />;
      case 'parking':
      case 'carpark':
        return <Car size={16} />;
      case 'water':
      case 'borehole':
        return <Droplets size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="property-card">
      {/* Image Carousel */}
      <div className="property-image-container">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="property-image"
        />
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="image-nav-btn image-nav-prev"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="image-nav-btn image-nav-next"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        
        {/* Image Indicators */}
        {property.images.length > 1 && (
          <div className="image-indicators">
            {property.images.map((_, index) => (
              <button
                key={index}
                className={`image-indicator ${
                  index === currentImageIndex ? 'active' : ''
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Image ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {/* Heart Icon */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`heart-btn ${isLiked ? 'liked' : ''}`}
          aria-label="Add to favorites"
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
        </button>
        
        {/* Featured Badge */}
        {property.featured && (
          <div className="featured-badge">Featured</div>
        )}
      </div>
      
      {/* Property Details */}
      <div className="property-details">
        <div className="property-header">
          <h3 className="property-title">{property.title}</h3>
          <div className="property-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{property.rating}</span>
            <span className="rating-reviews">({property.reviews})</span>
          </div>
        </div>
        
        <div className="property-location">
          <MapPin size={16} />
          <span>{property.location}</span>
        </div>
        
        {/* Amenities */}
        <div className="property-amenities">
          <div className="bedrooms">
            <Bed size={16} />
            <span>{property.bedrooms} Bedrooms</span>
          </div>
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <div key={index} className="amenity">
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
          {property.amenities.length > 3 && (
            <span className="amenities-more">+{property.amenities.length - 3} more</span>
          )}
        </div>
        
        {/* Price and Action */}
        <div className="property-footer">
          <div className="property-price">
            <span className="price">${property.price}</span>
            <span className="price-period">/month</span>
          </div>
          <button className="view-details-btn">
            <Eye size={16} />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Card() {
  const [displayCount, setDisplayCount] = useState(3);
  
  const showMore = () => {
    setDisplayCount(featuredProperties.length);
  };
  
  const showLess = () => {
    setDisplayCount(3);
  };

  return (
    <div className="cards-container">
      <div className="cards-grid">
        {featuredProperties.slice(0, displayCount).map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      
      {/* Show More/Less Button */}
      <div className="cards-actions">
        {displayCount < featuredProperties.length ? (
          <button onClick={showMore} className="show-more-btn">
            Show More Properties
          </button>
        ) : (
          <button onClick={showLess} className="show-less-btn">
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}
