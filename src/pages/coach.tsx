import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';

const Coach = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/videos/coach-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
              TURN YOUR AAU PROGRAM
              <br />
              INTO A SCHOOL
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 tracking-wide">
              Shape the next generation. Double your income. Leave a legacy.
            </p>
            <Button 
              className="bg-white text-black hover:bg-gray-200 text-lg px-12 py-6 rounded-none"
              onClick={() => document.getElementById('opportunity')?.scrollIntoView({ behavior: 'smooth' })}
            >
              LEARN MORE
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="py-12 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            <motion.img
              src="/images/alpha-school-logo.png"
              alt="Alpha School"
              className="h-12 opacity-80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              viewport={{ once: true }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white">TOP 1%</div>
              <div className="text-sm text-gray-400">Academic Outcomes</div>
            </motion.div>
            <motion.img
              src="/images/2hour-learning-logo.png"
              alt="2 Hour Learning"
              className="h-12 opacity-80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </section>

      {/* The Golden Opportunity */}
      <section id="opportunity" className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              A GOLDEN OPPORTUNITY FOR COACHES
            </h2>
            <p className="text-xl text-gray-300 mb-16">
              This unique moment in time allows coaches to start their own microschools and double their income.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-6">TEXAS ESA LEGISLATION</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>$10,000 per student funding (April 2024)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>15-25 students per microschool</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>First time coaches can earn this much from education</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-6">MODERN LEARNING TECHNOLOGY</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Personalized learning software handles all academics</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Partnership with Alpha School</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>No traditional teachers needed</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-32 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            {/* Legacy Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-16"
            >
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">SHAPE YOUR LEGACY</h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-4">
                    <span className="text-white text-xl">→</span>
                    <span>Own your own sports academy</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-white text-xl">→</span>
                    <span>Build your brand in sports education</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-white text-xl">→</span>
                    <span>Create complete student-athletes</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-video bg-black/50 rounded-lg overflow-hidden">
                  <img 
                    src="/images/legacy.jpg" 
                    alt="Legacy" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Income Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row-reverse items-center gap-16"
            >
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">DOUBLE YOUR INCOME</h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-4">
                    <span className="text-white text-xl">→</span>
                    <span>$150k-250k additional annual revenue</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-white text-xl">→</span>
                    <span>Keep your current coaching position</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-white text-xl">→</span>
                    <span>School operates 9am-3pm Monday-Friday</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-video bg-black/50 rounded-lg overflow-hidden">
                  <img 
                    src="/images/income.jpg" 
                    alt="Income" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Daily Structure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-16"
            >
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">PERFECT DAILY STRUCTURE</h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-4">
                    <span className="text-white text-xl">→</span>
                    <span>Morning: Academics via personalized software</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-white text-xl">→</span>
                    <span>Afternoon: 3 hours of sports training</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-white text-xl">→</span>
                    <span>You focus on coaching and mentoring</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-video bg-black/50 rounded-lg overflow-hidden">
                  <img 
                    src="/images/schedule.jpg" 
                    alt="Daily Schedule" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              YOU DO WHAT YOU LOVE
            </h2>
            <p className="text-xl text-gray-300">
              We handle everything else
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
              viewport={{ once: true }}
              className="bg-[#111111] p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-6">ACADEMICS</h3>
              <ul className="space-y-4 text-gray-300">
                <li>Powered by 2 Hour Learning System</li>
                <li>Students learn through personalized software</li>
                <li>No traditional teachers needed</li>
                <li>Top 1% academic outcomes</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#111111] p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-6">FACILITIES</h3>
              <ul className="space-y-4 text-gray-300">
                <li>Campus secured in Carrollton</li>
                <li>45 minutes north of Dallas</li>
                <li>Ready for immediate use</li>
                <li>Or we'll help find another location</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-[#111111] p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-6">SUPPORT</h3>
              <ul className="space-y-4 text-gray-300">
                <li>Complete academic solution</li>
                <li>All paperwork handled</li>
                <li>Marketing assistance</li>
                <li>Ongoing operational support</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-[#111111]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              START YOUR LEGACY TODAY
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              We have the location, technology, funding, and support system.<br />
              You bring the vision and expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 rounded-none"
                onClick={() => window.open('https://calendly.com/team-strata/30min', '_blank')}
              >
                SCHEDULE A CALL
              </Button>
              <Button
                className="bg-transparent text-white hover:bg-white hover:text-black border border-white text-lg px-8 py-6 rounded-none transition-colors"
                onClick={() => window.location.href = 'mailto:team@strata.school'}
              >
                EMAIL US
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Coach; 