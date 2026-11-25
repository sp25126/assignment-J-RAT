import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

export default function Header({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface-card)]/95 backdrop-blur-md border-b border-[var(--border-subtle)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Quiet Brand Wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-semibold tracking-tight text-[var(--ink-primary)] whitespace-nowrap"
        >
          Home Hancer Services
        </a>

        {/* Desktop Navigation (Sentence case, untracked) */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--ink-secondary)]"
        >
          <a
            href="#services-3d"
            className="hover:text-[var(--ink-primary)] transition-colors"
          >
            Services
          </a>
          <a
            href="#reviews"
            className="hover:text-[var(--ink-primary)] transition-colors"
          >
            Reviews
          </a>
          <a
            href="#contact-footer"
            className="hover:text-[var(--ink-primary)] transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Actions: Quiet Phone Link + Single Primary Button */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:9157691572"
            className="flex items-center gap-2 text-sm font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors tabular-nums"
          >
            <Phone className="w-4 h-4" strokeWidth={1.5} />
            <span>9157691572</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="mayfly-btn px-5 h-9 text-xs"
          >
            <span className="btn-txt">Book Free Inspection</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[var(--ink-primary)] rounded-lg hover:bg-[var(--surface-muted)] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-[var(--ink-secondary)]">
            <a
              href="#services-3d"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[var(--ink-primary)]"
            >
              Services
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[var(--ink-primary)]"
            >
              Reviews
            </a>
            <a
              href="#contact-footer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[var(--ink-primary)]"
            >
              Contact
            </a>
          </nav>

          <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
            <a
              href="tel:9157691572"
              className="flex items-center gap-2 text-sm font-medium text-[var(--ink-primary)] tabular-nums"
            >
              <Phone className="w-4 h-4" strokeWidth={1.5} />
              <span>9157691572</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="px-4 py-2 text-sm font-medium text-[var(--ink-inverse)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] rounded-lg transition-colors"
            >
              Book Free Inspection
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
