import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Timeline from '@/components/Timeline';
import { Link } from 'react-router-dom';
import MapEmbed from '@/components/MapEmbed';
import VimeoPlayer from '@/components/VimeoPlayer';
import FinancialEstimator from '@/components/FinancialEstimator';

// Card components
const ProblemCard = ({ title, description }: { title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-black/50 p-6 md:p-8 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
  >
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const Stat = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center p-4">
    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{number}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);

const TestimonialCard = ({ 
  image, 
  name, 
  sport, 
  quote, 
  metrics 
}: { 
  image: string; 
  name: string; 
  sport: string; 
  quote: string; 
  metrics: { 
    students: number; 
    yearsSince: number; 
    incomeIncrease: string; 
  } 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-black/50 p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
  >
    <div className="flex items-center mb-4">
      <img src={image} alt={name} className="w-16 h-16 rounded-full mr-4 object-cover" />
      <div>
        <h4 className="text-lg font-bold text-white">{name}</h4>
        <p className="text-gray-400">{sport}</p>
      </div>
    </div>
    <p className="text-gray-300 mb-4 italic">"{quote}"</p>
    <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-white/10">
      <div>
        <div className="text-white font-bold">{metrics.students}</div>
        <div className="text-xs text-gray-400">Students</div>
      </div>
      <div>
        <div className="text-white font-bold">{metrics.yearsSince}</div>
        <div className="text-xs text-gray-400">Years</div>
      </div>
      <div>
        <div className="text-white font-bold">{metrics.incomeIncrease}</div>
        <div className="text-xs text-gray-400">Income ↑</div>
      </div>
    </div>
  </motion.div>
);

const StepCard = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: number * 0.1 }}
    viewport={{ once: true }}
    className="bg-black/50 p-6 md:p-8 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
  >
    <div className="text-4xl font-bold text-white/20 mb-4">0{number}</div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left hover:text-white/80"
      >
        <span className="text-lg font-medium">{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>↓</span>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-400">
          {answer}
        </div>
      )}
    </div>
  );
};

// Carousel component
const ImageCarousel = ({ images }: { images: { src: string; alt: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative aspect-[16/9] bg-black/50 rounded-lg overflow-hidden group">
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous image"
      >
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next image"
      >
        →
      </button>
    </div>
  );
};

const Test = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showFeaturedCampus, setShowFeaturedCampus] = useState(false);
  const [showAcademicsModal, setShowAcademicsModal] = useState(false);
  const [showOperationsModal, setShowOperationsModal] = useState(false);

  // Handle body scroll lock
  useEffect(() => {
    if (showFeaturedCampus || showAcademicsModal || showOperationsModal) {
      // Save current scroll position and add class to lock scroll
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Restore scroll position when modal closes
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
  }, [showFeaturedCampus, showAcademicsModal, showOperationsModal]);

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowFeaturedCampus(false);
    setShowAcademicsModal(false);
    setShowOperationsModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('source', 'landing_page');
    formData.append('timestamp', new Date().toISOString());
    
    try {
      const response = await fetch('https://hooks.zapier.com/hooks/catch/22692611/2pdyolt/', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Submission failed');
      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Epic Opening/Dream State Hero Section */}
      <section className="relative min-h-screen flex items-center bg-black py-24">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="text-gray-400 text-lg mb-4 block">FOR TOP 1% COACHES</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
              TURN YOUR AAU PROGRAM <br></br> INTO A SCHOOL
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Double your income and leave a legacy.
            </p>
            <Button 
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
              onClick={() => document.getElementById('present-state')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn How
            </Button>

            {/* Social Proof Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-24"
            >
              <p className="text-gray-400 text-sm mb-8">LEADERS IN SPORTS & EDUCATION</p>
              <div className="grid grid-cols-3 gap-12 md:gap-24 max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center">
                  <div className="h-16 flex items-center justify-center">
                    <img
                      src="/images/2 Hour Learning.png"
                      alt="2 Hour Learning"
                      className="h-full w-auto opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-sm text-gray-400 mt-3">2 Hour Learning</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="h-16 flex items-center justify-center">
                    <img
                      src="/images/alphawhite.png"
                      alt="Alpha School"
                      className="h-full w-auto opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-sm text-gray-400 mt-3">Alpha School</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="h-16 flex items-center justify-center">
                    <img
                      src="/images/nba.png"
                      alt="NBA"
                      className="h-full w-auto opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-sm text-gray-400 mt-3">NBA</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Promo Video Section */}
      <section className="py-24 bg-[#111111]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See How It Works</h2>
            <p className="text-xl text-gray-300">Hear from coaches who have turned their sports programs into schools</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-black rounded-lg overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/5">
              <VimeoPlayer videoId="1084834014" className="w-full h-full" autoplay={false} showTitle={false} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Value Proposition Section */}
      <section id="present-state" className="py-12 bg-black border-t border-b border-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              This is the Start Of Your Legacy
            </h2>
            <p className="text-lg text-gray-400">
              Build your brand and create a lasting sports school
            </p>
          </div>
        </motion.div>
      </section>

      {/* Make an Impact Section */}
      <section className="min-h-screen flex items-center relative bg-[#111111] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/makeanimpact.png"
            alt="Make an Impact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70 md:to-transparent" />
        </div>
        <div className="container mx-auto px-6 md:px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Make an Impact</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Shape complete student-athletes</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Achieve top-tier academic and athletic outcomes</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Maximize your impact on young athletes to achieve their true potential</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Double Your Income Section */}
      <section className="min-h-screen flex items-center relative bg-[#111111] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/double.png"
            alt="Double Your Income"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/80 to-black/70 md:to-transparent" />
        </div>
        <div className="container mx-auto px-6 md:px-4 relative z-10">
          <div className="ml-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Double Your Income</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>$10,800 per student funding from Texas ESAs</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>15-25 students per sports microschool to start</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Generate at least six figures of additional income</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Keep Your Coaching Job Section */}
      <section className="min-h-screen flex items-center relative bg-[#111111] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/coach.jpg"
            alt="Keep Your Coaching Job"
            className="w-full h-full object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70 md:to-transparent" />
        </div>
        <div className="container mx-auto px-6 md:px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Keep Your After-School Coaching Job</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Your sports school operates 9am-3pm</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Academics in the morning, athletics and workshops in the afternoon</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Maintain your current coaching position</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Do What You Love Section */}
      <section className="min-h-screen flex items-center relative bg-[#111111] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/do what you love.jpg"
            alt="Do What You Love"
            className="w-full h-full object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/80 to-black/70 md:to-transparent" />
        </div>
        <div className="container mx-auto px-6 md:px-4 relative z-10">
          <div className="ml-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Do What You Love</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Fulfill your dream, own your own sports academy</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Build a leading brand in sports education</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Create a lasting institution that will impact generations to come</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* We Handle Everything Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              You Do The Coaching, We Handle Everything Else
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Focus on what you do best - developing athletes. We'll handle the rest.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-[#111111] p-8 rounded-lg border border-white/10"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Academics</h3>
              <p className="text-gray-300 mb-6">
                We provide you with access to world-leading academic software.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Use 2 Hour Learning, which creates top 1% academic outcomes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Fully personalized academic AI software for students</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Students learn twice as fast in just two hours a day</span>
                </li>
              </ul>
              <Button
                className="w-full mt-6 bg-white text-black hover:bg-gray-200"
                onClick={() => setShowAcademicsModal(true)}
              >
                View Academic Program
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#111111] p-8 rounded-lg border border-white/10"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Facility</h3>
              <p className="text-gray-300 mb-6">
                We help you find and set up the perfect space for your school.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Use one of our existing facilities or secure your own</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Identify sports facilities zoned as schools in your area</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>We handle zoning and permitting requirements</span>
                </li>
              </ul>
              <Button
                className="w-full mt-6 bg-white text-black hover:bg-gray-200"
                onClick={() => setShowFeaturedCampus(true)}
              >
                View Available Facility
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-[#111111] p-8 rounded-lg border border-white/10"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Operations</h3>
              <p className="text-gray-300 mb-6">
                We manage all tedious administrative and operational aspects.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Applying for grants, filing paperwork, forming your LLC</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Support guide for securing students and kicking off your sports school</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Training and support for kicking off your sports school</span>
                </li>
              </ul>
              <Button
                className="w-full mt-6 bg-white text-black hover:bg-gray-200"
                onClick={() => setShowOperationsModal(true)}
              >
                View Operations Platform
              </Button>
            </motion.div>
          </div>

          {/* Featured Campus Section */}
          <AnimatePresence>
            {showFeaturedCampus && (
              <>
                {/* Backdrop with centered container */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
                  onClick={handleCloseModal}
                >
                  {/* Modal */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, type: "spring", damping: 25 }}
                    className="w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-xl p-6 md:p-8 overflow-y-auto z-50"
                    onClick={e => e.stopPropagation()}
                  >
                    {/* Close button */}
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-xl"
                      aria-label="Close featured campus section"
                    >
                      ×
                    </button>

                    <div className="text-center mb-8 pt-2">
                      <h3 className="text-2xl font-bold mb-2">Featured Campus: Carrollton, Texas</h3>
                      <p className="text-gray-400 text-base mb-4">2205 E Hebron Pkwy, Carrollton, TX 75010</p>
                      <p className="text-gray-300 text-lg">
                      Modern, spacious facility for studies • Professional-grade basketball court with premium flooring • Outdoor athletic field with stadium seating
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                      {/* Campus Images Carousel */}
                      <div className="h-full">
                        <ImageCarousel 
                          images={[
                            {
                              src: "/images/Carrollton1.png",
                              alt: "Carrollton Campus Aerial View"
                            },
                            {
                              src: "/images/Carrollton2.png",
                              alt: "Carrollton Campus Aerial View"
                            },
                            {
                              src: "/images/Carrollton4.png",
                              alt: "Carrollton Campus Basketball Court"
                            },
                            {
                              src: "/images/Carrollton3.jpg",
                              alt: "Carrollton Campus Entrance"
                            }
                          ]}
                        />
                      </div>

                      {/* Map */}
                      <div className="h-full">
                        <div className="aspect-[16/9] bg-black/50 rounded-lg overflow-hidden">
                          <MapEmbed 
                            location={{
                              lat: 32.9884,
                              lng: -96.8998,
                              address: "1925 E Belt Line Rd, Carrollton, TX 75006"
                            }}
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* CTA Banner */}
                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                      <p className="text-gray-200 mb-4">
                        Interested in this facility for your sports school?<br />
                        Schedule a call to discuss your vision.
                      </p>
                      <Button 
                        className="bg-white text-black hover:bg-gray-200 px-8 py-2.5"
                        onClick={() => window.open('https://calendly.com/team-strata/30min', '_blank')}
                      >
                        Schedule a Call
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Academics Modal */}
          <AnimatePresence>
            {showAcademicsModal && (
              <>
                {/* Backdrop with centered container */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
                  onClick={handleCloseModal}
                >
                  {/* Modal */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, type: "spring", damping: 25 }}
                    className="w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-xl p-6 md:p-8 overflow-y-auto z-50"
                    onClick={e => e.stopPropagation()}
                  >
                    {/* Close button */}
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-xl"
                      aria-label="Close academics section"
                    >
                      ×
                    </button>

                    <div className="text-center mb-8 pt-2">
                      <h3 className="text-2xl font-bold mb-2">2 Hour Learning System</h3>
                      <p className="text-gray-400 text-base mb-4">Revolutionary Academic Software</p>
                      <p className="text-gray-300 text-lg">
                        Personalized learning paths • Accredited by Cognia • AI-powered tutoring • College preparation
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                      <div className="aspect-[16/9] bg-black/50 rounded-lg overflow-hidden">
                        <img 
                          src="/images/2-Hour-Learning-1.png"
                          alt="2 Hour Learning Dashboard"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="aspect-[16/9] bg-black/50 rounded-lg overflow-hidden">
                        <div className="h-full flex flex-col items-center justify-center p-8">
                          <p className="text-lg text-gray-300 text-center mb-6">
                            Our AI-powered learning system adapts to each student's needs, achieving exceptional results in just two hours per day.
                          </p>
                          <div className="flex items-center gap-4">
                            <img 
                              src="/images/alphawhite.png" 
                              alt="Alpha School Logo" 
                              className="h-8 w-auto opacity-80"
                            />
                            <p className="text-gray-400">
                              Trusted by Alpha School, achieving top 1% academic outcomes
                            </p>
                          </div>
                          <Button
                            className="mt-6 bg-white/10 hover:bg-white/20 text-white border border-white/20"
                            onClick={() => window.open('https://www.foxnews.com/media/texas-private-schools-use-ai-tutor-rockets-student-test-scores-top-2-country', '_blank')}
                          >
                            Read the Fox News Coverage →
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* CTA Banner */}
                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                      <Button 
                        className="bg-white text-black hover:bg-gray-200 px-8 py-2.5"
                        onClick={() => window.open('https://calendly.com/team-strata/30min', '_blank')}
                      >
                        Learn About 2 Hour Learning
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Operations Modal */}
          <AnimatePresence>
            {showOperationsModal && (
              <>
                {/* Backdrop with centered container */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
                  onClick={handleCloseModal}
                >
                  {/* Modal */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, type: "spring", damping: 25 }}
                    className="w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-xl p-6 md:p-8 overflow-y-auto z-50"
                    onClick={e => e.stopPropagation()}
                  >
                    {/* Close button */}
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-xl"
                      aria-label="Close operations section"
                    >
                      ×
                    </button>

                    <div className="text-center mb-8 pt-2">
                      <h3 className="text-2xl font-bold mb-2">Strata Operations Platform</h3>
                      <p className="text-gray-400 text-base mb-4">End-to-End School Management System</p>
                      <p className="text-gray-300 text-lg">
                        Automated compliance • Student enrollment • Marketing tools • Financial management
                      </p>
                    </div>
                    
                    <div className="flex justify-center max-w-2xl mx-auto">
                      {/* Operations Platform Carousel */}
                      <div className="w-full aspect-[16/9]">
                        <div className="aspect-video bg-black/50 rounded-lg overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/5">
                          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                            <p className="text-2xl font-semibold text-white/80">Dashboard Images Coming Soon</p>
                          </div>
                          <div className="w-full h-full bg-black/30" />
                        </div>
                      </div>
                    </div>

                    {/* CTA Banner */}
                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                      <p className="text-gray-200 mb-4">
                        Ready to start your school with our full operational support?<br />
                        Schedule a call to learn more about our platform.
                      </p>
                      <Button 
                        className="bg-white text-black hover:bg-gray-200 px-8 py-2.5"
                        onClick={() => window.open('https://calendly.com/team-strata/30min', '_blank')}
                      >
                        Schedule a Call
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why This Only Just Became Possible
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Two major developments have created this unique opportunity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-black/40 via-black/60 to-black/40 border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Texas School Vouchers</h3>
              <p className="text-gray-300 mb-6">
                For the first time in Texas history, families can now receive $10,800 per student in annual education funding through the new ESA program.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>$10,800 of funding per student</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Simple application process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Enables to have optionality in school choice</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-black/40 via-black/60 to-black/40 border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Revolutionary Learning Technology</h3>
              <p className="text-gray-300 mb-6">
                Recent breakthroughs in AI and educational software have made it possible to deliver top-tier academics without traditional teachers.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Personalized AI tutoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Automated progress tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">→</span>
                  <span>Top 1% academic outcomes</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/">
              <Button className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4">
                Why This Matters for Coaches →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How You'll Create Your School
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              This is the process for transforming your program into a school.
            </p>
          </motion.div>

          <Timeline items={[
            {
              year: "Step 1",
              title: "Initial Meeting",
              description: "Meet to discuss your vision. We'll ask about your coaching background, goals, and share more about the legislation and how to turn your program into a school."
            },
            {
              year: "Step 2",
              title: "Dive into Details",
              description: "Cover detailed revenue numbers, facility location, and opportunities."
            },
            {
              year: "Step 3",
              title: "Identify Students and Location",
              description: "We'll help you market your school to prospective students and their parents. We'll also identify the best facilities for your school."
            },
            {
              year: "Step 4",
              title: "Confirm Students & Location",
              description: "Once at least 15 students are committed to your school, we'll help you apply for your school permit, lease, and open your school."
            },
            {
              year: "Step 5",
              title: "Final Steps",
              description: "We handle all paperwork - creating your LLC, finalizing contracts, and preparing for the August school year launch."
            }
          ]} />
        </div>
      </section>

      {/* Financial Estimator Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Calculate Your Potential Income
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Estimate your annual revenue and profit based on student enrollment and expenses.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FinancialEstimator className="max-w-5xl mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Common Questions
            </h2>
          </motion.div>

          <div className="bg-gradient-to-br from-black/40 via-black/60 to-black/40 border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] backdrop-blur-sm">
            <div className="space-y-6">
              <FAQItem
                question="What is Strata?"
                answer="We help coaches start schools, or turn their existing programs into schools, extremely easily. We help coaches identify the best locations and provide access to world-leading accredited academic software. Our platform helps coaches apply for grants and ESA funding and automates away all complexity associated with running a school."
              />
              <FAQItem
                question="How does the funding work?"
                answer="Through Texas's new ESA program, each parent receives $10,800 in from the Texas government when they don't enroll their child in public school. This $10,800 is for each student, and can be used for any private school in Texas. Coaches would create private sports schools with at least 15-25 students, creating substantial revenue."
              />
              <FAQItem
                question="What about academics?"
                answer="Our learning system — 2 Hour Learning — handles all academic requirements. Students learn through personalized software, achieving top 1% outcomes without traditional teachers. This software is accredited by Cognia and produces top 1% academic outcomes."
              />
              <FAQItem
                question="Can I keep my current coaching position?"
                answer="Yes. The school operates during regular school hours (9am-3pm), allowing you to maintain your after school coaching commitments."
              />
              <FAQItem
                question="How long does it take to get started?"
                answer="Depending on how long it takes to secure students and school permits, you can launch your school within 2-3 months."
              />
              <FAQItem
                question="Where is the facility?"
                answer="We have a state-of-the-art facility in Carrollton, Texas, featuring professional-grade courts, outdoor fields, and modern academic spaces. We can also help you find and set up facilities in other locations."
              />
              <FAQItem
                question="What age will students at my school be?"
                answer="Middle school students. "
              />
              <FAQItem
                question="Who will we play?"
                answer="Your teams will compete in the regular club circuit for 8-months of the year. During the basketball-season, your school will play against other private schools."
              />
              <FAQItem
                question="Will I have to teach?"
                answer="No, you won't have to teach academics. Our AI-powered learning system and support staff handle all academic instruction. You focus solely on coaching and athletic development."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact CTA Section */}
      <section className="py-24 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/public/images/stadium.jpg"
            alt="Sports stadium"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/95 to-[#111111]/90" />
        </div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Learn more about how to launch your school.
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Schedule a free strategy call with our team. We'll chat about your coaching goals, share everything you need to know about the legislation, academic software, and logistics, and answer all questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6"
                    onClick={() => window.open('https://calendly.com/team-strata/30min', '_blank')}
                  >
                    Schedule a Call
                  </Button>
                  <Button
                    className="bg-black/30 text-white hover:bg-white hover:text-black transition-all duration-300 border border-white text-lg px-8 py-6"
                    onClick={() => window.location.href = 'mailto:team@strata.school?subject=Interested in Learning More About Strata'}
                  >
                    Email Us
                  </Button>
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-4">What to Expect:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span className="text-gray-300">Share your coaching goals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span className="text-gray-300">Hear about the opportunity for coaches</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span className="text-gray-300">Identify location areas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span className="text-gray-300">Next steps roadmap</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Strata</h3>
              <p className="text-gray-400 mb-4">Transforming sports programs into thriving schools.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white">About Us</a>
                </li>
                <li>
                  <a href="/coaches" className="text-gray-400 hover:text-white">For Coaches</a>
                </li>
                <li>
                  <a href="/parents" className="text-gray-400 hover:text-white">For Parents</a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-400 hover:text-white">Blog</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  <a href="mailto:team@strata.school" className="hover:text-white">team@strata.school</a>
                </li>
                <li className="text-gray-400">
                  <a href="https://calendly.com/team-strata/30min" className="hover:text-white">Schedule a Call</a>
                </li>
              </ul>
            </div>

            {/* Partners */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Partners</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://alpha.school" className="text-gray-400 hover:text-white">Alpha School</a>
                </li>
                <li>
                  <a href="https://texassportsacademy.com" className="text-gray-400 hover:text-white">Texas Sports Academy</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Strata. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Test; 