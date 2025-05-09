import React from 'react';
import { Button } from '@/components/ui/button';

const Flyer = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8 print:p-4 flex items-center justify-center">
      {/* Main Flyer Container - More compact size */}
      <div className="max-w-xl mx-auto bg-white shadow-lg print:shadow-none rounded-lg">
        <div className="p-6">
          {/* Header - Tighter spacing */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2">Start Your School, Build Your Legacy</h1>
            <p className="text-base text-gray-600">Have you ever dreamed of creating your own sports school and leaving a legacy? Now you can.</p>
          </div>

          {/* Main Content - Tighter vertical spacing */}
          <div className="space-y-4">
            <section>
              <h2 className="text-xl font-semibold mb-1.5">Historic Change in Texas Education</h2>
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="text-sm mb-1">• New ESA legislation passed on April 16, 2025</p>
                <p className="text-sm">• Families receive $10,800 per student from the Texas government</p>
              </div>
              <p className="text-gray-600 italic text-xs pl-3 border-l border-gray-300 mt-1">But you're a coach... why does this matter for you?</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-1.5">A Golden Opportunity for Coaches</h2>
              <div className="border-l-4 border-green-500 pl-3 py-1">
                <p className="text-sm mb-1">• Build your legacy, create your own sports academy</p>
                <p className="text-sm mb-1">• Earn at least $10,800 in revenue per student at your school</p>
                <p className="text-sm">• Shape the future of education and the next generation of athletes</p>
              </div>
              <p className="text-gray-600 italic text-xs pl-3 border-l border-gray-300 mt-1">But who teaches the academics at your school?</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-1.5">Your Athletes Will Excel</h2>
              <div className="border-l-4 border-red-500 pl-3 py-1">
                <p className="text-sm mb-1">• Use 2 Hour Learning (2HourLearning.com) to teach academics at your school</p>
                <p className="text-sm mb-1">• Fully personalized learning software, guarantees Top 2% academic outcomes</p>
                <p className="text-sm">• AI does the teaching, coach does the motivating (case study: <span className="text-blue-600">alpha.school</span>)</p>
              </div>
              <p className="text-gray-600 italic text-xs pl-3 border-l border-gray-300 mt-1">What does a day in the life look like?</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-1.5">Double Your Income, Keep Your Coaching Job</h2>
              <div className="border-l-4 border-orange-500 pl-3 py-1">
                <p className="text-sm mb-1">• 9am - 12pm: Academics, led by the AI learning software</p>
                <p className="text-sm mb-1">• 12pm - 3pm: Sports training, led by you</p>
                <p className="text-sm">• Keep your existing afterschool coaching job</p>
              </div>
              <p className="text-gray-600 italic text-xs pl-3 border-l border-gray-300 mt-1">We help coaches find school locations, access learning software, and get paid from Texas ESAs.</p>
            </section>

            {/* Campus Images - More compact */}
            <section className="mt-3">
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="flex w-full h-20">
                  <img src="/images/Carrollton1.png" alt="Carrollton Campus View 1" className="w-1/4 object-cover" />
                  <img src="/images/coach.jpg" alt="Coach with Athletes" className="w-1/4 object-cover" />
                  <img src="/images/Carrollton3.jpg" alt="Carrollton Campus View 3" className="w-1/4 object-cover" />
                  <img src="/images/kidsinfield.png" alt="Students in Field" className="w-1/4 object-cover" />
                </div>

                {/* Contact Section - Better aligned */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Expand Your Legacy</h2>
                      <p className="text-sm mb-2">Have questions?</p>
                      <div className="space-y-0.5">
                        <p className="text-sm">Website: <span className="font-semibold">strata.school</span></p>
                        <p className="text-sm">Email: <span className="font-semibold">team@strata.school</span></p>
                      </div>
                    </div>
                    <div className="flex gap-8 ml-4">
                      <div className="flex flex-col items-center w-20">
                        <img src="/images/Website.png" alt="Website QR Code" className="w-20 h-20 object-contain" />
                        <p className="text-xs text-gray-600 mt-1">Website</p>
                      </div>
                      <div className="flex flex-col items-center w-20">
                        <img src="/images/calendly.png" alt="Schedule a Call QR Code" className="w-20 h-20 object-contain" />
                        <p className="text-xs text-gray-600 mt-1 whitespace-nowrap">Book a Chat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer - Compact */}
          <div className="text-center text-gray-600 mt-3">
            <p className="text-xs">© 2025 Strata Schools • Transforming Sports Education in Texas</p>
          </div>
        </div>

        {/* Print Button */}
        <div className="fixed bottom-4 right-4 print:hidden">
          <Button onClick={() => window.print()} className="bg-blue-500 text-white hover:bg-blue-600">
            Print Flyer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flyer; 