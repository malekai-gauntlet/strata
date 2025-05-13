import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// Testimonial carousel component
const TestimonialCarousel = () => {
  const testimonials = [
    {
      quote: "My child's athletic performance improved dramatically in just 3 months",
      author: "Sarah M., Parent",
      metric: "85% improvement in performance"
    },
    {
      quote: "The combination of academics and athletics is perfectly balanced",
      author: "John D., Parent",
      metric: "Top 2% test scores"
    },
    {
      quote: "Best decision we've made for our child's future",
      author: "Michael R., Parent",
      metric: "Recruited by D1 schools"
    }
  ];

  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="min-w-full snap-center px-4">
          <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg">
            <p className="text-2xl text-white italic mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">"{testimonial.quote}"</p>
            <p className="text-lg text-white/90">{testimonial.author}</p>
            <p className="text-blue-400 font-bold text-lg mt-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{testimonial.metric}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Schedule timeline component
const DaySchedule = () => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-4">
        <div className="w-24 text-right font-bold">9:00 AM</div>
        <div className="flex-1 bg-white/10 p-4 rounded">
          <h4 className="font-bold">Academics</h4>
          <p className="text-sm text-gray-300">Personalized learning software</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-24 text-right font-bold">12:00 PM</div>
        <div className="flex-1 bg-white/10 p-4 rounded">
          <h4 className="font-bold">Sports Training</h4>
          <p className="text-sm text-gray-300">Professional coaching & development</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-24 text-right font-bold">3:00 PM</div>
        <div className="flex-1 bg-white/10 p-4 rounded">
          <h4 className="font-bold">Day Concludes</h4>
          <p className="text-sm text-gray-300">Ready for family time</p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0, 0.7, 0.7]
  );

  return (
    <motion.section
      ref={ref}
      className={`relative h-screen ${className}`}
    >
      {children}
      <motion.div 
        className="absolute inset-0 bg-black pointer-events-none" 
        style={{ opacity }}
      />
    </motion.section>
  );
};

export default function IMGPage() {
  return (
    <div className="w-full">
      {/* Video Hero Section */}
      <Section className="h-[80vh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/athletes.mov"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
          <div className="container mx-auto h-full flex flex-col justify-center items-center">
            <h1 className="font-heading font-heading tracking-tight text-8xl md:text-9xl text-white text-center max-w-5xl leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
              YOUR KID WILL THRIVE
            </h1>
          </div>
        </div>
      </Section>

      {/* Stats Bar */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2 Hours</div>
              <div className="text-sm uppercase tracking-wider opacity-80">Focused Academics</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">12pm - 3pm</div>
              <div className="text-sm uppercase tracking-wider opacity-80">Daily Sports Training</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">Top 2%</div>
              <div className="text-sm uppercase tracking-wider opacity-80">Academic Outcomes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-sm uppercase tracking-wider opacity-80">Hours Saved For Your Kid</div>
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
          <div className="container mx-auto px-8 pt-16">
            <div className="bg-blue-600/20 border border-blue-400/30 text-white px-6 py-2 inline-block mb-16 text-xl font-heading tracking-wider backdrop-blur-sm">
              THE DREAM
            </div>
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-white leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                UNLOCK YOUR<br />KID'S POTENTIAL
              </h2>
              <p className="text-xl mb-8 text-white opacity-90 max-w-lg">
                Give your child the opportunity to excel in both academics and athletics.
              </p>
              <button className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 backdrop-blur-sm transition-all text-lg">
                Discover How
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
          <div className="container mx-auto px-8 pt-32">
            <div className="max-w-xl">
              <div className="bg-blue-600/20 border border-blue-400/30 text-white px-6 py-2 inline-block mb-6 text-xl font-heading tracking-wider backdrop-blur-sm">
                ATHLETICS
              </div>
              <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                EXCEL AS AN ATHLETE
              </h2>
              <ul className="text-xl mb-8 text-white opacity-90 space-y-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 mr-4"></span>
                  World-class coaches
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 mr-4"></span>
                  Daily sports training, starting at noon
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 mr-4"></span>
                  Master fundamentals and skills
                </li>
              </ul>
              <button className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 backdrop-blur-sm transition-all text-lg">
                Meet Our Coaches
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
          <div className="container mx-auto px-8 pt-32">
            <div className="max-w-xl">
              <div className="bg-blue-600/20 border border-blue-400/30 text-white px-6 py-2 inline-block mb-6 text-xl font-heading tracking-wider backdrop-blur-sm">
                ACADEMICS
              </div>
              <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                CRUSH IT IN HIGH SCHOOL
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-xl text-white opacity-90">
                  Just 2 hours of focused learning in the morning.
                </p>
                <p className="text-xl text-white opacity-90">
                  Our students consistently test in the top 1-2% nationally.
                </p>
              </div>
              <button className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 backdrop-blur-sm transition-all text-lg">
                Learn About Our Academics
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Social Proof Section */}
      <Section>
        <img
          src="/images/stadium.jpg"
          alt="Success Stories"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
          <div className="container mx-auto px-8 pt-32">
            <div className="max-w-xl">
              <div className="bg-blue-600/20 border border-blue-400/30 text-white px-6 py-2 inline-block mb-6 text-xl font-heading tracking-wider backdrop-blur-sm">
                SUCCESS STORIES
              </div>
              <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                JOIN OUR CHAMPIONS
              </h2>
              <TestimonialCarousel />
              <button className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 backdrop-blur-sm transition-all text-lg">
                Read More Stories
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ESAs Section */}
      <Section>
        <img
          src="/images/iStock-2041276552.jpg"
          alt="Education Funding"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
          <div className="container mx-auto px-8 pt-32">
            <div className="max-w-xl">
              <div className="bg-blue-600/20 border border-blue-400/30 text-white px-6 py-2 inline-block mb-6 text-xl font-heading tracking-wider backdrop-blur-sm">
                EDUCATION SAVINGS
              </div>
              <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                TEXAS ESA PROGRAM
              </h2>
              <div className="space-y-6 mb-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Historic Change in Texas Education</h3>
                  <ul className="text-xl text-white opacity-90 space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 mr-4"></span>
                      New ESA legislation passed on April 16, 2025
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 mr-4"></span>
                      Families receive $10,800 per student
                    </li>
                  </ul>
                </div>
              </div>
              <button className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 backdrop-blur-sm transition-all text-lg">
                Learn About ESAs
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
          <div className="container mx-auto px-8 pt-32">
            <div className="max-w-xl">
              <div className="bg-blue-600/20 border border-blue-400/30 text-white px-6 py-2 inline-block mb-6 text-xl font-heading tracking-wider backdrop-blur-sm">
                DAILY SCHEDULE
              </div>
              <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                A DAY IN THE LIFE
              </h2>
              <DaySchedule />
              <button className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 backdrop-blur-sm transition-all text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-blue-400">Our Story</Link></li>
                <li><Link to="/team" className="hover:text-blue-400">Team</Link></li>
                <li><Link to="/careers" className="hover:text-blue-400">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Programs</h3>
              <ul className="space-y-2">
                <li><Link to="/academics" className="hover:text-blue-400">Academics</Link></li>
                <li><Link to="/athletics" className="hover:text-blue-400">Athletics</Link></li>
                <li><Link to="/esas" className="hover:text-blue-400">ESAs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/parents" className="hover:text-blue-400">For Parents</Link></li>
                <li><Link to="/coaches" className="hover:text-blue-400">For Coaches</Link></li>
                <li><Link to="/faq" className="hover:text-blue-400">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="tel:1234567890" className="hover:text-blue-400">123-456-7890</a></li>
                <li><a href="mailto:info@example.com" className="hover:text-blue-400">info@example.com</a></li>
                <li>123 Main St, City, ST 12345</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 