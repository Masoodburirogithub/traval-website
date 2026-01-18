// components/Sections/Testimonials.tsx
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Karan Shah',
      username: '@karanzip',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      avatar: 'https://i.pravatar.cc/150?u=karan',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      username: '@sarahj',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      avatar: 'https://i.pravatar.cc/150?u=shah',
      rating: 5,
    },
    {
      name: 'Mike Wilson',
      username: '@mikew',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      avatar: 'https://i.pravatar.cc/150?u=dev',
      rating: 5,
    },
    {
      name: 'Emily Chen',
      username: '@emilyc',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      avatar: 'https://i.pravatar.cc/150?u=travel',
      rating: 5,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-32 flex flex-col lg:flex-row items-center gap-12 md:gap-16">
      <div className="w-full lg:w-3/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 md:p-8 rounded-2xl testimonial-shadow border border-gray-50">
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {testimonial.text}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs">{testimonial.username}</p>
                  </div>
                </div>
                <div className="flex text-blue-600 gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-8 md:mt-12">
          <div className="w-3 h-3 rounded-full bg-gray-200"></div>
          <div className="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-50"></div>
          <div className="w-3 h-3 rounded-full bg-gray-200"></div>
        </div>
      </div>

      <div className="w-full lg:w-2/5 text-left mt-8 lg:mt-0">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">Customer Reviews</h2>
        <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-md">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry&apos;s standard.
        </p>
        <button className="px-6 md:px-8 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
          All Testimonial
        </button>
      </div>
    </section>
  );
};

export default Testimonials;