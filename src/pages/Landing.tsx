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

const Landing = () => {
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
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
              But Right Now...
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <ProblemCard
                title="Limited Impact"
                description="You're changing lives through sports, but imagine doing more. Academic success + athletic excellence."
              />
              <ProblemCard
                title="Income Ceiling"
                description="Great coaches deserve great compensation. Why settle for less when you could double your income?"
              />
              <ProblemCard
                title="Complex Transition"
                description="Starting a school sounds overwhelming. The paperwork, the academics, the logistics..."
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mentor Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl flex items-center justify-center">
                <span className="text-gray-400">Image Placeholder</span>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                We've Been There
              </h2>
              <p className="text-xl text-gray-400 mb-6">
                Our team combines decades of experience in education technology,
                sports coaching, and school administration. We help
                coaches transform their programs into successful schools. 
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Stat number="30+" label="Years of Experience" />
                <Stat number="99th" label="Percentile Results" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legacy Vision Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
              This is the Start Of Your Legacy
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <ProblemCard
                title="Massive Impact"
                description="Your athletes excel both on the field and in the classroom. A true dual-threat program that parents love."
              />
              <ProblemCard
                title="Financial Freedom"
                description="$150k-250k annual revenue while keeping your current coaching position. The compensation you deserve."
              />
              <ProblemCard
                title="Turnkey Solution"
                description="We handle everything: paperwork, academics, logistics. You focus on what you do best - coaching and mentoring."
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Coaches Like You, Achieving Their Dreams
          </h2>
          
          {/* Testimonials Row */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-black/30 rounded-xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-6 mb-6">
                <img
                  src="/images/coach.jpg"
                  alt="Coach Jamal"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">Coach Jamal</h3>
                  <p className="text-gray-400">Basketball</p>
                </div>
              </div>
              <p className="text-lg text-gray-200 italic mb-8">
                "I coached in the NBA, but this is bigger. We're not just developing athletes, we're shaping futures."
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-white">24</div>
                  <div className="text-sm text-gray-400">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">2</div>
                  <div className="text-sm text-gray-400">Years</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">125%</div>
                  <div className="text-sm text-gray-400">Income ↑</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-black/30 rounded-xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-6 mb-6">
                <img
                  src="/images/Carrollton1.png"
                  alt="Coach Brandon"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">Coach Brandon</h3>
                  <p className="text-gray-400">Football</p>
                </div>
              </div>
              <p className="text-lg text-gray-200 italic mb-8">
                "The support system made the transition seamless. My athletes are thriving academically and athletically."
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-white">18</div>
                  <div className="text-sm text-gray-400">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">1</div>
                  <div className="text-sm text-gray-400">Year</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">150%</div>
                  <div className="text-sm text-gray-400">Income ↑</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-black/30 rounded-xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-6 mb-6">
                <img
                  src="/images/Carrollton2.png"
                  alt="Coach Mike"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">Coach Mike</h3>
                  <p className="text-gray-400">Tennis</p>
                </div>
              </div>
              <p className="text-lg text-gray-200 italic mb-8">
                "Best decision I've ever made. The academic results are incredible, and my income has never been better."
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-white">15</div>
                  <div className="text-sm text-gray-400">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">1</div>
                  <div className="text-sm text-gray-400">Year</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">200%</div>
                  <div className="text-sm text-gray-400">Income ↑</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">
              Common Questions
            </span>
          </h2>
          <div className="space-y-4">
            <FAQItem
              question="How long does it take to get started?"
              answer="The process typically takes 4-6 weeks from initial consultation to launch. We handle all the complex parts."
            />
            <FAQItem
              question="What are the space requirements?"
              answer="You'll need adequate space for both academic and athletic activities. We'll help you assess your needs and find the perfect location."
            />
            <FAQItem
              question="How does the academic portion work?"
              answer="We provide a complete academic solution including curriculum, teachers, and support staff. Your focus stays on coaching and program development."
            />
            <FAQItem
              question="What sports can this work for?"
              answer="This model works for any sport - basketball, football, soccer, tennis, gymnastics, and more. If you can coach it, we can build a school around it."
            />
            <FAQItem
              question="How much can coaches earn?"
              answer="With ESA funding of $10,000 per student and typical enrollment of 15-25 students, most coaches double their current income while maintaining their existing coaching positions."
            />
          </div>
        </div>
      </section>

      {/* Direct Contact CTA Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/stadium.jpg"
            alt="Sports stadium"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90" />
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
                  Ready to Start Your Journey?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Schedule a free strategy call with our team. We'll discuss your vision,
                  answer your questions, and show you exactly how we can help you launch
                  your school.
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
                    onClick={() => window.location.href = 'mailto:team@strata.school'}
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
                    <span className="text-gray-300">30-minute strategy session</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span className="text-gray-300">Custom revenue projections</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span className="text-gray-300">Location assessment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span className="text-gray-300">Timeline planning</span>
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
      <footer className="bg-black/95 border-t border-white/10 py-16 backdrop-blur-sm">
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

export default Landing; 