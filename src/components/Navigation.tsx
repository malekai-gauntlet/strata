import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const isAboutPage = location.pathname === '/about';
  const isMissionPage = location.pathname === '/mission';
  const isDarkPage = isAboutPage || isMissionPage;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-6 px-8 ${
      isMobile || isDarkPage ? 'bg-black' : 'bg-transparent backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-medium">Strata Schools</Link>
        
        {isMobile ? (
          <>
            <button 
              onClick={toggleMenu}
              className="text-white/90 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-black py-4 px-8">
                <div className="flex flex-col space-y-4">
                  <Link 
                    to="/coaches" 
                    className="text-white/90 hover:text-white transition-colors"
                    onClick={closeMenu}
                  >
                    Coaches
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-white/90 hover:text-white transition-colors"
                    onClick={closeMenu}
                  >
                    About
                  </Link>
                  {/* Temporarily hidden
                  <Link 
                    to="/login" 
                    className="text-white/90 hover:text-white transition-colors"
                    onClick={closeMenu}
                  >
                    Coach Login
                  </Link>
                  */}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-8">
            <Link 
              to="/coaches" 
              className="text-white/90 hover:text-white transition-colors"
            >
              Coaches
            </Link>
            <Link 
              to="/about" 
              className="text-white/90 hover:text-white transition-colors"
            >
              About
            </Link>
            {/* Temporarily hidden
            <Link 
              to="/login" 
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors border border-white/20"
            >
              Coach Login
            </Link>
            */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
