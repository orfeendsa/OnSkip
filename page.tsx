'use client';
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Video Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/videos/background.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Building Tomorrow's Solutions
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Custom software solutions for Construction, Live Stock, Online Business, Healthcare, and Fintech industries.
            </p>
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/70">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Our Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Machine Automation",
                  description: "Automate your machinery with intelligent datasets and control systems."
                },
                {
                  title: "Custom Web Solutions",
                  description: "Tailored websites and web applications with integrated hardware solutions."
                },
                {
                  title: "Amazon Automation",
                  description: "Streamline your Amazon business operations with automated solutions."
                },
                {
                  title: "Workflow Design",
                  description: "Optimize your business processes with custom workflow solutions."
                },
                {
                  title: "Custom Applications",
                  description: "Build specialized applications for your unique business needs."
                },
                {
                  title: "Industry Solutions",
                  description: "Specialized solutions for Construction, Healthcare, and Fintech sectors."
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 