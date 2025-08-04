import React from 'react';
import { BookOpen, Users, Trophy, Heart, Shield, Star } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Vast Library',
      description: 'Access over 10,000 books across all genres with new titles added daily.'
    },
    {
      icon: Users,
      title: 'Reading Community',
      description: 'Connect with 50,000+ readers worldwide and share your reading journey.'
    },
    {
      icon: Trophy,
      title: 'Reading Contests',
      description: 'Participate in exciting contests and win amazing prizes for reading.'
    },
    {
      icon: Heart,
      title: 'Personalized Experience',
      description: 'Get book recommendations tailored to your reading preferences.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data and reading progress are safe with our advanced security.'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Curated collection of high-quality books from renowned publishers.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Books Available' },
    { number: '50,000+', label: 'Active Readers' },
    { number: '1M+', label: 'Reading Hours' },
    { number: '4.8/5', label: 'User Rating' }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">LibraryHub</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're passionate about connecting readers with incredible stories. Our platform combines 
            the joy of reading with the excitement of community and competition.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Our Story</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2020, LibraryHub began with a simple mission: to make reading more 
                accessible, engaging, and rewarding for everyone. We believe that books have the 
                power to transform lives, spark imagination, and bring people together.
              </p>
              <p>
                What started as a small digital library has grown into a thriving community of 
                readers from around the world. Our innovative points system and reading contests 
                have gamified the reading experience, making it more fun and competitive.
              </p>
              <p>
                Today, we're proud to serve over 50,000 active readers and host the largest 
                online reading contest with real cash prizes. Our commitment to quality, 
                security, and user experience drives everything we do.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-hero rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-6">Our Mission</h4>
              <blockquote className="text-lg italic leading-relaxed">
                "To create a world where reading is not just a hobby, but a rewarding journey 
                of discovery, learning, and community connection."
              </blockquote>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="font-semibold">- LibraryHub Team</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12">Why Choose LibraryHub?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-card border border-border rounded-xl p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-3">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Our Impact in Numbers</h3>
            <p className="text-white/80">
              See how our community has grown and the impact we've made together.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Alex Chen', role: 'Founder & CEO', image: '/assets/about1.jpg' },
              { name: 'Sarah Kim', role: 'Head of Product', image: '/assets/aut1.jpeg' },
              { name: 'Mike Johnson', role: 'Lead Developer', image: '/assets/aut2.jpeg' }
            ].map((member, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary/20"
                />
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;