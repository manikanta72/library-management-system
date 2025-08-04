import React from 'react';
import { LibraryProvider } from '../context/LibraryContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Leaderboard from '../components/Leaderboard';
import HeroSection from '../components/sections/HeroSection';
import BooksSection from '../components/sections/BooksSection';
import AuthorsSection from '../components/sections/AuthorsSection';
import AboutSection from '../components/sections/AboutSection';
import FAQSection from '../components/sections/FAQSection';

const Index = () => {
  return (
    <LibraryProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <BooksSection />
          <AuthorsSection />
          <AboutSection />
          <FAQSection />
        </main>
        <Footer />
        <Leaderboard />
      </div>
    </LibraryProvider>
  );
};

export default Index;
