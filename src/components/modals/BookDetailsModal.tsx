import React, { useState } from 'react';
import { X, Star, ShoppingCart, BookOpen, Download, Clock, User, Calendar } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { Button } from '../ui/button';
import ReadingModal from './ReadingModal';

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

interface BookDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ isOpen, onClose, book }) => {
  const { addToCart, cartItems, isLoggedIn, startReading } = useLibrary();
  const [showReadingModal, setShowReadingModal] = useState(false);

  if (!isOpen) return null;

  const isInCart = cartItems.some(item => item.id === book.id);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert('Please login to add books to cart');
      return;
    }
    addToCart(book);
  };

  const handleReadOnline = () => {
    if (!isLoggedIn) {
      alert('Please login to read books online');
      return;
    }
    startReading(book);
    setShowReadingModal(true);
  };

  const handleDownload = () => {
    if (!isLoggedIn) {
      alert('Please login to download books');
      return;
    }
    alert('Download feature coming soon!');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-background border border-border rounded-2xl shadow-strong max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-bounce-in">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-bold">Book Details</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Book Cover */}
              <div className="lg:col-span-1">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-medium"
                />
              </div>

              {/* Book Information */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                  <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>by {book.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{book.category}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">{renderStars(book.rating)}</div>
                    <span className="text-lg font-semibold">{book.rating}</span>
                    <span className="text-muted-foreground">({Math.floor(Math.random() * 1000) + 100} reviews)</span>
                  </div>

                  {/* Book Stats */}
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2 bg-muted/50 px-3 py-2 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{book.pages} pages</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-muted/50 px-3 py-2 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{book.readingTime}h reading time</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>

                {/* Price and Actions */}
                <div className="bg-muted/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-primary">${book.price}</span>
                      <span className="text-muted-foreground ml-2">USD</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Free delivery</p>
                      <p className="text-sm text-muted-foreground">Secure payment</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button
                      onClick={handleReadOnline}
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Online
                    </Button>

                    <Button
                      onClick={handleDownload}
                      variant="secondary"
                      className="hover:shadow-soft transition-all duration-300"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>

                    <Button
                      onClick={handleAddToCart}
                      disabled={isInCart}
                      variant={isInCart ? "secondary" : "outline"}
                      className={`${
                        isInCart 
                          ? 'bg-success text-success-foreground' 
                          : 'hover:bg-primary hover:text-primary-foreground'
                      } transition-all duration-300`}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isInCart ? 'Added to Cart' : 'Add to Cart'}
                    </Button>
                  </div>

                  {!isLoggedIn && (
                    <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <p className="text-sm text-warning-foreground">
                        Please login to read online, download, or purchase this book.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReadingModal
        isOpen={showReadingModal}
        onClose={() => setShowReadingModal(false)}
        book={book}
      />
    </>
  );
};

export default BookDetailsModal;