import React from 'react';
import { User, BookOpen, Star, Award } from 'lucide-react';
import { Button } from '../ui/button';

const AuthorsSection = () => {
  const authors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      bio: 'Bestselling adventure novelist with over 15 published works.',
      books: 12,
      rating: 4.8,
      followers: '125K',
      avatar: '/assets/aut1.jpeg',
      genres: ['Adventure', 'Fantasy', 'Young Adult'],
      awards: ['Hugo Award', 'Nebula Award']
    },
    {
      id: 2,
      name: 'Emma Williams',
      bio: 'Romance author known for her captivating love stories set in exotic locations.',
      books: 8,
      rating: 4.6,
      followers: '89K',
      avatar: '/assets/aut2.jpeg',
      genres: ['Romance', 'Contemporary Fiction'],
      awards: ['Romance Writers Award']
    },
    {
      id: 3,
      name: 'Dr. Michael Chen',
      bio: 'Scientist turned science fiction writer, bringing real science to fiction.',
      books: 6,
      rating: 4.9,
      followers: '156K',
      avatar: '/assets/aut3.jpeg',
      genres: ['Science Fiction', 'Thriller'],
      awards: ['Philip K. Dick Award', 'Arthur C. Clarke Award']
    },
    {
      id: 4,
      name: 'Chef Maria Rodriguez',
      bio: 'Celebrity chef and cookbook author sharing culinary wisdom worldwide.',
      books: 10,
      rating: 4.7,
      followers: '203K',
      avatar: '/assets/auth4.jpeg',
      genres: ['Cooking', 'Lifestyle', 'Travel'],
      awards: ['James Beard Award']
    }
  ];

  return (
    <section id="authors" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Meet Our <span className="bg-gradient-primary bg-clip-text text-transparent">Featured Authors</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the brilliant minds behind your favorite stories. Connect with authors and explore their incredible works.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {authors.map((author, index) => (
            <div
              key={author.id}
              className="bg-background border border-border rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 text-center">
                {/* Author Avatar */}
                <div className="relative mb-4">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-20 h-20 rounded-full mx-auto border-4 border-primary/20 shadow-soft"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <User className="h-4 w-4" />
                  </div>
                </div>

                {/* Author Info */}
                <h3 className="text-xl font-bold mb-2">{author.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {author.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-muted/50 rounded-lg p-2">
                    <BookOpen className="h-4 w-4 text-primary mx-auto mb-1" />
                    <div className="text-sm font-semibold">{author.books}</div>
                    <div className="text-xs text-muted-foreground">Books</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2">
                    <Star className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
                    <div className="text-sm font-semibold">{author.rating}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2">
                    <User className="h-4 w-4 text-primary mx-auto mb-1" />
                    <div className="text-sm font-semibold">{author.followers}</div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                </div>

                {/* Genres */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {author.genres.slice(0, 2).map((genre) => (
                      <span
                        key={genre}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold"
                      >
                        {genre}
                      </span>
                    ))}
                    {author.genres.length > 2 && (
                      <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                        +{author.genres.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Awards */}
                {author.awards.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Award className="h-3 w-3 text-yellow-600" />
                      <span className="text-xs font-semibold text-yellow-600">Awards</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {author.awards.join(', ')}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  size="sm"
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  onClick={() => {
                    document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Books
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card border border-border rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Want to become a featured author?</h3>
            <p className="text-muted-foreground mb-6">
              Join our community of talented writers and share your stories with readers worldwide.
            </p>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              Submit Your Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorsSection;