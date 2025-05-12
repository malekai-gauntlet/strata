import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Academics = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh]">
        <div className="absolute inset-0">
          <img 
            src="/images/2-Hour-Learning-1.png"
            className="w-full h-full object-cover"
            alt="AI Learning Environment"
          />
          <div className="absolute inset-0 bg-blue-900/80" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Revolutionary 2-Hour Learning Model
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Complete a full day's academics in just 2 hours through our AI-powered personalized learning system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">2×-5×</div>
              <div className="text-gray-600">Faster Learning</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
              <div className="text-gray-600">Above Grade Level</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">0</div>
              <div className="text-gray-600">Homework Hours</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Core Subject Mastery</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How Our 2-Hour Learning Works</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">AI-Powered Personalization</h3>
                  <p className="text-gray-600">
                    Our AI system adapts to each student's learning style and pace, ensuring optimal comprehension and retention.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Real-Time Adaptation</h3>
                  <p className="text-gray-600">
                    The system continuously adjusts difficulty and teaching methods based on student performance and engagement.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Comprehensive Coverage</h3>
                  <p className="text-gray-600">
                    Students complete all core subjects - Math, Science, Language Arts, and Social Studies - during the morning session.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/2 Hour Learning.png"
                alt="2 Hour Learning Process"
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Subjects */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Core Academic Subjects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Mathematics</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Pre-Algebra</li>
                <li>• Algebra I</li>
                <li>• Geometry Foundations</li>
                <li>• Problem Solving</li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Science</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Life Science</li>
                <li>• Physical Science</li>
                <li>• Earth Science</li>
                <li>• Scientific Method</li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Language Arts</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Reading Comprehension</li>
                <li>• Writing Skills</li>
                <li>• Grammar & Vocabulary</li>
                <li>• Literature Analysis</li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Social Studies</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• World History</li>
                <li>• Geography</li>
                <li>• Civics</li>
                <li>• Current Events</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beyond Core Academics */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Beyond Core Academics</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Public Speaking</h3>
              <p className="text-gray-600 mb-4">
                Students develop confidence and communication skills through regular presentations and debates.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Financial Literacy</h3>
              <p className="text-gray-600 mb-4">
                Understanding money management, budgeting, and basic investment concepts.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Leadership</h3>
              <p className="text-gray-600 mb-4">
                Developing essential leadership skills through project-based learning and team activities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Transform Your Child's Education?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the power of our revolutionary 2-hour learning model. Schedule a tour or apply now.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/apply">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Apply Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-blue-700 text-white hover:bg-blue-800 px-8 py-3 text-lg">
                Schedule a Tour
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics; 