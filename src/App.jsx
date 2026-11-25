import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesHub from './components/ServicesHub';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import PricingPackages from './components/PricingPackages';
import WhyChooseUs from './components/WhyChooseUs';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
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
      {/* 1. Hallmark & Halden Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        areas={AHMEDABAD_AREAS}
      />

      {/* Main Landing Page Flow */}
      <main className="flex-1">
        {/* 2. Hero with Savee Typography, Hairline 3D Motion & Estimator */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          selectedArea={selectedArea}
          onBookSuccess={(details) => console.log('Booked:', details)}
        />

        {/* 3. Catalog & Curated Services Hub */}
        <ServicesHub
          onSelectService={(service) => handleOpenBooking(service)}
        />

        {/* 4. Interactive Before & After Craftsmanship Slider */}
        <BeforeAfterSlider />

        {/* 5. Fixed Rate Card & Tariff Comparison */}
        <PricingPackages
          onOpenBooking={(title) => handleOpenBooking({ name: title })}
        />

        {/* 6. Why Home Hancer Standard Comparison */}
        <WhyChooseUs />

        {/* 7. Real Ahmedabad Google Reviews */}
        <ReviewsSection />

        {/* 8. Concise FAQ Accordion */}
        <FAQSection />
      </main>

      {/* 9. Comprehensive Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* 10. Non-obstructive Mobile Sticky Action Bar */}
      <MobileStickyBar onOpenBooking={() => handleOpenBooking()} />

      {/* 11. Booking Modal Drawer */}
      <BookingModal
        isOpen={modalOpen}
        onClose={handleCloseBooking}
        preselectedService={activeService}
        area={selectedArea}
      />
    </div>
  );
}
