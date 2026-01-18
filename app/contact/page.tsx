// app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Visit Our Office',
      details: ['123 Travel Street', 'Sydney, NSW 2000', 'Australia'],
      color: 'text-blue-600 bg-blue-100',
    },
    {
      icon: 'fas fa-phone',
      title: 'Call Us',
      details: ['+61 2 1234 5678', 'Mon - Fri: 9am - 6pm', 'Sat - Sun: 10am - 4pm'],
      color: 'text-green-600 bg-green-100',
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Us',
      details: ['info@gurkhastravel.com', 'support@gurkhastravel.com', 'bookings@gurkhastravel.com'],
      color: 'text-purple-600 bg-purple-100',
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Support',
      details: ['Emergency Travel Assistance', '+61 400 123 456', 'Available 24 hours'],
      color: 'text-orange-600 bg-orange-100',
    },
  ];

  const faqs = [
    {
      question: 'How can I modify my booking?',
      answer: 'You can modify your booking through our website dashboard or by contacting our customer support team. Changes may be subject to availability and additional fees.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Cancellation policies vary by airline and hotel. Please refer to your booking confirmation email for specific details. We recommend purchasing travel insurance for flexibility.',
    },
    {
      question: 'How do I get my travel documents?',
      answer: 'All travel documents including e-tickets and itineraries will be sent to your email immediately after booking confirmation. You can also access them from your account dashboard.',
    },
    {
      question: 'Do you offer travel insurance?',
      answer: 'Yes, we offer comprehensive travel insurance options during the booking process. You can also add insurance to existing bookings by contacting our support team.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10">
            Get in touch with our travel experts. We&apos;re here to help you plan your perfect journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-home mr-2"></i>
              Back to Home
            </Link>
            <a
              href="tel:+61212345678"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              <i className="fas fa-phone mr-2"></i>
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <i className={`${info.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
              <div className="space-y-2">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                <i className="fas fa-check-circle mr-2"></i>
                Thank you for your message! We&apos;ll get back to you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+61 412 345 678"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="modification">Booking Modification</option>
                    <option value="cancellation">Cancellation Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ & Map */}
          <div className="space-y-8">
            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Office</h2>
              <div className="aspect-video bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-map-marker-alt text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500 mt-2">(Map integration would go here)</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="flex items-center text-gray-600">
                  <i className="fas fa-map-marker-alt text-blue-600 mr-3"></i>
                  123 Travel Street, Sydney NSW 2000
                </p>
                <p className="flex items-center text-gray-600">
                  <i className="fas fa-clock text-blue-600 mr-3"></i>
                  Open Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="flex items-center text-gray-600">
                  <i className="fas fa-train text-blue-600 mr-3"></i>
                  5 min walk from Town Hall Station
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Connect With Us</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Follow us on social media for travel inspiration, special offers, and updates.
          </p>
          <div className="flex justify-center gap-6">
            {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <i className={`fab fa-${platform} text-2xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;