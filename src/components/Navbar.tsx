import React, { useState, useEffect } from 'react';
import { Sprout, Menu, X, ShoppingBag, PhoneCall, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOrderClick: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick, cartCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'poultry', 'agriculture', 'sustainability', 'products', 'order'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Poultry', href: '#poultry' },
    { name: 'Agriculture', href: '#agriculture' },
    { name: 'Sustainability', href: '#sustainability' },
    { name: 'Products & Pricing', href: '#products' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3.5 border-b border-forest-100'
          : 'bg-gradient-to-b from-forest-950/70 via-forest-950/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group transition-transform focus:outline-none"
            aria-label="GoldenGreen Home"
          >
            <div className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center ${
              isScrolled
                ? 'bg-forest-700 text-white shadow-md shadow-forest-800/20'
                : 'bg-white/20 backdrop-blur-md text-emerald-300 border border-white/30'
            }`}>
              <Sprout className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className={`font-bold text-xl tracking-tight transition-colors ${
                  isScrolled ? 'text-forest-950' : 'text-white'
                }`}>
                  Golden<span className="text-amber-500 font-serif italic">Green</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-amber-500/20 text-amber-600 border border-amber-500/30">
                  Organic
                </span>
              </div>
              <p className={`text-[10px] uppercase font-medium tracking-wider transition-colors ${
                isScrolled ? 'text-forest-700' : 'text-emerald-200/90'
              }`}>
                Poultry & Agro Farm • Kaduwela
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                    isScrolled
                      ? isActive
                        ? 'text-forest-800 bg-forest-50 font-semibold'
                        : 'text-gray-600 hover:text-forest-800 hover:bg-forest-50/50'
                      : isActive
                        ? 'text-white bg-white/20 font-semibold backdrop-blur-sm'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Helpline & Order CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+94112345678"
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
                isScrolled ? 'text-forest-850 hover:bg-forest-50' : 'text-white/90 hover:bg-white/10'
              }`}
              title="Call Farm Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
              <span>(011) 234-5678</span>
            </a>

            <button
              onClick={onOrderClick}
              id="nav-place-order-btn"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 ${
                isScrolled
                  ? 'bg-forest-800 hover:bg-forest-900 text-white shadow-forest-900/20'
                  : 'bg-amber-500 hover:bg-amber-600 text-forest-950 shadow-amber-500/30'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Place Order</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-forest-950 text-white text-[11px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOrderClick}
              className="p-2 rounded-lg bg-amber-500 text-forest-950 text-xs font-bold flex items-center gap-1"
              aria-label="Quick Order"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors focus:outline-none ${
                isScrolled
                  ? 'text-forest-900 hover:bg-forest-50'
                  : 'text-white bg-white/10 hover:bg-white/20'
              }`}
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-forest-100 shadow-xl px-4 pt-3 pb-6 animate-slide-up">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-forest-50 hover:text-forest-800"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            <a
              href="tel:+94112345678"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-forest-800 bg-forest-50"
            >
              <PhoneCall className="w-4 h-4 text-amber-600" />
              <span>Call Hotline: (011) 234-5678</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOrderClick();
              }}
              className="w-full py-3 rounded-xl text-sm font-bold bg-forest-800 text-white flex items-center justify-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Place Order / Inquire Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
