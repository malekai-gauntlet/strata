import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationProps {
  customLogo?: {
    src: string;
    alt: string;
    className?: string;
  };
  topRightContent?: React.ReactNode;
}

const Navigation = ({ customLogo, topRightContent }: NavigationProps = {}) => {
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
  const isTexasSportsAcademyPage = location.pathname === '/texassportsacademy' || location.pathname === '/program';
  const isDarkPage = isAboutPage || isMissionPage;

  // Special styling for different pages
  const navBgClass = isParentsPage || isTexasSportsAcademyPage
    ? 'bg-white' 
    : isMobile || isDarkPage 
      ? 'bg-black' 
      : 'bg-transparent backdrop-blur-sm';

  const textColorClass = isParentsPage || isTexasSportsAcademyPage
    ? 'text-[#004aad]'
    : 'text-white';

  const linkHoverClass = isParentsPage || isTexasSportsAcademyPage
    ? 'hover:text-[#1a1a1a]'
    : 'hover:text-white';

  const mobileMenuBgClass = isParentsPage || isTexasSportsAcademyPage
    ? 'bg-white'
    : 'bg-black';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 px-8 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {customLogo ? (
          <Link to="/" className="flex items-center">
            <img 
              src={customLogo.src} 
              alt={customLogo.alt} 
              className={customLogo.className || "h-8 w-auto"}
            />
          </Link>
        ) : (
          <Link to="/" className={`${textColorClass} text-xl font-medium font-poppins`}>Strata</Link>
        )}
        
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
                    className={`${textColorClass} ${linkHoverClass} transition-colors font-poppins`}
                    onClick={closeMenu}
                  >
                    Coaches
                  </Link>
                  <Link 
                    to="/parents" 
                    className={`${textColorClass} ${linkHoverClass} transition-colors font-poppins`}
                    onClick={closeMenu}
                  >
                    Parents
                  </Link>
                  <Link 
                    to="/about" 
                    className={`${textColorClass} ${linkHoverClass} transition-colors font-poppins`}
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
            {!isTexasSportsAcademyPage && (
              <>
                <Link 
                  to="/coaches" 
                  className={`${textColorClass} ${linkHoverClass} transition-colors font-poppins`}
                >
                  Coaches
                </Link>
                <Link 
                  to="/parents" 
                  className={`${textColorClass} ${linkHoverClass} transition-colors font-poppins`}
                >
                  Parents
                </Link>
                <Link 
                  to="/about" 
                  className={`${textColorClass} ${linkHoverClass} transition-colors font-poppins`}
                >
                  About
                </Link>
              </>
            )}
            {topRightContent && (
              <div className={isTexasSportsAcademyPage ? '' : 'ml-4'}>
                {topRightContent}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;