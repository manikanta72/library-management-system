import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Clock, Trophy } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { Button } from '../ui/button';

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

interface ReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
}

const ReadingModal: React.FC<ReadingModalProps> = ({ isOpen, onClose, book }) => {
  const { updateReadingProgress, user } = useLibrary();
  const [currentPage, setCurrentPage] = useState(1);
  const [readingTime, setReadingTime] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);

  // Mock book content
  const bookContent = Array.from({ length: book.pages }, (_, i) => ({
    page: i + 1,
    content: `Page ${i + 1} of "${book.title}"

This is the content of page ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`
  }));

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setReadingTime(prev => {
        const newTime = prev + 1;
        if (newTime % 60 === 0) { // Every minute
          const newPoints = Math.floor(newTime / 60) * 10;
          setPointsEarned(newPoints);
          updateReadingProgress(1); // 1 minute of reading
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, updateReadingProgress]);

  if (!isOpen) return null;

  const nextPage = () => {
    if (currentPage < book.pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-2xl shadow-strong max-w-4xl w-full max-h-[90vh] overflow-hidden animate-bounce-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Reading Stats */}
            <div className="flex items-center space-x-4 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">{formatTime(readingTime)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4 text-warning" />
                <span className="text-sm font-semibold text-warning">+{pointsEarned} points</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Reading Area */}
        <div className="flex-1 flex">
          {/* Page Content */}
          <div className="flex-1 p-8 overflow-y-auto bg-library-paper dark:bg-library-paper/10">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 text-center">
                <h3 className="text-xl font-bold mb-2">Chapter {Math.ceil(currentPage / 10)}</h3>
                <p className="text-sm text-muted-foreground">Page {currentPage} of {book.pages}</p>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="whitespace-pre-line leading-relaxed text-justify">
                  {bookContent[currentPage - 1]?.content}
                </div>
              </div>
            </div>
          </div>

          {/* Page Navigation */}
          <div className="w-16 flex flex-col items-center justify-center bg-muted/30 border-l border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="mb-4 p-3 hover:bg-background/50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="text-xs text-center text-muted-foreground mb-4">
              <div className="font-semibold">{currentPage}</div>
              <div>/</div>
              <div>{book.pages}</div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === book.pages}
              className="p-3 hover:bg-background/50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            <div className="bg-background/50 backdrop-blur-sm px-3 py-1 rounded-lg">
              <span className="text-sm text-muted-foreground">Progress: </span>
              <span className="text-sm font-semibold text-primary">
                {Math.round((currentPage / book.pages) * 100)}%
              </span>
            </div>
            
            {user && (
              <div className="bg-primary/10 px-3 py-1 rounded-lg">
                <span className="text-sm text-primary font-semibold">
                  Total Points: {user.points + pointsEarned}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
            >
              Start Over
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Save & Exit
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-gradient-primary transition-all duration-300"
            style={{ width: `${(currentPage / book.pages) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadingModal;