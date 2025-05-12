import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Timeline from '@/components/Timeline';
import { Link } from 'react-router-dom';
import VideoPlayer from '@/components/VideoPlayer';
import PlaceholderImage from '@/components/PlaceholderImage';

// Card components
const BenefitCard = ({ title, description, icon, stats }: { title: string; description: string; icon: React.ReactNode; stats?: { value: string; label: string }[] }) => (
  <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl">
    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    {stats && (
      <div className="border-t pt-6 mt-6 space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const StatCard = ({ number, label, description }: { number: string; label: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
    <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
    <div className="text-xl font-semibold text-gray-900 mb-3">{label}</div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left hover:text-gray-600"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <span className={`transform ${isOpen ? 'rotate-180' : ''}`}>↓</span>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

const Parents = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <video 
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/athletes.mov" type="video/mp4" />
            {/* Fallback image */}
            <img 
              src="/images/school sunset.jpg"
              className="w-full h-full object-cover"
              alt="Strata Schools Campus"
            />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
                2 Hours of Academics.<br />
                4 Hours of Elite Sports.
            </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                Welcome to Strata Schools: Where AI-powered academics meets professional sports training. Our revolutionary middle school program helps grades 6-8 excel in both academics and athletics.
              </p>
              <div className="flex gap-4">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg">
                  Apply Now
              </Button>
                <Button className="bg-white/90 text-blue-600 hover:bg-white px-8 py-3 text-lg">
                  Download Program Guide
              </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Strip */}
      <section className="relative py-16 bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold mb-3 text-white">Top 1-2%</div>
              <div className="text-xl text-white/90">National Academic Ranking</div>
                    </div>
                    <div>
              <div className="text-5xl font-bold mb-3 text-white">$10,000</div>
              <div className="text-xl text-white/90">ESA Funding/Year</div>
                    </div>
            <div>
              <div className="text-5xl font-bold mb-3 text-white">2×-5×</div>
              <div className="text-xl text-white/90">Learning Speed</div>
                    </div>
                    <div>
              <div className="text-5xl font-bold mb-3 text-white">90%+</div>
              <div className="text-xl text-white/90">Above Grade Level</div>
                    </div>
                  </div>
                </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-16">
            {/* Texas Sports Academy - coral/salmon colored logo */}
            <div className="w-48 flex items-center">
              <img src="/images/TSA-Final-Logos-RGB-07.png" alt="Texas Sports Academy" className="w-full h-auto object-contain" />
            </div>
            
            {/* GT School */}
            <div className="w-24 flex items-center">
              <img src="/images/Untitled-design-27.png" alt="GT School" className="w-full h-auto object-contain" />
            </div>
            
            {/* NextGen */}
            <div className="w-32 flex items-center">
              <img src="/images/LinkTree-Logos-2-removebg-preview.png" alt="NextGen" className="w-full h-auto object-contain" />
            </div>
            
            {/* Valenta Academy */}
            <div className="w-48 flex items-center">
              <img src="/images/valenta-logolandscape-blue-cmyk.png" alt="Valenta Academy" className="w-full h-auto object-contain" />
            </div>

            {/* Alpha */}
            <div className="w-48 flex items-center">
              <img src="/images/alpha.png" alt="Alpha" className="w-full h-auto object-contain" />
            </div>
            
            {/* 2 Hour Learning */}
            <div className="w-32 flex items-center">
              <img src="/images/2hourlearning.png" alt="2 Hour Learning" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence with Image Grid */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img 
            src="/images/study.png"
                  className="w-full h-full object-cover"
            alt="Academic Excellence"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-white mb-8">Proven Academic Excellence</h2>
            <p className="text-xl text-white/90 mb-12">
              Our AI-powered learning system achieves in 2 hours what traditional schools do in 7 hours. Students consistently rank in the top 1-2% nationally.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
                <div className="text-2xl font-bold text-white mb-2">2×-5× Faster</div>
                <p className="text-white/80">Complete core subjects in just 2 morning hours</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
                <div className="text-2xl font-bold text-white mb-2">Zero Homework</div>
                <p className="text-white/80">All academics completed during morning session</p>
              </div>
            </div>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3">
              Learn More About Our Academics
            </Button>
          </div>
        </div>
      </section>

      {/* Revolutionary Learning Model */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img 
            src="/images/2-Hour-Learning-1.png"
            className="w-full h-full object-cover"
            alt="Revolutionary Learning"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="ml-auto max-w-2xl">
            <h2 className="text-4xl font-bold text-white mb-8">The Revolutionary 2 Hour Learning Method</h2>
            <div className="space-y-6 text-white/90">
              <p className="text-xl">
                Our AI-powered learning system revolutionizes education efficiency:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <div>
                    <strong className="block text-white">Personalized Learning Paths</strong>
                    <p className="text-white/80">AI adapts to each student's pace and style</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <div>
                    <strong className="block text-white">Zero Homework Policy</strong>
                    <p className="text-white/80">All academics completed during morning session</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <div>
                    <strong className="block text-white">Proven Results</strong>
                    <p className="text-white/80">2×-5× faster learning rates than traditional schools</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3">
                  Download Whitepaper
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditation & Recognition */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Accredited Excellence</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Top-Tier Academics</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <div>
                    <strong className="block text-lg">Fully Accredited Program</strong>
                    <p className="text-gray-600">Our curriculum meets and exceeds state standards</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <div>
                    <strong className="block text-lg">Revolutionary Learning Method</strong>
                    <p className="text-gray-600">AI-powered personalization proven in multiple schools</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <div>
                    <strong className="block text-lg">Zero Homework Policy</strong>
                    <p className="text-gray-600">Complete all academics during the 2-hour morning session</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src="/images/study.png"
                alt="Academic Excellence"
                className="rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-gray-600">Core Subject Mastery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <img 
            src="/images/golf school.png"
            className="w-full h-full object-cover"
            alt="Success Story"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-white mb-8">Proven Success: The Brownsville Story</h2>
            <p className="text-xl text-white/90 mb-8">
              See how Texas Sports Academy and 2 Hour Learning transformed athletic and academic outcomes for students.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">94%</div>
                <div className="text-white/80">Above Grade Level</div>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">2.5×</div>
                <div className="text-white/80">Athletic Progress</div>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-white/80">Parent Satisfaction</div>
              </div>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Read Full Case Study
            </Button>
          </div>
        </div>
      </section>

      {/* Revolutionary Learning Model */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <img 
            src="/images/2-Hour-Learning-1.png"
            className="w-full h-full object-cover"
            alt="AI Learning"
          />
          <div className="absolute inset-0 bg-white/95" />
        </div>
        <div className="relative container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Revolutionizing Middle School Education</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-3">AI-Powered Morning Academics</h3>
                  <p className="text-gray-600 text-lg">Our AI tutor model revolutionizes learning efficiency:</p>
                  <ul className="mt-4 space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Complete core subjects in just 2 morning hours
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Personalized learning paths for each student
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Real-time progress tracking and adaptation
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Zero homework policy
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Afternoon Athletic Excellence</h3>
                  <p className="text-gray-600 text-lg">Professional sports training when students are most energized:</p>
                  <ul className="mt-4 space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      4+ hours of focused athletic development
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Professional coaching staff
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      State-of-the-art training facilities
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative">
              <PlaceholderImage 
                text="Learning Innovation"
                className="w-full rounded-xl shadow-xl"
                aspectRatio="square"
                overlay
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg">
                <div className="text-2xl font-bold">8:15 AM - 4:00 PM</div>
                <div className="text-white/90">Full Day Program</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Athletic Development Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img 
            src="/images/kidsinfield.png"
            className="w-full h-full object-cover"
            alt="Athletic Excellence"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-black/40" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-white mb-8">Elite Athletic Development</h2>
            <p className="text-xl text-white/90 mb-12">
              4+ hours of professional sports training when students are most energized. State-of-the-art facilities and expert coaching staff.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
                <div className="text-2xl font-bold text-white mb-2">Professional Coaching</div>
                <p className="text-white/80">Expert guidance in your chosen sport</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
                <div className="text-2xl font-bold text-white mb-2">Elite Training</div>
                <p className="text-white/80">State-of-the-art facilities and equipment</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-white mb-1">4+</div>
                <p className="text-white/80">Hours Daily</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-white mb-1">1:12</div>
                <p className="text-white/80">Coach Ratio</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <p className="text-white/80">Focus</p>
              </div>
            </div>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3">
              Explore Athletic Programs
              </Button>
          </div>
        </div>
      </section>

      {/* ESA Funding Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img 
            src="/images/capitol.png"
            className="w-full h-full object-cover"
            alt="Texas Capitol"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-900/80" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-white mb-8">Make It Possible with Texas ESAs</h2>
            <p className="text-xl text-white/90 mb-12">
              Starting 2025-26, receive $10,000 in annual education funding through Texas's groundbreaking ESA program.
            </p>
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-white mb-2">$10,000</div>
                <div className="text-white/80">Annual Funding</div>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-white mb-2">3×</div>
                <div className="text-white/80">Yearly Payments</div>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-white mb-2">2025-26</div>
                <div className="text-white/80">Program Start</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div className="bg-white/10 backdrop-blur p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Senate Bill 2 (SB2)</h3>
                <ul className="space-y-4 text-white/90">
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-3">•</span>
                    Available to all Texas families
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-3">•</span>
                    Funds deposited directly to schools
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-3">•</span>
                    Covers full academic year
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Simple Process</h3>
                <ul className="space-y-4 text-white/90">
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-3">•</span>
                    Easy application process
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-3">•</span>
                    Flexible payment schedule
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-3">•</span>
                    Full support and guidance
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Learn More About ESAs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Success Stories Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img 
            src="/images/Carrollton4.png"
            className="w-full h-full object-cover"
            alt="Parent Success"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/60" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16">Parent Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur p-8 rounded-xl">
                <blockquote className="text-xl text-white/90 mb-6">
                  "The AI-powered learning is incredible. My daughter completes all academics by 10:15 AM and has shown remarkable improvement in both academics and tennis. The no-homework policy means more family time in the evenings."
                </blockquote>
                <footer className="text-white/70">— Sarah M., Current Parent</footer>
              </div>
              <div className="bg-white/10 backdrop-blur p-8 rounded-xl">
                <blockquote className="text-xl text-white/90 mb-6">
                  "The combination of accelerated academics and professional sports training is exactly what we were looking for. Our son is thriving academically while pursuing his athletic dreams."
                </blockquote>
                <footer className="text-white/70">— Michael R., Student Parent</footer>
              </div>
            </div>
            <div className="mt-16 text-center">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3">
                Read More Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <img 
            src="/images/do what you love.jpg"
            className="w-full h-full object-cover"
            alt="Join Strata"
          />
          <div className="absolute inset-0 bg-blue-900/80" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Transform Your Child's Future?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Limited spots available for the 2024-25 school year. Join the future of middle school education.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Apply Now
            </Button>
            <Button className="bg-blue-700 text-white hover:bg-blue-800 px-8 py-3 text-lg">
              Schedule a Tour
            </Button>
          </div>
          <p className="text-white/80 mt-6">
            Questions? Call us at (555) 123-4567
          </p>
        </div>
      </section>
    </div>
  );
};

export default Parents;