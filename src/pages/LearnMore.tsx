import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

export default function LearnMore() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    currentGrade: '',
    sportInterests: [],
    additionalInfo: '',
    agreeToSMS: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'sportInterests') {
        setFormData(prev => ({
          ...prev,
          sportInterests: checked 
            ? [...prev.sportInterests, value]
            : prev.sportInterests.filter(sport => sport !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const sports = [
    'Basketball (Boys)',
    'Basketball (Girls)', 
    'Football',
    'Baseball',
    'Softball',
    'Soccer (Boys)',
    'Soccer (Girls)',
    'Tennis',
    'Golf',
    'Track & Field',
    'Cross Country',
    'Volleyball'
  ];

  const grades = [
    'Kindergarten',
    '1st Grade',
    '2nd Grade', 
    '3rd Grade',
    '4th Grade',
    '5th Grade',
    '6th Grade',
    '7th Grade',
    '8th Grade',
    '9th Grade',
    '10th Grade',
    '11th Grade',
    '12th Grade'
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 font-poppins">
      <Navigation 
        customLogo={{
          src: "/images/TSA Final Logos - CMYK-01.svg",
          alt: "Texas Sports Academy",
          className: "h-14 w-auto",
          linkTo: "/texassportsacademy"
        }}
        topRightContent={
          <div className="flex items-center space-x-8">
            <div className="relative group">
              <Link to="/program" 
                onClick={(e) => {
                  if (window.location.pathname === '/program') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200 cursor-pointer">
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
                    onClick={(e) => {
                      if (window.location.pathname === '/program') {
                        e.preventDefault();
                        document.getElementById('learn-2x')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#004aad] transition-colors duration-200 text-sm font-medium"
                  >
                    Learn 2x in 2 Hours
                  </Link>
                  <Link 
                    to="/program#athletic-success"
                    onClick={(e) => {
                      if (window.location.pathname === '/program') {
                        e.preventDefault();
                        document.getElementById('athletic-success')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#004aad] transition-colors duration-200 text-sm font-medium"
                  >
                    Athletic Success
                  </Link>
                  <Link 
                    to="/program#elite-coaches"
                    onClick={(e) => {
                      if (window.location.pathname === '/program') {
                        e.preventDefault();
                        document.getElementById('elite-coaches')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#004aad] transition-colors duration-200 text-sm font-medium"
                  >
                    Elite Coaches
                  </Link>
                </div>
              </div>
            </div>
            <span className="text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200 cursor-pointer">
              Admission
            </span>
            <Link 
              to="/location" 
              className="flex items-center space-x-2 text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200"
            >
              <span>Locations</span>
            </Link>
            <span className="text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200 cursor-pointer">
              Events
            </span>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200 cursor-pointer">
              <span>Resources</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200 cursor-pointer">
              <span>Insights</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <span className="text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200 cursor-pointer">
              Start Your Academy
            </span>
            <button className="bg-[#004aad] hover:bg-[#003a8c] text-white font-bold py-3 px-6 rounded-lg text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide">
              Find An Academy
            </button>
          </div>
        }
      />

      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-[#004aad] via-[#0056cc] to-[#87CEEB]">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            LEARN MORE
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Ready to revolutionize your child's education? Complete the form below to take the next step.
          </p>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Sidebar - Information */}
          <div className="bg-[#004aad] rounded-3xl p-8 md:p-12 text-white">
            
            {/* Admissions Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-black mb-6 tracking-wide">Admissions</h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Submit your application and take the first step toward providing your child with a revolutionary education that combines 2-hour academic excellence with dedicated athletic training.
              </p>
              <button className="bg-white text-[#004aad] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200 uppercase tracking-wide">
                Apply Now!
              </button>
            </div>

            <hr className="border-white/20 mb-12" />

            {/* Get In Touch Section */}
            <div className="mb-12">
              <h3 className="text-lg font-bold mb-4 text-white">
                Bring Texas Sports Academy to your City
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Interested in starting a Texas Sports Academy in your area? Join our mission to revolutionize education by combining efficient academics with elite athletic training. Be part of the future of student-athlete development.
              </p>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#004aad] transition-colors duration-200 uppercase tracking-wide">
                Get In Touch
              </button>
            </div>

            <hr className="border-white/20 mb-12" />

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                Thanks for your interest in Texas Sports Academy! We're excited to help your child thrive academically and athletically. Our admissions team will review your application and reach out to discuss next steps.
              </p>
              <p className="text-white/80 mb-2">
                Need to <strong>request a transcript or test scores?</strong>
              </p>
              <p className="text-white/80">
                Email <strong>registrar@sportsacademy.school</strong>
              </p>
            </div>
          </div>

          {/* Right Side - Application Form */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street address
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              {/* City, State, Zip */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City*
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State*
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code*
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Current Grade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student's Current Grade Level*
                </label>
                <select
                  name="currentGrade"
                  value={formData.currentGrade}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent outline-none transition-all duration-200"
                >
                  <option value="">Select grade level</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              {/* Sport Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Which sports are you interested in?*
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {sports.map(sport => (
                    <label key={sport} className="flex items-center">
                      <input
                        type="checkbox"
                        name="sportInterests"
                        value={sport}
                        checked={formData.sportInterests.includes(sport)}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#004aad] border-gray-300 rounded focus:ring-[#004aad] focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-700">{sport}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about us?*
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent outline-none transition-all duration-200 resize-none"
                  placeholder="Please share how you discovered Texas Sports Academy and any additional information you'd like us to know..."
                />
              </div>

              {/* SMS Agreement */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToSMS"
                  checked={formData.agreeToSMS}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#004aad] border-gray-300 rounded focus:ring-[#004aad] focus:ring-2 mt-1"
                />
                <label className="ml-3 text-sm text-gray-600 leading-relaxed">
                  I agree to receive SMS messages from Texas Sports Academy regarding 
                  inquiry follow-up, enrollment to events, and promotional content about 
                  our programs. Message frequency will vary, and I understand that I can 
                  reply STOP to opt out.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#c9472b] hover:bg-[#b83e26] text-white py-4 rounded-lg font-bold text-lg transition-colors duration-200 uppercase tracking-wide"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* What's Next Section */}
      <div className="bg-[#004aad] py-24">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16">
            What's next?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <button className="bg-white text-[#004aad] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200 uppercase tracking-wide">
              Learn More
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#004aad] transition-colors duration-200 uppercase tracking-wide">
              Schedule Tour
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/images/TSA Final Logos - CMYK-01.svg" 
              alt="Texas Sports Academy"
              className="h-20 w-auto filter brightness-0 invert"
            />
          </div>
          
          <p className="text-white/80 text-sm">
            admissions@sportsacademy.school
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-[#004aad] border-t border-white/20 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">Love School</Link></li>
                <li><Link to="/program" className="text-white/80 hover:text-white transition-colors">Learn 2x in 2hrs</Link></li>
                <li><Link to="/coaches" className="text-white/80 hover:text-white transition-colors">Learn Life Skills</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/program" className="text-white/80 hover:text-white transition-colors">Texas Sports Academy in Action</Link></li>
                <li><Link to="/location" className="text-white/80 hover:text-white transition-colors">Locations</Link></li>
                <li><Link to="/coaches" className="text-white/80 hover:text-white transition-colors">Texas Sports Academy Coaches</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Insights</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">In the News</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Other Content</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Future of Education</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">CT School</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Work at Texas Sports Academy</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">NextGen Academy</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Valencia Academy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              Privacy Policy
            </p>
            <p className="text-white/60 text-sm">
              Copyright 2025 © All Rights Reserved Texas Sports Academy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 