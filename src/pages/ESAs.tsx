import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ESAs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh]">
        <div className="absolute inset-0">
          <img 
            src="/images/capitol.png"
            className="w-full h-full object-cover"
            alt="Texas Capitol"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/80" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Texas Education Savings Account
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Starting 2025-26, receive $10,000 in annual education funding to support your child's educational journey at Strata Schools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">ESA Program Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl font-bold text-blue-600 mb-4">$10,000</div>
              <h3 className="text-xl font-semibold mb-4">Annual Funding</h3>
              <p className="text-gray-600">
                Receive $10,000 per year in education funding through the Texas ESA program.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl font-bold text-blue-600 mb-4">3×</div>
              <h3 className="text-xl font-semibold mb-4">Payment Schedule</h3>
              <p className="text-gray-600">
                Convenient disbursement schedule with three payments throughout the year.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl font-bold text-blue-600 mb-4">100%</div>
              <h3 className="text-xl font-semibold mb-4">Coverage</h3>
              <p className="text-gray-600">
                Funds can be applied to tuition, educational materials, and other qualified expenses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Understanding the ESA Program</h2>
              <div className="space-y-6">
                <p className="text-xl text-gray-600">
                  The Texas Education Savings Account program empowers parents with the freedom to choose the best educational path for their children.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 text-xl">✓</span>
                    <div>
                      <strong className="block text-lg">Universal Eligibility</strong>
                      <p className="text-gray-600">Available to all Texas families starting 2025-26</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 text-xl">✓</span>
                    <div>
                      <strong className="block text-lg">Simple Process</strong>
                      <p className="text-gray-600">Straightforward application and fund management</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 text-xl">✓</span>
                    <div>
                      <strong className="block text-lg">Direct Payment</strong>
                      <p className="text-gray-600">Funds sent directly to approved educational providers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/do what you love.jpg"
                alt="Educational Freedom"
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How to Apply for ESA Funding</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Submit Application</h3>
              <p className="text-gray-600">
                Complete the ESA program application through the Texas Education Agency portal.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Receive Approval</h3>
              <p className="text-gray-600">
                Once approved, you'll receive confirmation and funding details for the academic year.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Start Learning</h3>
              <p className="text-gray-600">
                Begin your educational journey at Strata Schools with ESA funding support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3">When does the ESA program start?</h3>
              <p className="text-gray-600">
                The Texas ESA program begins in the 2025-26 academic year.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Who is eligible for ESA funding?</h3>
              <p className="text-gray-600">
                The program is available to all Texas families with school-age children.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3">How are funds distributed?</h3>
              <p className="text-gray-600">
                Funds are distributed in three installments throughout the academic year directly to approved educational providers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3">What expenses are covered?</h3>
              <p className="text-gray-600">
                ESA funds can be used for tuition, educational materials, and other qualified educational expenses at approved schools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join Strata Schools and take advantage of the Texas ESA program. Our team is here to help guide you through the process.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/apply">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Apply Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-blue-700 text-white hover:bg-blue-800 px-8 py-3 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ESAs; 