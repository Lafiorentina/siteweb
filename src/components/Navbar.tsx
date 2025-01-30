import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const menuItems = [
    { label: t('nav.home'), href: '#inicio' },
    { label: t('nav.menu'), href: '#menu' },
    { label: t('nav.gallery'), href: '#galeria' },
    { label: t('nav.reservations'), href: '#reservas' },
    { label: t('nav.contact'), href: '#contato' }
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const element = document.querySelector(href);
      if (element) {
        const navbarHeight = 96;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        element.focus({ preventScroll: true });
      }
      setIsOpen(false);
    }
  };

  return (
    <header role="banner">
      <div 
        className={`fixed w-full h-24 z-40 transition-all duration-300 ${
          hasScrolled ? 'opacity-95 bg-[#1a472a]' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      <nav className="fixed w-full z-50" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex-shrink-0">
              <a 
                href="#inicio" 
                onClick={handleClick} 
                className="block py-2"
                aria-label="La Fiorentina - Back to home"
              >
                <img 
                  src="https://lh3.googleusercontent.com/pw/AP1GczNVIzMLx294PF6R_O48rKU--lKT8UWQLs_Ar905bEhsLIWmA6fBW-iA7I-Q582ueomDfxTCPuYJVBiKw2is_4Pc8G_6lNHT1KKNMihCWCuduQb31PZvmfRgGsN_LmMxL-FfUJrZtfCHgjkWPPfdDMSE=w813-h307-s-no-gm?authuser=0" 
                  alt="La Fiorentina Logo" 
                  className="h-20 w-auto brightness-0 invert" 
                />
              </a>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              
              <a
                href="#reservas"
                onClick={handleClick}
                className="hidden md:block bg-[#bd1e23] text-white px-6 py-3 rounded hover:bg-[#a01a1e] transition-colors font-medium"
                aria-label={t('hero.cta')}
              >
                {language === 'en' ? 'Book a Table' : 'Reserva Já'}
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 rounded-md hover:text-[#bd1e23] transition-colors"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div 
            id="mobile-menu"
            className="fixed inset-0 bg-[#1a472a] bg-opacity-95"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <nav className="flex flex-col items-center justify-center min-h-screen">
              <ul className="space-y-8" role="menu">
                {menuItems.map((item) => (
                  <li key={item.label} role="none">
                    <a
                      href={item.href}
                      onClick={handleClick}
                      className="block text-center text-2xl font-medium text-white hover:text-[#bd1e23] transition-colors py-2"
                      role="menuitem"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;