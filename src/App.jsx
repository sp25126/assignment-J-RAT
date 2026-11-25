import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Section2ServicesShowcase from './components/Section2ServicesShowcase';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import ReviewsSection from './components/ReviewsSection';
import PreFooterCTA from './components/PreFooterCTA';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import MobileStickyBar from './components/MobileStickyBar';
import AdminCMS from './components/AdminCMS';
import { AHMEDABAD_AREAS } from './data/servicesData';

export default function App() {
  const [selectedArea, setSelectedArea] = useState(AHMEDABAD_AREAS[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [isAdminView, setIsAdminView] = useState(() => window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenBooking = (service = null) => {
    setActiveService(service);
    setModalOpen(true);
  };

  const handleCloseBooking = () => {
    setModalOpen(false);
    setActiveService(null);
  };

  const handleToggleAdmin = (open) => {
    if (open) {
      window.location.hash = '#admin';
      setIsAdminView(true);
    } else {
      window.location.hash = '';
      setIsAdminView(false);
    }
  };

  if (isAdminView) {
    return (
      <AdminCMS
        onExit={() => handleToggleAdmin(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)] overflow-x-clip">
      {/* 1. Header with exact brand and location */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        areas={AHMEDABAD_AREAS}
      />

      {/* Main Landing Page Flow */}
      <main className="flex-1">
        {/* 2. Hero: Exact Words + Interactive 24fps Scrubbed Villa */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          selectedArea={selectedArea}
          onBookSuccess={(details) => handleOpenBooking({ name: details.service })}
        />

        {/* 3. Section 2: Catalog Specialties, Real Proof Carousel & Services Catalog */}
        <Section2ServicesShowcase
          onOpenBooking={(service) => handleOpenBooking(service)}
          onSelectService={(service) => handleOpenBooking(service)}
        />

        {/* 4. Before vs. After Craftsmanship Slider */}
        <BeforeAfterSlider />

        {/* 5. Google Reviews: Verified Ahmedabad Homeowners */}
        <ReviewsSection />

        {/* 6. Pre-Footer Banner: "Your next step starts here." */}
        <PreFooterCTA
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* 7. Comprehensive Footer with Exact Location, Hours & CMS Gateway */}
      <Footer 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenAdmin={() => handleToggleAdmin(true)}
      />

      {/* 8. Mobile Sticky Action Bar */}
      <MobileStickyBar onOpenBooking={() => handleOpenBooking()} />

      {/* 9. Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={handleCloseBooking}
        preselectedService={activeService}
        area={selectedArea}
      />
    </div>
  );
}
