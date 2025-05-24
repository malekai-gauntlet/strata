import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StandardNavigation from '@/components/StandardNavigation';

const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => {
  return (
    <section className={`py-16 md:py-24 ${className}`} id={id}>
      {children}
    </section>
  );
};

export default function CoachApplication() {
  return (
    <div className="w-full font-poppins">
      <StandardNavigation />

      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-br from-[#004aad] to-[#003a8c] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/procoachteacher.jpg"
            alt="Coach Application"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-8 h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-integral tracking-tight mb-6 leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
            >
              COACHES APPLICATION
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl leading-relaxed opacity-90 drop-shadow-lg max-w-4xl mx-auto mb-8"
            >
              Interested in leading your own sports academy? Apply to receive more information about leading a sports academy.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => {
                document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#c9472b] hover:bg-[#a23721] text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wide transform hover:scale-105"
            >
              Apply Now
            </motion.button>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <Section className="bg-gradient-to-r from-white via-[#f5f5f5] to-white" id="application-form">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-integral tracking-tight text-[#004aad] mb-6 leading-[0.9]">
                LEAD THE NEXT GENERATION
              </h2>
              <p className="text-xl md:text-2xl text-[#1a1a1a] leading-relaxed max-w-3xl mx-auto">
                Join our network of elite coaches and entrepreneurs who are revolutionizing student-athlete development. Build your legacy while making a meaningful impact.
              </p>
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-100"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-8 text-center">
                Coach Application Form
              </h3>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-[#004aad] transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-[#004aad] transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="cell" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Cell *
                  </label>
                  <input
                    type="tel"
                    id="cell"
                    name="cell"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-[#004aad] transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-[#004aad] transition-colors"
                    placeholder="Dallas, Houston, Austin, etc."
                  />
                </div>

                <div>
                  <label htmlFor="whyGreatFit" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Please write 1-2 sentences about why you're a great fit to lead a sports academy. *
                  </label>
                  <textarea
                    id="whyGreatFit"
                    name="whyGreatFit"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-[#004aad] transition-colors resize-none"
                    placeholder="Tell us why you're a great fit to lead a sports academy..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#c9472b] hover:bg-[#a23721] text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wide"
                >
                  Submit
                </button>
              </form>
              
              <p className="text-sm text-gray-600 mt-6 leading-relaxed text-center">
                By submitting, you'll receive information about Texas Sports Academies, training programs, and next steps in the process.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-white via-[#f5f5f5] to-white py-16">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 text-[#1a1a1a]">About Us</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-[#6b7280] hover:text-[#004aad]">Our Story</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-[#1a1a1a]">Programs</h3>
              <ul className="space-y-3">
                <li><Link to="/academics" className="text-[#6b7280] hover:text-[#004aad]">Academics</Link></li>
                <li><Link to="/athletics" className="text-[#6b7280] hover:text-[#004aad]">Athletics</Link></li>
                <li><Link to="/esas" className="text-[#6b7280] hover:text-[#004aad]">ESAs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-[#1a1a1a]">Resources</h3>
              <ul className="space-y-3">
                <li><Link to="/parents" className="text-[#6b7280] hover:text-[#004aad]">For Parents</Link></li>
                <li><Link to="/coaches" className="text-[#6b7280] hover:text-[#004aad]">For Coaches</Link></li>
                <li><Link to="/faq" className="text-[#6b7280] hover:text-[#004aad]">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-[#1a1a1a]">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a href="tel:1234567890" className="text-[#6b7280] hover:text-[#004aad] flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    123-456-7890
                  </a>
                </li>
                <li>
                  <a href="mailto:team@strata.school" className="text-[#6b7280] hover:text-[#004aad] flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    team@strata.school
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-[#6b7280]">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 