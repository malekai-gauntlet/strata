import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Timeline from '@/components/Timeline';
import Navigation from '@/components/Navigation';
import CountUpNumber from '@/components/CountUpNumber';

const timelineItems = [
  {
    year: '2025',
    title: 'ALPHA SCHOOL PROVES THE MODEL',
    description: 'First implementation of 2 Hour Learning with students reaching top 1% nationally in Austin, Texas.'
  },
  {
    year: '2026',
    title: 'STATEWIDE TRANSFORMATION BEGINS',
    description: '1,200 schools launched, ensuring one Strata School per district across Texas.'
  },
  {
    year: '2027',
    title: 'RAPID EXPANSION',
    description: '5,000 schools established with multiple sports academies per district for comprehensive coverage.'
  },
  {
    year: '2028',
    title: 'EDUCATIONAL DOMINANCE',
    description: '10% of Texas students enrolled, all testing in the top 1% nationally. Texas becomes an education powerhouse.'
  }
];

const SolutionCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-black/50 p-8 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
    >
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const About = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
          <img
            src="/images/school sunset.jpg"
            alt="Aerial view of school campus at sunset"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              TRANSFORMING TEXAS EDUCATION
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300">
              We're providing every Texas child with a choice for world-class education and athletic excellence.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 rounded-none"
                onClick={() => document.getElementById('about-content')?.scrollIntoView({ behavior: 'smooth' })}
              >
                LEARN MORE
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Making Education Revolutionary Section */}
      <section id="about-content" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              MAKING EDUCATION REVOLUTIONARY
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              Building on proven success at Alpha School, Strata is creating a network of revolutionary schools that combine academic excellence with athletic achievement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <CountUpNumber
              end={1200}
              label="SCHOOLS BY 2026"
              suffix="+"
            />
            <CountUpNumber
              end={5000}
              label="SCHOOLS BY 2027"
              suffix="+"
            />
            <CountUpNumber
              end={10}
              suffix="%"
              label="OF TEXAS STUDENTS BY 2028"
            />
          </div>
        </div>
      </section>

      {/* Criticisms Section */}
      <section className="relative py-24 bg-[#111111] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/golf school.png"
            alt="Aerial view of golf school campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
                CONCERNS WITH SCHOOL CHOICE
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">LACK OF OPTIONS FOR RURAL VOTERS</h3>
                  <p className="text-xl text-gray-400 max-w-2xl">
                    Many districts in Texas don't have enough options for alternatives to public schools. Without options, school choice policy doesn't translate into real change.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">NOT COMPELLING ENOUGH</h3>
                  <p className="text-xl text-gray-400 max-w-2xl">
                    ESA-funded schools need to be radically better for parents.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strata Solution Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              THE STRATA SOLUTION
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              We will give every student in Texas the option to switch to a world-class education with Strata.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <SolutionCard
              title="Top 1% Academic Performance"
              description="Strata Schools are powered by 2 Hour Learning. We use personalized, mastery-based learning to bring students to the top 1-2% nationally with only two hours of studying daily."
            />
            <SolutionCard
              title="Available to Everyone in Texas"
              description="Strata Schools are designed to be easy to set up and scale. We'll have one school in every district by August 26th and grow to 10% of Texas students by 2028."
            />
            <SolutionCard
              title="Start Sports at 12 pm Every Day"
              description="Parents want sports, not just academics. After academics in the morning, Strata students start training basketball, tennis, soccer and other sports at noon."
            />
            <SolutionCard
              title="Learn Life Skills"
              description="World-class workshops in Financial Literacy, Nutrition, Public Speaking and other key life skills to give a holistic education."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <p className="text-3xl font-bold text-white">
              Parents will think Strata Schools are 10x better than public schools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <Timeline items={timelineItems} />
        </div>
      </section>

      {/* Revolutionary Approach Section */}
      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold mb-8">2 HOUR LEARNING</h2>
              <p className="text-xl text-gray-400">
                Our revolutionary approach combines personalized, mastery-based learning with proven methodologies to achieve exceptional results in just two hours of daily academic focus.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  <span>Top 1% Academic Performance</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  <span>Personalized Learning Paths</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  <span>Mastery-Based Progression</span>
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
              <h2 className="text-4xl font-bold mb-8">SPORTS EXCELLENCE</h2>
              <p className="text-xl text-gray-400">
                After completing their academic work, students engage in professional sports training, developing both athletic skills and character.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  <span>Professional Coaching</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  <span>Multiple Sports Focus</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  <span>Character Development</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Texas Coverage Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-8">TEXAS COVERAGE</h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              Our mission is to establish Strata Schools across every district in Texas, ensuring access to revolutionary education for all.
            </p>
          </motion.div>
          <div className="aspect-video bg-white/5 rounded-lg">
            {/* Placeholder for the interactive Texas map */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Interactive Texas Map Coming Soon
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">JOIN THE EDUCATIONAL REVOLUTION</h3>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes('@')) {
                  setSubmitStatus('error');
                  return;
                }
                setIsSubmitting(true);
                // Handle form submission
                setTimeout(() => {
                  setSubmitStatus('success');
                  setIsSubmitting(false);
                  setEmail('');
                }, 1000);
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                className="bg-white text-black hover:bg-gray-200 whitespace-nowrap px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SUBMITTING...' : 'STAY UPDATED'}
              </Button>
            </form>
            {submitStatus === 'success' && (
              <p className="text-green-400 mt-4">Thank you for joining our mission!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 mt-4">Please enter a valid email address.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 