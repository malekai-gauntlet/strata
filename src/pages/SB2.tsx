import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Timeline from '@/components/Timeline';

// Card components
const InfoCard = ({ title, description }: { title: string; description: string }) => (
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

const SB2 = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-black py-24">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="text-gray-400 text-lg mb-4 block">TEXAS EDUCATION FREEDOM ACT</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
              UNDERSTANDING SB2
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              A comprehensive guide to Texas's groundbreaking $1 billion Education Savings Account program launching in 2026-27.
            </p>
            <Button 
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
              onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What is School Choice?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              School choice lets Texas families bypass the old zip-code–based funding model and direct public dollars to the accredited school or program of their choosing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <InfoCard
              title="Parental Empowerment"
              description="Families gain the flexibility to select the educational environment that best fits their child's needs and values, with public dollars helping to cover tuition and related expenses."
            />
            <InfoCard
              title="Improved Outcomes"
              description="Research shows voucher and ESA participants graduate at higher rates and are more likely to enroll in four-year colleges, with significant improvements in degree completion rates."
            />
            <InfoCard
              title="Competitive Excellence"
              description="When families can choose their schools, all educational institutions face stronger incentives to improve academic standards and student supports."
            />
          </div>
        </div>
      </section>

      {/* Key Numbers Section */}
      <section className="py-16 bg-black border-t border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat number="$10,800" label="Per Student Annually" />
            <Stat number="$11,500" label="For Special Education" />
            <Stat number="33" label="States with School Choice" />
            <Stat number="80%" label="Reserved for Priority Students" />
          </div>
        </div>
      </section>

      {/* SB2 Details Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Understanding SB2</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The Texas Education Freedom Act creates the state's first universal ESA program, empowering families with educational choice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-black/40 via-black/60 to-black/40 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-4">Program Details</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Launching in the 2026-27 school year</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>$1 billion in dedicated funding</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>No cuts to existing public school budgets</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-black/40 via-black/60 to-black/40 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-4">Eligible Expenses</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Tuition and textbooks</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Tutoring and educational services</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-white text-xl">→</span>
                  <span>Transportation and school meals</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment Flow Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Payments Work</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding the flow of ESA funds from the state to educational providers.
            </p>
          </motion.div>

          <Timeline items={[
            {
              year: "Step 1",
              title: "State to EAOs",
              description: "The Comptroller deposits ESA funds into the Program Fund in three installments throughout the year."
            },
            {
              year: "Step 2",
              title: "EAO Management",
              description: "Certified Educational Assistance Organizations hold funds in trust and handle applications and verifications."
            },
            {
              year: "Step 3",
              title: "Provider Invoicing",
              description: "Accredited providers issue invoices for eligible services, which parents authorize via their EAO portal."
            },
            {
              year: "Step 4",
              title: "Payment Processing",
              description: "EAOs pay providers within 10 business days of verification."
            },
            {
              year: "Step 5",
              title: "Final Distribution",
              description: "Providers compensate coaches or program leaders using the received ESA funds."
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
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="bg-gradient-to-br from-black/40 via-black/60 to-black/40 border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="space-y-6">
              <FAQItem
                question="Is SB2 taking money from public schools?"
                answer="No. SB2 is funded by a separate $1 billion appropriation from the state's General Revenue Fund. It does not reduce or cap existing public school budgets under the Foundation School Program or HB 3."
              />
              <FAQItem
                question="Who is eligible to participate?"
                answer="Any K-12 Texas resident eligible for public school—whether currently in public, private, or homeschool—can apply for an ESA under SB2."
              />
              <FAQItem
                question="How much funding will students receive?"
                answer="Most students will receive approximately $10,800 per year (85% of the statewide average per-student funding). Students with disabilities may receive up to $11,500, and homeschoolers can receive $2,000."
              />
              <FAQItem
                question="How are slots allocated if there are too many applications?"
                answer="If applications exceed program capacity, 80% of slots are reserved for students with disabilities or from low-income backgrounds. The remaining slots are awarded by lottery."
              />
              <FAQItem
                question="When does the program start?"
                answer="The program launches in the 2026-27 school year, with the first funds being disbursed starting July 1, 2026."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Strata Platform Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Strata Helps</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform simplifies the entire ESA process for coaches and families.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <InfoCard
              title="Guided Applications"
              description="Step-by-step workflows for parents to submit residency documentation and track approval status."
            />
            <InfoCard
              title="Automated Invoicing"
              description="Generate compliant invoices for each student or session with just a few clicks."
            />
            <InfoCard
              title="One-Click Authorization"
              description="Parents can easily approve ESA payments directly from their dashboard."
            />
            <InfoCard
              title="Real-Time Dashboards"
              description="Full visibility into ESA balances, pending authorizations, and payment timelines."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Learn More?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Schedule a call with our team to discuss how you can leverage SB2 for your sports academy.
              </p>
              <Button
                className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6"
                onClick={() => window.open('https://calendly.com/team-strata/30min', '_blank')}
              >
                Schedule a Call
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Strata. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SB2; 