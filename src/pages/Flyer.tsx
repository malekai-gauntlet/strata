import React from 'react';
import { Button } from '@/components/ui/button';

const Flyer = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8 print:p-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-5xl font-bold mb-3">Start Your School<br></br>Leave Your Legacy</h1>
          <p className="text-lg text-gray-600">Are you an ambitious coach that wants to make the greatest possible impact on the next generation and earn a great income? Have you wanted to have your own sports school, but never had the right opportunity? If this sounds like you, read on.</p>
        </div>

        {/* Main Content - Vertical Layout */}
        <div className="space-y-5">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Historic Change in Texas Education</h2>
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <p className="text-base mb-1">• New ESA legislation passed on April 16th, 2024</p>
              <p className="text-base mb-1">• Families receive $10,000 per student from Texas government</p>
            </div>
            <p className="text-gray-600 italic text-xs pl-4 border-l border-gray-300 mt-2">But you're a coach... why does this matter for you?</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">A Golden Opportunity for Coaches</h2>
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <p className="text-base mb-1">• Build your legacy by owning your own sports-focused microschool</p>
              <p className="text-base mb-1">• Or turn your club team into a sports microschool</p>
              <p className="text-base">• Earn $150,000/yr additional income</p>
            </div>
            <p className="text-gray-600 italic text-xs pl-4 border-l border-gray-300 mt-2">This is only possible now because of the new ESA legislation and modern learning technology...</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Double Your Income, Keep Your Coaching Job</h2>
            <div className="border-l-4 border-orange-500 pl-4 py-1">
              <p className="text-base mb-1">• Your school will operate 9am-3pm Monday-Friday</p>
              <p className="text-base mb-1">• Academics in the morning, 3 hours of extra sports training in the afternoon</p>
              <p className="text-base">• Keep your existing afterschool coaching job</p>
            </div>
            <p className="text-gray-600 italic text-xs pl-4 border-l border-gray-300 mt-2">Who teaches the academics at your school?</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Revolutionary Learning Model</h2>
            <div className="border-l-4 border-red-500 pl-4 py-1">
              <p className="text-base mb-1">• We use 2 Hour Learning — the best learning software in the world</p>
              <p className="text-base mb-1">• Guarantees your students achieve top 1% academic outcomes</p>
              <p className="text-base">• Does not require coach expertise in education, simply a passion for motivation</p>
            </div>
            <p className="text-gray-600 italic text-xs pl-4 border-l border-gray-300 mt-2">Your school will create top athletes and students. Ready to start your school and form your legacy?</p>
          </section>

          <section className="mt-4">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="flex w-full">
                <img 
                  src="/images/Carrollton1.png" 
                  alt="Carrollton Campus View 1" 
                  className="w-1/4 h-28 object-cover"
                />
                <img 
                  src="/images/Carrollton2.png" 
                  alt="Carrollton Campus View 2" 
                  className="w-1/4 h-28 object-cover"
                />
                <img 
                  src="/images/Carrollton3.jpg" 
                  alt="Carrollton Campus View 3" 
                  className="w-1/4 h-28 object-cover"
                />
                <img 
                  src="/images/Carrollton4.png" 
                  alt="Carrollton Campus View 4" 
                  className="w-1/4 h-28 object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">Your Campus Awaits</h2>
                <p className="text-base mb-3">We have a campus secured in Carrollton (45 minutes north of Dallas) and other locations available. Get started here.</p>
                <div className="space-y-1">
                  <p className="text-base">Wesbite: <span className="font-semibold">strata.school</span></p>
                  <p className="text-base">Email: <span className="font-semibold">team@strata.school</span></p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 mt-4 print:mt-2">
          <p className="text-sm">© 2024 Strata Education • Transforming Sports Education in Texas</p>
        </div>

        {/* Print Button - Only visible on screen */}
        <div className="fixed bottom-4 right-4 print:hidden">
          <Button
            onClick={() => window.print()}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Print Flyer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flyer; 