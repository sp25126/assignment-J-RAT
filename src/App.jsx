import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RealProjectsCarousel from './components/RealProjectsCarousel';
import ServicesHub from './components/ServicesHub';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import ReviewsSection from './components/ReviewsSection';
import PreFooterCTA from './components/PreFooterCTA';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import MobileStickyBar from './components/MobileStickyBar';
import { AHMEDABAD_AREAS } from './data/servicesData';

export default function App() {
  const [selectedArea, setSelectedArea] = useState(AHMEDABAD_AREAS[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const handleOpenBooking = (service = null) => {
    setActiveService(service);
    setModalOpen(true);
  };

  const handleCloseBooking = () => {
    setModalOpen(false);
    setActiveService(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f5f0] text-[#121316]">
      {/* 1. Header with exact brand and location */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        areas={AHMEDABAD_AREAS}
      />

      {/* Main Landing Page Flow */}
      <main className="flex-1">
        {/* 2. Hero: Exact Original Words from Before State + "At a glance" card */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          selectedArea={selectedArea}
          onBookSuccess={(details) => handleOpenBooking({ name: details.service })}
        />

        {/* 2. Section 2: Real Site Assets in Autoplaying Carousel View */}
        <RealProjectsCarousel
          onOpenBooking={(service) => handleOpenBooking(service)}
        />

        {/* 4. Complete Services Catalog */}
        <ServicesHub
          onSelectService={(service) => handleOpenBooking(service)}
        />

        {/* 5. Before vs. After Craftsmanship Slider */}
        <BeforeAfterSlider />

        {/* 6. Google Reviews: Exact Original Reviews */}
        <ReviewsSection />

        {/* 7. Pre-Footer Banner: "Your next step starts here." */}
        <PreFooterCTA
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* 8. Comprehensive Footer with Exact Location & Hours */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* 9. Mobile Sticky Action Bar */}
      <MobileStickyBar onOpenBooking={() => handleOpenBooking()} />

      {/* 10. Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={handleCloseBooking}
        preselectedService={activeService}
        area={selectedArea}
      />
    </div>
  );
}
