import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StandardNavigation from '@/components/StandardNavigation';
import { Button } from '@/components/ui/button';

const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => {
  return (
    <section className={`py-16 md:py-24 ${className}`} id={id}>
      {children}
    </section>
  );
};

// Event card component
const EventCard = ({ 
  name, 
  type,
  date, 
  time,
  location,
  campus,
  ageGroup,
  status, 
  description,
  image, 
  statusColor
}: {
  name: string;
  type: string;
  date: string;
  time: string;
  location: string;
  campus: string;
  ageGroup: string;
  status: string;
  description: string;
  image: string;
  statusColor: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Event Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold text-white ${statusColor}`}>
          {status}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold text-white bg-black/50 backdrop-blur-sm">
          {type}
        </div>
      </div>

      {/* Event Details */}
      <div className="p-8 space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          <p className="text-lg text-[#004aad] font-semibold">{campus}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Date:</span> {date}
          </div>
          <div>
            <span className="font-semibold">Time:</span> {time}
          </div>
          <div>
            <span className="font-semibold">Ages:</span> {ageGroup}
          </div>
          <div>
            <span className="font-semibold">Location:</span> {location}
          </div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <Button className="bg-[#004aad] hover:bg-[#003a8c] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Learn More
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Events() {
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const events = [
    {
      name: "Lake Travis Open House",
      type: "Open House",
      date: "March 15, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "Lake Travis",
      campus: "Texas Sports Academy Lake Travis",
      ageGroup: "Grades 6-8",
      status: "Registration Open",
      description: "Join us for a comprehensive tour of our flagship campus. Meet our elite coaches, see our facilities, and learn about our 2-hour learning model.",
      image: "/images/TSA Door.jpg",
      statusColor: "bg-green-600"
    },
    {
      name: "Baseball Skills Clinic",
      type: "Skills Clinic",
      date: "March 22, 2024", 
      time: "9:00 AM - 12:00 PM",
      location: "Lake Travis",
      campus: "Texas Sports Academy Lake Travis",
      ageGroup: "Ages 11-14",
      status: "Few Spots Left",
      description: "Train with MLB pro Graham Spraker in this intensive baseball skills clinic. Focus on fundamentals, hitting mechanics, and fielding techniques.",
      image: "/images/baseball.jpg",
      statusColor: "bg-orange-600"
    },
    {
      name: "Parent Information Night",
      type: "Info Session",
      date: "March 28, 2024",
      time: "6:00 PM - 8:00 PM", 
      location: "Round Rock",
      campus: "Texas Sports Academy Round Rock",
      ageGroup: "Parents Only",
      status: "Coming Soon",
      description: "Learn about our upcoming Round Rock campus opening in Fall 2025. Discover how 2-hour learning can transform your student-athlete's education.",
      image: "/images/roundrock.jpg",
      statusColor: "bg-blue-600"
    },
    {
      name: "Basketball Skills Camp",
      type: "Skills Camp",
      date: "April 5, 2024",
      time: "1:00 PM - 4:00 PM",
      location: "Lake Travis", 
      campus: "Texas Sports Academy Lake Travis",
      ageGroup: "Grades 6-8",
      status: "Registration Open",
      description: "Train with NBA coach Jamal Gross in this intensive basketball camp. Develop ball-handling, shooting, and game strategy skills.",
      image: "/images/court.jpg",
      statusColor: "bg-green-600"
    },
    {
      name: "College Recruitment Workshop",
      type: "Workshop",
      date: "April 12, 2024",
      time: "10:00 AM - 1:00 PM",
      location: "Lake Travis",
      campus: "Texas Sports Academy Lake Travis", 
      ageGroup: "Grades 7-8",
      status: "Registration Open",
      description: "Learn the college recruitment process from our experienced coaches. Understand what college scouts look for in student-athletes.",
      image: "/images/soccer.jpg",
      statusColor: "bg-green-600"
    },
    {
      name: "Houston Campus Preview",
      type: "Preview Event",
      date: "April 20, 2024",
      time: "11:00 AM - 3:00 PM",
      location: "Houston",
      campus: "Texas Sports Academy Houston",
      ageGroup: "Grades 6-8", 
      status: "Coming Soon",
      description: "Get an exclusive preview of our upcoming Houston campus. Meet potential coaches and learn about Fall 2025 enrollment opportunities.",
      image: "/images/procoachteacher.jpg",
      statusColor: "bg-blue-600"
    }
  ];

  const locations = ['All', 'Lake Travis', 'Round Rock', 'Houston', 'Carrollton'];

  const filteredEvents = selectedLocation === 'All' 
    ? events 
    : events.filter(event => event.location === selectedLocation);

  return (
    <div className="w-full font-poppins">
      <StandardNavigation currentPage="events" />

      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-br from-[#004aad] to-[#003a8c] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/soccer.jpg"
            alt="Texas Sports Academy Events"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 container mx-auto px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-integral tracking-tight text-white mb-8 leading-[0.9] max-w-5xl">
            Events & Programs
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl leading-relaxed">
            Discover upcoming events, skills clinics, and information sessions across our Texas campuses.
          </p>
          <button 
            onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-[#004aad] font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            EXPLORE EVENTS
          </button>
        </div>
      </section>

      {/* Events Section */}
      <Section id="events-section" className="bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-integral tracking-tight text-gray-900 mb-6 leading-[0.9]">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for open houses, skills clinics, information sessions, and more. Experience firsthand how we're revolutionizing student-athlete education.
            </p>
          </motion.div>

          {/* Filters and View Toggle */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            {/* Location Filter */}
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => setSelectedLocation(location)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedLocation === location
                      ? 'bg-[#004aad] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#004aad] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-[#004aad] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Calendar View
              </button>
            </div>
          </div>

          {/* Events Grid */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          )}

          {/* Calendar View */}
          {viewMode === 'calendar' && (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">March 2024</h3>
                <p className="text-gray-600">Click on any date to see event details</p>
              </div>
              
              {/* Simple Calendar Layout */}
              <div className="grid grid-cols-7 gap-4 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const hasEvent = [15, 22, 28].includes(day) || (day >= 5 && day <= 12 && [5, 12].includes(day)) || day === 20;
                  return (
                    <div
                      key={day}
                      className={`h-12 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
                        hasEvent
                          ? 'bg-[#004aad] text-white hover:bg-[#003a8c]'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Blue dates have scheduled events. Switch to Grid View for full event details.
                </p>
                <Button 
                  onClick={() => setViewMode('grid')}
                  className="bg-[#004aad] hover:bg-[#003a8c] text-white"
                >
                  View All Events
                </Button>
              </div>
            </div>
          )}

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No events found</h3>
              <p className="text-gray-600 mb-6">
                No events are currently scheduled for {selectedLocation}. Check back soon for updates.
              </p>
              <Button 
                onClick={() => setSelectedLocation('All')}
                className="bg-[#004aad] hover:bg-[#003a8c] text-white"
              >
                View All Events
              </Button>
            </div>
          )}
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#004aad] to-[#003a8c] text-white py-16">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
                <li><Link to="/mission" className="hover:text-gray-300">Our Mission</Link></li>
                <li><Link to="/team" className="hover:text-gray-300">Our Team</Link></li>
                <li><Link to="/careers" className="hover:text-gray-300">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/academics" className="hover:text-gray-300">Academics</Link></li>
                <li><Link to="/athletics" className="hover:text-gray-300">Athletics</Link></li>
                <li><Link to="/life-skills" className="hover:text-gray-300">Life Skills</Link></li>
                <li><Link to="/admissions" className="hover:text-gray-300">Admissions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/parents" className="hover:text-gray-300">For Parents</Link></li>
                <li><Link to="/students" className="hover:text-gray-300">For Students</Link></li>
                <li><Link to="/coaches" className="hover:text-gray-300">For Coaches</Link></li>
                <li><Link to="/faq" className="hover:text-gray-300">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@texassportsacademy.com</li>
                <li>Texas, USA</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Texas Sports Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 