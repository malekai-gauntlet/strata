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
            <span className="text-blue-600 text-lg mb-4 block font-semibold">WELCOME TO STRATA</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900">
              Unlocking True Potential Through Individual Strengths
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600">
              A first-of-its-kind school that taps into the power of movement to help students thrive.
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
              title="Love School"
              description="1:1 Learning plans ensure students experience a limitless learning environment, sparking curiosity and joy."
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>}
            />
            <BenefitCard
              title="Learn 2x Faster"
              description="Through our 2hr Learning model with AI Tutor, students learn twice as much in just 2 hours compared to traditional schools."
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>}
            />
            <BenefitCard
              title="Life Skills"
              description="Students spend afternoons training and learning skills that allow them to excel in life through sports and movement."
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
              number="Top 1%"
              label="Academic Results"
              description="Our students consistently achieve top percentile scores through our AI-powered learning system."
            />
            <StatCard
              number="2 Hours"
              label="Daily Academics"
              description="Students complete core subjects in just 2 hours daily, learning 2-5x faster than traditional schools."
            />
            <StatCard
              number="+20%"
              label="Fitness Improvement"
              description="Students improve on FitnessGram's cardio and strength tests by at least 20%."
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
              2 Hours to Learn, 4 to Triumph
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our unique schedule maximizes both academic and athletic development
            </p>
          </motion.div>

          <Timeline items={[
            {
              year: "Morning",
              title: "2-Hour Accelerated Learning",
              description: "Students complete core academics through our AI-powered system, learning 2-5x faster than traditional methods."
            },
            {
              year: "Mid-Day",
              title: "Lunch & Recovery",
              description: "Nutritious meal and social time with teammates"
            },
            {
              year: "Afternoon",
              title: "Sports & Life Skills",
              description: "Professional coaching, athletic development, and workshops on nutrition, leadership, and more"
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
              <h3 className="text-xl font-bold mb-4 text-gray-900">Physical Activity is Awesome</h3>
              <p className="text-gray-600">Through sports and movement, students learn resilience, teamwork, leadership, and strategic decision making.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Life Skills Through Movement</h3>
              <p className="text-gray-600">A movement-focused path is invaluable to development, paving the way for success in both academics and life.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Failure Fuels Success</h3>
              <p className="text-gray-600">Both wins and losses provide opportunities to build strong foundations. Failure isn't the opposite of success—it's part of it.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">No Teachers, Just Game Changers</h3>
              <p className="text-gray-600">Our coaches provide personalized guidance and encouragement, serving as mentors both in athletics and academics.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Covering All the Bases</h3>
              <p className="text-gray-600">We believe a broad foundation in physical education is superior to early specialization in one sport.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">It's You vs. You</h3>
              <p className="text-gray-600">Competition is about being better than you were yesterday – your only competition is yourself.</p>
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
              question="What sports does Strata offer?"
              answer="We offer specialized programs in football, basketball, and soccer, each led by experienced coaches who have trained hundreds of athletes."
            />
            <FAQItem
              question="How does 2 Hour Learning work?"
              answer="2 Hour Learning uses AI technology to create personalized learning plans. It tests your child to understand their knowledge gaps, then generates and adapts a learning plan specifically for them. This system is used at Alpha School, helping students achieve top scores and acceptances into prestigious universities."
            />
            <FAQItem
              question="What grade levels do you accept?"
              answer="We currently accept middle school students (grades 6-8)."
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
              Ready to Give Your Child the Best of Both Worlds?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Schedule a tour or speak with our admissions team to learn more about our unique program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6"
                onClick={() => window.open('https://calendly.com/team-strata/30min', '_blank')}
              >
                Schedule a Tour
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