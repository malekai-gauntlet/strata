import React from 'react';
import { Link } from 'react-router-dom';

interface StandardNavigationProps {
  currentPage?: 'events' | 'locations' | 'program' | 'texassportsacademy' | 'learn-more';
  logoLinkTo?: string;
  buttonVariant?: 'default' | 'with-scale';
}

const StandardNavigation = ({ 
  currentPage, 
  logoLinkTo = "/texassportsacademy",
  buttonVariant = 'default'
}: StandardNavigationProps) => {
  
  const handleProgramClick = (anchor: string) => (e: React.MouseEvent) => {
    if (window.location.pathname === '/program') {
      e.preventDefault();
      document.getElementById(anchor.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEventsClick = (e: React.MouseEvent) => {
    if (window.location.pathname === '/events') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isCurrentPage = (page: string) => currentPage === page;

  const buttonClasses = `bg-[#004aad] hover:bg-[#003a8c] text-white font-bold py-3 px-6 rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wide ${
    buttonVariant === 'with-scale' ? 'transform hover:scale-105' : ''
  }`;

  return (
    <div className="w-full font-poppins">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-8 bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to={logoLinkTo} className="flex items-center">
            <img 
              src="/images/TSA Final Logos - CMYK-01.svg"
              alt="Texas Sports Academy"
              className="h-14 w-auto"
            />
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-8">
            {/* The Program Dropdown */}
            <div className="relative group">
              <Link 
                to="/program" 
                onClick={handleProgramClick('')}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                <span>The Program</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="py-3">
                  <Link 
                    to="/program#learn-2x"
                    onClick={handleProgramClick('#learn-2x')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#004aad] transition-colors duration-200 text-sm font-medium"
                  >
                    Learn 2x in 2 Hours
                  </Link>
                  <Link 
                    to="/program#athletic-success"
                    onClick={handleProgramClick('#athletic-success')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#004aad] transition-colors duration-200 text-sm font-medium"
                  >
                    Athletic Success
                  </Link>
                  <Link 
                    to="/program#elite-coaches"
                    onClick={handleProgramClick('#elite-coaches')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#004aad] transition-colors duration-200 text-sm font-medium"
                  >
                    Elite Coaches
                  </Link>
                </div>
              </div>
            </div>

            {/* Locations */}
            {isCurrentPage('locations') ? (
              <div className="flex items-center space-x-2 text-[#004aad] text-sm font-bold">
                <span>Locations</span>
              </div>
            ) : (
              <Link 
                to="/location" 
                className="flex items-center space-x-2 text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200"
              >
                <span>Locations</span>
              </Link>
            )}

            {/* Events */}
            {isCurrentPage('events') ? (
              <Link 
                to="/events" 
                className="flex items-center space-x-2 text-[#004aad] text-sm font-bold transition-colors duration-200"
                onClick={handleEventsClick}
              >
                <span>Events</span>
              </Link>
            ) : (
              <Link 
                to="/events" 
                className="flex items-center space-x-2 text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200"
              >
                <span>Events</span>
              </Link>
            )}

            {/* Admission */}
            <span className="text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200 cursor-pointer">
              Admission
            </span>

            {/* Start Your Academy */}
            <Link 
              to="/coach-application"
              className="text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200"
            >
              Start Your Academy
            </Link>

            {/* Find An Academy Button */}
            <Link 
              to="/learn-more"
              className={buttonClasses}
            >
              Find An Academy
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default StandardNavigation; 