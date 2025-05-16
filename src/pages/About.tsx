import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Timeline from '@/components/Timeline';
import Navigation from '@/components/Navigation';
import CountUpNumber from '@/components/CountUpNumber';
import TexasSchoolDistrictsMap from '@/components/maps/TexasSchoolDistrictsMap';

const timelineItems = [
  {
    year: '2025',
    title: 'Founding schools',
    description: 'Build the platform and playbook for rapid scale.'
  },
  {
    year: '2026',
    title: '1,200 schools',
    description: '1 Strata School per district in Texas.'
  },
  {
    year: '2027',
    title: '5,000 schools',
    description: '4 Strata Schools in every district covering all sports.'
  },
  {
    year: '2028',
    title: '10% of all Texas students',
    description: '~550,000 students.'
  }
];

const SolutionCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-black/50 p-6 md:p-8 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-transparent" />
            <img
              src="/images/kidsinfield.png"
              alt="Students in sports field"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
              <span className="sm:hidden">
                TRANSFORMING<br />
                TEXAS<br />
                EDUCATION
              </span>
              <span className="hidden sm:inline">
                TRANSFORMING TEXAS EDUCATION
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
              Providing every Texas child with a choice for world-class education and athletic excellence.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                className="bg-white text-black hover:bg-gray-200 text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-none"
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

      {/* Our Commitment Section */}
      <section id="about-content" className="min-h-screen flex items-center bg-black py-16 md:py-0">
        <div className="container mx-auto px-6 md:px-4">
          <div className="flex flex-col justify-center space-y-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                OUR COMMITMENT
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                Strata is helping coaches creates thousands of revolutionary schools that combine academic excellence and athletic achievement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lack of School Choice Section */}
      <section className="min-h-screen flex items-center relative bg-[#111111] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/school sunset.jpg"
            alt="Aerial view of school campus at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70 md:to-transparent" />
        </div>
        <div className="container mx-auto px-6 md:px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                LACK OF SCHOOL CHOICE
              </h2>
              <div className="space-y-8">
                <div>
                  <p className="text-xl text-gray-400 max-w-2xl">
                    Many districts in Texas don't have enough alternatives to public schools. Without options, school choice policy doesn't translate into real change. ESA-funded schools need to be radically better for parents.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strata Solution Section */}
      <section className="min-h-screen flex items-center bg-[#111111] pt-16 pb-16 md:pt-0 md:pb-0">
        <div className="container mx-auto px-6 md:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              THE SOLUTION
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              Giving every student in Texas the option to switch to a world-class education.
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
              title="Start Sports at Noon Every Day"
              description="Parents want sports, not just academics. After academics in the morning, Strata students start training basketball, tennis, soccer and other sports at noon."
            />
            <SolutionCard
              title="Learn Life Skills"
              description="World-class workshops in Financial Literacy, Nutrition, Public Speaking and other key life skills to give a holistic education."
            />
          </div>
        </div>
      </section>

      {/* 2 Hour Learning Section */}
      <section className="min-h-screen flex items-center relative bg-[#111111] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/study.png"
            alt="Modern learning space with students studying in a flexible environment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/80 to-black/70 md:to-transparent" />
        </div>
        <div className="container mx-auto px-6 md:px-4 relative z-10">
          <div className="ml-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold">2 HOUR LEARNING</h2>
              <p className="text-xl text-gray-300">
                Our revolutionary approach combines personalized, mastery-based learning with proven methodologies to achieve exceptional results in just two hours of daily academic focus.
              </p>
              <p className="text-xl text-gray-300">
                Students consistently reach the top 1% nationally while spending less time studying than their peers. This leaves more time for sports, extracurriculars, and personal development.
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
          </div>
        </div>
      </section>

      {/* Sports Excellence Section */}
      <section className="min-h-screen flex items-center relative bg-[#111111] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/stadium.jpg"
            alt="Football stadium at sunset with illuminated field lights"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70 md:to-transparent" />
        </div>
        <div className="container mx-auto px-6 md:px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold">SPORTS EXCELLENCE</h2>
              <p className="text-xl text-gray-300">
                After completing their academic work, students engage in professional sports training starting at noon every day. Our comprehensive program develops both athletic skills and character.
              </p>
              <p className="text-xl text-gray-300">
                With access to professional coaching, students can pursue their athletic dreams while maintaining academic excellence.
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

      {/* Timeline Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-6 md:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              GROWTH PLAN
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-16">
              The Strata Model is designed to scale up while providing world-class education.
            </p>
          </motion.div>
          <Timeline items={timelineItems} />
        </div>
      </section>

      {/* Texas Coverage Section */}
      <section className="relative min-h-screen bg-black">
        <div className="container mx-auto px-6 md:px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold mb-8">CREATING AN EDUCATION POWERHOUSE</h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              Our mission is to establish Strata Schools across every Texas district, providing each family with the choice of a world-class education.
            </p>
          </motion.div>
        </div>
        
        {/* Full-width map container */}
        <div className="w-full h-[calc(100vh-200px)] bg-white/5 overflow-hidden">
          <TexasSchoolDistrictsMap />
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">JOIN THE EDUCATION REVOLUTION</h3>
            <form 
              action={import.meta.env.DEV 
                ? "/api/mock-subscribe" 
                : "https://hooks.zapier.com/hooks/catch/22692611/2pniatp/"}
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                
                if (!email.includes('@')) {
                  setSubmitStatus('error');
                  return;
                }
                
                setIsSubmitting(true);
                
                // Create FormData object
                const formData = new FormData();
                formData.append('email', email);
                formData.append('source', 'about_page');
                formData.append('timestamp', new Date().toISOString());
                
                if (import.meta.env.DEV) {
                  // In development, just simulate a successful submission
                  console.log('Development mode - Form data:', {
                    email,
                    source: 'about_page',
                    timestamp: new Date().toISOString()
                  });
                  setTimeout(() => {
                    setSubmitStatus('success');
                    setEmail('');
                    setIsSubmitting(false);
                  }, 500);
                  return;
                }
                
                // Submit the form data without setting Content-Type header
                fetch(e.currentTarget.action, {
                  method: 'POST',
                  body: formData
                })
                .then(response => {
                  if (!response.ok) throw new Error('Submission failed');
                  setSubmitStatus('success');
                  setEmail('');
                })
                .catch(error => {
                  console.error('Error:', error);
                  setSubmitStatus('error');
                })
                .finally(() => {
                  setIsSubmitting(false);
                });
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