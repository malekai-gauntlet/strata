import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Timeline from '@/components/Timeline';
import { Link } from 'react-router-dom';

// Card components
const BenefitCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all"
  >
    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const StatCard = ({ number, label, description }: { number: string; label: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
  >
    <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
    <div className="text-xl font-semibold text-gray-900 mb-3">{label}</div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
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
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>↓</span>
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-blue-50 to-white py-24">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-blue-600 text-lg mb-4 block font-semibold">ELITE SPORTS MICROSCHOOL</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900">
              Where Athletes Excel in
              Sports and Academics
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600">
              A revolutionary microschool designed by coaches for young athletes. We combine elite sports training with personalized academics to develop complete student-athletes.
            </p>
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6"
              onClick={() => document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section id="learn-more" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Our Three Core Commitments
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              title="Elite Sports Training"
              description="Professional coaching and structured training programs help athletes reach their full potential in their chosen sport."
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>}
            />
            <BenefitCard
              title="Efficient Academics"
              description="Our 2-hour focused learning system ensures athletes master their academics while maximizing time for sports development."
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>}
            />
            <BenefitCard
              title="Complete Athlete Development"
              description="Beyond sports skills, we develop mental toughness, leadership, and character through our integrated program."
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard
              number="4+ Hours"
              label="Daily Sports Training"
              description="Athletes receive intensive, professional coaching in their sport while developing overall athleticism."
            />
            <StatCard
              number="2 Hours"
              label="Focused Academics"
              description="Efficient, personalized learning ensures academic excellence without compromising athletic development."
            />
            <StatCard
              number="12:1"
              label="Athlete-to-Coach Ratio"
              description="Small groups ensure personalized attention and optimal development for each athlete."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              A Day in the Life of Our Athletes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've designed our schedule to maximize both athletic and academic development
            </p>
          </motion.div>

          <Timeline items={[
            {
              year: "9:00 AM",
              title: "Focused Academic Block",
              description: "Athletes complete core subjects through our AI-powered system, maintaining academic excellence while preserving energy for training."
            },
            {
              year: "11:30 AM",
              title: "Recovery & Nutrition",
              description: "Proper nutrition and recovery protocols to fuel athletic performance"
            },
            {
              year: "1:00 PM",
              title: "Elite Sports Training",
              description: "Professional coaching, sport-specific training, strength & conditioning, and competitive development"
            }
          ]} />
        </div>
      </section>

      {/* Our Beliefs Section */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Our Core Beliefs
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Athletes First</h3>
              <p className="text-gray-600">Every aspect of our program is designed around the needs of developing athletes, from training schedules to academic support.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Complete Development</h3>
              <p className="text-gray-600">We develop the whole athlete - physical skills, mental toughness, leadership, and academic excellence.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Growth Through Challenge</h3>
              <p className="text-gray-600">Our competitive environment pushes athletes to grow, learning from both victories and setbacks.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Professional Coaching</h3>
              <p className="text-gray-600">Our experienced coaches have developed hundreds of successful athletes, providing elite training and mentorship.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Sport-Specific Excellence</h3>
              <p className="text-gray-600">Focused training in football, basketball, or soccer, complemented by overall athletic development.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Measurable Progress</h3>
              <p className="text-gray-600">Regular assessments track improvements in athletic performance, academics, and character development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <FAQItem
              question="What makes your sports program different?"
              answer="Our program is designed by professional coaches who understand what it takes to develop elite athletes. We provide intensive, daily training with experienced coaches, proper periodization, and integrated strength & conditioning - all while ensuring academic excellence through our efficient learning system."
            />
            <FAQItem
              question="How do you balance sports and academics?"
              answer="Our unique 2-hour learning system allows athletes to complete their core academics efficiently in the morning when they're fresh, leaving afternoons free for intensive sports training. This schedule optimizes both athletic and academic performance without sacrificing either."
            />
            <FAQItem
              question="What level of athletes do you accept?"
              answer="We welcome motivated athletes of all skill levels who are committed to improvement. Our program is designed to develop athletes from intermediate to elite levels through personalized coaching and structured progression."
            />
            <FAQItem
              question="What is the tuition structure?"
              answer="Through Texas's new ESA program, families receive $10,800 in annual education funding that can be applied to our program. Contact us to discuss specific details and additional costs."
            />
            <FAQItem
              question="What are the school hours?"
              answer="Our school day runs from 9:00 AM to 3:00 PM, with core academics in the morning and sports/activities in the afternoon."
            />
            <FAQItem
              question="How do you ensure academic excellence?"
              answer="Our AI-powered learning system adapts to each student's needs, ensuring they master core subjects in just 2 hours daily. This efficiency allows more time for athletic development while maintaining top academic performance."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Ready to Take Your Athlete's Development to the Next Level?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Schedule a meeting with our coaching staff to learn more about our unique sports-focused program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6"
                onClick={() => window.open('https://calendly.com/team-strata/30min', '_blank')}
              >
                Schedule a Meeting
              </Button>
              <Button
                className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors text-lg px-8 py-6"
                onClick={() => window.location.href = 'mailto:admissions@strata.school'}
              >
                Contact Admissions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Strata</h3>
              <p className="text-gray-600">Transforming sports and education.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact</h3>
              <p className="text-gray-600">admissions@strata.school</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Location</h3>
              <p className="text-gray-600">2205 E Hebron Pkwy<br />Carrollton, TX 75010</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">Instagram</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Parents;