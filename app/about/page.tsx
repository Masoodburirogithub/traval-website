// app/about/page.tsx
import React from 'react';
import Link from 'next/link';
import AboutSection from '@/components/Sections/AboutSection';

const AboutPage = () => {
  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400',
      bio: 'With over 20 years in the travel industry, John founded Gurkhas Travel to revolutionize the way people experience travel.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Travel Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400',
      bio: 'Sarah has visited over 80 countries and brings unparalleled expertise in crafting perfect travel experiences.',
    },
    {
      name: 'Mike Wilson',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400',
      bio: 'Mike ensures every aspect of your journey runs smoothly, from booking to return.',
    },
    {
      name: 'Emma Davis',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400',
      bio: 'Emma is dedicated to making sure every customer has an exceptional experience with us.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '150+', label: 'Destinations' },
    { number: '24/7', label: 'Customer Support' },
    { number: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">About Gurkhas Travel</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10">
            We&apos;re passionate about creating unforgettable travel experiences that connect people with the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-home mr-2"></i>
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              <i className="fas fa-envelope mr-2"></i>
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-bullseye text-3xl text-purple-600"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To make extraordinary travel experiences accessible to everyone by providing exceptional service, 
                competitive pricing, and personalized attention to detail.
              </p>
              <p className="text-gray-600">
                We believe that travel has the power to transform lives, broaden perspectives, 
                and create lasting memories.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-eye text-3xl text-blue-600"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                To become the world&apos;s most trusted and innovative travel company, 
                setting new standards for customer experience and sustainable tourism.
              </p>
              <p className="text-gray-600">
                We envision a world where travel is seamless, sustainable, 
                and accessible to all who wish to explore.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our dedicated team of travel experts is here to make your journey unforgettable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;