import React from 'react';
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

// Campus card component
const CampusCard = ({ 
  name, 
  gradeLevel, 
  address, 
  status, 
  tuition, 
  image, 
  statusColor, 
  applicationStatus,
  slug
}: {
  name: string;
  gradeLevel: string;
  address?: string;
  status: string;
  tuition?: string;
  image: string;
  statusColor: string;
  applicationStatus?: string;
  slug: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Campus Image */}
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
      </div>

      {/* Campus Details */}
      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          <p className="text-lg text-[#004aad] font-semibold">{gradeLevel}</p>
          {address && (
            <p className="text-gray-600">{address}</p>
          )}
        </div>

        {applicationStatus && (
          <p className="text-gray-700 font-medium">{applicationStatus}</p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center">
          <Button asChild className="bg-[#004aad] hover:bg-[#003a8c] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            <Link to={`/school/${slug}`}>Learn More</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Location() {
  const campuses = [
    {
      name: "Texas Sports Academy Lake Travis - Flagship",
      gradeLevel: "(6-8)",
      address: "4402 Hudson Bend Rd, Austin, TX 78734",
      status: "Open",
      image: "/images/TSA Door.jpg",
      statusColor: "bg-green-600",
      slug: "lake-travis"
    },
    {
      name: "Texas Sports Academy Round Rock", 
      gradeLevel: "(6-8)",
      status: "Coming Soon",
      image: "/images/roundrock.jpg",
      statusColor: "bg-blue-600",
      applicationStatus: "Fall 2025 applications opening soon.",
      slug: "round-rock"
    },
    {
      name: "Texas Sports Academy Carrollton",
      gradeLevel: "(6-8)",
      status: "Coming Soon",
      image: "/images/Carrollton2.png",
      statusColor: "bg-blue-600",
      applicationStatus: "Campus planning in progress.",
      slug: "carrollton"
    },
    {
      name: "Texas Sports Academy Houston",
      gradeLevel: "(6-8)",
      status: "Coming Soon",
      image: "/images/court.jpg",
      statusColor: "bg-blue-600",
      applicationStatus: "Fall 2025 applications opening soon.",
      slug: "houston"
    },
  ];

  return (
    <div className="w-full font-poppins">
      <StandardNavigation currentPage="locations" />

      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-br from-[#004aad] to-[#003a8c] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/TSA Door.jpg"
            alt="Texas Sports Academy Campus Locations"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 container mx-auto px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-integral tracking-tight text-white mb-8 leading-[0.9] max-w-5xl">
            Sports Academy Locations
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl leading-relaxed">
            Discover our growing network of campuses across Texas.
          </p>
          <button 
            onClick={() => document.getElementById('campus-locations')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-[#004aad] font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            EXPLORE CAMPUSES
          </button>
        </div>
      </section>

      {/* Campus Locations Grid */}
      <Section id="campus-locations" className="bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-integral tracking-tight text-gray-900 mb-6 leading-[0.9]">
              Texas Sports Academy Campuses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our growing network of campuses across Texas, where student-athletes master academics 
              in 2 hours daily and spend afternoons training with elite professional coaches.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campuses.map((campus, index) => (
              <CampusCard key={index} {...campus} />
            ))}
          </div>
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