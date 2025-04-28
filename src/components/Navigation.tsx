import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-8 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#intro" className="text-white text-xl font-semibold">Strata Schools</a>
        
        {isMobile ? (
          <>
            <button 
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            
            {mobileMenuOpen && (
              <div className="fixed inset-0 top-[76px] z-40 bg-secondary animate-fade-in">
                <div className="flex flex-col items-center pt-12 space-y-8">
                  <a href="#opportunity" className="text-xl text-gray-400 hover:text-white transition-colors" onClick={closeMenu}>Opportunity</a>
                  <a href="#legacy" className="text-xl text-gray-400 hover:text-white transition-colors" onClick={closeMenu}>Legacy</a>
                  <a href="#income" className="text-xl text-gray-400 hover:text-white transition-colors" onClick={closeMenu}>Income</a>
                  <a href="#academics" className="text-xl text-gray-400 hover:text-white transition-colors" onClick={closeMenu}>Academics</a>
                  <a href="#partner" className="text-xl text-gray-400 hover:text-white transition-colors" onClick={closeMenu}>Partnership</a>
                  <a href="#start" className="text-xl px-6 py-2 bg-white text-secondary rounded-full font-medium hover:bg-gray-100 transition-colors" onClick={closeMenu}>Start</a>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-x-6">
            <a href="#opportunity" className="text-gray-400 hover:text-white transition-colors">Opportunity</a>
            <a href="#legacy" className="text-gray-400 hover:text-white transition-colors">Legacy</a>
            <a href="#income" className="text-gray-400 hover:text-white transition-colors">Income</a>
            <a href="#academics" className="text-gray-400 hover:text-white transition-colors">Academics</a>
            <a href="#partner" className="text-gray-400 hover:text-white transition-colors">Partnership</a>
            <a href="#start" className="px-6 py-2 bg-white text-secondary rounded-full font-medium hover:bg-gray-100 transition-colors">Get Started</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
