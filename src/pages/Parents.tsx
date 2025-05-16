import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/VideoPlayer';
import YouTubePlayer from '@/components/YouTubePlayer';
import InstagramEmbed from '@/components/InstagramEmbed';
import TweetEmbed from '@/components/TweetEmbed';
import { motion } from 'framer-motion';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* <Navigation /> */}

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <video 
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/v3.mov" type="video/mp4" />
          </video>
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
                className="text-xl text-gray-400 mb-4 font-light tracking-wide"
                {...fadeInUp}
              >
                HEY PARENTS
              </motion.p>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight text-white mb-6 leading-[0.9]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                YOUR KID WILL THRIVE
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-400 mb-8 font-light leading-relaxed"
                {...fadeInUp}
                transition={{ delay: 0.6 }}
              >
                At a revolutionary sports academy designed for middle school athletes, combining top-tier sports training with accelerated academics.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

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
              <h3 className="text-2xl font-heading mb-4 text-gray-900">Accelerated Learning</h3>
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
                Through sports and dedicated workshops, students develop essential skills like leadership, growth mindset, and public speaking.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logo Bar */}
      <section className="pt-4 pb-20 bg-white">
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
            MAXIMIZE YOUR KID'S POTENTIAL
          </motion.h2>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-6 md:mb-8 text-gray-900 leading-[0.9]">Excel in athletics and academics</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                A first-of-its-kind sports academy. With core academics finished in just two focused hours each morning, 
                students spend afternoons improving at their sport or in hands-on workshops that build core life skills.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 md:mt-0 w-full"
            >
              <img src="/images/happy-kids.jpg" alt="Happy Kids" className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Sports at Noon */}
      <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-0 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 md:mt-0 w-full"
            >
              <img src="/images/student-athlete.jpg" alt="Student Athlete" className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-6 md:mb-8 text-gray-900 leading-[0.9]">Sports start at noon</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                With the day's academics completed by 12pm, students have all afternoon to train with coach. 
                Students have 3-4 extra hours daily than their competition to train with world-class coaches and 
                position themselves for success later in life.
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
            >
              <h2 className="text-4xl font-heading tracking-tight mb-8 text-gray-900 leading-[0.9]">Learn 2x in 2 hours</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Students use the world leading 2 Hour Learning software to learn academics. 
                2 Hour Learning — which is accredited by Cognia — is used at Alpha School, Texas Sports Academy, and hundreds of other schools to help students achieve top-tier 
                academic outcomes.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
            >
              <div className="w-full overflow-hidden">
                <InstagramEmbed postId="DHeWwHrxgJ8" />
              </div>
            </motion.div>
            <motion.div
              className="text-left"
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
              <p className="text-xl mt-8 text-gray-600 leading-relaxed">
                The results of these workshops show.
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
              className="text-left"
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
            >
              <img src="/images/lifting.jpg" alt="Strength Training" className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300" />
            </motion.div>
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-heading mb-8 text-gray-900">Position your kid for long-term success in sport</h3>
              <p className="text-xl mb-8 text-gray-600">
                This sports academy is focused on the middle school age group. It's a prime opportunity to prepare your kid for 
                success at the high school level and prepare for a college career (if that's your kid's dream). The extra 
                3-4 hours your kid gets back can be spent on focused skills training, athletic/fitness training, or 5v5 games.
              </p>
              <p className="text-xl text-gray-600">
                If this academy is sport-specific (e.g. basketball), the students at the school can be a club team during the off-season, then schedule games with other schools during the season. 
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
              className="text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-4 sm:mb-6 md:mb-8">
                <h3 className="text-3xl md:text-4xl font-heading text-gray-900 mr-4">Fully personalized learning, top academic outcomes</h3>
                <img src="/images/cognia.png" alt="Cognia Accredited" className="h-12 sm:h-16" />
              </div>
              <p className="text-xl mb-4 sm:mb-6 md:mb-8 text-gray-600">
                The learning paradigm has changed. The best way to learn is no longer in a classroom lecture, but through 
               personalized learning software while supported by a guide.
              </p>
              <p className="text-xl mb-6 sm:mb-8 md:mb-10 text-gray-600">
                Your kid will get to use 2 Hour Learning — a revolutionary software accredited by Cognia — that is used at Alpha 
                Schools and Sports Academies to achieve Top 2% academic outcomes in only 2 hours of daily studying.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://2hourlearning.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">Learn more about 2 Hour Learning</Button>
                </a>
                <a href="https://heyzine.com/flip-book/2hourlearning.html" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button className="bg-white text-blue-600 border border-blue-600 w-full sm:w-auto">2 Hour Learning White Paper</Button>
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full overflow-hidden">
                <YouTubePlayer videoId="WIXJrdjG8RY" />
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <motion.div
              className="aspect-video"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <VideoPlayer 
                src="/videos/2-hour-learning-video.mp4"
                controls
                className="w-full h-full"
              />
            </motion.div>
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-heading mb-8 text-gray-900">Just 2 hours of academics,no homework needed</h3>
              <p className="text-xl mb-8 text-gray-600">
                With 2 Hour Learning, students really only need two hours of daily focus in the morning to excel. There's
                no need for students to be at a desk for 6-7 hours a day as they are at traditional schools.
              </p>
              <p className="text-xl text-gray-600">
                2 Hour Learning is a mastery-based learning platform. Students work on their own laptops at the school and must understand each concept before moving on. When they get stuck, they can speak with their coach or 
                hop on a zoom call with a support teacher to work through a question.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl font-heading mb-4 sm:mb-6 md:mb-8 text-gray-900">Give your kid their time back</h3>
              <p className="text-xl mb-4 sm:mb-6 md:mb-8 text-gray-600">
                90% of learning is motivation. In this revolutionary learning model where learning software does the core teaching, the role of the "teacher" has shifted to that of a motivator. And there's no better motivator for a young athlete than their coach.
              </p>
              <p className="text-xl mb-6 sm:mb-8 md:mb-10 text-gray-600">
                This learning model works. Alpha School in Brownsville Texas took students from the 31st percentile to the 86th percentile in one year.
              </p>
              <a href="https://2hourlearning.com/twice-the-learning-twice-as-fast-explaining-the-2-hour-learning-model/#:~:text=When%20we%20opened%20our%20campus,as%20much%2C%20twice%20as%20fast." target="_blank" rel="noopener noreferrer" className="block sm:inline-block w-full sm:w-auto">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">Read Brownsville Case Study</Button>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full overflow-hidden relative">
                <div className="max-h-[500px] overflow-y-auto overflow-x-hidden pb-4">
                  <TweetEmbed tweetId="1899164931897106719" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
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
            <div className="absolute left-1/2 w-px h-full bg-gray-300 md:left-1/2" />
            
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
                  <div className="absolute left-1/2 -translate-x-1/2 -mt-2">
                    <div className="w-4 h-4 rounded-full bg-blue-600" />
                  </div>
                  
                  {/* Content */}
                  <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] items-center">
                    {/* Time */}
                    <div className="text-center md:text-right md:pr-8 mb-2 md:mb-0">
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
                    <div className="pl-0 md:pl-8 text-center md:text-left">
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
            <blockquote className="text-2xl italic text-gray-600">
              "At Texas Sports Academy, they aggressively believe students don't have to sit in a chair at a desk for 
              six hours a day. They spend two hours on academics and four hours for life skills like financial literacy, 
              public speaking, and teamwork."
            </blockquote>
            <p className="mt-4 sm:mt-6 text-xl">— Fox 7 Austin report</p>

            <blockquote className="text-2xl italic text-gray-600 mt-8 sm:mt-10 md:mt-12">
              "They are only supposed to do two hours, but he brings home his laptop and I wake up every morning to him working on his laptop,"
            </blockquote>
            <p className="mt-4 sm:mt-6 text-xl">— Christy, Sports Academy Parent</p>
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
              answer="The school is owned by the coach or leader who creates the academy. Strata is just the platform that enables them to create their academy."
            />
            <FAQItem
              question="Are these schools only for middle schoolers?"
              answer="That is up to the coach or leader who creates the academy. Though the vast majority our these new sports academies support middle schoolers."
            />
            <FAQItem
              question="Who will the sports academy team play?"
              answer="While up to the coaches discretion, in general: during the club season, teams compete against other AAU programs and academies. During the regular season, the team will schedule exhibition games and matches against other schools."
            />
            <FAQItem
              question="How do the ESAs work?"
              answer="Texas Education Savings Accounts (ESAs) provide $10,000 in annual education funding for families who choose not to enroll their children in public schools. This funding can be used to enroll your kid in a sports academy."
            />
            <FAQItem
              question="Don't ESAs only come into effect for next school year, the 2026-2027?"
              answer="Yes, the ESA program begins in the 2026-27 school year. For 2025-2026, Strata is providing $10,000 scholarships for students who attend sports academies created from Strata."
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Parent; 