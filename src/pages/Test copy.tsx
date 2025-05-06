import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Timeline from '@/components/Timeline';

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

const Test = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 text-left"
            >
              <span className="text-gray-400 text-lg mb-4 block">Hey coaches,</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
                IMAGINE YOUR LEGACY
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Your sports program transformed into a thriving school. <br></br>
                Your athletes are excelling on the court and in the classroom. <br></br>  
                Your income doubled.
              </p>
              <Button 
                className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
                onClick={() => document.getElementById('present-state')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Discover How
              </Button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl flex items-center justify-center">
                <span className="text-gray-400">Coach Image Placeholder</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Present State/Problem Section */}
      <section id="present-state" className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              The Reality for Most Coaches Today
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <ProblemCard
                title="Limited Impact"
                description="You want to do more for your athletes, but time and resources are limited. You see their potential both in sports and academics."
              />
              <ProblemCard
                title="Income Ceiling"
                description="Despite your expertise and dedication, traditional coaching roles have a clear income cap that's hard to break through."
              />
              <ProblemCard
                title="Future Uncertainty"
                description="You're building something great, but without ownership and systems, your legacy depends too much on factors outside your control."
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution/Transformation Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Transformation
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're empowering coaches to create their own sports academies, combining elite athletics with top-tier academics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <StepCard
              number={1}
              title="Elite Sports Training"
              description="Continue your existing training program, now integrated with a complete educational system."
            />
            <StepCard
              number={2}
              title="Academic Excellence"
              description="Our learning system delivers personalized education, ensuring every athlete succeeds academically."
            />
            <StepCard
              number={3}
              title="Business Growth"
              description="Transform your program into a sustainable business that generates significant additional revenue."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat number="$10k" label="Per Student Funding" />
            <Stat number="15-25" label="Students Per School" />
            <Stat number="$150k+" label="Additional Annual Revenue" />
            <Stat number="Top 1%" label="Academic Outcomes" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Coaches Building Their Legacy
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join these coaches who've already transformed their programs into thriving schools.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              image="/images/coach1.jpg"
              name="Coach Thompson"
              sport="Basketball"
              quote="I never thought I could combine my passion for basketball with running a school. Now I'm doing both and making a bigger impact than ever."
              metrics={{
                students: 20,
                yearsSince: 2,
                incomeIncrease: "180%"
              }}
            />
            <TestimonialCard
              image="/images/coach2.jpg"
              name="Coach Rodriguez"
              sport="Soccer"
              quote="The academic results have been incredible. My athletes are excelling both on the field and in the classroom."
              metrics={{
                students: 18,
                yearsSince: 1,
                incomeIncrease: "150%"
              }}
            />
            <TestimonialCard
              image="/images/coach3.jpg"
              name="Coach Williams"
              sport="Volleyball"
              quote="This model has allowed me to scale my impact while maintaining the quality of training that my program is known for."
              metrics={{
                students: 22,
                yearsSince: 2,
                incomeIncrease: "200%"
              }}
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Journey to School Ownership
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We've streamlined the process of transforming your program into a school.
            </p>
          </motion.div>

          <Timeline items={[
            {
              year: "Month 1",
              title: "Initial Setup",
              description: "We'll help you plan your school structure, identify your target location, and begin the paperwork process."
            },
            {
              year: "Month 2",
              title: "Academic Integration",
              description: "Set up the learning system, customize the curriculum, and prepare the academic environment."
            },
            {
              year: "Month 3",
              title: "Launch Preparation",
              description: "Finalize facility setup, complete staff training, and begin student enrollment."
            },
            {
              year: "Month 4",
              title: "School Launch",
              description: "Welcome your first cohort of student-athletes and begin your journey as a school owner."
            }
          ]} />
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

          <div className="space-y-4">
            <FAQItem
              question="How does the funding work?"
              answer="Through Texas's new ESA program, each student receives $10,000 in annual funding. With 15-25 students, this creates substantial revenue for your school."
            />
            <FAQItem
              question="What about academics?"
              answer="Our learning system handles all academic requirements. Students learn through personalized software, achieving top 1% outcomes without traditional teachers."
            />
            <FAQItem
              question="Can I keep my current coaching position?"
              answer="Yes! The school operates during regular school hours (9am-3pm), allowing you to maintain your existing coaching commitments."
            />
            <FAQItem
              question="How long does it take to get started?"
              answer="With our support, you can launch your school within 3-4 months. We handle all the paperwork, technology setup, and operational details."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Start Building Your Legacy
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join the coaches who are transforming their programs and creating lasting impact.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-black/50 border-white/20 text-white placeholder:text-gray-500"
              />
              <Button 
                type="submit"
                className="bg-white text-black hover:bg-gray-200 px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Get Started'}
              </Button>
            </form>
            {submitStatus === 'success' && (
              <p className="text-green-500 mt-4">Thanks! We'll be in touch soon.</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 mt-4">Please enter a valid email address.</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Test; 