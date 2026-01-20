// app/about/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

const AboutPage = () => {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [loginModalOpen, setLoginModalOpen] = useState(false);
  // const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number[]>([0, 5]);

  const faqData = [
    {
      question: "Can I get a refund?",
      answer: "We have you covered! We will email you as items in your order ship, or if there are updates on the status of your order. Can't find the email? Contact our support team for assistance.",
      category: "general",
      isActive: true
    },
    {
      question: "How do I change my booking?",
      answer: "You can change your booking through your account dashboard or by contacting our customer support team at least 48 hours before your scheduled departure.",
      category: "bookings",
      isActive: false
    },
    {
      question: "What documents do I need to travel?",
      answer: "Required documents vary by destination. Generally, you'll need a valid passport, visa (if required), and any necessary vaccination certificates. We provide detailed checklists for each destination.",
      category: "documents",
      isActive: false
    },
    {
      question: "Is travel insurance included?",
      answer: "Basic travel insurance is included with all our premium packages. You can upgrade to comprehensive coverage for additional protection during your travels.",
      category: "insurance",
      isActive: false
    },
    {
      question: "How early should I arrive at the airport?",
      answer: "We recommend arriving at least 3 hours before international flights and 2 hours before domestic flights to allow time for check-in and security procedures.",
      category: "travel",
      isActive: false
    },
    {
      question: "How many people can stay in the hotel?",
      answer: "Room capacity varies by hotel and room type. Standard rooms typically accommodate 2 adults, while family suites can accommodate up to 4-6 people. Check specific hotel details when booking.",
      category: "accommodation",
      isActive: true
    },
    {
      question: "Do you accept deposit payments?",
      answer: "Yes, we offer flexible payment options including deposit payments. Typically, a 30% deposit secures your booking, with the balance due 30 days before travel.",
      category: "payments",
      isActive: false
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellation policies vary by package. Generally, cancellations made more than 30 days before travel receive a full refund, while cancellations within 30 days may incur fees.",
      category: "cancellations",
      isActive: false
    },
    {
      question: "Are meals included in the packages?",
      answer: "Most of our packages include breakfast. Some premium packages include all meals. Detailed meal inclusions are listed in each package description.",
      category: "meals",
      isActive: false
    },
    {
      question: "Can I customize my travel itinerary?",
      answer: "Absolutely! We offer customizable itineraries. Our travel consultants work with you to create a personalized travel experience that matches your interests and preferences.",
      category: "customization",
      isActive: false
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveFAQ(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        // Close all other FAQ items in the same column
        const columnIndex = index < faqData.length / 2 ? 0 : 1;
        const columnStart = columnIndex === 0 ? 0 : Math.ceil(faqData.length / 2);
        const columnEnd = columnIndex === 0 ? Math.ceil(faqData.length / 2) : faqData.length;
        
        const otherItemsInColumn = Array.from(
          { length: columnEnd - columnStart },
          (_, i) => columnStart + i
        ).filter(i => i !== index);
        
        const filtered = prev.filter(i => !otherItemsInColumn.includes(i));
        return [...filtered, index];
      }
    });
  };

  const handleScroll = () => {
    setShowBackToTop(window.pageYOffset > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleBookNow = () => {
    alert('Thank you for your interest! Our booking team will contact you shortly to help plan your perfect vacation.');
  };


  return (
    <>
      {/* Font Awesome */}
      {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /> */}

      <main className="px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div 
            className=" h-[clamp(300px,65vh,450px)] mx-auto rounded-[clamp(20px,5vw,50px)] overflow-hidden relative bg-cover bg-center"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80)'
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
              <h1 className="text-[clamp(3rem,8vw,5rem)] font-bold leading-tight mb-4">About Us</h1>
              <div className="flex items-center justify-center gap-2 text-[clamp(1rem,2vw,1.25rem)]">
                <span>Home</span>
                <span className="text-2xl">&rsaquo;</span>
                <span className="font-medium">About Us</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Info Section */}
      <section className="px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-16">
          {/* Image Gallery */}
          <div className="lg:w-1/2 relative h-[clamp(400px,60vw,600px)] lg:h-[clamp(500px,50vw,700px)]">
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
              className="absolute w-[clamp(250px,60vw,350px)] h-[clamp(300px,50vw,450px)] top-0 left-0 rounded-lg shadow-2xl hover:-translate-y-1 transition-transform cursor-pointer"
              alt="Coastal view"
            />
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
              className="absolute w-[clamp(120px,30vw,140px)] h-[clamp(150px,25vw,200px)] top-[10%] right-0 rounded-lg shadow-2xl hover:-translate-y-1 transition-transform cursor-pointer"
              alt="Temple"
            />
            <img 
              src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80"
              className="absolute w-[clamp(150px,35vw,200px)] h-[clamp(180px,30vw,300px)] bottom-0 left-[clamp(20px,10vw,60px)] rounded-lg shadow-2xl hover:-translate-y-1 transition-transform cursor-pointer"
              alt="Sea rocks"
            />
            <img 
              src="https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=600&q=80"
              className="absolute w-[clamp(160px,40vw,220px)] h-[clamp(200px,35vw,280px)] bottom-[clamp(40px,15vw,80px)] right-[clamp(20px,10vw,40px)] rounded-lg shadow-2xl hover:-translate-y-1 transition-transform cursor-pointer"
              alt="Yellow house"
            />
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2">
            <h2 className="text-blue-500 text-[clamp(1.75rem,4vw,2.25rem)] leading-snug font-semibold mb-8">
              We have been in the tourism industry for more than 20 years
            </h2>
            
            <p className="text-gray-500 leading-relaxed text-[clamp(0.95rem,2vw,1.05rem)] mb-10">
              Leave your guidebooks at home and dive into the local cultures that make each destination so special. We&apos;ll connect you with our exclusive experiences.
            </p>

            {/* Features */}
            <div className="space-y-8 mb-10">
              <div className="flex gap-6 hover:translate-x-2 transition-transform">
                <div className="text-2xl text-orange-500 min-w-[48px]">✈️</div>
                <div>
                  <h3 className="text-[clamp(1.1rem,2vw,1.25rem)] font-semibold text-gray-800 mb-2">Book With Confidence</h3>
                  <p className="text-gray-500 text-[clamp(0.85rem,2vw,0.95rem)] leading-relaxed">
                    Each trip is carefully crafted to leave you free to live in the moment and enjoy your vacation with peace of mind.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 hover:translate-x-2 transition-transform">
                <div className="text-2xl text-orange-500 min-w-[48px]">💼</div>
                <div>
                  <h3 className="text-[clamp(1.1rem,2vw,1.25rem)] font-semibold text-gray-800 mb-2">Freedom to Discover, Confidence to Explore</h3>
                  <p className="text-gray-500 text-[clamp(0.85rem,2vw,0.95rem)] leading-relaxed">
                    Experience the perfect balance of adventure and security as you explore new destinations.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 hover:translate-x-2 transition-transform">
                <div className="text-2xl text-orange-500 min-w-[48px]">📍</div>
                <div>
                  <h3 className="text-[clamp(1.1rem,2vw,1.25rem)] font-semibold text-gray-800 mb-2">Dive into Culture</h3>
                  <p className="text-gray-500 text-[clamp(0.85rem,2vw,0.95rem)] leading-relaxed">
                    Immerse yourself in authentic local experiences that go beyond typical tourist attractions.
                  </p>
                </div>
              </div>
            </div>

            <button 
              className="px-8 md:px-10 py-3 md:py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 hover:-translate-y-1 transition-all shadow-md"
              onClick={handleBookNow}
            >
              Book Now!
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-right-top bg-[length:50%] opacity-10"
          style={{
            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg)'
          }}
        ></div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-6">
          {/* Section Title */}
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-gray-900 mb-4">Our Services</h2>
            <div className="flex items-center justify-center gap-6">
              <div className="w-[clamp(80px,15vw,120px)] h-1 bg-blue-500 rounded-full"></div>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/826/826070.png" 
                className="w-7 opacity-70"
                alt="Binoculars icon"
              />
              <div className="w-[clamp(80px,15vw,120px)] h-1 bg-blue-500 rounded-full"></div>
            </div>
          </div>

          {/* Service 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16 md:mb-24">
            <div className="lg:w-1/2 relative h-[clamp(350px,50vw,450px)] lg:h-[clamp(400px,40vw,500px)]">
              <div className=" top-0 left-0 w-[clamp(220px,60vw,300px)] h-[clamp(320px,70vw,450px)] rounded-t-[150px] overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  alt="Resort"
                />
              </div>
             
            </div>

            <div className="lg:w-1/2">
              <p className="text-orange-500 font-semibold tracking-wider text-sm mb-2">SERVICES</p>
              <h3 className="text-blue-500 text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight mb-6">WHAT IT IS WE DO</h3>
              <p className="text-gray-500 leading-relaxed text-[clamp(0.95rem,2vw,1.05rem)]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-16 md:mb-24">
            <div className="lg:w-1/2 relative h-[clamp(350px,50vw,450px)] lg:h-[clamp(400px,40vw,500px)]">
              <div className="top-0 left-0 w-[clamp(220px,60vw,300px)] h-[clamp(320px,70vw,450px)] rounded-t-[150px] overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  alt="Mountain"
                />
              </div>
              
            </div>

            <div className="lg:w-1/2">
              <p className="text-orange-500 font-semibold tracking-wider text-sm mb-2">SERVICES</p>
              <h3 className="text-blue-500 text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight mb-6">EXPERIENCE THE BEST</h3>
              <p className="text-gray-500 leading-relaxed text-[clamp(0.95rem,2vw,1.05rem)]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 relative h-[clamp(350px,50vw,450px)] lg:h-[clamp(400px,40vw,500px)]">
              <div className=" top-0 left-0 w-[clamp(220px,60vw,300px)] h-[clamp(320px,70vw,450px)] rounded-t-[150px] overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  alt="Desert"
                />
              </div>
            </div>

            <div className="lg:w-1/2">
              <p className="text-orange-500 font-semibold tracking-wider text-sm mb-2">SERVICES</p>
              <h3 className="text-blue-500 text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight mb-6">UNFORGETTABLE MEMORIES</h3>
              <p className="text-gray-500 leading-relaxed text-[clamp(0.95rem,2vw,1.05rem)]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto md:px-6 py-16 md:py-24">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 text-center mb-12 md:mb-16">
          Frequently asked questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Left Column */}
          <div className="space-y-4">
            {faqData.slice(0, Math.ceil(faqData.length / 2)).map((faq, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all ${
                  activeFAQ.includes(index) ? 'shadow-lg' : ''
                }`}
              >
                <div 
                  className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-gray-900 text-[clamp(0.95rem,2vw,1.05rem)]">
                    {faq.question}
                  </span>
                  <span className="text-gray-700 text-xl">
                    {activeFAQ.includes(index) ? '−' : '+'}
                  </span>
                </div>
                {activeFAQ.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-500 text-[clamp(0.85rem,2vw,0.95rem)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {faqData.slice(Math.ceil(faqData.length / 2)).map((faq, index) => {
              const originalIndex = index + Math.ceil(faqData.length / 2);
              return (
                <div 
                  key={originalIndex}
                  className={`bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all ${
                    activeFAQ.includes(originalIndex) ? 'shadow-lg' : ''
                  }`}
                >
                  <div 
                    className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFAQ(originalIndex)}
                  >
                    <span className="font-semibold text-gray-900 text-[clamp(0.95rem,2vw,1.05rem)]">
                      {faq.question}
                    </span>
                    <span className="text-gray-700 text-xl">
                      {activeFAQ.includes(originalIndex) ? '−' : '+'}
                    </span>
                  </div>
                  {activeFAQ.includes(originalIndex) && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-500 text-[clamp(0.85rem,2vw,0.95rem)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-6xl mx-auto h-50 md:h-[500px] rounded-2xl overflow-hidden relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80)'
            }}
          ></div>
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative h-full flex items-center px-6 md:px-16 lg:px-20">
            <div className="max-w-lg text-white">
              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-serif mb-2">Last TravelPro Offer</h2>
              <p className="text-lg md:text-xl opacity-90 mb-6">Aerial view of Cape Town with Cape Town Stadium</p>
              <p className="text-sm md:text-base text-gray-200 mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam hendrerit felis sit amet
                turpis vehicula convallis. Ut ac tellus velit. Nulla mollis sollicitudin lacus id ornare.
                Phasellus laoreet nulla et nulla sagittis, sit amet cursus urna mollis.
              </p>
              <a href="#" className="inline-block px-6 md:px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 hover:-translate-y-0.5 transition-all">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default AboutPage;