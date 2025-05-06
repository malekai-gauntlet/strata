import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Card components
const ValueCard = ({ title, points }: { title: string; points: string[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-black/50 p-6 md:p-8 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
  >
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <ul className="space-y-2">
      {points.map((point, index) => (
        <li key={index} className="text-gray-400">{point}</li>
      ))}
    </ul>
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

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-black/50 p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
  >
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

const Coaches = () => {
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
    formData.append('source', 'coaches_page');
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              THIS IS THE START OF YOUR LEGACY
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
              Turn your program into a school. Double your income. Leave a legacy.
            </p>
            <Button 
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
              onClick={() => document.getElementById('value-props')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Sections */}
      <section id="value-props" className="bg-[#111111]">
        {/* Impact & Legacy Section */}
        <div className="py-24 border-b border-white/10">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Impact & Legacy</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-200">
                    <span className="text-2xl">→</span>
                    Shape the Next Generation
                  </li>
                  <li className="flex items-center gap-3 text-gray-200">
                    <span className="text-2xl">→</span>
                    Own Your Sports Academy
                  </li>
                  <li className="flex items-center gap-3 text-gray-200">
                    <span className="text-2xl">→</span>
                    Build Your Coaching Brand
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-video bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                  <img 
                    src="/images/legacy.jpg" 
                    alt="Impact and Legacy" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Financial Freedom Section */}
        <div className="py-24 border-b border-white/10 bg-black/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row-reverse items-center gap-12"
            >
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Financial Freedom</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-200">
                    <span className="text-2xl">→</span>
                    Double Your Income
                  </li>
                  <li className="flex items-center gap-3 text-gray-200">
                    <span className="text-2xl">→</span>
                    $10k per student through Texas ESA
                  </li>
                  <li className="flex items-center gap-3 text-gray-200">
                    <span className="text-2xl">→</span>
                    Keep Your Current Coaching Job
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-video bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                  <img 
                    src="/images/financial-freedom.jpg" 
                    alt="Financial Freedom" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Simplified Operations Section */}
        <div className="py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Simplified Operations</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-200">
                    <span className="text-2xl">→</span>
                    We Handle the Academics
                  </li>
                  <li className="flex items-center gap-3 text-gray-200">
                    <span className="text-2xl">→</span>
                    Focus on What You Do Best - Coaching
                  </li>
                  <li className="flex items-center gap-3 text-gray-200">
                    <span className="text-2xl">→</span>
                    Full Support System
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-video bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                  <img 
                    src="/images/operations.jpg" 
                    alt="Simplified Operations" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Coaches Like You Are Already Building Their Legacy
          </h2>
          
          {/* Featured Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#111111] rounded-2xl overflow-hidden mb-12"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <div className="aspect-square">
                  <img
                    src="/images/coach-jamal.jpg"
                    alt="Coach Jamal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Coach Jamal</h3>
                      <p className="text-gray-400">Basketball, Texas Sports Academy</p>
                    </div>
                  </div>
                  <p className="text-2xl font-light italic text-gray-200 mb-8">
                    "I've coached at every level, but building my own school has been the most rewarding. We're not just developing athletes, we're shaping futures."
                  </p>
                </div>
                <div className="flex gap-12">
                  <div>
                    <div className="text-3xl font-bold text-white">24</div>
                    <div className="text-sm text-gray-400">Students</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">2x</div>
                    <div className="text-sm text-gray-400">Income</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">100%</div>
                    <div className="text-sm text-gray-400">College Acceptance</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Testimonials */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#111111] rounded-xl p-8"
            >
              <div className="flex items-center gap-6 mb-6">
                <img
                  src="/images/coach-sarah.jpg"
                  alt="Coach Sarah"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">Coach Sarah</h3>
                  <p className="text-gray-400">Volleyball</p>
                </div>
              </div>
              <p className="text-lg text-gray-200 italic mb-8">
                "Starting my own school seemed daunting, but Strata made it seamless. Now I'm making double the income while doing what I love."
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-2xl font-bold text-white">18</div>
                  <div className="text-sm text-gray-400">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">1.5x</div>
                  <div className="text-sm text-gray-400">Income</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-[#111111] rounded-xl p-8"
            >
              <div className="flex items-center gap-6 mb-6">
                <img
                  src="/images/coach-mike.jpg"
                  alt="Coach Mike"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">Coach Mike</h3>
                  <p className="text-gray-400">Football</p>
                </div>
              </div>
              <p className="text-lg text-gray-200 italic mb-8">
                "The academic results are incredible. My athletes are excelling both on the field and in the classroom. This is the future of sports education."
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-2xl font-bold text-white">22</div>
                  <div className="text-sm text-gray-400">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">2x</div>
                  <div className="text-sm text-gray-400">Income</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Initial Consultation"
              description="Free strategy session to understand your vision and evaluate your current program"
            />
            <StepCard
              number={2}
              title="Customized Plan"
              description="Get a roadmap tailored to your sport with clear timeline and milestones"
            />
            <StepCard
              number={3}
              title="Launch Support"
              description="Done-for-you academic integration and marketing assistance"
            />
          </div>
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section className="py-24 bg-[#111111] relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Academic Excellence</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Accredited Curriculum"
              description="State-approved curriculum designed for student success"
            />
            <FeatureCard
              title="Certified Teachers"
              description="Expert educators supporting your students"
            />
            <FeatureCard
              title="Flexible Learning"
              description="Personalized schedules that work for athletes"
            />
            <FeatureCard
              title="College Prep"
              description="Comprehensive preparation for higher education"
            />
            <FeatureCard
              title="Academic Support"
              description="Dedicated staff ensuring student achievement"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem
              question="How long does it take to get started?"
              answer="The process typically takes 4-6 weeks from initial consultation to launch."
            />
            <FAQItem
              question="What are the space requirements?"
              answer="You'll need adequate space for both academic and athletic activities. We'll help you assess your needs during consultation."
            />
            <FAQItem
              question="How does the academic portion work?"
              answer="We provide a complete academic solution including curriculum, teachers, and support staff."
            />
            <FAQItem
              question="What sports can this work for?"
              answer="This model works for any sport, from basketball and football to tennis and gymnastics."
            />
            <FAQItem
              question="How much can coaches earn?"
              answer="With ESA funding of $10,000 per student and typical enrollment of 15-25 students, coaches can significantly increase their income."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Transform Your Program Today</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join the revolution in sports education and create your legacy
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
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
              {isSubmitting ? 'SUBMITTING...' : 'GET STARTED'}
            </Button>
          </form>
          {submitStatus === 'success' && (
            <p className="text-green-400 mt-4">Thank you! We'll be in touch soon.</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-400 mt-4">Please enter a valid email address.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Coaches; 