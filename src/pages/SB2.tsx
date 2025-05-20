import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Timeline from '@/components/Timeline';

// Image component with placeholder
const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/40" />
    <img
      src={src}
      alt={alt}
      className="object-cover w-full h-full"
      loading="lazy"
    />
  </div>
);

// Card components with enhanced Stripe-like styling
const InfoCard = ({ title, description, imageSrc }: { title: string; description: string; imageSrc?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="relative overflow-hidden bg-gradient-to-br from-black/40 via-black/60 to-black/40 p-8 rounded-xl border border-white/10 hover:border-white/20 transition-all group"
  >
    {imageSrc && (
      <div className="mb-6 h-48 relative overflow-hidden rounded-lg">
        <ImageWithFallback src={imageSrc} alt={title} className="w-full h-48" />
      </div>
    )}
    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white/90 transition-colors">{title}</h3>
    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
  </motion.div>
);

const Stat = ({ number, label, icon }: { number: string; label: string; icon?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="relative bg-gradient-to-br from-black/30 to-black/50 rounded-xl p-6 border border-white/10"
  >
    {icon && (
      <div className="absolute top-4 right-4 opacity-20">
        <img src={icon} alt={label} className="w-8 h-8" />
      </div>
    )}
    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{number}</div>
    <div className="text-sm text-gray-400">{label}</div>
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

const SB2 = () => {
  const [activeSection, setActiveSection] = useState('sb2-overview');

  const sectionIds = [
    'sb2-overview', 'student-eligibility', 'esa-amounts', 'eligible-expenses', 'sb2-public-funding-impact',
    'eaos', 'provider-accreditation', 'funding-allocation', 'parent-application',
    'how-providers-get-paid', 'parent-payment-authorization', 'provider-requirements',
    'strata-for-parents', 'strata-for-coaches-academies', 'strata-payment-solutions'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 150; // Adjust based on sticky header height + desired margin (approx 9.375rem)
      
      let currentSectionId = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollY + offset) {
          currentSectionId = id;
        } else {
          break;
        }
      }
      // Special case for the very bottom of the page, ensure last section is active if in view
      const lastSectionElement = document.getElementById(sectionIds[sectionIds.length - 1]);
      if (lastSectionElement) {
        const rect = lastSectionElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom <= window.innerHeight) {
            // If last section is fully or mostly visible at the bottom
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) { // 50px buffer
                currentSectionId = sectionIds[sectionIds.length - 1];
            }
        }
      }

      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call on mount to set initial active section

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // sectionIds is static, so we can disable exhaustive-deps for it to avoid re-running if it were dynamic

  const scrollTarget = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navigation />

      {/* Hero Section with background image */}
      <section className="relative min-h-screen flex items-center py-24">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/capitol.jpg"
            alt="Texas State Capitol"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left max-w-3xl"
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm mb-6">TEXAS EDUCATION FREEDOM ACT</span>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              UNDERSTANDING
              <br />
              TEXAS ESAs
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl">
              A comprehensive guide to Texas's groundbreaking $1 billion Education Savings Account program launching in 2026-27.
            </p>
            <Button 
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6 rounded-full"
              onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Overview Section with images */}
      <section id="overview" className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#111111]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              What is School Choice?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              School choice lets Texas families bypass the old zip-code–based funding model and direct public dollars to the accredited school or program of their choosing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <InfoCard
              title="Parental Empowerment"
              description="Families gain the flexibility to select the educational environment that best fits their child's needs and values."
              imageSrc="/images/happy-kids.jpg"
            />
            <InfoCard
              title="Improved Outcomes"
              description="Research shows voucher and ESA participants graduate at higher rates and are more likely to enroll in four-year colleges."
              imageSrc="/images/study.png"
            />
            <InfoCard
              title="Competitive Excellence"
              description="When families can choose their schools, all educational institutions face stronger incentives to improve."
              imageSrc="/images/capitol.jpg"
            />
          </div>
        </div>
      </section>

      {/* Key Numbers Section with icons */}
      <section className="py-16 bg-gradient-to-b from-[#111111] to-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat number="$10,800" label="Per Student Annually" icon="/icons/student.svg" />
            <Stat number="$11,500" label="For Special Education" icon="/icons/special-ed.svg" />
            <Stat number="15" label="States with School Choice" icon="/icons/states.svg" />
            <Stat number="80%" label="Reserved for Priority Students" icon="/icons/priority.svg" />
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

      {/* Stripe-style Documentation Section */}
      <section className="py-24 bg-[#f8fafc] text-gray-800">
        <div className="container mx-auto px-4">
          {/* Centered Title for the Documentation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#1a1f36]">
              Deep Dive: Understanding SB2
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore the key aspects of the Texas Education Freedom Act, from eligibility and funding to operational details and how Strata can help.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-x-8 lg:gap-x-12">
            {/* Left Sidebar Navigation */}
            <div className="w-full md:w-64 lg:w-72 flex-shrink-0 mb-12 md:mb-0">
              <div className="sticky top-28">
                <nav className="space-y-3">
                  {[{
                    title: 'Understanding SB2',
                    links: [
                      { id: 'sb2-overview', label: 'Program Overview' },
                      { id: 'student-eligibility', label: 'Student Eligibility' },
                      { id: 'esa-amounts', label: 'ESA Funding Amounts' },
                      { id: 'eligible-expenses', label: 'Eligible Expenses' },
                      { id: 'sb2-public-funding-impact', label: 'Impact on Public School Funding' },
                    ]
                  }, {
                    title: 'Key Entities & Requirements',
                    links: [
                      { id: 'eaos', label: 'Educational Assistance Orgs (EAOs)' },
                      { id: 'provider-accreditation', label: 'Provider Accreditation' },
                    ]
                  }, {
                    title: 'The ESA Payment Journey',
                    links: [
                      { id: 'funding-allocation', label: 'Fund Allocation & Schedule' },
                      { id: 'parent-application', label: 'Parent Application' },
                      { id: 'how-providers-get-paid', label: 'How Providers are Paid' },
                      { id: 'parent-payment-authorization', label: 'Parent Authorization' },
                    ]
                  }, {
                    title: 'Becoming an Approved Provider',
                    links: [
                      { id: 'provider-requirements', label: 'Provider Requirements' },
                    ]
                  }, {
                    title: 'Strata\'s Role',
                    links: [
                      { id: 'strata-for-parents', label: 'For Parents' },
                      { id: 'strata-for-coaches-academies', label: 'For Coaches & Academies' },
                      { id: 'strata-payment-solutions', label: 'Payment Solutions' },
                    ]
                  }].map(group => (
                    <div key={group.title}>
                      <h3 className="font-semibold text-gray-900 mb-3 text-sm tracking-wide uppercase">{group.title}</h3>
                      <ul className="space-y-0.5">
                        {group.links.map(link => (
                          <li key={link.id}>
                            <a 
                              href={`#${link.id}`}
                              onClick={(e) => { e.preventDefault(); scrollTarget(link.id); }}
                              className={`block py-1.5 pl-4 text-sm relative
                                ${activeSection === link.id 
                                  ? 'text-[#635bff] font-medium before:content-[\'\'] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[#635bff]' 
                                  : 'text-gray-600 hover:text-gray-900 hover:before:content-[\'\'] hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:bottom-0 hover:before:w-0.5 hover:before:bg-gray-300'}`}
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content Area - Ensure IDs match the sectionIds array */}
            <div className="flex-1 min-w-0 prose prose-lg max-w-none prose-a:text-[#635bff] prose-headings:text-[#1a1f36] prose-strong:text-[#1a1f36]">
              <article>
                <section id="sb2-overview" className="mb-12 scroll-mt-28">
                  <h2 className="text-3xl font-bold mb-4">Understanding SB2: The Texas Education Freedom Act</h2>
                  <p>The Texas Education Freedom Act, also known as Senate Bill 2 (SB2), marks a significant step in Texas's approach to education. Traditionally, public education funding is tied to a student's residential zip code, often limiting choices to the local public school. School choice policies, like SB2, aim to change this by empowering families.</p>
                  <p>SB2 establishes Texas's first statewide private school choice program through Education Savings Accounts (ESAs). This $1 billion initiative, launching for the 2026-27 school year, allows state funds to follow the student to the accredited educational provider of their family's choice, rather than being automatically allocated to the local public school.</p>
                </section>

                <section id="student-eligibility" className="mb-12 scroll-mt-28">
                  <h3 className="text-2xl font-semibold mb-3">Who is Eligible for an ESA under SB2?</h3>
                  <p>Any student in Kindergarten through 12th grade (K-12) who is a Texas resident and otherwise eligible to attend a Texas public school can apply for an ESA. This includes students currently in public, private, or homeschool settings.</p>
                </section>

                <section id="esa-amounts" className="mb-12 scroll-mt-28">
                  <h3 className="text-2xl font-semibold mb-3">How Much Funding Can Students Receive?</h3>
                  <p>The amount of ESA funding varies:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong>General Eligibility:</strong> Most students will receive approximately $10,800 per year. This amount is calculated as 85% of the statewide average per-student funding in public schools.</li>
                    <li><strong>Students with Disabilities:</strong> Students with qualifying disabilities may receive significantly more, potentially up to $30,000, based on a multiplier system that considers the level of support needed.</li>
                    <li><strong>Homeschool Students:</strong> Students participating primarily in a homeschool setting can receive $2,000 per year.</li>
                  </ul>
                </section>

                <section id="eligible-expenses" className="mb-12 scroll-mt-28">
                  <h3 className="text-2xl font-semibold mb-3">What Can ESA Funds Be Used For?</h3>
                  <p>ESA funds offer flexibility and can be used for a variety of approved educational expenses, including but not limited to:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Tuition and fees at accredited private schools or microschools.</li>
                    <li>Textbooks and curriculum materials.</li>
                    <li>Educational tutoring services.</li>
                    <li>Transportation to and from an eligible school or provider.</li>
                    <li>Therapeutic services (e.g., speech, occupational, physical therapy).</li>
                    <li>Educational hardware (like computers) and software.</li>
                    <li>School meals provided by an eligible institution.</li>
                  </ul>
                  <p className="mt-2"><em>(Note: This list expands upon the "Eligible Expenses" mentioned earlier on the page by including therapies, hardware/software.)</em></p>
                </section>

                <section id="sb2-public-funding-impact" className="mb-12 scroll-mt-28">
                  <h3 className="text-2xl font-semibold mb-3">Impact on Public School Funding</h3>
                  <p>A common question regarding Education Savings Accounts (ESAs) is whether they divert funds from existing public schools. It's important to understand how Texas's Senate Bill 2 (SB 2) is structured in this regard.</p>
                  <p>SB 2, which establishes the new ESA program, does <strong>not</strong> directly take money from current public school finance formulas. Instead, the bill creates a distinct "program fund" within the state's general revenue. For the 2026–2027 biennium, ESA appropriations are capped at $1 billion, allocated specifically to this new fund.</p>
                  <p>Students participating in the ESA program receive 85% of the statewide average per-student funding. Crucially, these funds are drawn from this newly created and separately appropriated pool of money, not from the Foundation School Program (FSP) which is the primary source of funding for Texas public schools.</p>
                  <p>While discussions about school choice often include concerns about the potential for future legislative decisions to redirect overall education dollars, the text of SB 2 itself focuses on amending Chapter 29 of the Education Code (related to specific programs and services). It does not make changes to the chapters that govern public school funding mechanisms.</p>
                  <p>In essence, SB 2 is designed to fund ESAs through a new, dedicated revenue stream, separate from the established funding systems for Texas public schools.</p>
                </section>

                <section id="eaos" className="mb-12 scroll-mt-28">
                  <h2 className="text-3xl font-bold mb-4">Key Entities & Requirements</h2>
                  <h3 className="text-2xl font-semibold mb-3">Educational Assistance Organizations (EAOs)</h3>
                  <p>Educational Assistance Organizations (EAOs) are crucial to the SB2 program. These are state-certified non-profit organizations responsible for managing and disbursing ESA funds. They act as intermediaries, holding the ESA funds in trust for families and processing payments to approved educational providers. EAOs will also handle aspects of the application and verification process for families and providers.</p>
                </section>

                <section id="provider-accreditation" className="mb-12 scroll-mt-28">
                  <h3 className="text-2xl font-semibold mb-3">Provider Accreditation</h3>
                  <p>For an educational provider, such as a private school or microschool (like Texas Sports Academy - TSA), to receive ESA funds, it must be accredited. This accreditation must come from an entity recognized by either:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>The <strong>Texas Private School Accreditation Commission (TPAC)</strong>. It's important to note that TPAC itself doesn't directly accredit schools; rather, it recognizes various accrediting associations (e.g., Texas Alliance of Accredited Private Schools - TAAPS) that perform the accreditation.</li>
                    <li>The <strong>Texas Education Agency (TEA)</strong>.</li>
                  </ul>
                  <p>Additionally, to be eligible, private schools must have been in operation for at least two years and administer annual standardized testing to their students.</p>
                </section>
                
                <section id="funding-allocation" className="mb-12 scroll-mt-28">
                  <h2 className="text-3xl font-bold mb-4">The ESA Payment Journey</h2>
                  <h3 className="text-2xl font-semibold mb-3">How ESA Funds are Allocated and Disbursed</h3>
                  <p>The SB2 program has mechanisms to prioritize certain student groups if applications exceed available funding. Generally, 80% of ESA slots are reserved for students from lower-income backgrounds or students with disabilities. The remaining slots are typically awarded via a lottery system.</p>
                  <p>The overall flow of funds from the state to providers involves several steps:</p>
                  <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li><strong>State to Program Fund:</strong> The Texas Comptroller deposits the appropriated ESA funds (e.g., the $1 billion for the initial program) into a designated Program Fund.</li>
                    <li><strong>Program Fund to EAOs:</strong> Funds are then disbursed from the Program Fund to the certified Educational Assistance Organizations (EAOs). This typically happens in installments. For example, a schedule might be:
                        <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li>25% on July 1st (e.g., 2026)</li>
                            <li>50% on October 1st (e.g., 2026)</li>
                            <li>25% on April 1st of the following year (e.g., 2027)</li>
                        </ul>
                    </li>
                    <li><strong>EAOs to Providers:</strong> EAOs then make payments from these funds to approved educational providers on behalf of the participating students.</li>
                  </ol>
                </section>

                <section id="parent-application" className="mb-12 scroll-mt-28">
                  <h3 className="text-2xl font-semibold mb-3">The Parent Application Process</h3>
                  <p>Parents wishing to use an ESA for their child's education will need to:</p>
                  <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li><strong>Apply to an EAO:</strong> Submit an application, likely through a portal managed by a certified EAO.</li>
                    <li><strong>Provide Documentation:</strong> This will typically include proof of their child's Texas residency (e.g., utility bill, lease agreement) and potentially the child's recent test scores or academic records.</li>
                    <li><strong>Receive Approval:</strong> Once the EAO verifies eligibility, the parent will receive notification of approval and the amount of ESA funds their child is eligible for.</li>
                  </ol>
                </section>
                
                <section id="how-providers-get-paid" className="mb-12 scroll-mt-28">
                  <h3 className="text-2xl font-semibold mb-3">How Schools & Providers (like TSA) Get Paid</h3>
                  <p>The process for an accredited provider like Texas Sports Academy (TSA) to receive ESA payments involves several steps after a parent decides to enroll their child:</p>
                  <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li><strong>Student Enrollment:</strong> The parent informs TSA of their intent to enroll and use ESA funds.</li>
                    <li><strong>TSA Generates Invoice:</strong> TSA creates an invoice for the services rendered (e.g., tuition for a microschool program). This invoice must include key details like the student's name, the specific service, and the amount owed. This invoice is from the accredited provider (TSA).</li>
                    <li><strong>Parent Authorizes Payment:</strong> The parent, likely through their EAO portal, uses this invoice to formally request the EAO to use their child's ESA balance to pay TSA. This acts as parental authorization.</li>
                    <li><strong>EAO Verification:</strong> The EAO then verifies several critical points:
                        <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li>Is TSA on the Comptroller's pre-approved list of education service providers?</li>
                            <li>Does the invoiced service (e.g., tuition) fall under an ESA-eligible expense category?</li>
                            <li>Does the student's ESA account have sufficient balance to cover the invoiced amount?</li>
                        </ul>
                    </li>
                    <li><strong>Payment to TSA:</strong> Within 10 business days of successful verification, the EAO sends the payment directly to TSA's bank account.</li>
                    <li><strong>TSA Pays Coaches/Leaders:</strong> TSA then uses this revenue to compensate its coaches or program leaders.</li>
                  </ol>
                </section>

                <section id="parent-payment-authorization" className="mb-12 scroll-mt-28">
                  <h3 className="text-2xl font-semibold mb-3">Parent Authorization for Payments</h3>
                  <p>A key aspect of the payment process is dual authorization. It's not enough for a school to simply send an invoice. The process requires both:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong>A Provider-Generated Invoice:</strong> The formal bill from the accredited school (e.g., TSA) detailing the services and costs.</li>
                    <li><strong>A Parent Request/Sign-Off:</strong> The parent must explicitly authorize the EAO to use funds from their child's specific ESA to pay that invoice. This ensures parental control over how the ESA funds are spent.</li>
                  </ul>
                </section>

                <section id="provider-requirements" className="mb-12 scroll-mt-28">
                  <h2 className="text-3xl font-bold mb-4">Becoming an ESA-Approved Provider</h2>
                  <h3 className="text-2xl font-semibold mb-3">Steps for Schools and Educational Providers</h3>
                  <p>For an educational institution like TSA to be eligible to receive ESA payments, it must undertake the following steps:</p>
                  <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li><strong>Secure Accreditation:</strong> Obtain accreditation from a TPAC-recognized association (like TAAPS) or a TEA-recognized accreditor. As mentioned, the provider must also typically have been in operation for at least two years and conduct annual standardized testing.</li>
                    <li><strong>Apply for Comptroller Preapproval:</strong> Once accredited, the provider must apply to the Texas Comptroller's office to be included on their list of "preapproved" education service providers. This makes them officially eligible to accept ESA funds.</li>
                  </ol>
                </section>

                <section id="strata-for-parents" className="mb-12 scroll-mt-28">
                  <h2 className="text-3xl font-bold mb-4">How Strata Simplifies the ESA Process</h2>
                  <h3 className="text-2xl font-semibold mb-3">Streamlining for Parents</h3>
                  <p>The Strata platform aims to make the ESA journey smoother for parents by:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong>Guided Applications:</strong> Providing step-by-step workflows to help parents easily gather and submit necessary residency documentation and other application materials to the EAOs.</li>
                    <li><strong>Simplified Payment Authorization:</strong> Making it easy for parents to review provider invoices (e.g., from TSA for a microschool) and authorize EAOs to use their ESA funds for these eligible academic services, directly from their Strata dashboard.</li>
                  </ul>
                </section>

                <section id="strata-for-coaches-academies" className="mb-12 scroll-mt-28">
                  <h3 className="text-2xl font-semibold mb-3">Supporting Coaches & Academies</h3>
                  <p>For coaches and academies like TSA, Strata helps by:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong>Automated Invoicing:</strong> Enabling TSA or similar providers to easily generate compliant invoices that meet EAO requirements, including student details, services rendered, and amounts owed.</li>
                    <li><strong>Tracking and Visibility:</strong> Providing dashboards for real-time visibility into ESA balances (where permissible by EAO data sharing), pending authorizations, and payment timelines.</li>
                  </ul>
                </section>

                <section id="strata-payment-solutions" className="mb-12 scroll-mt-28">
                  <h3 className="text-2xl font-semibold mb-3">Addressing Payment Timing for Coaches</h3>
                  <p>A challenge with EAO payments is that they often arrive post-term (i.e., after services have been rendered for a period). This can create cash flow issues for paying coaches upfront or regularly. Strata, in conjunction with academies like TSA, can explore solutions:</p>
                  <p><strong>Potential Model:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>TSA could treat its coaches as contractors or employees on regular pay schedules, ensuring they receive consistent payments based on student enrollment and services delivered.</li>
                    <li>When the EAO disbursements are eventually made to TSA's bank account, these funds replenish TSA's operational budget used for these advance coach payments.</li>
                    <li>For any non-ESA related tuition or fees (e.g., supplementary sports training), coaches or TSA can offer flexible payment options like upfront payment or installments, managed through the Strata platform.</li>
                  </ul>
                </section>
              </article>
            </div>
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