import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight, Wrench } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Services', targetId: 'services-section' },
  { label: 'Portfolio', targetId: 'transformations' },
  { label: 'Reviews', targetId: 'reviews' },
  { label: 'Contact', targetId: 'contact-footer' }
];

export default function Header({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_LINKS[i].targetId);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(NAV_LINKS[i].targetId);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTarget = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface-card)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Wordmark (Smooth scroll to top) */}
        <a
          href="#hero"
          onClick={(e) => scrollToTarget(e, 'hero')}
          className="text-base sm:text-lg font-bold tracking-tight text-[var(--ink-primary)] hover:text-[var(--accent-primary)] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary)] text-white flex items-center justify-center shrink-0 font-mono text-xs font-bold">
            H
          </div>
          <span>Home Hancer Services</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.targetId;
            return (
              <a
                key={link.targetId}
                href={`#${link.targetId}`}
                onClick={(e) => scrollToTarget(e, link.targetId)}
                className={`relative py-1 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[var(--accent-primary)] font-semibold'
                    : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-[var(--accent-primary)] rounded-full animate-in fade-in duration-200"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Right Actions: Phone + CTA Button */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+919157691572"
            className="flex items-center gap-2 text-xs lg:text-sm font-semibold text-[var(--ink-primary)] hover:text-[var(--accent-primary)] transition-colors tabular-nums"
            title="Call Home Hancer Desk"
          >
            <Phone className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" strokeWidth={2} />
            <span>+91 91576 91572</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenBooking && onOpenBooking()}
            className="h-10 px-4 rounded-xl text-xs font-semibold text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] active:scale-[0.98] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Book Free Inspection</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="tel:+919157691572"
            className="p-2 text-[var(--ink-primary)] rounded-lg hover:bg-[var(--surface-muted)] transition-colors"
            title="Call Desk"
            aria-label="Call Home Hancer"
          >
            <Phone className="w-4 h-4 text-[var(--accent-primary)]" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--ink-primary)] rounded-lg hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={1.75} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--surface-card)] px-5 py-5 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1.5 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.targetId;
              return (
                <a
                  key={link.targetId}
                  href={`#${link.targetId}`}
                  onClick={(e) => scrollToTarget(e, link.targetId)}
                  className={`py-2 px-3 rounded-lg flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] font-semibold'
                      : 'text-[var(--ink-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--ink-primary)]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                </a>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking && onOpenBooking();
              }}
              className="w-full h-11 px-4 text-xs font-semibold text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] active:scale-[0.98] rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Book Free Inspection</span>
            </button>

            <a
              href="tel:+919157691572"
              className="w-full h-10 px-4 text-xs font-semibold text-[var(--ink-primary)] bg-[var(--surface-muted)] hover:bg-[var(--border-subtle)] active:scale-[0.98] rounded-xl transition-colors flex items-center justify-center gap-2 border border-[var(--border-subtle)]"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Direct Call: +91 91576 91572</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
