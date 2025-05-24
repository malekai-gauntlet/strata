import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import StandardNavigation from '@/components/StandardNavigation';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Users, Trophy, GraduationCap, Star, CheckCircle, DollarSign, AlertCircle, Calendar, UserPlus } from 'lucide-react';

const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => {
  return (
    <section className={`py-16 md:py-24 ${className}`} id={id}>
      {children}
    </section>
  );
};

// School data - this would eventually come from a database or API
const schoolData: { [key: string]: any } = {
  'lake-travis': {
    name: 'Texas Sports Academy Lake Travis',
    subtitle: 'Flagship Campus',
    location: 'Lake Travis, TX',
    gradeLevel: '(6-8)',
    address: '4402 Hudson Bend Rd, Austin, TX 78734',
    phone: '(512) 555-0123',
    email: 'laketravis@texassportsacademy.com',
    heroImage: '/images/TSA Door.jpg',
    status: 'Open',
    statusColor: 'bg-green-600',
    tagline: 'Where Champions Are Made',
    description: 'Our flagship campus combines elite athletic training with accelerated academics, providing student-athletes the perfect environment to excel both on and off the field.',
    
    mission: 'To develop well-rounded student-athletes who excel academically, athletically, and as leaders in their communities through innovative education and elite coaching.',
    vision: 'To be the premier destination for student-athletes seeking to maximize their potential and prepare for success at the high school, collegiate, and professional levels.',
    
    programs: [
      { name: 'Basketball', ages: '6th-8th Grade', description: 'Comprehensive basketball training with skill development and competitive play.' },
      { name: 'Soccer', ages: '6th-8th Grade', description: 'Technical skills, tactical awareness, and physical conditioning.' },
      { name: 'Baseball', ages: '6th-8th Grade', description: 'Fundamental skills, hitting mechanics, and game strategy.' },
      { name: 'Flag Football', ages: '6th-8th Grade', description: 'Strategy, teamwork, and athletic development.' }
    ],
    
    facilities: [
      'State-of-the-art gymnasium',
      'Professional basketball courts',
      'Soccer training fields',
      'Baseball diamond and batting cages',
      'Modern academic classrooms',
      'Strength and conditioning room'
    ],
    
    coaches: [
      {
        name: 'Coach Smith',
        title: 'Head Basketball Coach',
        credentials: '15+ years professional coaching experience',
        image: '/images/coach-placeholder.jpg'
      },
      {
        name: 'Coach Johnson',
        title: 'Soccer Director',
        credentials: 'Former collegiate player, UEFA certified',
        image: '/images/coach-placeholder.jpg'
      }
    ],
    
    schedule: {
      academics: '8:00 AM - 10:00 AM',
      athletics: '10:30 AM - 3:30 PM',
      extracurriculars: '3:30 PM - 4:30 PM'
    },

    testimonials: [
      {
        name: 'Sarah Johnson',
        role: 'Parent',
        content: 'My son has grown tremendously both academically and athletically. The coaches truly care about developing the whole child.',
        rating: 5
      },
      {
        name: 'Mike Rodriguez',
        role: 'Student-Athlete',
        content: 'The 2-hour academic program allowed me to focus more time on basketball while still excelling in school. I\'m now playing at the high school varsity level.',
        rating: 5
      },
      {
        name: 'Jennifer Chen',
        role: 'Parent',
        content: 'The character development and life skills program has made such a difference in my daughter\'s confidence and leadership abilities.',
        rating: 5
      }
    ],

    pricing: {
      annual: '$15,000',
      monthly: '$1,500',
      includes: [
        'Full academic curriculum',
        'Daily athletic training',
        'Life skills development',
        'All equipment and materials',
        'Nutritious daily lunch',
        'After-school care until 4:30 PM'
      ],
      paymentPlans: [
        'Full payment discount available',
        'Monthly payment plans',
        'Sibling discounts',
        'Need-based financial aid'
      ]
    },

    applicationProcess: [
      {
        step: 1,
        title: 'Submit Application',
        description: 'Complete our online application form with student and family information.'
      },
      {
        step: 2,
        title: 'Campus Visit',
        description: 'Schedule a tour to meet our coaches and see our facilities firsthand.'
      },
      {
        step: 3,
        title: 'Athletic Assessment',
        description: 'Students participate in sport-specific skills evaluation with our coaching staff.'
      },
      {
        step: 4,
        title: 'Academic Review',
        description: 'We review transcripts and conduct a brief academic assessment.'
      },
      {
        step: 5,
        title: 'Enrollment Decision',
        description: 'Receive admission decision and begin enrollment process.'
      }
    ],

    faq: [
      {
        question: 'What makes the 2-hour academic program effective?',
        answer: 'Our accelerated learning approach focuses on personalized instruction, proven curricula, and eliminates time wasted on busy work. Students achieve more in 2 focused hours than traditional 6-hour school days.'
      },
      {
        question: 'What if my child has never played competitive sports?',
        answer: 'We welcome students of all skill levels! Our coaches are experts at developing fundamentals and building confidence in beginner athletes while challenging advanced players.'
      },
      {
        question: 'How do you handle different grade levels in sports?',
        answer: 'We group students by skill level and physical development rather than just age, ensuring appropriate competition and safety for all participants.'
      },
      {
        question: 'What academic standards do you follow?',
        answer: 'We follow Texas state academic standards and our curriculum is designed to prepare students for high school success and beyond.'
      },
      {
        question: 'Do you provide transportation?',
        answer: 'Currently, parents are responsible for drop-off and pickup. We are exploring transportation options for the future.'
      }
    ]
  },
  
  'round-rock': {
    name: 'Texas Sports Academy Round Rock',
    subtitle: '',
    location: 'Round Rock, TX',
    gradeLevel: '(6-8)',
    address: 'Round Rock, TX (Address TBD)',
    phone: '(512) 555-0124',
    email: 'roundrock@texassportsacademy.com',
    heroImage: '/images/roundrock.jpg',
    status: 'Coming Soon',
    statusColor: 'bg-blue-600',
    tagline: 'Opening Fall 2025',
    description: 'Bringing our proven model of academic and athletic excellence to the Round Rock community. Applications opening soon for Fall 2025.',
    
    mission: 'To bring the same innovative educational and athletic excellence that has made our flagship campus successful to the Round Rock community, developing future leaders both on and off the field.',
    vision: 'To establish Round Rock as a hub for student-athlete development, creating pathways to academic and athletic success for families in Central Texas.',
    
    programs: [
      { name: 'Basketball', ages: '6th-8th Grade', description: 'Elite basketball training with professional coaching.' },
      { name: 'Soccer', ages: '6th-8th Grade', description: 'Comprehensive soccer development program.' },
      { name: 'Baseball', ages: '6th-8th Grade', description: 'Advanced baseball skills and strategy training.' },
      { name: 'Flag Football', ages: '6th-8th Grade', description: 'Strategic gameplay and athletic development.' }
    ],
    
    facilities: [
      'Modern gymnasium (planned)',
      'Multi-sport athletic courts',
      'Outdoor training fields',
      'Technology-enabled classrooms',
      'Fitness and training areas'
    ],
    
    coaches: [
      {
        name: 'Coaching Staff',
        title: 'Coming Soon',
        credentials: 'Professional coaching team being assembled',
        image: '/images/coach-placeholder.jpg'
      }
    ],
    
    schedule: {
      academics: '8:00 AM - 10:00 AM',
      athletics: '10:30 AM - 3:30 PM',
      extracurriculars: '3:30 PM - 4:30 PM'
    },

    testimonials: [
      {
        name: 'Community Member',
        role: 'Round Rock Resident',
        content: 'We\'re so excited to have this innovative program coming to our community. The Lake Travis results speak for themselves.',
        rating: 5
      },
      {
        name: 'Future Parent',
        role: 'Interested Family',
        content: 'We\'ve been waiting for a program like this in Round Rock. Can\'t wait for the 2025 opening!',
        rating: 5
      }
    ],

    pricing: {
      annual: '$15,000',
      monthly: '$1,500',
      includes: [
        'Full academic curriculum',
        'Daily athletic training',
        'Life skills development',
        'All equipment and materials',
        'Nutritious daily lunch',
        'After-school care until 4:30 PM'
      ],
      paymentPlans: [
        'Early bird enrollment discounts',
        'Monthly payment plans',
        'Sibling discounts',
        'Need-based financial aid'
      ]
    },

    applicationProcess: [
      {
        step: 1,
        title: 'Join Interest List',
        description: 'Sign up to be notified when applications open for Fall 2025.'
      },
      {
        step: 2,
        title: 'Information Sessions',
        description: 'Attend virtual or in-person information sessions throughout 2024.'
      },
      {
        step: 3,
        title: 'Priority Application',
        description: 'Interest list members get priority access to applications when they open.'
      },
      {
        step: 4,
        title: 'Campus Preview',
        description: 'Visit our facility and meet the coaching staff once finalized.'
      },
      {
        step: 5,
        title: 'Enrollment Confirmation',
        description: 'Secure your spot for our inaugural year in Round Rock.'
      }
    ],

    faq: [
      {
        question: 'When will applications open?',
        answer: 'Applications for Fall 2025 will open in Spring 2024. Join our interest list to be notified first.'
      },
      {
        question: 'Will the program be exactly the same as Lake Travis?',
        answer: 'Yes! We\'re bringing the same proven curriculum, coaching standards, and educational model to Round Rock.'
      },
      {
        question: 'How many students will you accept in the first year?',
        answer: 'We plan to start with 60-80 students across grades 6-8, allowing for personalized attention as we establish the program.'
      },
      {
        question: 'What if I want to transfer from another school mid-year?',
        answer: 'We\'ll consider mid-year transfers on a case-by-case basis, though we recommend starting at the beginning of the academic year.'
      }
    ]
  },
  
  'carrollton': {
    name: 'Texas Sports Academy Carrollton',
    subtitle: '',
    location: 'Carrollton, TX',
    gradeLevel: '(6-8)',
    address: 'Carrollton, TX (Address TBD)',
    phone: '(972) 555-0125',
    email: 'carrollton@texassportsacademy.com',
    heroImage: '/images/Carrollton2.png',
    status: 'Coming Soon',
    statusColor: 'bg-blue-600',
    tagline: 'Campus Planning in Progress',
    description: 'Expanding our network to serve the Carrollton and North Dallas communities. Campus planning and development currently underway.',
    
    mission: 'To serve the Carrollton and North Dallas communities by providing exceptional academic and athletic development opportunities that prepare student-athletes for lifelong success.',
    vision: 'To become the cornerstone of student-athlete development in North Dallas, fostering excellence, character, and community leadership for generations to come.',
    
    programs: [
      { name: 'Basketball', ages: '6th-8th Grade', description: 'Professional basketball training and development.' },
      { name: 'Soccer', ages: '6th-8th Grade', description: 'Complete soccer program with skill development.' },
      { name: 'Baseball', ages: '6th-8th Grade', description: 'Baseball fundamentals and advanced training.' },
      { name: 'Flag Football', ages: '6th-8th Grade', description: 'Team strategy and athletic conditioning.' }
    ],
    
    facilities: [
      'Athletic gymnasium (planned)',
      'Indoor training facilities',
      'Outdoor sports fields',
      'Modern learning spaces',
      'Student recreation areas'
    ],
    
    coaches: [
      {
        name: 'Coaching Staff',
        title: 'Coming Soon',
        credentials: 'Elite coaching team in recruitment phase',
        image: '/images/coach-placeholder.jpg'
      }
    ],
    
    schedule: {
      academics: '8:00 AM - 10:00 AM',
      athletics: '10:30 AM - 3:30 PM',
      extracurriculars: '3:30 PM - 4:30 PM'
    },

    testimonials: [
      {
        name: 'Dallas Area Parent',
        role: 'Prospective Family',
        content: 'We\'ve been following the success at Lake Travis. North Dallas needs this type of innovative program for our student-athletes.',
        rating: 5
      }
    ],

    pricing: {
      annual: '$15,000',
      monthly: '$1,500',
      includes: [
        'Full academic curriculum',
        'Daily athletic training',
        'Life skills development',
        'All equipment and materials',
        'Nutritious daily lunch',
        'After-school care until 4:30 PM'
      ],
      paymentPlans: [
        'Founding family discounts',
        'Monthly payment plans',
        'Sibling discounts',
        'Need-based financial aid'
      ]
    },

    applicationProcess: [
      {
        step: 1,
        title: 'Express Interest',
        description: 'Join our priority list to receive updates on campus development and opening timeline.'
      },
      {
        step: 2,
        title: 'Community Input',
        description: 'Participate in community meetings to help shape our Carrollton campus.'
      },
      {
        step: 3,
        title: 'Stay Connected',
        description: 'Receive regular updates on construction progress and staff hiring.'
      },
      {
        step: 4,
        title: 'Preview Events',
        description: 'Attend exclusive preview events once our facility is ready.'
      },
      {
        step: 5,
        title: 'Priority Enrollment',
        description: 'Early interest families receive priority consideration for enrollment.'
      }
    ],

    faq: [
      {
        question: 'When will the Carrollton campus open?',
        answer: 'We\'re currently in the planning and site selection phase. Opening timeline will be announced once we finalize our location and facility plans.'
      },
      {
        question: 'How can I stay informed about progress?',
        answer: 'Join our interest list and follow our social media for regular updates on development milestones.'
      },
      {
        question: 'Will you offer the same sports as other campuses?',
        answer: 'Yes, we plan to offer the same core sports programs with potential for additional offerings based on community interest.'
      },
      {
        question: 'Can I provide input on the facility design?',
        answer: 'Absolutely! We value community input and will hold planning sessions where families can share their thoughts and suggestions.'
      }
    ]
  }
};

export default function School() {
  const { slug } = useParams<{ slug: string }>();
  const school = slug ? schoolData[slug] : null;

  // If school not found, show 404-like message
  if (!school) {
    return (
      <div className="w-full font-poppins">
        <StandardNavigation />
        <div className="container mx-auto px-8 py-24 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">School Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The school you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/location">View All Locations</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isOpen = school.status === 'Open';
  const isComingSoon = school.status === 'Coming Soon';

  return (
    <div className="w-full font-poppins">
      <StandardNavigation />

      {/* Status Banner */}
      {isComingSoon && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4"
        >
          <div className="container mx-auto px-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="w-6 h-6" />
              <span className="text-lg font-semibold">
                🚀 Opening {school.location === 'Round Rock, TX' ? 'Fall 2025' : 'Soon'} - Join Our Founding Community!
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4"
        >
          <div className="container mx-auto px-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-semibold">
                ✨ Now Enrolling - Schedule Your Visit Today!
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className={`relative h-[80vh] ${isComingSoon ? 'bg-gradient-to-br from-indigo-600 to-blue-700' : 'bg-gradient-to-br from-[#004aad] to-[#003a8c]'} overflow-hidden`}>
        <div className="absolute inset-0">
          <img
            src={school.heroImage}
            alt={school.name}
            className={`w-full h-full object-cover ${isComingSoon ? 'opacity-30' : 'opacity-40'}`}
          />
        </div>
        <div className="relative z-10 container mx-auto px-8 h-full flex flex-col justify-center items-center text-center">
          <div className={`inline-block px-6 py-3 rounded-full text-lg font-bold text-white mb-6 ${school.statusColor} shadow-lg`}>
            {isOpen && <CheckCircle className="w-5 h-5 inline mr-2" />}
            {isComingSoon && <Calendar className="w-5 h-5 inline mr-2" />}
            {school.status}
          </div>
          <h1 className="text-4xl md:text-6xl font-integral tracking-tight text-white mb-4 leading-[0.9] max-w-5xl">
            {school.name}
          </h1>
          {school.subtitle && (
            <p className="text-xl md:text-2xl text-white/90 mb-4">{school.subtitle}</p>
          )}
          <p className="text-lg md:text-xl text-white/80 mb-2">{school.gradeLevel}</p>
          <p className="text-xl md:text-2xl text-white font-semibold mb-8">{school.tagline}</p>
          
          {/* Status-specific CTAs */}
          {isOpen && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-[#004aad] font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                Apply Now
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-[#004aad] transition-all duration-300"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Schedule Visit
              </Button>
            </div>
          )}

          {isComingSoon && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Join Our Team
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 flex items-center gap-2"
              >
                <Star className="w-5 h-5" />
                Get Priority Access
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <Section id="about" className={isComingSoon ? "bg-gray-50" : "bg-white"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-integral tracking-tight text-gray-900 mb-8 leading-[0.9]">
              {isComingSoon ? 'About Our Upcoming Campus' : 'About Our Campus'}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              {school.description}
            </p>
            
            {/* Coming Soon Campus - Add development progress */}
            {isComingSoon && (
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Campus Development Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-gray-900">Site Selected</h4>
                    <p className="text-gray-600 text-sm">Location secured</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-gray-900">
                      {school.location === 'Round Rock, TX' ? 'Facility Planning' : 'Planning Phase'}
                    </h4>
                    <p className="text-gray-600 text-sm">In progress</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-gray-900">Team Building</h4>
                    <p className="text-gray-600 text-sm">Recruiting coaches</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <GraduationCap className={`w-12 h-12 ${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} mx-auto mb-4`} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">2-Hour Academics</h3>
                <p className="text-gray-600">Accelerated learning with personalized attention</p>
              </div>
              
              <div className="text-center p-6">
                <Trophy className={`w-12 h-12 ${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} mx-auto mb-4`} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Elite Athletics</h3>
                <p className="text-gray-600">Professional coaching and skill development</p>
              </div>
              
              <div className="text-center p-6">
                <Users className={`w-12 h-12 ${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} mx-auto mb-4`} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Life Skills</h3>
                <p className="text-gray-600">Character building and leadership development</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Mission & Vision Section */}
      <Section className={isComingSoon ? "bg-gradient-to-br from-indigo-600 to-blue-700" : "bg-[#004aad]"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-integral tracking-tight text-white mb-6 leading-[0.9]">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Guided by purpose and driven by excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  {school.mission}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  {school.vision}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Testimonials Section - Different content based on status */}
      <Section className={isComingSoon ? "bg-white" : "bg-gray-50"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-integral tracking-tight text-gray-900 mb-6 leading-[0.9]">
              {isComingSoon ? 'Community Excitement' : 'What Families Say'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isComingSoon 
                ? 'Hear from families excited about our upcoming campus opening.' 
                : 'Hear from our families about their experiences at our academy.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {school.testimonials.map((testimonial: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                  <p className={`${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} font-semibold`}>{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Programs Section */}
      <Section className={isComingSoon ? "bg-gray-50" : "bg-gray-50"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-integral tracking-tight text-gray-900 mb-6 leading-[0.9]">
              {isComingSoon ? 'Planned Programs' : 'Programs Offered'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive athletic programs designed to develop skills, character, and competitive excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {school.programs.map((program: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.name}</h3>
                <p className={`${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} font-semibold mb-4`}>{program.ages}</p>
                <p className="text-gray-600">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Facilities Section */}
      <Section className={isComingSoon ? "bg-white" : "bg-white"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-integral tracking-tight text-gray-900 mb-6 leading-[0.9]">
              {isComingSoon ? 'Planned Facilities' : 'World-Class Facilities'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isComingSoon 
                ? 'State-of-the-art facilities being designed to maximize athletic performance and academic success.'
                : 'State-of-the-art facilities designed to maximize athletic performance and academic success.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {school.facilities.map((facility: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className={`w-12 h-12 ${isComingSoon ? 'bg-indigo-600' : 'bg-[#004aad]'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-900 font-semibold">{facility}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Coaching Staff Section */}
      <Section className={isComingSoon ? "bg-gray-50" : "bg-gray-50"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-integral tracking-tight text-gray-900 mb-6 leading-[0.9]">
              {isComingSoon ? 'Join Our Coaching Team' : 'Expert Coaching Staff'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isComingSoon 
                ? 'We\'re building an exceptional coaching team. Join us in developing the next generation of student-athletes.'
                : 'Learn from experienced professionals who are dedicated to developing both athletic skills and character.'
              }
            </p>
          </motion.div>

          {/* Coming Soon - Add coach application CTA */}
          {isComingSoon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-2xl p-8 mb-12 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Calling Elite Coaches!</h3>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Are you passionate about developing young athletes? Join our founding coaching team and help shape the future of youth sports education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-all duration-300">
                  Apply to Coach
                </Button>
                <Button 
                  variant="outline"
                  className="border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {school.coaches.map((coach: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <Users className="w-16 h-16 text-gray-400" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{coach.name}</h3>
                  <p className={`${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} font-semibold mb-3`}>{coach.title}</p>
                  <p className="text-gray-600">{coach.credentials}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Schedule & Contact Section */}
      <Section className={isComingSoon ? "bg-white" : "bg-white"}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-integral tracking-tight text-gray-900 mb-8 leading-[0.9]">
                {isComingSoon ? 'Planned Daily Schedule' : 'Daily Schedule'}
              </h2>
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <Clock className={`w-8 h-8 ${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} mr-4`} />
                  <div>
                    <h3 className="font-bold text-gray-900">Academics</h3>
                    <p className="text-gray-600">{school.schedule.academics}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <Trophy className={`w-8 h-8 ${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} mr-4`} />
                  <div>
                    <h3 className="font-bold text-gray-900">Athletics</h3>
                    <p className="text-gray-600">{school.schedule.athletics}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <Users className={`w-8 h-8 ${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} mr-4`} />
                  <div>
                    <h3 className="font-bold text-gray-900">Extracurriculars</h3>
                    <p className="text-gray-600">{school.schedule.extracurriculars}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-integral tracking-tight text-gray-900 mb-8 leading-[0.9]">
                Contact & Location
              </h2>
              <div className="space-y-6">
                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                  <MapPin className={`w-8 h-8 ${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} mr-4 mt-1`} />
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {isComingSoon ? 'Planned Location' : 'Address'}
                    </h3>
                    <p className="text-gray-600">{school.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <Phone className={`w-8 h-8 ${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} mr-4`} />
                  <div>
                    <h3 className="font-bold text-gray-900">Phone</h3>
                    <p className="text-gray-600">{school.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <Mail className={`w-8 h-8 ${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} mr-4`} />
                  <div>
                    <h3 className="font-bold text-gray-900">Email</h3>
                    <p className="text-gray-600">{school.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button className={`w-full ${isComingSoon ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-[#004aad] hover:bg-[#003a8c]'} text-white py-4 rounded-lg font-semibold text-lg`}>
                  {isOpen ? 'Schedule a Visit' : 'Get Updates'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Pricing Section */}
      <Section className={isComingSoon ? "bg-gray-50" : "bg-white"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-integral tracking-tight text-gray-900 mb-6 leading-[0.9]">
              Tuition & Investment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isComingSoon 
                ? 'Invest in your child\'s future with our comprehensive program. Early bird pricing available!'
                : 'Invest in your child\'s academic and athletic future with our comprehensive program.'
              }
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Main Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`${isComingSoon ? 'bg-indigo-600' : 'bg-[#004aad]'} text-white rounded-2xl p-8 shadow-lg`}
              >
                <div className="text-center">
                  <DollarSign className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Annual Tuition</h3>
                  <p className="text-4xl font-bold mb-4">{school.pricing.annual}</p>
                  <p className="text-lg opacity-90">per year</p>
                  {isComingSoon && (
                    <div className="mt-4 bg-white/20 rounded-lg p-3">
                      <p className="text-sm font-semibold">🎉 Founding Family Discount Available</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg"
              >
                <div className="text-center">
                  <DollarSign className={`w-12 h-12 ${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} mx-auto mb-4`} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Option</h3>
                  <p className="text-4xl font-bold text-gray-900 mb-4">{school.pricing.monthly}</p>
                  <p className="text-lg text-gray-600">per month</p>
                  {isComingSoon && (
                    <div className="mt-4 bg-indigo-50 text-indigo-700 rounded-lg p-3">
                      <p className="text-sm font-semibold">Early enrollment pricing locked in</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* What's Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {school.pricing.includes.map((item: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <DollarSign className={`w-6 h-6 ${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} mr-3`} />
                  Payment Options
                </h3>
                <ul className="space-y-3">
                  {school.pricing.paymentPlans.map((plan: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className={`w-5 h-5 ${isComingSoon ? 'text-indigo-600' : 'text-[#004aad]'} mr-3 flex-shrink-0`} />
                      {plan}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* Application Process Section */}
      <Section className={isComingSoon ? "bg-white" : "bg-gray-50"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-integral tracking-tight text-gray-900 mb-6 leading-[0.9]">
              {isComingSoon ? 'Join Our Community' : 'Application Process'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isComingSoon 
                ? 'Simple steps to join our founding community and secure your child\'s spot.'
                : 'Simple steps to join our academy and begin your child\'s journey to excellence.'
              }
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {school.applicationProcess.map((step: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`flex-shrink-0 w-16 h-16 ${isComingSoon ? 'bg-indigo-600' : 'bg-[#004aad]'} text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6`}>
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button className={`${isComingSoon ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-[#004aad] hover:bg-[#003a8c]'} text-white py-4 px-8 rounded-lg font-semibold text-lg`}>
                {isOpen ? 'Start Application' : 'Join Interest List'}
              </Button>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className={isComingSoon ? "bg-gray-50" : "bg-white"}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-integral tracking-tight text-gray-900 mb-6 leading-[0.9]">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isComingSoon 
                ? 'Common questions about our upcoming campus and founding community benefits.'
                : 'Answers to common questions about Texas Sports Academy.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {school.faq.map((question: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{question.question}</h3>
                <p className="text-gray-600">{question.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#004aad] to-[#003a8c] text-white py-16">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
                <li><Link to="/mission" className="hover:text-gray-300">Our Mission</Link></li>
                <li><Link to="/team" className="hover:text-gray-300">Our Team</Link></li>
                <li><Link to="/careers" className="hover:text-gray-300">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/academics" className="hover:text-gray-300">Academics</Link></li>
                <li><Link to="/athletics" className="hover:text-gray-300">Athletics</Link></li>
                <li><Link to="/life-skills" className="hover:text-gray-300">Life Skills</Link></li>
                <li><Link to="/admissions" className="hover:text-gray-300">Admissions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/parents" className="hover:text-gray-300">For Parents</Link></li>
                <li><Link to="/coaches" className="hover:text-gray-300">For Coaches</Link></li>
                <li><Link to="/students" className="hover:text-gray-300">For Students</Link></li>
                <li><Link to="/blog" className="hover:text-gray-300">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/contact" className="hover:text-gray-300">Contact Us</Link></li>
                <li><Link to="/location" className="hover:text-gray-300">Locations</Link></li>
                <li><Link to="/support" className="hover:text-gray-300">Support</Link></li>
                <li><Link to="/faq" className="hover:text-gray-300">FAQ</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-white/80">
              © 2024 Texas Sports Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 