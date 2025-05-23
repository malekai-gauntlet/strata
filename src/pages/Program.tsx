import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';

const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => {
  return (
    <section className={`py-16 md:py-24 ${className}`} id={id}>
      {children}
    </section>
  );
};

// Elite Coaches carousel component for Program page
const ProgramCoachesCarousel = () => {
  const coaches = [
    {
      name: "JAMAL GROSS",
      sport: "Basketball",
      credentials: "NBA COACH",
      teams: "ROCKETS, TRAILBLAZERS, SUNS",
      image: "/images/Wilson perfect.jpg",
      logo: "/images/nba.png"
    },
    {
      name: "BRANDON BURTON", 
      sport: "Football",
      credentials: "NFL VETERAN",
      teams: "VIKINGS, BILLS, COLTS",
      image: "/images/Brandon Vikings.jpg",
      logo: "/images/NFL-logo.png"
    },
    {
      name: "ALEX CRUZ",
      sport: "Softball", 
      credentials: "DIVISION I SOFTBALL",
      teams: "TEXAS STATE",
      image: "/images/A. Cruz Texas State Headshot.jpg",
      logo: "/images/supercat-logo.png"
    },
    {
      name: "GRAHAM SPRAKER",
      sport: "Baseball",
      credentials: "MLB PRO", 
      teams: "BLUE JAYS, RAYS",
      image: "/images/Spraker Head Shot.jpg",
      logo: "/images/mlb-logo-png_seeklogo-188178.png"
    }
  ];

  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4">
      {coaches.map((coach, index) => (
        <div key={index} className="min-w-[340px] snap-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 h-[480px] flex flex-col relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/3 to-[#003a8c]/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#004aad]/5 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#87CEEB]/10 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Coach Photo - Larger and more prominent */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#004aad]/20 mb-6 mx-auto shadow-lg">
                <img 
                  src={coach.image} 
                  alt={coach.name}
                  className={`w-full h-full object-cover ${
                    coach.name === "JAMAL GROSS" ? "object-[center_0%]" :
                    coach.name === "ALEX CRUZ" ? "object-[center_20%]" :
                    coach.name === "GRAHAM SPRAKER" ? "object-[center_0%]" :
                    "object-center"
                  }`}
                />
              </div>
              
              {/* Coach Info - Better hierarchy */}
              <div className="flex-1 flex flex-col items-center text-center space-y-4">
                <div className="space-y-3">
                  <h4 className="text-2xl font-bold text-gray-900 leading-tight">{coach.name}</h4>
                  <div className="space-y-2">
                    <p className="text-[#004aad] text-lg font-bold tracking-wide">{coach.credentials}</p>
                    <p className="text-gray-700 text-base font-semibold">{coach.teams}</p>
                  </div>
                </div>
                
                <div className="mt-auto pt-4">
                  <p className="text-[#004aad] text-sm font-medium uppercase tracking-wider mb-4">{coach.sport}</p>
                  
                  {/* League Logo - Larger and more prominent */}
                  <div className="flex justify-center">
                    <img 
                      src={coach.logo} 
                      alt={`${coach.sport} League`}
                      className="h-16 w-auto opacity-90"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Program() {
  // Handle scrolling to section when page loads with hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait a bit for the page to fully render
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  return (
    <div className="w-full font-poppins">
      <Navigation 
        customLogo={{
          src: "/images/TSA Final Logos - CMYK-01.svg",
          alt: "Texas Sports Academy",
          className: "h-14 w-auto"
        }}
        topRightContent={
          <div className="flex items-center space-x-8">
            <div className="relative group">
              <Link to="/program" className="flex items-center space-x-2 text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200 cursor-pointer">
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
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#004aad] transition-colors duration-200 text-sm font-medium"
                  >
                    Learn 2x in 2 Hours
                  </Link>
                  <Link 
                    to="/program#athletic-success"
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#004aad] transition-colors duration-200 text-sm font-medium"
                  >
                    Athletic Success
                  </Link>
                  <Link 
                    to="/program#elite-coaches"
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
            <div className="flex items-center space-x-2 text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200 cursor-pointer">
              <span>Locations</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
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
      <section className="relative h-[80vh] bg-gradient-to-br from-[#004aad] to-[#003a8c] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/TSA Coach Kid.jpg"
            alt="Texas Sports Academy Coach Training Students"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 container mx-auto px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-integral tracking-tight text-white mb-8 leading-[0.9] max-w-5xl">
            Welcome to Texas Sports Academy
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl leading-relaxed">
            Give your kid their best chance at athletic, academic, and career success.
          </p>
          <button 
            onClick={() => document.getElementById('program-details')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-[#004aad] font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            EXPLORE THE PROGRAM
          </button>
        </div>
      </section>

      {/* What if your child could excel in both academics and athletics? */}
      <Section className="bg-white" id="program-details">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#004aad] text-sm font-semibold uppercase tracking-wider mb-4 block">
                TEXAS SPORTS ACADEMY
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1a1a1a] mb-8 leading-tight">
                What if your child could crush academics in just 2 hours and spend the rest of their day improving at their sport?
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  At Texas Sports Academy, we don't make students choose between academic excellence and athletic achievement. Our revolutionary approach combines 2-hour accelerated learning with professional sports training, giving students the best of both worlds.
                </p>
                <p>
                  Using AI-powered personalized learning, students master their core academics in just 2 focused hours each morning. This frees up their afternoons for intensive athletic training under professional coaches who've competed at the highest levels - NBA, NFL, MLB, and D1 programs.
                </p>
                <p>
                The truth is clear: Your kids can accomplish twice as much if they're not sitting in a one-size-fits-all classroom for 6 hours. Our student-athletes are limitless, and we've built a limitless environment that unlocks their potential.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/5 to-[#003a8c]/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#004aad]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#87CEEB]/20 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#004aad] rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1a1a]">The Dual Excellence Advantage</h3>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#004aad]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#004aad]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">Academic mastery in 2 hours daily</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#004aad]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#004aad]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">Professional athletic training</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#004aad]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#004aad]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">Elite life skills development</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#004aad]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#004aad]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">Top 1-2% national test scores</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* The Texas Sports Academy Day */}
      <Section className="bg-gray-50" id="tsa-day">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#c9472b] text-sm font-semibold uppercase tracking-wider mb-4 block">
                GIVE YOUR KID THEIR TIME BACK
              </span>
              <h2 className="text-4xl md:text-5xl font-integral tracking-tight text-[#1a1a1a] mb-8 leading-tight">
                The Texas Sports Academy Day
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Our carefully structured day maximizes both academic achievement and athletic development through a revolutionary approach that gives students the best of both worlds.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <p><strong>Morning Academic Mastery:</strong> Students begin each morning with 3 hours of intensive, AI-powered learning that covers all core subjects with personalized instruction, completing all academics by noon.</p>
                  </div>
                  <div>
                    <p><strong>Afternoon Athletic Excellence:</strong> By noon, academics are complete, and students transition to professional sports training with our elite coaches who provide world-class instruction in their sport of choice.</p>
                  </div>
                  <div>
                    <p><strong>Life Skills Development:</strong> Late afternoons focus on essential life skills: public speaking, financial literacy, leadership training, and career preparation - developing complete student-athletes ready for success at the next level.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9472b]/5 to-[#a23721]/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c9472b]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#ff8a80]/20 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#c9472b] rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12 2l3.09 6.26L22 9l-5 4.87 1.18 6.88L12 17.77l-6.18 2.98L7 14.87 2 10l6.91-.74L12 2z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1a1a]">A Day in the Life</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-4 h-4 bg-[#c9472b] rounded-full mr-3"></div>
                        <span className="text-xl font-bold text-gray-900">9:00 AM - 11:30 AM</span>
                      </div>
                      <p className="text-gray-700 ml-7">Accelerated Academic Learning</p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-4 h-4 bg-[#c9472b] rounded-full mr-3"></div>
                        <span className="text-xl font-bold text-gray-900">11:30 AM - 12:15 PM</span>
                      </div>
                      <p className="text-gray-700 ml-7">Lunch Break</p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-4 h-4 bg-[#c9472b] rounded-full mr-3"></div>
                        <span className="text-xl font-bold text-gray-900">12:15 PM - 3:30 PM</span>
                      </div>
                      <p className="text-gray-700 ml-7">Professional Sports Training & Life Skills Workshops</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Elite Professional Coaches */}
      <Section className="bg-white" id="elite-coaches">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#004aad] text-sm font-semibold uppercase tracking-wider mb-4 block">
                The Top 1% of Coaches
              </span>
              <h2 className="text-4xl md:text-5xl font-integral tracking-tight text-[#1a1a1a] mb-8 leading-tight">
                Elite Professional Coaches
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Our coaching staff represents the pinnacle of athletic achievement, bringing championship-level expertise directly to every student's training experience.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <p><strong>Championship Experience:</strong> Students learn directly from NBA coaches, NFL veterans, MLB professionals, and D1 stars who bring proven success from the highest levels of competition to every training session.</p>
                  </div>
                  <div>
                    <p><strong>Expert Educators:</strong> These aren't just skilled athletes - they're experienced educators who understand how to develop both athletic ability and character, combining elite performance with proven teaching methods.</p>
                  </div>
                  <div>
                    <p><strong>Success Mentorship:</strong> They've competed at the highest levels and know exactly what it takes to succeed in professional sports and life, providing students with invaluable insights and guidance.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <ProgramCoachesCarousel />
            </div>
          </div>
        </div>
      </Section>

      {/* Position Your Kid for Athletic Success */}
      <Section className="bg-gray-50" id="athletic-success">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#c9472b] text-sm font-semibold uppercase tracking-wider mb-4 block">
                COMPETITIVE ATHLETIC ADVANTAGE
              </span>
              <h2 className="text-4xl md:text-5xl font-integral tracking-tight text-[#1a1a1a] mb-8 leading-tight">
                Position Your Kid for Athletic Success
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Middle school is when athletic foundations are built for high school varsity success, college scholarships, and NIL opportunities. Our program gives your child the competitive edge they need.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <p><strong>Optimal Training Schedule:</strong> With sports starting at 12pm, your kid gets all afternoon to train with elite coaches and develop their athletic skills. By 4pm, they'll have 6-7 quality hours of academics and sports training completed - no homework stress, no late nights.</p>
                  </div>
                  <div>
                    <p><strong>Strategic Development Window:</strong> Those extra 3-4 hours daily aren't just "more practice time" - they're strategic development that positions your kid ahead of their competition during the prime opportunity window for athletic growth.</p>
                  </div>
                  <div>
                    <p><strong>Competitive Advantage:</strong> No more rushing between afterschool programs or getting home after 8pm exhausted. Your kid gets focused, professional-level training during peak hours while their peers' competition is sitting in traditional classrooms.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9472b]/5 to-[#a23721]/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c9472b]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#ff8a80]/20 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#c9472b] rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1a1a]">The Athletic Advantage</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-[#c9472b] rounded-full mr-4 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">3-4 extra hours daily for athletic development</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-[#c9472b] rounded-full mr-4 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">No rushing between programs</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-[#c9472b] rounded-full mr-4 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">Prime middle school development window</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-[#c9472b] rounded-full mr-4 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">Clear pathway to college recruitment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Learn 2x in 2 Hours */}
      <Section className="bg-gray-50" id="learn-2x">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#004aad] text-sm font-semibold uppercase tracking-wider mb-4 block">
                ALPHA SCHOOL'S COMPREHENSIVE
              </span>
              <h2 className="text-4xl md:text-5xl font-integral tracking-tight text-[#1a1a1a] mb-8 leading-tight">
                Learn 2x in 2 Hours
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Through advanced technologies and mastery-based learning, students at Texas Sports Academy complete core subjects in just two hours daily, giving them the gift of time.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <p><strong>AI-Powered Learning:</strong> Texas Sports Academy's 2-hour Learning model harnesses the power of AI technology to provide each student with 1:1 learning, accelerating academic mastery at an unprecedented pace.</p>
                  </div>
                  <div>
                    <p><strong>Afternoon Freedom:</strong> With core academics completed in just 2.5 focused hours each morning, students can use their afternoons for what they're truly passionate about: intensive athletic training under professional coaches.</p>
                  </div>
                  <div>
                    <p><strong>Limitless Potential:</strong> The truth is clear: Your kids can accomplish twice as much academically and athletically when they're not sitting in a one-size-fits-all classroom for 6 hours.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#004aad]/5 to-[#003a8c]/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#004aad]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#87CEEB]/20 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#004aad] rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1a1a]">Academic Achievement</h3>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#004aad]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#004aad]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">Academic mastery in 2 hours daily</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#004aad]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#004aad]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">Professional athletic training</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#004aad]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#004aad]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">Elite life skills development</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#004aad]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#004aad]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">Top 1-2% national test scores</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Life Skills for Champions */}
      <Section className="bg-white" id="life-skills">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#c9472b] text-sm font-semibold uppercase tracking-wider mb-4 block">
                ALPHA SCHOOL'S COMPREHENSIVE
              </span>
              <h2 className="text-4xl md:text-5xl font-integral tracking-tight text-[#1a1a1a] mb-8 leading-tight">
                Life Skills for Champions
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Texas Sports Academy isn't just about academics and athletics. We're preparing students for life by teaching essential, actionable skills that traditional schools often overlook.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <p><strong>Essential Life Skills:</strong> Students develop public speaking confidence, financial literacy, leadership capabilities, and professional networking skills that are crucial for long-term success in any field they choose.</p>
                  </div>
                  <div>
                    <p><strong>Champion Mindset:</strong> They learn time management, goal setting, and how to handle both success and setbacks with resilience, developing the mental toughness that separates champions from competitors.</p>
                  </div>
                  <div>
                    <p><strong>Life-Long Impact:</strong> Whether students pursue professional athletics, college sports, or transition directly to careers, they develop the complete skill set needed to excel in any path they choose and thrive in an ever-evolving world.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9472b]/5 to-[#a23721]/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c9472b]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#ff8a80]/20 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#c9472b] rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1a1a]">Champion Mindset</h3>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#c9472b]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#c9472b]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 110 2h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM9 6v8a1 1 0 102 0V6H9z"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">Public speaking mastery</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#c9472b]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#c9472b]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">Financial literacy education</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#c9472b]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#c9472b]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">Leadership development</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#c9472b]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#c9472b]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">Professional networking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* What's Next? CTA */}
      <Section className="bg-gray-50">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-integral tracking-tight text-[#1a1a1a] mb-8 leading-tight">
            What's Next?
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Ready to give your child the ultimate advantage in academics, athletics, and life? 
            Explore how Texas Sports Academy can transform your student-athlete's future.
          </p>
          <Link to="/contact">
            <button className="bg-[#004aad] hover:bg-[#003a8c] text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide">
              EXPLORE TEXAS SPORTS ACADEMY IN ACTION
            </button>
          </Link>
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