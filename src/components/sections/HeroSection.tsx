import React from 'react';
import { BookOpen, Star, Users, Trophy, ArrowRight } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { Button } from '../ui/button';

const HeroSection = () => {
  const { setSelectedCategory, setShowLeaderboard } = useLibrary();

  const stats = [
    { icon: BookOpen, label: 'Books Available', value: '10,000+' },
    { icon: Users, label: 'Active Readers', value: '50,000+' },
    { icon: Star, label: 'Average Rating', value: '4.8' },
    { icon: Trophy, label: 'Reading Hours', value: '1M+' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-semibold animate-fade-in">
                <Trophy className="h-4 w-4 mr-2" />
                Reading Contest Live - Win $500!
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
                Discover Your Next
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Great Read
                </span>
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl animate-fade-in">
                Join thousands of readers in our digital library. Read online, earn points, 
                and compete for amazing prizes while discovering incredible stories.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button
                size="lg"
                onClick={() => {
                  document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' });
                  setSelectedCategory('All');
                }}
                className="bg-white text-primary hover:bg-white/90 hover:shadow-glow transition-all duration-300 px-8 py-4 text-lg font-semibold"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Explore Books
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowLeaderboard(true)}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
              >
                <Trophy className="h-5 w-5 mr-2" />
                View Leaderboard
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 animate-fade-in">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300">
                  <stat.icon className="h-6 w-6 text-white mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Floating Books */}
          <div className="relative lg:block hidden">
            <div className="relative w-full h-96 animate-fade-in">
              {/* Book 1 */}
              <div className="absolute top-0 right-0 w-32 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-strong animate-float" style={{ animationDelay: '0s' }}>
                <div className="p-3 h-full flex flex-col justify-between text-white">
                  <div className="text-xs font-semibold line-clamp-2">The Great Adventure</div>
                  <div className="text-xs opacity-80">Sarah Johnson</div>
                </div>
              </div>
              
              {/* Book 2 */}
              <div className="absolute top-16 left-8 w-32 h-40 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg shadow-strong animate-float" style={{ animationDelay: '1s' }}>
                <div className="p-3 h-full flex flex-col justify-between text-white">
                  <div className="text-xs font-semibold line-clamp-2">Love in Paris</div>
                  <div className="text-xs opacity-80">Emma Williams</div>
                </div>
              </div>
              
              {/* Book 3 */}
              <div className="absolute bottom-8 right-16 w-32 h-40 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg shadow-strong animate-float" style={{ animationDelay: '2s' }}>
                <div className="p-3 h-full flex flex-col justify-between text-white">
                  <div className="text-xs font-semibold line-clamp-2">Quantum Mystery</div>
                  <div className="text-xs opacity-80">Dr. Michael Chen</div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
              <div className="absolute bottom-20 left-4 w-6 h-6 bg-orange-400 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
              <div className="absolute top-40 right-40 w-3 h-3 bg-pink-400 rounded-full animate-float" style={{ animationDelay: '5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;