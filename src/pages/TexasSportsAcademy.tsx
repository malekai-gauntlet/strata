import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import TexasSchoolDistrictsMap from '@/components/maps/TexasSchoolDistrictsMap';

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
            <div className="border-l-4 border-[#004aad] pl-4">
              <p className="text-xl text-white font-bold">{testimonial.author}</p>
              <p className="text-lg text-[#004aad]">{testimonial.title}</p>
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
        <div className="w-2 h-2 rounded-full bg-[#004aad] mt-[14px] mr-4"></div>
        <div className="flex-1">
          <h4 className="text-2xl text-white font-bold mb-1">9am - 12pm: Academics</h4>
          <p className="text-gray-300 text-lg">
            Students finish all of the day's academics in the morning.
          </p>
        </div>
      </div>

      {/* Sports Practice */}
      <div className="flex items-start">
        <div className="w-2 h-2 rounded-full bg-[#004aad] mt-[14px] mr-4"></div>
        <div className="flex-1">
          <h4 className="text-2xl text-white font-bold mb-1">12 - 3:30pm: Sports Practice</h4>
          <p className="text-gray-300 text-lg">
            Sports start at noon for focused practice with coaches.
          </p>
        </div>
      </div>

      {/* Extracurriculars */}
      <div className="flex items-start">
        <div className="w-2 h-2 rounded-full bg-[#004aad] mt-[14px] mr-4"></div>
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
          <div className="border-l-4 border-[#004aad] pl-4">
            <p className="text-lg text-white font-bold">{testimonial.author}</p>
            <p className="text-md text-[#004aad]">{testimonial.title}</p>
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
          <div className="border-l-4 border-[#004aad] pl-4">
            <p className="text-lg text-white font-bold">{quote.author}</p>
            <p className="text-md text-[#004aad]">{quote.title}</p>
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
          <p className="text-md text-[#004aad]">Academic Excellence Partner</p>
        </div>
        <div className="text-center">
          <img src="/images/tsa-logo.png" alt="Texas Sports Academy" className="h-16 mx-auto mb-4" />
          <p className="text-lg text-white">Texas Sports Academy</p>
          <p className="text-md text-[#004aad]">Athletic Development Partner</p>
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
          <a href="#" className="text-[#004aad] hover:text-[#c9472b] mt-2 inline-block">Read the full article →</a>
        </div>
      </div>
    </div>
  );
};

export default function IMGPage() {
  return (
    <div className="w-full font-poppins">
      <Navigation 
        customLogo={{
          src: "/images/TSA Final Logos - CMYK-01.svg",
          alt: "Texas Sports Academy",
          className: "h-14 w-auto"
        }}
      />
      
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
            <h1 className="font-integral tracking-tight text-7xl md:text-8xl text-white text-center max-w-5xl leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
              GIVE YOUR KID THE EDGE
            </h1>
          </div>
          
          {/* AS FEATURED IN - Bottom Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-6">
            <div className="container mx-auto px-8">
              <div className="text-center">
                <p className="text-white text-sm uppercase tracking-widest mb-4 font-poppins">AS FEATURED IN</p>
                <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
                  <img src="/images/logos/1.webp" alt="Media Logo" className="h-8 md:h-10 opacity-90 hover:opacity-100 transition-opacity" />
                  <img src="/images/logos/3.webp" alt="Media Logo" className="h-8 md:h-10 opacity-90 hover:opacity-100 transition-opacity" />
                  <img src="/images/logos/4.webp" alt="Media Logo" className="h-8 md:h-10 opacity-90 hover:opacity-100 transition-opacity" />
                  <img src="/images/logos/7.webp" alt="Media Logo" className="h-8 md:h-10 opacity-90 hover:opacity-100 transition-opacity" />
                  <img src="/images/logos/8.webp" alt="Media Logo" className="h-8 md:h-10 opacity-90 hover:opacity-100 transition-opacity" />
                  <img src="/images/logos/10.webp" alt="Media Logo" className="h-8 md:h-10 opacity-90 hover:opacity-100 transition-opacity" />
                  <img src="/images/logos/11.webp" alt="Media Logo" className="h-8 md:h-10 opacity-90 hover:opacity-100 transition-opacity" />
                  <img src="/images/logos/12.webp" alt="Media Logo" className="h-8 md:h-10 opacity-90 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Welcome Section */}
      <Section className="bg-gradient-to-r from-white via-[#f5f5f5] to-white">
        <div className="container mx-auto px-8 h-full flex items-center">
          <div className="max-w-6xl mx-auto text-center w-full">
            <h2 className="text-5xl md:text-7xl font-integral tracking-tight mb-12 text-[#004aad] leading-[0.9]">
              WELCOME TO TEXAS SPORTS ACADEMY
            </h2>
            <p className="text-xl md:text-2xl text-[#1a1a1a] leading-relaxed max-w-5xl mx-auto">
              We are a network of sports academies that combine athletic excellence with leading academics. With core academics finished in just two focused hours each morning, students have all afternoon to improve at their sport and develop life skills. 
            </p>
          </div>
        </div>
        
        {/* Texas Map Section */}
        {/* 
        <div className="mt-20">
          <div className="container mx-auto px-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-integral tracking-tight text-[#004aad] mb-4">
                CHOOSE YOUR CAMPUS
              </h3>
              <p className="text-lg text-[#6b7280] max-w-3xl mx-auto">
                Expanding across Texas to bring world-class education and athletic excellence to every community.
              </p>
            </div>
          </div>
          
          <div className="w-full h-[600px] bg-gray-50 overflow-hidden">
            <TexasSchoolDistrictsMap />
          </div>
        </div>
        */}
      </Section>

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
              <h2 className="text-5xl md:text-7xl font-integral tracking-tight mb-6 text-[#1a1a1a] leading-[0.9] drop-shadow-[0_4px_30px_rgba(255,255,255,0.7)]">
                UNLOCK YOUR<br />KID'S POTENTIAL
              </h2>
              <p className="text-xl mb-8 text-[#1a1a1a] opacity-90 max-w-lg">
                Give your child the opportunity to excel in both academics and athletics.
              </p>
              <button className="bg-[#c9472b] hover:bg-[#a23721] text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide font-poppins">
                SCHOOL OVERVIEW
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Our 3 Commitments Section */}
      <Section className="bg-gradient-to-r from-white via-[#f5f5f5] to-white">
        <div className="container mx-auto px-8 h-full flex items-center">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl md:text-6xl font-integral tracking-tight mb-16 text-[#c9472b] leading-[0.9] text-center">
              OUR 3 COMMITMENTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Love School */}
              <div className="bg-[#c9472b] rounded-2xl p-8 text-white">
                <div className="mb-6">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">LOVE SCHOOL</h3>
                <p className="text-lg leading-relaxed">
                  1:1 Learning plans ensure that students experience a limitless learning environment, sparking curiosity and a love for school.
                </p>
              </div>

              {/* Learn 2x */}
              <div className="bg-[#c9472b] rounded-2xl p-8 text-white">
                <div className="mb-6">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                    <path d="M15 5v14l6-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">LEARN 2X</h3>
                <p className="text-lg leading-relaxed">
                  Through our 2hr Learning model, using an AI Tutor and adaptive learning apps in place of academic teachers, students learn 2x more in just 2 hours.
                </p>
              </div>

              {/* Learn Life Skills */}
              <div className="bg-[#c9472b] rounded-2xl p-8 text-white">
                <div className="mb-6">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">LEARN LIFE SKILLS</h3>
                <p className="text-lg leading-relaxed">
                  Students spend freed-up afternoons training and learning skills that allow them to excel in life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 
      Stats Bar Section 
      <section className="bg-gradient-to-r from-white via-[#f5f5f5] to-white py-12 shadow-lg">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-[#1a1a1a] font-poppins">Top 2%</div>
              <div className="text-sm uppercase tracking-wider text-[#6b7280] font-poppins">Focused Academics</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-[#1a1a1a] font-poppins">12 - 3pm</div>
              <div className="text-sm uppercase tracking-wider text-[#6b7280] font-poppins">Daily Sports Training</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-[#1a1a1a] font-poppins">Top 2%</div>
              <div className="text-sm uppercase tracking-wider text-[#6b7280] font-poppins">Academic Outcomes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-[#1a1a1a] font-poppins">1000+</div>
              <div className="text-sm uppercase tracking-wider text-[#6b7280] font-poppins">Hours Saved For Your Kid</div>
            </div>
          </div>
        </div>
      </section>
      */}

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
              <h2 className="text-5xl md:text-7xl font-integral tracking-tight mb-6 text-white leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                EXCEL AS AN ATHLETE
              </h2>
              <p className="text-xl mb-8 text-white opacity-90 max-w-lg drop-shadow-lg">
                Train with world-class coaches every day starting at noon. Master the fundamentals and develop your skills with dedicated daily sports training.
              </p>
              <button className="bg-[#004aad] hover:bg-[#003a8c] text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide font-poppins">
                Learn About Athletics
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* 2 Hours to Learn, 4 to Triumph Section */}
      <Section className="bg-white">
        <div className="container mx-auto px-8 h-full flex items-center">
          <div className="w-full">
            {/* Main Title */}
            <h2 className="text-4xl md:text-6xl font-integral tracking-tight text-center mb-8 text-[#004aad] leading-[0.9] drop-shadow-lg">
              2 HOURS TO LEARN, 4 TO TRIUMPH
            </h2>
            
            {/* Main Blue Container */}
            <div className="bg-[#1e40af] rounded-2xl p-6 md:p-8 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Text Sections */}
                <div className="space-y-6">
                  {/* AI Power Section */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#87CEEB] mb-2 uppercase tracking-wider">
                      HARNESSES THE POWER OF AI
                    </h3>
                    <p className="text-white text-sm md:text-base leading-relaxed">
                      Texas Sports Academy's 2hr Learning model harnesses the power of AI technology to provide each student with 1:1 learning, accelerating mastery and allowing excellence on and off the field.
                    </p>
                  </div>

                  <div className="w-full h-px bg-white/30"></div>

                  {/* Morning Section */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#87CEEB] mb-2 uppercase tracking-wider">
                      MORNING: 2-HOUR ACCELERATED MASTERY
                    </h3>
                    <p className="text-white text-sm md:text-base leading-relaxed">
                      Students complete subjects in just 2 hours daily. This well-organized schedule allows for mastery and growth, with students grasping material 2-5x faster.
                    </p>
                  </div>

                  <div className="w-full h-px bg-white/30"></div>

                  {/* Afternoon Section */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#87CEEB] mb-2 uppercase tracking-wider">
                      AFTERNOON: SPORTS TRAINING
                    </h3>
                    <p className="text-white text-sm md:text-base leading-relaxed">
                      With 4 additional hours freed up a day, students are able to develop life skills and dig deep into their training and coaching, honing into their athletic strength.
                    </p>
                  </div>
                </div>

                {/* Right Side - Schedule Comparison */}
                <div className="space-y-6">
                  {/* Standard School */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white text-center mb-4 uppercase tracking-wider">
                      STANDARD SCHOOL
                    </h3>
                    {/* Timeline */}
                    <div className="mb-3">
                      <div className="h-12 bg-[#87CEEB] rounded-lg flex items-center justify-between px-4">
                        <span className="text-[#1e40af] text-sm font-semibold">9am</span>
                        <span className="text-[#1e40af] text-sm font-semibold">10am</span>
                        <span className="text-[#1e40af] text-sm font-semibold">11am</span>
                        <span className="text-[#1e40af] text-sm font-semibold">12pm</span>
                        <span className="text-[#1e40af] text-sm font-semibold">1pm</span>
                        <span className="text-[#1e40af] text-sm font-semibold">2pm</span>
                        <span className="text-[#1e40af] text-sm font-semibold">3pm</span>
                      </div>
                    </div>
                    <div className="bg-[#60a5fa] rounded-lg p-3 md:p-4 text-center text-white font-semibold text-sm md:text-base">
                      6 Hours sitting in a class
                    </div>
                  </div>

                  {/* 2HR Learning Schools */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white text-center mb-4 uppercase tracking-wider">
                      Texas Sports Academies
                    </h3>
                    {/* Timeline */}
                    <div className="mb-3">
                      <div className="grid grid-cols-7 gap-2">
                        <div className="col-span-3 h-12 bg-[#87CEEB] rounded-lg flex items-center justify-between px-3">
                          <span className="text-[#1e40af] text-sm font-semibold">9am</span>
                          <span className="text-[#1e40af] text-sm font-semibold">10am</span>
                          <span className="text-[#1e40af] text-sm font-semibold">11am</span>
                        </div>
                        <div className="col-span-4 h-12 bg-[#87CEEB] rounded-lg flex items-center justify-between px-3">
                          <span className="text-[#1e40af] text-sm font-semibold">12pm</span>
                          <span className="text-[#1e40af] text-sm font-semibold">1pm</span>
                          <span className="text-[#1e40af] text-sm font-semibold">2pm</span>
                          <span className="text-[#1e40af] text-sm font-semibold">3pm</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 md:gap-3">
                      <div className="col-span-3 bg-[#60a5fa] rounded-lg p-3 md:p-4 text-center text-white flex items-center justify-center">
                        <div className="font-bold text-sm md:text-lg">2 Hour Learning</div>
                      </div>
                      <div className="col-span-4 bg-[#60a5fa] rounded-lg p-3 md:p-4 text-white flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-bold text-sm md:text-lg mb-1">Sports Training</div>
                          <div className="text-xs md:text-sm">+</div>
                          <div className="font-bold text-sm md:text-lg">Life Skills Workshops</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              <h2 className="text-5xl md:text-7xl font-integral tracking-tight mb-6 text-white leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                CRUSH IT AS A STUDENT
              </h2>
              <p className="text-xl mb-8 text-white opacity-90 max-w-lg drop-shadow-lg">
                With just 2 hours of focused learning in the morning, our students consistently test in the top 1-2% nationally. Experience a new way of learning that delivers exceptional results.
              </p>
              <button className="bg-[#004aad] hover:bg-[#003a8c] text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide font-poppins">
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
              <h2 className="text-5xl md:text-7xl font-integral tracking-tight mb-6 text-white leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)] whitespace-nowrap">
                A DAY IN THE LIFE
              </h2>
              <p className="text-xl text-white opacity-90 max-w-lg drop-shadow-lg">
                Academics are finished in two hours, giving your child their time back. 9am - 12pm: Academics. 12 - 3:30pm: Sports practice. 3:30pm onwards: Extracurriculars.
              </p>
              <button className="bg-[#004aad] hover:bg-[#003a8c] text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide mt-8 font-poppins">
                See A Day In The Life
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Professional Coaches Section */}
      <Section>
        <img
          src="/images/procoachteacher.jpg"
          alt="Professional Coaches"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent">
          <div className="container mx-auto px-8 pt-40">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-integral tracking-tight mb-6 text-white leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                PROFESSIONAL COACHES
              </h2>
              <p className="text-xl mb-8 text-white opacity-90 max-w-lg drop-shadow-lg">
                Learn from professional coaches that have reached the very top of their fields.
              </p>
              <button className="bg-[#004aad] hover:bg-[#003a8c] text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide font-poppins">
                Meet Our Coaches
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Partners Section */}
      <section className="bg-gradient-to-r from-white via-[#f5f5f5] to-white relative">
        <div className="container mx-auto px-8">
          {/* Partner Logos */}
          <div className="pt-32 pb-12">
            <h2 className="text-5xl md:text-7xl font-integral tracking-tight mb-16 text-[#1a1a1a] leading-[0.9] text-center">
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
              <svg className="w-12 h-12 mx-auto mb-8 text-[#6b7280]" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote>
                <p className="text-2xl font-light text-[#6b7280] italic leading-relaxed mb-8">
                  "This innovative approach to student-athlete development is exactly what the industry needs. They're setting new standards in both academic and athletic excellence."
                </p>
                <footer className="text-[#6b7280]">
                  <cite>
                    <span className="font-semibold text-[#1a1a1a] not-italic">Chris Locke</span>
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
              <h2 className="text-5xl md:text-7xl font-integral tracking-tight mb-6 text-white leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
                TEXAS ESA PROGRAM
              </h2>
              <p className="text-xl mb-8 text-white opacity-90 max-w-lg drop-shadow-lg">
                Take advantage of Texas's new ESA legislation, passed on April 16, 2025. Families now receive $10,800 per student to invest in their education, making our program more accessible than ever.
              </p>
              <button className="bg-[#c9472b] hover:bg-[#a23721] text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide font-poppins">
                Learn About ESAs
              </button>
            </div>
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