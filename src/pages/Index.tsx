import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import StorySection from '@/components/StorySection';
import SectionDots from '@/components/SectionDots';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StreamingText from '@/components/StreamingText';
import TweetEmbed from '@/components/TweetEmbed';
import VideoPlayer from '@/components/VideoPlayer';
import MapEmbed from '@/components/MapEmbed';
import { motion } from 'framer-motion';
import FloatingVideoPlayer from '@/components/FloatingVideoPlayer';

const Index = () => {
  const sections = ['intro', 'opportunity', 'legacy', 'income', 'academics', 'athletes', 'partner', 'start'];
  const [currentSection, setCurrentSection] = useState(getInitialSection());
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const wheelEventRef = useRef<((e: WheelEvent) => void) | null>(null);
  const lastWheelEventTimeRef = useRef(0);

  function getInitialSection() {
    const hash = window.location.hash.replace('#', '');
    return sections.includes(hash) ? hash : 'intro';
  }

  const navigateToSection = (section: string) => {
    if (isScrollLocked || section === currentSection) return;
    
    setIsScrollLocked(true);
    
    // Cancel any ongoing scroll animations
    window.scrollTo({ top: window.scrollY });
    
    window.location.hash = section;
    setCurrentSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
      setIsScrollLocked(false);
    }, 800);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (sections.includes(hash) && !isScrollLocked) {
        setCurrentSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    if (!window.location.hash) {
      window.location.hash = currentSection;
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentSection, isScrollLocked]);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      // Prevent default scrolling behavior
      e.preventDefault();
      
      // If scrolling is locked, ignore wheel events completely
      if (isScrollLocked) return;

      // Simple debounce: only allow wheel events every 800ms
      const currentTime = Date.now();
      if (currentTime - lastWheelEventTimeRef.current < 800) return;
      
      // Only trigger section change if scroll intensity is moderate (> 50) or it's been a while since last scroll
      const scrollIntensity = Math.abs(e.deltaY);
      const timeSinceLastScroll = currentTime - lastWheelEventTimeRef.current;
      
      if (scrollIntensity < 50 && timeSinceLastScroll < 1500) return;
      
      lastWheelEventTimeRef.current = currentTime;

      const currentIndex = sections.indexOf(currentSection);
      
      // Determine scroll direction and navigate accordingly
      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        navigateToSection(sections[currentIndex + 1]);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        navigateToSection(sections[currentIndex - 1]);
      }
    };

    // Store the handler reference so we can remove it properly
    wheelEventRef.current = handleScroll;
    
    // Add the wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', wheelEventRef.current, { passive: false });
    
    return () => {
      // Remove the event listener using the stored reference
      if (wheelEventRef.current) {
        window.removeEventListener('wheel', wheelEventRef.current);
      }
    };
  }, [currentSection, isScrollLocked]);

  const handleDotClick = (section: string) => {
    navigateToSection(section);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Navigation />
      <SectionDots 
        sections={sections}
        currentSection={currentSection}
        onDotClick={handleDotClick}
      />
      
      <FloatingVideoPlayer
        src="/videos/2-hour-learning-video.mp4"
        isVisible={isVideoVisible}
        onClose={() => setIsVideoVisible(false)}
      />
      
      <main className="snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth">
        <StorySection 
          id="intro" 
          withGraphic 
          customGraphic={
            <TweetEmbed 
              tweetId="1912767715460403481"
              className="w-full max-w-lg transform scale-90"
            />
          }
        >
          <div className="max-w-2xl">
            <StreamingText tag="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" index={0}>
              Texas sports education has completely changed.
            </StreamingText>
            <StreamingText 
              className="text-xl text-gray-400 max-w-2xl mb-8" 
              delay={0.5} 
              index={1}
            >
              {`On April 16th, Texas education completely changed with ESA legislation. It allows every accredited private school or microschool to get $10,000 from the Texas government when a parent enrolls their child in the school.

But you're a coach... why does this matter for you?`}
            </StreamingText>
          </div>
        </StorySection>

        <StorySection id="opportunity" withGraphic customGraphic={
          <div className="flex flex-col items-center gap-4">
            <motion.img
              src="/images/capitol.png"
              alt="Financial opportunity illustration"
              className="w-full max-w-lg rounded-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6 }}
            />
          </div>
        }>
          <div className="max-w-2xl">
            <StreamingText tag="h2" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" index={0}>
              Now, there's a golden opportunity for sports coaches.
            </StreamingText>
            <StreamingText className="text-xl text-gray-400 mb-6" delay={0.5} index={1}>
              {`This is a unique point in time. Coaches can start their own microschools and double their income. This is only now possible because:

1. The new ESA legislation enables coaches to be paid at least $10,000 in revenue for each student enrolled at their school. Microschools have 15-25 students.

2. In 2025, we have the technology to handle all academics and logistics for running a school (more on this later).

But why should you care?`}
            </StreamingText>
          </div>
        </StorySection>

        <StorySection id="legacy" withGraphic customGraphic={
          <div className="flex flex-col items-center gap-4">
            <motion.img
              src="/images/coach.jpg"
              alt="Coach mentoring athletes"
              className="w-full max-w-lg rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 3 }}
            />
          </div>
        }>
          <div className="max-w-2xl">
            <StreamingText tag="h2" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" index={0}>
              Shape the next generation and build your legacy.
            </StreamingText>
            <StreamingText className="text-xl text-gray-400 mb-8" index={1}>
              {`This is a golden opportunity for top sports coaches expand their impact and blaze their own trail.

You will get to own your own school, do what you love (coach kids in your sport), make an impact, and cement your brand in sports.

But you might be busy and already have a job...`}
            </StreamingText>
          </div>
        </StorySection>

        <StorySection id="income" withGraphic customGraphic={
          <div className="flex flex-col items-center gap-4">
            <motion.img
              src="/images/timeline.png"
              alt="Daily schedule timeline"
              className="w-full max-w-lg rounded-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6 }}
            />
          </div>
        }>
          <div className="max-w-2xl">
            <StreamingText tag="h2" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" index={0}>
              Double your income while making a difference.
            </StreamingText>
            <StreamingText className="text-xl text-gray-400 mb-8" index={1}>
              {`You will earn thousands of dollars for every student at your sports-microschool. Your school will have 15-25 students. Factoring in real estate and other expenses, that's at least six figures of additional net income. Again, the new Texas bill is why coaches can now get paid so much.

And that afterschool coaching job you already have? You can keep it. Your microschool will operate from 9am- 3pm M-F, so you can continue coaching afterschool and on weekends.

Who teaches the academics at your school?`}
            </StreamingText>
          </div>
        </StorySection>

        <StorySection id="academics" withGraphic customGraphic={
          <div className="flex flex-col items-center gap-4">
            <motion.h3 
              className="text-2xl font-semibold text-white text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6 }}
            >
              Why This Learning Software Works
            </motion.h3>
            <VideoPlayer 
              src="/videos/2-hour-learning-video.mp4" 
              className="w-full max-w-lg"
            />
          </div>
        }>
          <div className="max-w-2xl">
            <StreamingText tag="h2" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" index={0}>
              You'll lead the coaching, tech handles everything else.
            </StreamingText>
            <StreamingText className="text-xl text-gray-400 mb-8" index={1}>
              {`The education paradigm has changed. The best way to learn is no longer in a classroom, but through learning software that's 100% personalized.

The best case study of personalized learning is Alpha School, an Austin-based high school. Students that use their software achieve Top 1% academic outcomes.

We have partnered with Alpha School so that coaches can use this learning software in their schools.`}
            </StreamingText>
            <Button 
              variant="default" 
              className="bg-white text-secondary hover:bg-gray-100"
              onClick={() => window.open('https://2hourlearning.com', '_blank')}
            >
              2 Hour Learning Info
            </Button>
          </div>
        </StorySection>

        <StorySection id="athletes" withGraphic customGraphic={
          <div className="flex flex-col items-center gap-4">
            <motion.h3 
              className="text-2xl font-semibold text-white text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6 }}
            >
              How Our Student Athletes Excel
            </motion.h3>
            <VideoPlayer 
              src="/videos/athletes.mov" 
              className="w-full max-w-lg"
            />
          </div>
        }>
          <div className="max-w-2xl">
            <StreamingText tag="h2" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" index={0}>
              You'll create top athletes and students.
            </StreamingText>
            <StreamingText className="text-xl text-gray-400 mb-8" index={1}>
              {`With personalized learning software doing the teaching, the role of the "teacher" has shifted to that of a motivator. The best teachers don't need to be curriculum experts, they just need to be master motivators — something coaches absolutely excel at.

The structure of a day at your school will be along the lines of:

• Morning: Academics, led by our personalized learning software
• Afternoon: Sports & Life Skills Workshops, led by you

Ok... but running a school sounds complicated. How would that work?`}
            </StreamingText>
          </div>
        </StorySection>

        <StorySection id="partner" withGraphic customGraphic={
          <div className="flex flex-col items-center gap-4">
            <motion.img
              src="/images/trophy.png"
              alt="Trophy representing success"
              className="w-full max-w-md rounded-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6 }}
            />
          </div>
        }>
          <div className="max-w-2xl">
            <StreamingText tag="h2" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" index={0}>
              We will partner with you to make this a home-run.
            </StreamingText>
            <StreamingText className="text-xl text-gray-400 mb-8" index={1}>
              {`The Strata platform makes it extremely easy for coaches to spin up sports-focused microschools.
\nWe're a team of AI engineers, so automating away tedious, outdated practices is our top skillset. From finding real estate, filing paperwork, to securing students — the Strata team handles that all.`}
            </StreamingText>
          </div>
        </StorySection>

        <StorySection id="start" withGraphic customGraphic={
          <MapEmbed 
            className="w-full max-w-lg" 
            location={{
              lat: 30.2672,
              lng: -97.7431,
              address: "Austin, TX"
            }}
          />
        }>
          <div className="max-w-2xl">
            <StreamingText tag="h2" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" index={0}>
              We have a campus. Time to start your school and form your legacy.
            </StreamingText>
            <StreamingText className="text-xl text-gray-400 mb-8" index={1}>
              {`We have a school location secured in Carrollton (45 minutes north of Dallas). You can use that location or one of our others.

We're inviting the best coaches/athletes in Texas to partner on this. Drop your email to learn more.`}
            </StreamingText>
            <div className="flex flex-col gap-4">
              <form 
                action="https://hooks.zapier.com/hooks/catch/22692611/2pdyolt/"
                method="POST"
                className="flex flex-col sm:flex-row gap-2 w-full max-w-md"
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
                  formData.append('source', 'landing_page');
                  formData.append('timestamp', new Date().toISOString());
                  
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
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary/80 text-white placeholder:text-gray-400 border-gray-700 focus-visible:ring-white/20"
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit"
                  variant="default" 
                  className="bg-white text-secondary hover:bg-gray-100 whitespace-nowrap"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Learn More'}
                </Button>
              </form>
              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm">Thanks! We'll be in touch soon.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
              )}
            </div>
          </div>
        </StorySection>
      </main>
    </div>
  );
};

export default Index;