// components/Sections/BlogPosts.tsx
import React from 'react';

const BlogPosts = () => {
  const posts = [
    {
      id: 1,
      title: 'Venice, Rome and Milan - 9 Days 8 Nights',
      category: 'Life and Style',
      date: '30 Aug, 2023',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600',
      isBestSeller: true,
    },
    {
      id: 2,
      title: 'Greek Island Hopping Adventure',
      category: 'Adventure',
      date: '15 Sep, 2023',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600',
      isBestSeller: true,
    },
    {
      id: 3,
      title: 'Japanese Cultural Experience',
      category: 'Culture',
      date: '22 Oct, 2023',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600',
      isBestSeller: false,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">We are in featured</h2>
        <div className="flex items-center justify-center space-x-4">
          <div className="h-1 w-16 md:w-24 bg-blue-600 rounded-full"></div>
          <div className="text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-8 w-6 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div className="h-1 w-16 md:w-24 bg-blue-600 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
        {posts.map((post) => (
          <div key={post.id} className="w-full max-w-[380px] mx-auto bg-white overflow-hidden card-shadow">
            <div className="relative h-48 md:h-64">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />

              {post.isBestSeller && (
                <div className="absolute bottom-0 left-4 translate-y-1/2 bg-orange-500 text-white text-[10px] font-bold px-4 py-2 rounded-md shadow-lg">
                  Best Seller
                </div>
              )}
            </div>

            <div className="p-6 md:p-8 mt-4">
              <p className="text-xs font-bold mb-3">
                <span className="text-slate-800">{post.date} -</span>
                <span className="text-orange-400 ml-1">{post.category}</span>
              </p>
              <h3 className="text-lg md:text-xl font-extrabold text-slate-800 leading-tight flex items-start gap-2">
                <span className="text-blue-500 mt-1">⚡</span>
                {post.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogPosts;