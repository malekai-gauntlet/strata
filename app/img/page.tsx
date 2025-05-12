'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function IMGPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src="/images/stadium.jpg"
          alt="Sports Stadium"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-white px-4">
            <h1 className="text-6xl font-bold mb-6 text-center">
              THE WORLD LEADER IN SPORTS EDUCATION
            </h1>
            <p className="text-xl mb-8 text-center max-w-2xl">
              Develop your passion. Perfect your game. Prepare for success.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all">
              BOOK A CAMP
            </button>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="relative h-screen">
        <Image
          src="/images/kidsinfield.png"
          alt="Sports Training"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30">
          <div className="container mx-auto h-full flex flex-col justify-center items-start text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h2 className="text-5xl font-bold mb-6">ELITE SPORTS PROGRAMS</h2>
              <p className="text-xl mb-8">
                From youth camps to professional training, we offer comprehensive programs
                that develop athletes physically and mentally.
              </p>
              <button className="bg-white text-blue-900 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all">
                EXPLORE PROGRAMS
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academic Section */}
      <section className="relative h-screen">
        <Image
          src="/images/school sunset.jpg"
          alt="Academic Excellence"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto h-full flex flex-col justify-center items-end text-white px-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h2 className="text-5xl font-bold mb-6">ACADEMIC EXCELLENCE</h2>
              <p className="text-xl mb-8">
                Our comprehensive academic programs prepare student-athletes for success
                in college and beyond.
              </p>
              <button className="bg-white text-blue-900 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all">
                LEARN MORE
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section className="relative h-screen">
        <Image
          src="/images/coach.jpg"
          alt="Campus Life"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto h-full flex flex-col justify-center items-start text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h2 className="text-5xl font-bold mb-6">CAMPUS LIFE</h2>
              <p className="text-xl mb-8">
                Experience world-class facilities and a supportive community dedicated
                to your success.
              </p>
              <button className="bg-white text-blue-900 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all">
                EXPLORE CAMPUS
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-8">START YOUR JOURNEY TODAY</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the ranks of elite athletes who have transformed their potential into success.
          </p>
          <button className="bg-white text-blue-900 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all">
            CONTACT US
          </button>
        </div>
      </section>
    </div>
  );
} 