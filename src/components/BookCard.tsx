import React, { useState } from 'react';
import { Star, ShoppingCart, BookOpen, Download, Heart, Clock } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { Button } from './ui/button';
import BookDetailsModal from './modals/BookDetailsModal';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  price: number;
  coverImage: string;
  rating: number;
  pages: number;
  readingTime: number;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToCart, cartItems, isLoggedIn } = useLibrary();
  const [showDetails, setShowDetails] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const isInCart = cartItems.some(item => item.id === book.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert('Please login to add books to cart');
      return;
    }
    addToCart(book);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      <div 
        className="group bg-gradient-card border border-border rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
        onClick={() => setShowDetails(true)}
      >
        {/* Book Cover */}
        <div className="relative overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
              <Button
                size="sm"
                className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(true);
                }}
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Read
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-secondary/90 hover:bg-secondary backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  alert('Download feature coming soon!');
                }}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          {/* Like Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isLiked ? 'text-red-500 fill-current' : 'text-muted-foreground'
              }`} 
            />
          </Button>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            {book.category}
          </div>
        </div>

        {/* Book Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-muted-foreground text-sm">by {book.author}</p>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {book.description}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex">{renderStars(book.rating)}</div>
            <span className="text-sm font-semibold">{book.rating}</span>
            <span className="text-xs text-muted-foreground">({Math.floor(Math.random() * 1000) + 100} reviews)</span>
          </div>

          {/* Book Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <BookOpen className="h-3 w-3" />
              <span>{book.pages} pages</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{book.readingTime}h read</span>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div>
              <span className="text-2xl font-bold text-primary">${book.price}</span>
              <span className="text-sm text-muted-foreground ml-1">USD</span>
            </div>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`${
                isInCart 
                  ? 'bg-success text-success-foreground' 
                  : 'bg-gradient-primary hover:shadow-glow'
              } transition-all duration-300`}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {isInCart ? 'Added' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>

      <BookDetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        book={book}
      />
    </>
  );
};

export default BookCard;