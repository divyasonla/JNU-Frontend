import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const slides = [
  {
    id: 1,
    bgImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    eyebrow: "JAIPUR NATIONAL UNIVERSITY",
    heading: "Impacting World For A Greater Good",
    subheading: "Research, innovation and social impact at the core",
    primaryCta: "APPLY ONLINE",
    secondaryCta: "360° WALK THROUGH",
    secondaryId: "#campus-life"
  },
  {
    id: 2,
    bgImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    eyebrow: "EXCELLENCE IN EDUCATION",
    heading: "Empowering Next-Gen Industry Leaders",
    subheading: "World-class faculty, modern labs, and 100+ cutting-edge programs",
    primaryCta: "EXPLORE COURSES",
    secondaryCta: "CAMPUS TOUR",
    secondaryId: "#campus-life"
  },
  {
    id: 3,
    bgImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    eyebrow: "GLOBAL PLACEMENTS 2026",
    heading: "Your Gateway to Top MNC Careers",
    subheading: "45 LPA highest package with 350+ global recruiting partners",
    primaryCta: "VIEW PLACEMENTS",
    secondaryCta: "APPLY ONLINE",
    secondaryId: "#placements"
  },
  {
    id: 4,
    bgImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    eyebrow: "INNOVATION & RESEARCH",
    heading: "Pioneering Research & Healthcare",
    subheading: "State-of-the-art research centers and medical health sciences institute",
    primaryCta: "RESEARCH PORTAL",
    secondaryCta: "ADMISSION INQUIRY",
    secondaryId: "#research"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openApplyModal } = useOutletContext();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleCtaClick = (ctaText, secondaryId) => {
    if (ctaText === "APPLY ONLINE" || ctaText === "ADMISSION INQUIRY") {
      openApplyModal();
    } else if (secondaryId) {
      const element = document.querySelector(secondaryId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      className="relative h-[85vh] min-h-[650px] w-full flex items-center justify-start overflow-hidden bg-black group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out scale-105"
            style={{ 
              backgroundImage: `url(${slide.bgImage})`,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)'
            }}
          ></div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-purple-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 via-purple-900/60 to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-20 px-4 sm:px-6 lg:px-16 max-w-[1600px] mx-auto w-full h-full flex flex-col justify-center pt-20 pb-24">
            <div className={`transition-all duration-700 delay-300 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-amber-500 font-bold tracking-[0.2em] text-xs md:text-sm mb-4 drop-shadow-md uppercase">
                {slide.eyebrow}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl drop-shadow-lg font-serif">
                {slide.heading}
              </h1>
              <p className="text-lg md:text-xl text-white mb-10 max-w-2xl font-light drop-shadow-md">
                {slide.subheading}
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                  onClick={() => handleCtaClick(slide.primaryCta, null)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-10 py-4 font-bold tracking-wider text-sm transition-all text-center w-max rounded-sm shadow-lg hover:shadow-orange-500/50"
                >
                  {slide.primaryCta}
                </button>
                <button 
                  onClick={() => handleCtaClick(slide.secondaryCta, slide.secondaryId)}
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 font-bold tracking-wider text-sm transition-all text-center w-max rounded-sm"
                >
                  {slide.secondaryCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft size={28} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight size={28} />
      </button>

      {/* Carousel Indicators (Dashes) */}
      <div className="absolute bottom-12 lg:bottom-24 left-4 sm:left-6 lg:left-16 flex space-x-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              idx === currentSlide ? 'w-10 bg-amber-500' : 'w-6 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
