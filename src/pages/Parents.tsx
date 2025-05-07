import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Timeline from '@/components/Timeline';
import { Link } from 'react-router-dom';
import VideoPlayer from '@/components/VideoPlayer';

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
            <span className="text-blue-600 text-lg mb-4 block font-semibold">ELITE SPORTS SCHOOL</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900">
              Where Your Kid Excels in
              Sports and Academics
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600">
              We combine elite sports training with personalized academics and life-skills workshops to develop overachieving student-athletes.
            </p>
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6 mb-16"
              onClick={() => document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <VideoPlayer 
                src="/videos/athletes.mov"
                className="w-full rounded-xl shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Benefits Section */}
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
              The Future of Student-Athlete Development
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A revolutionary approach that maximizes both academic and athletic potential
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              title="Smarter Academics"
              description="Achieve top 1% test scores in just 2 hours of daily focused learning. Our AI-powered system adapts to your child's needs, making learning more efficient than traditional 6-hour classroom days."
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>}
            />
            <BenefitCard
              title="Elite Athletics"
              description="4+ hours of professional sports training daily, starting at noon when other students are still at desks. Expert coaching and structured development to maximize athletic potential."
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>}
            />
            <BenefitCard
              title="Life Skills That Matter"
              description="Beyond sports and academics, students learn real-world skills like financial literacy, leadership, and mental performance through practical, sports-focused workshops."
              icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>}
            />
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
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
              Real Results for Your Child
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <StatCard
              number="Top 1%"
              label="Academic Outcomes"
              description="Students consistently achieve superior test scores through personalized learning."
            />
            <StatCard
              number="4+ Hours"
              label="Daily Sports Training"
              description="Professional coaching and development when students are most energized."
            />
            <StatCard
              number="100%"
              label="Student Satisfaction"
              description="Students genuinely love coming to school every day."
            />
          </div>
        </div>
      </section>

      {/* Daily Schedule Section */}
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
              Every hour is optimized for maximum development
            </p>
          </motion.div>

          <Timeline items={[
            {
              year: "9:00 AM",
              title: "Focused Academic Block",
              description: "2 hours of personalized learning when minds are fresh, achieving more than traditional 6-hour academic days."
            },
            {
              year: "11:30 AM",
              title: "Life Skills & Leadership",
              description: "Interactive workshops on financial literacy, mental performance, and leadership through sports-focused examples."
            },
            {
              year: "12:00 PM",
              title: "Elite Sports Training",
              description: "Professional coaching, sport-specific training, and competitive development when other students are still in classrooms."
            }
          ]} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Common Questions
            </h2>
          </motion.div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <FAQItem
              question="How do you achieve better results in less academic time?"
              answer="Our AI-powered learning system personalizes education to each student's needs, eliminating the inefficiencies of traditional classrooms. Students learn at their optimal pace, focusing on areas where they need the most help. This targeted approach achieves better results in 2 hours than traditional 6-hour school days."
            />
            <FAQItem
              question="What makes your sports program different?"
              answer="We provide 4+ hours of daily professional training when students are most energized, not after a full day of school. Our coaches have extensive experience developing elite athletes, and our program includes both sport-specific training and overall athletic development."
            />
            <FAQItem
              question="How do you develop life skills?"
              answer="We integrate practical life skills education through sports-focused examples. Students learn financial literacy through NIL deals and contracts, leadership through team dynamics, and mental performance through competitive situations."
            />
            <FAQItem
              question="What are your academic credentials?"
              answer="Our learning system is accredited by Cognia and has been featured on Fox News for achieving top 1% academic outcomes. We use the same technology as Alpha School, known for its exceptional academic results."
            />
            <FAQItem
              question="What is the tuition structure?"
              answer="Through Texas's new ESA program, families receive $10,800 in annual education funding that can be applied to our program. Contact us to discuss specific details and additional costs."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Give Your Child the Ultimate Advantage
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Fill out our interest form to learn more about enrollment for the upcoming school year
            </p>
            <form 
              action="https://hooks.zapier.com/hooks/catch/22692611/2pdyolt/"
              method="POST"
              className="flex flex-col items-center gap-4 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                
                // Create FormData object
                const formData = new FormData(e.currentTarget);
                formData.append('source', 'parents_page');
                formData.append('timestamp', new Date().toISOString());
                
                // Submit the form data
                fetch(e.currentTarget.action, {
                  method: 'POST',
                  body: formData
                })
                .then(response => {
                  if (!response.ok) throw new Error('Submission failed');
                  alert("Thanks! We'll be in touch soon.");
                  e.currentTarget.reset();
                })
                .catch(error => {
                  console.error('Error:', error);
                  alert('Something went wrong. Please try again.');
                });
              }}
            >
              <div className="w-full space-y-4">
                <input
                  type="text"
                  name="parentName"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <input
                  type="text"
                  name="childName"
                  placeholder="Child's Name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <input
                  type="text"
                  name="childGrade"
                  placeholder="Child's Grade (Fall 2024)"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6 mt-4"
              >
                Submit Interest Form
              </Button>
            </form>
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