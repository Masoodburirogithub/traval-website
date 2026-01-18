// app/page.tsx
// import Hero from '@/components/Sections/Hero';
// import AboutSection from '@/components/Sections/AboutSection';
// import Packages from '@/components/Sections/Packages';
// import Services from '@/components/Sections/Services';
// import Testimonials from '@/components/Sections/Testimonials';
// import FeaturedIn from '@/components/Sections/FeaturedIn';
// import LastOffer from '@/components/Sections/LastOffer';
// import BlogPosts from '@/components/Sections/BlogPosts';
import { AboutSection, BlogPosts, FeaturedIn, Hero, LastOffer, Packages, Services, Testimonials } from '@/components';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Packages />
      <Services />
      <Testimonials />
      <FeaturedIn />
      <LastOffer />
      <BlogPosts />
    </>
  );
}