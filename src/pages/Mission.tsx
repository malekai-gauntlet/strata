import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import CountUpNumber from '@/components/CountUpNumber';
import { Button } from '@/components/ui/button';
import StarField from '@/components/StarField';
import TexasMap from '@/components/TexasMap';

const Mission = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black opacity-70" />
          {/* TODO: Replace with actual video/image */}
          <div className="w-full h-full bg-[#111111]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              WORLD-CLASS EDUCATION FOR EVERY TEXAS CHILD
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300">
              We're providing every Texas child with a choice for world-class education and athletic excellence.
            </p>
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

      {/* The Challenge Section */}
      <section className="relative py-24 bg-black">
        <StarField />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-4">LACK OF OPTIONS FOR RURAL VOTERS</h2>
              <p className="text-gray-400">
                Many districts in Texas don't have enough options for alternatives to public schools.
                Without options, school choice policy doesn't translate into real change.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-4">NOT COMPELLING ENOUGH</h2>
              <p className="text-gray-400">
                ESA-funded schools need to be radically better for parents.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Strata Solution Section */}
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
              title="TOP 1% ACADEMIC PERFORMANCE"
              description="Powered by 2 Hour Learning. We use personalized, mastery-based learning to bring students to the top 1-2% nationally with only two hours of studying daily."
            />
            <SolutionCard
              title="AVAILABLE TO EVERYONE"
              description="One school per district by August 26th, growing to 10% of Texas students by 2028. Easy setup and scalable model."
            />
            <SolutionCard
              title="SPORTS EXCELLENCE"
              description="Sports begin at 12 pm daily. Basketball, tennis, soccer programs with professional coaching staff."
            />
            <SolutionCard
              title="LIFE SKILLS DEVELOPMENT"
              description="World-class workshops in Financial Literacy, Nutrition, Public Speaking and other key life skills."
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

      {/* 2 Hour Learning Section */}
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold">2 HOUR LEARNING</h2>
              <p className="text-xl text-gray-400">
                Strata Schools are powered by 2 Hour Learning, the revolutionary approach to education.
              </p>
              
              <div className="space-y-6">
                <Feature
                  title="THE SYSTEM"
                  items={[
                    "Personalized, Mastery-Based Learning",
                    "Science-backed methodology",
                    "Math and Reading focus",
                    "Two-hour daily requirement"
                  ]}
                />
                
                <Feature
                  title="THE RESULTS"
                  items={[
                    "Top 1-2% MAP scores across subjects",
                    "1470+ average SAT score",
                    "Featured in press coverage",
                    "Proven success metrics"
                  ]}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[600px] bg-[#111111] rounded-lg overflow-hidden"
            >
              {/* TODO: Replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-2xl font-bold mb-4">Press Coverage</h3>
                <p className="text-gray-400">
                  "Texas Private School's Use of new 'AI tutor' rockets student test scores to top 2% in the country"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scaling Across Texas Section */}
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
              SCALING ACROSS TEXAS
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              The Strata Model is designed to scale up while providing world-class education.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-12">
              <TimelineItem
                year="2026"
                title="1,200 SCHOOLS"
                items={[
                  "One Strata School per district",
                  "Full Texas coverage",
                  "Initial implementation"
                ]}
              >
                <CountUpNumber
                  end={1200}
                  suffix="+"
                  label="SCHOOLS"
                />
              </TimelineItem>

              <TimelineItem
                year="2027"
                title="5,000 SCHOOLS"
                items={[
                  "Multiple sports academies",
                  "Comprehensive district coverage",
                  "Expanded programs"
                ]}
              >
                <CountUpNumber
                  end={5000}
                  suffix="+"
                  label="SCHOOLS"
                />
              </TimelineItem>

              <TimelineItem
                year="2028"
                title="10% MARKET SHARE"
                items={[
                  "550,000 students",
                  "Top 1% national results",
                  "Texas education leadership"
                ]}
              >
                <CountUpNumber
                  end={10}
                  suffix="%"
                  label="OF TEXAS STUDENTS"
                />
              </TimelineItem>
            </div>

            <div className="h-[600px]">
              <TexasMap />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-20 max-w-4xl mx-auto"
          >
            <p className="text-2xl font-bold text-white mb-6">
              IMPLEMENTATION STRATEGY
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StrategyStep
                number="01"
                title="Generate Parent Demand"
                description="Build an interested list of parents who want the Strata vision."
              />
              <StrategyStep
                number="02"
                title="Find Parent Clusters"
                description="Identify clusters of parents in the same area for microschools."
              />
              <StrategyStep
                number="03"
                title="Recruit Local Coaches"
                description="Find coaches a community already loves to guide students."
              />
              <StrategyStep
                number="04"
                title="Automate Operations"
                description="Handle ESA filing, location selection, and LLC incorporation."
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commitment Statement Section */}
      <section className="relative py-24 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-5xl mx-auto"
          >
            <p className="text-3xl md:text-4xl font-bold leading-tight">
              School Choice will provide 10% of Texas students with access to 2 Hour Learning. We commit that because of school choice, 10% of Texas students will test in the top 1% in the nation. Texas will become an education powerhouse — top 5 in the nation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Commitment Section */}
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
              OUR COMMITMENT
            </h2>
            <p className="text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto">
              We will have 1,200 Strata Schools, with each testing in the top 1% in their region
            </p>
          </motion.div>

          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-8 text-center">The Vision for Strata School Students</h3>
            <p className="text-xl text-gray-300 mb-8 text-center">
              Strata Schools have three commitments to every student:
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <CommitmentCard
                title="Academic Excellence"
                description="Top 1% Test Scores in the Nation with only 2 hours of studying a day"
              />
              <CommitmentCard
                title="Sports Focused to Motivate Kids"
                description="Basketball, Tennis, Soccer-focused Strata Schools. Kids start playing at noon and love coming to school"
              />
              <CommitmentCard
                title="Life Skills to Develop Kids"
                description="Workshops on all the life skills kids need to be successful"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How Strata School Works — Sports Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              How Strata School Works — Sports
            </h2>
            <p className="text-xl text-gray-300 mb-12 text-center">
              Strata Schools will achieve rapid scale by creating sports-focused microschools for Texas Families. 
              Strata students will have the best academic outcomes in Texas and play sports all afternoon. 
              Parents will jump at this choice.
            </p>

            <div className="space-y-12">
              <Feature
                title="SPORTS-FOCUSED APPROACH"
                items={[
                  "Texas families love sports and Strata students start playing sports at noon",
                  "2 Hour Learning in the morning, Sports in the afternoon",
                  "Coaches are expert motivators and knowledgeable of sport"
                ]}
              />

              <div className="bg-[#111111] p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Examples of Strata Schools</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <SportCard title="Soccer Academy" />
                  <SportCard title="Tennis Academy" />
                  <SportCard title="Basketball Academy" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* More sections to be added... */}
    </div>
  );
};

// Solution Card Component
const SolutionCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-black/50 p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 group"
    >
      <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

// Feature Component
const Feature = ({ title, items }: { title: string; items: string[] }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-blue-400">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-3 text-gray-300">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Timeline Item Component
const TimelineItem = ({ year, title, items, children }: {
  year: string;
  title: string;
  items: string[];
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative pl-8 border-l-2 border-white/10"
    >
      <div className="absolute left-0 top-0 w-4 h-4 bg-blue-400 rounded-full -translate-x-[9px]">
        <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-25" />
      </div>
      <div className="mb-4">{children}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-400">{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

// Strategy Step Component
const StrategyStep = ({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-blue-400 font-bold mb-2">{number}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </motion.div>
  );
};

// Add new component for Commitment Cards
const CommitmentCard = ({ title, description }: { title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-[#111111] p-8 rounded-lg border border-gray-800"
  >
    <h4 className="text-xl font-bold mb-4">{title}</h4>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

// Add new component for Sport Cards
const SportCard = ({ title }: { title: string }) => (
  <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
    <h4 className="text-xl font-bold text-center">{title}</h4>
  </div>
);

export default Mission; 