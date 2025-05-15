import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

// Testimonial carousel component
const TestimonialCarousel = () => {
  const testimonials = [
    {
      quote: "This program is revolutionizing how we develop student athletes. The results speak for themselves - their students are excelling both in academics and sports.",
      author: "Mackenzie Price",
      title: "Former Director of IMG Academy"
    },
    {
      quote: "The academic progress we've seen in our daughter is remarkable. She's thriving in both her studies and athletics, something we didn't think was possible.",
      author: "Sarah Anderson",
      title: "Parent of Emma, Division 1 Recruit"
    },
    {
      quote: "What they've built here is special. They're not just developing athletes, they're developing complete student-athletes who are prepared for the next level.",
      author: "Chris Thompson",
      title: "NCAA D1 Coach"
    }
  ];

  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="min-w-full snap-center px-4">
          <div className="bg-black/50 backdrop-blur-sm p-12 rounded-lg">
            <p className="text-2xl text-white italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
            <div className="border-l-4 border-blue-400 pl-4">
              <p className="text-xl text-white font-bold">{testimonial.author}</p>
              <p className="text-lg text-blue-400">{testimonial.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Schedule timeline component
const DaySchedule = () => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Academics */}
      <div className="flex items-start">
        <div className="w-2 h-2 rounded-full bg-blue-400 mt-[14px] mr-4"></div>
        <div className="flex-1">
          <h4 className="text-2xl text-white font-bold mb-1">9am - 12pm: Academics</h4>
          <p className="text-gray-300 text-lg">
            Students finish all of the day's academics in the morning.
          </p>
        </div>
      </div>

      {/* Sports Practice */}
      <div className="flex items-start">
        <div className="w-2 h-2 rounded-full bg-blue-400 mt-[14px] mr-4"></div>
        <div className="flex-1">
          <h4 className="text-2xl text-white font-bold mb-1">12 - 3:30pm: Sports Practice</h4>
          <p className="text-gray-300 text-lg">
            Sports start at noon for focused practice with coaches.
          </p>
        </div>
      </div>

      {/* Extracurriculars */}
      <div className="flex items-start">
        <div className="w-2 h-2 rounded-full bg-blue-400 mt-[14px] mr-4"></div>
        <div className="flex-1">
          <h4 className="text-2xl text-white font-bold mb-1">3:30pm Onwards: Extracurriculars</h4>
          <p className="text-gray-300 text-lg">
            Free time for more sports practice, work, or play.
          </p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <section className={`relative h-screen ${className}`}>
      {children}
    </section>
  );
};

// Testimonial components
const ParentTestimonial = () => {
  const testimonials = [
    {
      quote: "The academic progress we've seen in our daughter is remarkable. She's thriving in both her studies and athletics, something we didn't think was possible.",
      author: "Sarah Anderson",
      title: "Parent of Emma, Division 1 Recruit"
    },
    {
      quote: "This program has transformed our son's life. He's more focused, disciplined, and excited about both school and sports.",
      author: "Michael Chen",
      title: "Parent of James, National Merit Scholar"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-black/50 backdrop-blur-sm p-8 rounded-lg">
          <p className="text-xl text-white italic mb-4 leading-relaxed">"{testimonial.quote}"</p>
          <div className="border-l-4 border-blue-400 pl-4">
            <p className="text-lg text-white font-bold">{testimonial.author}</p>
            <p className="text-md text-blue-400">{testimonial.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const LeaderQuotes = () => {
  const quotes = [
    {
      quote: "This innovative approach to student-athlete development is exactly what the industry needs. They're setting new standards in both academic and athletic excellence.",
      author: "Chris Locke",
      title: "Former Director at IMG Academy"
    },
    {
      quote: "The results speak for themselves. These students are achieving what typically takes twice the time, proving that focused, efficient learning works.",
      author: "Mackenzie Price",
      title: "Founder of 2 Hour Learning"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {quotes.map((quote, index) => (
        <div key={index} className="bg-black/50 backdrop-blur-sm p-8 rounded-lg">
          <p className="text-xl text-white italic mb-4 leading-relaxed">"{quote.quote}"</p>
          <div className="border-l-4 border-blue-400 pl-4">
            <p className="text-lg text-white font-bold">{quote.author}</p>
            <p className="text-md text-blue-400">{quote.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Partners = () => {
  return (
    <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg">
      <h3 className="text-2xl text-white font-bold mb-6">Our Partners</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center">
          <img src="/images/alpha-school-logo.png" alt="Alpha School" className="h-16 mx-auto mb-4" />
          <p className="text-lg text-white">Alpha School</p>
          <p className="text-md text-blue-400">Academic Excellence Partner</p>
        </div>
        <div className="text-center">
          <img src="/images/tsa-logo.png" alt="Texas Sports Academy" className="h-16 mx-auto mb-4" />
          <p className="text-lg text-white">Texas Sports Academy</p>
          <p className="text-md text-blue-400">Athletic Development Partner</p>
        </div>
      </div>
    </div>
  );
};

const PressFeature = () => {
  return (
    <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg">
      <div className="flex items-center gap-6">
        <img src="/images/fox-news-logo.png" alt="Fox News" className="h-12" />
        <div>
          <h3 className="text-xl text-white font-bold mb-2">Featured on Fox News</h3>
          <p className="text-lg text-white/90 italic">"Revolutionary approach combines Alpha School and 2 Hour Learning to transform student-athlete education"</p>
          <a href="#" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">Read the full article →</a>
        </div>
      </div>
    </div>
  );
};

export default function IMGPage() {
  return (
    <div className="w-full">
      <Navigation />
      
      {/* Video Hero Section */}
      <Section className="h-[80vh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/v3.mov"
        />
        <div className="absolute inset-0">
          <div className="container mx-auto h-full flex flex-col justify-center items-center">
            <h1 className="font-heading font-heading tracking-tight text-7xl md:text-8xl text-white text-center max-w-5xl leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
              YOUR KID WILL THRIVE
            </h1>
          </div>
        </div>
      </Section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-white via-gray-50 to-white py-12 shadow-lg">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-gray-800">2 Hours</div>
              <div className="text-sm uppercase tracking-wider text-gray-600">Focused Academics</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-gray-800">12 - 3pm</div>
              <div className="text-sm uppercase tracking-wider text-gray-600">Daily Sports Training</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-gray-800">Top 2%</div>
              <div className="text-sm uppercase tracking-wider text-gray-600">Academic Outcomes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-gray-800">1000+</div>
              <div className="text-sm uppercase tracking-wider text-gray-600">Hours Saved For Your Kid</div>
            </div>
          </div>
        </div>
      </section>

      {/* Unlock Potential Section */}
      <Section>
        <img
          src="/images/baseball.jpg"
          alt="Unlock Potential"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0">
          <div className="container mx-auto px-8 pt-40">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-black leading-[0.9] drop-shadow-[0_4px_30px_rgba(255,255,255,0.7)]">
                UNLOCK YOUR<br />KID'S POTENTIAL
              </h2>
              <p className="text-xl mb-8 text-black opacity-90 max-w-lg">
                Give your child the opportunity to excel in both academics and athletics.
              </p>
              <button className="bg-white hover:bg-gray-100 text-black font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide">
                SCHOOL OVERVIEW
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Excel as Athlete Section */}
      <Section>
        <img
          src="/images/soccer.jpg"
          alt="Excel as Athlete"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent">
          <div className="container mx-auto px-8 pt-40">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-white leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                EXCEL AS AN ATHLETE
              </h2>
              <p className="text-xl mb-8 text-white opacity-90 max-w-lg drop-shadow-lg">
                Train with world-class coaches every day starting at noon. Master the fundamentals and develop your skills with dedicated daily sports training.
              </p>
              <button className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide">
                Learn About Athletics
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Academic Excellence Section */}
      <Section>
        <img
          src="/images/laptop.jpg"
          alt="Academic Excellence"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent">
          <div className="container mx-auto px-8 pt-40">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-white leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                CRUSH IT AS A STUDENT
              </h2>
              <p className="text-xl mb-8 text-white opacity-90 max-w-lg drop-shadow-lg">
                With just 2 hours of focused learning in the morning, our students consistently test in the top 1-2% nationally. Experience a new way of learning that delivers exceptional results.
              </p>
              <button className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide">
                Learn About Academics
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Day in the Life Section */}
      <Section>
        <img
          src="/images/olderlaptop.jpg"
          alt="Day in the Life"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent">
          <div className="container mx-auto px-8 pt-40">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-white leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)] whitespace-nowrap">
                A DAY IN THE LIFE
              </h2>
              <p className="text-xl text-white opacity-90 max-w-lg drop-shadow-lg">
                Academics are finished in two hours, giving your child their time back. 9am - 12pm: Academics. 12 - 3:30pm: Sports practice. 3:30pm onwards: Extracurriculars.
              </p>
              <button className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide mt-8">
                See A Day In The Life
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Partners Section */}
      <section className="bg-gradient-to-r from-white via-gray-50 to-white relative">
        <div className="container mx-auto px-8">
          {/* Partner Logos */}
          <div className="pt-32 pb-12">
            <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-16 text-gray-800 leading-[0.9] text-center">
              WORLD LEADING PARTNERS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20 max-w-5xl mx-auto items-center">
              <div className="transform hover:scale-110 transition-transform duration-300">
                <a 
                  href="https://alpha.school" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <img 
                    src="/images/alpha.png" 
                    alt="Alpha School" 
                    className="h-24 w-auto mx-auto object-contain transition-all duration-300" 
                  />
                </a>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <a 
                  href="https://sportsacademy.school" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <img 
                    src="/images/TSA-Final-Logos-RGB-08.png" 
                    alt="Texas Sports Academy" 
                    className="h-24 w-auto mx-auto object-contain transition-all duration-300" 
                  />
                </a>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <a 
                  href="https://2hourlearning.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <img 
                    src="/images/2hl.svg" 
                    alt="2 Hour Learning" 
                    className="h-24 w-auto mx-auto object-contain transition-all duration-300" 
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="border-t border-gray-100 pt-12 pb-24">
            <div className="max-w-3xl mx-auto text-center">
              <svg className="w-12 h-12 mx-auto mb-8 text-gray-300" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote>
                <p className="text-2xl font-light text-gray-600 italic leading-relaxed mb-8">
                  "This innovative approach to student-athlete development is exactly what the industry needs. They're setting new standards in both academic and athletic excellence."
                </p>
                <footer className="text-gray-500">
                  <cite>
                    <span className="font-semibold text-gray-900 not-italic">Chris Locke</span>
                    <span className="mx-2">·</span>
                    <span className="italic">Former Head of School at IMG Academy</span>
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ESAs Section */}
      <Section>
        <img
          src="/images/capitol.jpg"
          alt="Texas State Capitol"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent">
          <div className="container mx-auto px-8 pt-40">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-white leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                TEXAS ESA PROGRAM
              </h2>
              <p className="text-xl mb-8 text-white opacity-90 max-w-lg drop-shadow-lg">
                Take advantage of Texas's new ESA legislation, passed on April 16, 2025. Families now receive $10,800 per student to invest in their education, making our program more accessible than ever.
              </p>
              <button className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide">
                Learn About ESAs
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-white via-gray-50 to-white py-16">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-800">About Us</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-600 hover:text-blue-600">Our Story</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-800">Programs</h3>
              <ul className="space-y-3">
                <li><Link to="/academics" className="text-gray-600 hover:text-blue-600">Academics</Link></li>
                <li><Link to="/athletics" className="text-gray-600 hover:text-blue-600">Athletics</Link></li>
                <li><Link to="/esas" className="text-gray-600 hover:text-blue-600">ESAs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-800">Resources</h3>
              <ul className="space-y-3">
                <li><Link to="/parents" className="text-gray-600 hover:text-blue-600">For Parents</Link></li>
                <li><Link to="/coaches" className="text-gray-600 hover:text-blue-600">For Coaches</Link></li>
                <li><Link to="/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-800">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a href="tel:1234567890" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    123-456-7890
                  </a>
                </li>
                <li>
                  <a href="mailto:team@strata.school" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    team@strata.school
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 