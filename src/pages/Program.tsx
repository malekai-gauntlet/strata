import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4">
      {coaches.map((coach, index) => (
        <div key={index} className="min-w-[320px] snap-center">
          <div className="bg-gradient-to-br from-[#004aad] to-[#003a8c] rounded-2xl p-8 text-white h-96 flex flex-col items-center text-center">
            {/* Coach Photo - Top Center */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 mb-6">
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
            
            {/* Coach Info - Stacked Vertically */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div>
                <h4 className="text-xl font-bold mb-2">{coach.name}</h4>
                <p className="text-[#87CEEB] text-lg font-semibold mb-4">{coach.credentials}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-white/90 text-base font-medium">{coach.teams}</p>
                <p className="text-[#87CEEB] text-sm uppercase tracking-wider">{coach.sport}</p>
              </div>
            </div>
            
            {/* League Logo - Bottom Center */}
            <div className="mt-4">
              <img 
                src={coach.logo} 
                alt={`${coach.sport} League`}
                className="h-14 w-auto opacity-80"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Program() {
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
            <Link to="/program" className="flex items-center space-x-2 text-gray-600 hover:text-[#004aad] text-sm font-medium transition-colors duration-200 cursor-pointer">
              <span>The Program</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
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
              <div className="bg-gradient-to-br from-[#004aad] to-[#003a8c] rounded-2xl p-12 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/5 rounded-full"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">The Dual Excellence Advantage</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">Academic mastery in 2 hours daily</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">Professional athletic training</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">Elite life skills development</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">Top 1-2% national test scores</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* The Texas Sports Academy Day */}
      <Section className="bg-gray-50">
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
                  Our carefully structured day maximizes both academic achievement and athletic development. Students begin each morning with 3 hours of intensive, AI-powered learning that covers all core subjects with personalized instruction.
                </p>
                <p>
                  By noon, academics are complete, and students transition to professional sports training. Our elite coaches provide world-class instruction in their sport of choice.
                </p>
                <p>
                  Late afternoons focus on life skills development: public speaking, financial literacy, leadership training, and career preparation. This comprehensive approach develops complete student-athletes who are ready for success at the next level.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-[#c9472b] to-[#a23721] rounded-2xl p-12 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/5 rounded-full"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">A Day in the Life</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-4 h-4 bg-white rounded-full mr-3"></div>
                        <span className="text-xl font-bold">9:00 AM - 11:30 AM</span>
                      </div>
                      <p className="text-white/90 ml-7">Accelerated Academic Learning</p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-4 h-4 bg-white rounded-full mr-3"></div>
                        <span className="text-xl font-bold">11:30 AM - 12:15 PM</span>
                      </div>
                      <p className="text-white/90 ml-7">Lunch Break</p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-4 h-4 bg-white rounded-full mr-3"></div>
                        <span className="text-xl font-bold">12:15 PM - 3:30 PM</span>
                      </div>
                      <p className="text-white/90 ml-7">Professional Sports Training & Life Skills Workshops</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Elite Professional Coaches */}
      <Section className="bg-white">
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
                  Our coaching staff represents the pinnacle of athletic achievement. Students learn directly from NBA coaches, NFL veterans, MLB professionals, and D1 stars who bring championship-level expertise to every training session.
                </p>
                <p>
                  These aren't just skilled athletes - they're experienced educators who understand how to develop both athletic ability and character. They've competed at the highest levels and know what it takes to succeed in professional sports and life.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <ProgramCoachesCarousel />
            </div>
          </div>
        </div>
      </Section>

      {/* Position Your Kid for Athletic Success */}
      <Section className="bg-gray-50">
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
                  With sports starting at 12pm, your kid gets all afternoon to train with elite coaches and develop their athletic skills. By 4pm, they'll have 6-7 quality hours of academics and sports training completed - no homework stress, no late nights.
                </p>
                <p>
                  This is the prime opportunity window. Middle school is when athletic foundations are built for high school varsity success, college scholarships, and NIL opportunities. Those extra 3-4 hours daily aren't just "more practice time" - they're strategic development that positions your kid ahead of their competition.
                </p>
                <p>
                  No more rushing between afterschool programs. No more getting home after 8pm exhausted. Your kid gets focused, professional-level training during peak hours while their peers competition is sitting in traditional classrooms.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-[#c9472b] to-[#a23721] rounded-2xl p-12 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/5 rounded-full"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">The Athletic Advantage</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">3-4 extra hours daily for athletic development</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">No rushing between programs</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">Prime middle school development window</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">Clear pathway to college recruitment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Learn 2x in 2 Hours */}
      <Section className="bg-gray-50">
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
                  Texas Sports Academy's 2-hour Learning model harnesses the power of AI technology to provide each student with 1:1 learning, accelerating academic mastery and giving them the gift of time.
                </p>
                <p>
                  With core academics completed in just 2.5 focused hours each morning, students can use their afternoons for what they're truly passionate about: intensive athletic training under professional coaches who've competed at the highest levels - NBA, NFL, MLB, and D1 programs.
                </p>
                <p>
                  The truth is clear: Your kids can accomplish twice as much academically and athletically when they're not sitting in a one-size-fits-all classroom for 6 hours. Our student-athletes are limitless, and we've built a limitless environment that unlocks their full potential.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-[#004aad] to-[#003a8c] rounded-2xl p-12 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/5 rounded-full"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">Academic Achievement</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">Top 1-2% national test scores</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">Personalized AI learning</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">2-5x faster mastery</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">College-ready preparation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Life Skills for Champions */}
      <Section className="bg-white">
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
                  Beyond academics and athletics, we prepare students for life success through comprehensive life skills training. Our curriculum covers essential areas that traditional schools often overlook but that are crucial for long-term success.
                </p>
                <p>
                  Students develop public speaking confidence, financial literacy, leadership capabilities, and professional networking skills. They learn time management, goal setting, and how to handle both success and setbacks with resilience.
                </p>
                <p>
                  Whether students pursue professional athletics, college sports, or transition directly to careers, they develop the complete skill set needed to excel in any path they choose.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-[#c9472b] to-[#a23721] rounded-2xl p-12 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/5 rounded-full"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">Champion Mindset</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">Public speaking mastery</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">Financial literacy education</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">Leadership development</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <span className="text-lg">Professional networking</span>
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
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-8">What's next?</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link to="/admission">
                <button className="bg-white text-[#004aad] font-bold py-3 px-6 rounded-full hover:bg-gray-50 transition-all duration-300">
                  LEARN MORE
                </button>
              </Link>
              <Link to="/visit">
                <button className="border-2 border-white text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-[#004aad] transition-all duration-300">
                  VISIT
                </button>
              </Link>
              <Link to="/apply">
                <button className="border-2 border-white text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-[#004aad] transition-all duration-300">
                  APPLY
                </button>
              </Link>
            </div>
            <img 
              src="/images/TSA Final Logos - CMYK-01.svg" 
              alt="Texas Sports Academy" 
              className="h-16 mx-auto mb-8"
            />
          </div>
          
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