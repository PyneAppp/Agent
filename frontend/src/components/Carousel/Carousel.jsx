import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade
} from "swiper/modules";
import { Search, MapPin, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "./Carousel.scss";

const heroSlides = [
  {
    id: 1,
    title: "Find Your Perfect Home",
    subtitle: "Discover comfortable and affordable accommodations in Chitungwiza",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=600&fit=crop&crop=center",
    cta: "Browse Homes",
    route: "/accomodation"
  },
  {
    id: 2,
    title: "Modern Amenities Included",
    subtitle: "Wi-Fi, parking, and borehole water in all our properties",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=600&fit=crop&crop=center",
    cta: "View Amenities",
    route: "/accomodation"
  },
  {
    id: 3,
    title: "Professional Service",
    subtitle: "Expert property management and maintenance services",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=600&fit=crop&crop=center",
    cta: "Learn More",
    route: "/hire"
  }
];

export default function HeroCarousel() {
  const navigate = useNavigate();
  
  const handleButtonClick = (route) => {
    navigate(route);
  };
  return (
    <div className="hero-carousel-container">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
        effect="fade"
        navigation={true}
        pagination={{ 
          clickable: true,
          bulletClass: 'hero-pagination-bullet',
          bulletActiveClass: 'hero-pagination-bullet-active'
        }}
        autoplay={{ 
          delay: 6000,
          disableOnInteraction: false
        }}
        loop={true}
        className="hero-swiper"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="hero-slide">
            <div className="hero-slide-content">
              {/* Background Image */}
              <div 
                className="hero-background"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Overlay */}
              <div className="hero-overlay" />
              
              {/* Content */}
              <div className="hero-content">
                <div className="hero-text">
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <button 
                    className="hero-cta-button"
                    onClick={() => handleButtonClick(slide.route)}
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
