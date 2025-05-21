import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { translations } from '../data/translations';

interface HeaderProps {
  language: 'en' | 'ru';
  setLanguage: (lang: 'en' | 'ru') => void;
  onContactClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  language, 
  setLanguage,
  onContactClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const location = useLocation();
  
  const t = translations[language].header;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: t.products },
    { path: '/services', label: t.services },
    { path: '/rd', label: t.research },
    { path: '/contact', label: t.contact }
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-2"
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-xl font-bold flex items-center transition-transform duration-300 hover:scale-105"
            aria-label="Home"
          >
            <img 
              src="/images/icons/logol.png" 
              alt="Logo" 
              className="h-10 w-auto mr-2"
            />
            <span className="text-blue-900 transition-colors duration-300">
              Innovative Chemicals
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center space-x-8"
            role="navigation"
            aria-label="Main menu"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className="nav-link text-gray-800 hover:text-blue-600 transition-colors duration-300"
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="relative">
              <button 
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center text-gray-800 hover:text-blue-600 transition-colors duration-300"
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup="true"
                aria-label="Language selection"
              >
                <Globe size={16} className="mr-1" />
                <span className="uppercase">{language}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {isLanguageMenuOpen && (
                <div 
                  className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden py-1 z-50 animate-slideDown"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="language-menu"
                >
                  <button 
                    onClick={() => { setLanguage('en'); setIsLanguageMenuOpen(false); }}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 w-full text-left"
                    role="menuitem"
                  >
                    English
                  </button>
                  <button 
                    onClick={() => { setLanguage('ru'); setIsLanguageMenuOpen(false); }}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 w-full text-left"
                    role="menuitem"
                  >
                    Русский
                  </button>
                </div>
              )}
            </div>
            
            <a 
              href="https://ichem.kz/login" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-900 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 hover:scale-105"
              aria-label="Login to customer portal"
            >
              {t.login}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X size={24} className="text-gray-800" />
            ) : (
              <Menu size={24} className="text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 top-[64px] bg-white z-50 animate-slideDown"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <nav className="h-full overflow-y-auto">
              <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="flex items-center space-x-4 py-4 border-t border-gray-200">
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`px-4 py-2 rounded-md ${
                      language === 'en' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    } transition-colors duration-300`}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => setLanguage('ru')}
                    className={`px-4 py-2 rounded-md ${
                      language === 'ru' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    } transition-colors duration-300`}
                  >
                    Русский
                  </button>
                </div>
                
                <a 
                  href="https://ichem.kz/login" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-900 text-white px-6 py-3 rounded-md text-center font-medium transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                >
                  {t.login}
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};