
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