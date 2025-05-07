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
  const isParentsPage = location.pathname === '/parents';
  const isDarkPage = isAboutPage || isMissionPage;

  // Special styling for Parents page
  const navBgClass = isParentsPage 
    ? 'bg-white' 
    : isMobile || isDarkPage 
      ? 'bg-black' 
      : 'bg-transparent backdrop-blur-sm';

  const textColorClass = isParentsPage
    ? 'text-gray-900'
    : 'text-white';

  const linkHoverClass = isParentsPage
    ? 'hover:text-gray-600'
    : 'hover:text-white';

  const mobileMenuBgClass = isParentsPage
    ? 'bg-white'
    : 'bg-black';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-6 px-8 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className={`${textColorClass} text-xl font-medium`}>Strata Schools</Link>
        
        {isMobile ? (
          <>
            <button 
              onClick={toggleMenu}
              className={`${textColorClass} ${linkHoverClass} transition-colors`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            
            {mobileMenuOpen && (
              <div className={`absolute top-full left-0 right-0 ${mobileMenuBgClass} py-4 px-8`}>
                <div className="flex flex-col space-y-4">
                  <Link 
                    to="/coaches" 
                    className={`${textColorClass} ${linkHoverClass} transition-colors`}
                    onClick={closeMenu}
                  >
                    Coaches
                  </Link>
                  <Link 
                    to="/about" 
                    className={`${textColorClass} ${linkHoverClass} transition-colors`}
                    onClick={closeMenu}
                  >
                    About
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-8">
            <Link 
              to="/coaches" 
              className={`${textColorClass} ${linkHoverClass} transition-colors`}
            >
              Coaches
            </Link>
            <Link 
              to="/about" 
              className={`${textColorClass} ${linkHoverClass} transition-colors`}
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
