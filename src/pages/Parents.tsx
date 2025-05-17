import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/VideoPlayer';
import YouTubePlayer from '@/components/YouTubePlayer';
import VimeoPlayer from '@/components/VimeoPlayer';
import InstagramEmbed from '@/components/InstagramEmbed';
import TweetEmbed from '@/components/TweetEmbed';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// FAQ Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      className="border-b border-gray-200 overflow-hidden"
      initial={false}
      animate={{ backgroundColor: 'transparent' }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-blue-600 transition-colors duration-200"
      >
        <span className="text-xl font-heading text-gray-900">{question}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-blue-600"
        >
          ↓
        </motion.span>
      </button>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-6 text-gray-600 text-lg leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Parent = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-screen overflow-hidden">
        <div className="absolute inset-0">
          <motion.video 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-[1.4] object-center"
            onLoadedData={(e) => {
              const video = e.target as HTMLVideoElement;
              video.play();
            }}
          >
            <source src="/videos/v3.mov" type="video/mp4" />
          </motion.video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>
        <motion.div 
          className="relative h-full flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.p 
                className="text-xl md:text-2xl text-gray-100/80 mb-4 font-light tracking-wider uppercase"
                {...fadeInUp}
              >
                HEY PARENTS
              </motion.p>
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-heading tracking-tight text-white mb-6 leading-[0.9]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                YOUR KID WILL THRIVE
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-100/80 mb-8 font-light leading-relaxed max-w-2xl mx-auto"
                {...fadeInUp}
                transition={{ delay: 0.6 }}
              >
                A revolutionary sports academy designed for middle school athletes, combining top-tier sports training with accelerated academics.
              </motion.p>
              
              {/* Play Button */}
              <motion.button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                </div>
                Watch Video
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-4xl aspect-video relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              Close
            </button>
            <VimeoPlayer videoId="1084834014" className="w-full h-full" autoplay={true} />
          </motion.div>
        </motion.div>
      )}

      {/* Why Strata Section */}
      <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-10 md:pb-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight text-center mb-12 sm:mb-16 md:mb-20 text-gray-900 leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            THE FUTURE OF STUDENT-<br></br>ATHLETE DEVELOPMENT
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-12">
            {/* Individualized Learning */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-blue-600 rounded-xl p-3">
                  <img 
                    src="/images/1.svg" 
                    alt="Individualized Learning" 
                    className="w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-heading mb-4 text-gray-900">Top Academics</h3>
              <p className="text-lg text-gray-600">
                Revolutionary learning software allows students to achieve top academic outcomes in just 2 hours of studying each morning. No homework needed.
              </p>
            </motion.div>

            {/* Athletic Excellence */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-blue-600 rounded-xl p-3">
                  <img 
                    src="/images/2.svg" 
                    alt="Athletic Excellence" 
                    className="w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-heading mb-4 text-gray-900">Sports Start At Noon</h3>
              <p className="text-lg text-gray-600">
                3-4 extra hours daily for focused sports training with world-class coaches. Position your child for success at the high school level and beyond.
              </p>
            </motion.div>

            {/* Life Skills */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-blue-600 rounded-xl p-3">
                  <img 
                    src="/images/3.svg" 
                    alt="Life Skills Development" 
                    className="w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-heading mb-4 text-gray-900">Life Skills Focus</h3>
              <p className="text-lg text-gray-600">
                Through sports and dedicated workshops, students learn key skills like leadership, growth mindset, and public speaking.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logo Bar */}
      <section className="pt-16 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-8 md:gap-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-32 sm:w-40 md:w-48 grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/images/TSA-Final-Logos-RGB-07.png" alt="Texas Sports Academy" className="w-full h-auto" />
            </motion.div>
            <motion.div 
              className="w-24 sm:w-28 md:w-32 grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/images/alpha.png" alt="Alpha School" className="w-full h-auto" />
            </motion.div>
            <motion.div
              className="w-24 sm:w-28 md:w-32 grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/images/2hr.png" alt="2 Hour Learning" className="w-full h-auto" />
            </motion.div>
            <motion.div
              className="w-32 sm:w-40 md:w-48 grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/images/Untitled-design-27.png" alt="NextGen Academy" className="w-full h-auto" />
            </motion.div>
            <motion.div
              className="w-32 sm:w-40 md:w-48 grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/images/valenta-logolandscape-blue-cmyk.png" alt="Valenta Academy" className="w-full h-auto" />
            </motion.div>
            <motion.div
              className="w-24 sm:w-28 md:w-32 grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/images/cognia.png" alt="Cognia Accredited" className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Excel */}
      <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-0 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight text-center mb-12 sm:mb-16 md:mb-20 text-gray-900 leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            UNLOCK YOUR KID'S POTENTIAL
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1"
            >
              <h2 className="text-4xl font-heading tracking-tight mb-8 text-gray-900 leading-[0.9]">Excel in athletics and academics</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                A first-of-its-kind sports academy. With core academics finished in two focused hours each morning, 
                students spend afternoons improving at their sport or in hands-on workshops that build core life skills.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2"
            >
              <img src="/images/happy-kids.jpg" alt="Happy Kids" className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Sports at Noon */}
      <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-0 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-4 md:order-3"
            >
              <img src="/images/student-athlete.jpg" alt="Student Athlete" className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-3 md:order-4"
            >
              <h2 className="text-4xl font-heading tracking-tight mb-6 md:mb-8 text-gray-900 leading-[0.9]">4 hours of sports training</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                With the day's academics completed by 12pm, students have all afternoon to train with coach. 
                Students have 3-4 extra hours than their competition to train with world-class coaches and 
                position themselves for future success. 
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Learn 2x in 2 hours */}
      <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-0 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-5"
            >
              <h2 className="text-4xl font-heading tracking-tight mb-8 text-gray-900 leading-[0.9]">Learn 2x in 2 hours</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Students use the leading 2 Hour Learning software to learn academics. 
                2 Hour Learning — which is accredited by Cognia — is used at Alpha School, Texas Sports Academy, and hundreds of other schools to help students achieve top 
                academic outcomes.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-6"
            >
              <div className="w-full overflow-hidden">
                <YouTubePlayer videoId="Q0UaFZYntwc" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Life Skills */}
      <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-8 md:order-7"
            >
              <div className="w-full overflow-hidden">
                <img 
                  src="/images/do what you love.jpg" 
                  alt="Coach and students enjoying sports activities together" 
                  className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
              </div>
            </motion.div>
            <motion.div
              className="text-left order-7 md:order-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-heading tracking-tight mb-8 text-gray-900 leading-[0.9]">Develop core life skills</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We know that through the lens of sports, movement, and physical activity students can learn resilience, 
                teamwork, leadership, strategic decision making, and more. Afternoons are reserved for 
                focused practice to improve at sport, or workshops to develop core life skills.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Athletic Excellence Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-heading mb-12 sm:mb-16 md:mb-20 tracking-tight text-gray-900 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ATHLETIC EXCELLENCE
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <motion.div
              className="text-left order-9"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-heading mb-8 text-gray-900">Excel as an athlete</h3>
              <p className="text-xl mb-8 text-gray-600">
                With sports starting at 12pm, your kid will have all afternoon to train with top coaches and improve at their sport. By 4pm, they will have 6-7 quality hours of studies and sports practice in the bank.
              </p>
              <p className="text-xl text-gray-600">
                No need to rush your kid to various afterschool sports programs, have them return home after 8pm, then have hours of homework before bed. Your kid will get their time (and life) back.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-10"
            >
              <img src="/images/drdish.png" alt="Basketball Training" className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-12 md:order-11"
            >
              <img src="/images/lifting.jpg" alt="Strength Training" className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300" />
            </motion.div>
            <motion.div
              className="text-left order-11 md:order-12"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-heading mb-8 text-gray-900">Position your kid for long-term success in sport</h3>
              <p className="text-xl mb-8 text-gray-600">
                This sports academy is focused on the middle school age group. It's a prime opportunity to prepare your kid for 
                success at the high school level and prepare for a college career and beyond (if that's your kid's dream). <br></br><br></br>
                The extra 3-4 hours your kid gets back can be spent on focused skills training, fitness training or games.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-heading mb-12 sm:mb-16 md:mb-20 tracking-tight text-gray-900 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ACADEMIC EXCELLENCE
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <motion.div
              className="text-left order-19"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-4 sm:mb-6 md:mb-8">
                <h3 className="text-4xl font-heading tracking-tight text-gray-900 mr-4">Fully personalized learning, top academic outcomes</h3>
                <img src="/images/cognia.png" alt="Cognia Accredited" className="h-12 sm:h-16" />
              </div>
              <p className="text-xl mb-4 sm:mb-6 md:mb-8 text-gray-600">
                The learning paradigm has changed. The best way to learn is no longer in a classroom lecture, but through 
               personalized learning software while supported by a guide.
              </p>
              <p className="text-xl mb-6 sm:mb-8 md:mb-10 text-gray-600">
                Your kid will get to use 2 Hour Learning — a breakthrough curriculum accredited by Cognia — that is used at Alpha 
                Schools and sports academies to achieve Top 2% academic outcomes in only 2 hours of daily studying.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://2hourlearning.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">Visit 2HourLearning.com</Button>
                </a>
                <a href="https://heyzine.com/flip-book/2hourlearning.html" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button className="bg-white text-blue-600 border border-blue-600 w-full sm:w-auto">Read the 2HL White Paper</Button>
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-20"
            >
              <div className="w-full overflow-hidden">
                <VideoPlayer 
                  src="/videos/2-hour-learning-video.mp4"
                  controls
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <motion.div
              className="text-left order-21"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-heading tracking-tight mb-8 text-gray-900">Just 2 hours of academics, no homework needed</h3>
              <p className="text-xl mb-8 text-gray-600">
                With 2 Hour Learning, students really only need two hours of daily focus in the morning to excel. There's
                no need for students to be at a desk for 6-7 hours a day as they are at traditional schools.
              </p>
              <p className="text-xl text-gray-600">
                2 Hour Learning is a mastery-based learning platform. Students work on their own laptops at the school and must understand each concept before moving on. When they get stuck, they can speak with their coach or 
                hop on a zoom call with a support teacher to work through a question.
              </p>
            </motion.div>
            <motion.div
              className="aspect-video order-22"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <YouTubePlayer 
                videoId="uGo9p9L2UaU"
                className="w-full h-full"
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div
              className="text-left order-23"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-heading tracking-tight mb-4 sm:mb-6 md:mb-8 text-gray-900">Give your kid their time back</h3>
              <p className="text-xl mb-4 sm:mb-6 md:mb-8 text-gray-600">
                90% of learning is motivation. In this revolutionary learning model where learning software does the core teaching, the role of the "teacher" has shifted to that of a motivator. And there's no better motivator for a young athlete than their coach.
              </p>
              <p className="text-xl mb-6 sm:mb-8 md:mb-10 text-gray-600">
                This learning model works. Alpha School in Brownsville Texas took students from the 31st percentile to the 86th percentile in one year.
              </p>
              <a href="https://2hourlearning.com/twice-the-learning-twice-as-fast-explaining-the-2-hour-learning-model/#:~:text=When%20we%20opened%20our%20campus,as%20much%2C%20twice%20as%20fast." target="_blank" rel="noopener noreferrer" className="block sm:inline-block w-full sm:w-auto">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">Read the Brownsville Case Study</Button>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-24"
            >
              <div className="w-full overflow-hidden">
                <TweetEmbed tweetId="1899164931897106719" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Day in the Life Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight text-center mb-12 sm:mb-16 md:mb-20 text-gray-900 leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            DAY IN THE LIFE
          </motion.h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 w-px h-full bg-gray-300" />
            
            {/* Timeline items */}
            <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32">
              {[
                { time: "8:45am", activity: "School Dropoff, Morning Launch" },
                { time: "9:00am", activity: "2 Hour Learning (3 Pomodoro Sessions)" },
                { time: "10:30am", activity: "30 minute break" },
                { time: "11:00am", activity: "Final Learning Block" },
                { time: "11:30am", activity: "Lunch" },
                { time: "12-3:30pm", activity: "Sports practice or afternoon Life skills workshops" }
              ].map((item, index) => (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Time marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 -mt-2">
                    <div className="w-4 h-4 rounded-full bg-blue-600" />
                  </div>
                  
                  {/* Content */}
                  <div className="grid grid-cols-[1fr] md:grid-cols-[1fr,1fr] items-center pl-12 md:pl-0">
                    {/* Time */}
                    <div className="text-left md:text-right md:pr-8 mb-2 md:mb-0">
                      <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold mb-2 text-gray-900"
                      >
                        {item.time}
                      </motion.h3>
                    </div>
                    
                    {/* Activity */}
                    <div className="md:pl-8 text-left">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-xl text-gray-600">
                          {item.activity}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-heading mb-12 sm:mb-16 md:mb-20 tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            RESOURCES
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                href: "https://alpha.school",
                img: "/images/alpha.png",
                alt: "Alpha School",
                title: "Alpha School",
                desc: "Pioneer in AI-powered education with proven academic excellence and top 1-2% national rankings."
              },
              {
                href: "https://sportsacademy.school",
                img: "/images/TSA-Final-Logos-RGB-07.png",
                alt: "Texas Sports Academy",
                title: "Texas Sports Academy",
                desc: "Leader in youth development with professional coaching standards and athletic development model."
              },
              {
                href: "https://2hourlearning.com",
                img: "/images/2hr.png",
                alt: "2 Hour Learning",
                title: "2 Hour Learning",
                desc: "Revolutionary AI learning platform providing personalized education technology."
              }
            ].map((resource, index) => (
              <motion.a 
                key={index}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <img src={resource.img} alt={resource.alt} className="h-16 sm:h-20 mx-auto mb-6 sm:mb-8" />
                <h3 className="text-2xl font-heading mb-4 text-gray-900">{resource.title}</h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {resource.desc}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-heading mb-12 sm:mb-16 md:mb-20 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            WHAT PARENTS ARE SAYING<br></br> ABOUT SPORTS ACADEMIES
          </motion.h2>
          
          <div className="max-w-3xl mx-auto">
            <a 
              href="https://www.fox7austin.com/video/1549218"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              <blockquote className="text-2xl italic text-gray-600">
                "...they aggressively believe students don't have to sit in a chair at a desk for 
                six hours a day. They spend two hours on academics and four hours for life skills like financial literacy, 
                public speaking, and teamwork."
              </blockquote>
              <p className="mt-4 sm:mt-6 text-xl">— Fox 7 Austin report</p>
            </a>

            <a 
              href="https://sports.yahoo.com/sports-academy-opens-lake-travis-031900934.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              <blockquote className="text-2xl italic text-gray-600 mt-8 sm:mt-10 md:mt-12">
                "They are only supposed to do two hours, but he brings home his laptop and I wake up every morning to him working on his laptop."
              </blockquote>
              <p className="mt-4 sm:mt-6 text-xl">— Christy Griswold, Sports Academy Parent</p>
            </a>

            <div className="block hover:opacity-80 transition-opacity">
              <blockquote className="text-2xl italic text-gray-600 mt-8 sm:mt-10 md:mt-12">
                "My kid is super into sports, a high-potential athlete if I can say. But at his old school he had to be at a desk all day. The academics and late-evening sports weren't working. I was really worried. But when he joined a sports academy, it kind of "unlocked" him. He's staying out of trouble, better in class, better on the court, and he loves it. Things are trending great. Biggest relief of my life."
              </blockquote>
              <p className="mt-4 sm:mt-6 text-xl">— Sports Academy Parent</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-center mb-12 sm:mb-16 md:mb-20 tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            FAQs
          </motion.h2>
          
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FAQItem
              question="What is Strata? Where is this school?"
              answer="Strata is a software platform that helps coaches create sports academies. We do not have a single campus, but rather have a network of academies that have used our technology and learning software to create their sports academy."
            />
            <FAQItem
              question="Who owns the school?"
              answer="The school is owned by the coach or leader who creates the academy. Strata is just the platform that enables them to create their academy — by managing the academics, administration, secure ESA funding, and more."
            />
            <FAQItem
              question="Are these schools only for middle schoolers?"
              answer="That is up to the coach or leader who creates the academy. But the vast majority our these new sports academies support middle schoolers."
            />
            <FAQItem
              question="Who will the sports academy team play?"
              answer="This is up to the coach. But in general: During the club season, the team competes against other AAU programs and academies. During the regular season, the team schedules exhibition games and matches against other schools."
            />
            <FAQItem
              question="How do the ESAs work?"
              answer="Texas Education Savings Accounts (ESAs) provide $10,000 in annual education funding for families who choose to not enroll their children in public schools. This funding can be used to enroll kids in a sports academy."
            />
            <FAQItem
              question="Don't ESAs only come into effect for next school year, the 2026-2027?"
              answer="Yes, the ESA program begins in the 2026-27 school year. For 2025-2026, we are granting $10,000 scholarships for students who attend sports academies created from Strata."
            />
            <FAQItem
              question="Can I talk to a parent of a student who has gone to a school like this?"
              answer="Yes, we can connect you with a parent. Please email us at team@strata.school and we will put you in touch!"
            />
            <FAQItem
              question="How does my kid get to school?"
              answer="This will be up to the specific sports academy. But in general, students will be dropped off and picked up by their parents."
            />
            <FAQItem
              question="Will my kid live in a dorm?"
              answer="Once again, this will be up to the specific sports academy. But in most cases, dorms will not be available and students will live at home."
            />
            <FAQItem
              question="What if I love the concept, but my child isn't a super athlete?"
              answer="That's okay! We have a network of schools that are focused on different niches (Texas Sports Academy, NextGen Academy, etc.). Some focus on entrepreneurship, arts, general sports, or other interests. Email us at team@strata.school and we will recommend the best school for your situation."
            />
          </motion.div>
        </div>
      </section>

      {/* Email CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6 text-gray-900">
              GIVE YOUR CHILD AN EDGE
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Stay updated on revolutionary sports academies.
            </p>
            <form 
              action={import.meta.env.DEV 
                ? "/api/mock-subscribe" 
                : "https://hooks.zapier.com/hooks/catch/22692611/27zyk2w/"}
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
                formData.append('source', 'parents_page');
                formData.append('timestamp', new Date().toISOString());
                
                if (import.meta.env.DEV) {
                  // In development, just simulate a successful submission
                  console.log('Development mode - Form data:', {
                    email,
                    source: 'parents_page',
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
              className="flex flex-col sm:flex-row gap-4"
            >
              <Input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="flex-1 h-12 text-lg bg-white border-gray-200"
                disabled={isSubmitting}
              />
              <Button 
                type="submit"
                className="h-12 px-8 text-lg bg-blue-600 text-white hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SUBMITTING...' : 'STAY UPDATED'}
              </Button>
            </form>
            {submitStatus === 'success' && (
              <p className="text-green-600 mt-4">Thank you for joining our mission!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600 mt-4">Please enter a valid email address.</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Parent; 