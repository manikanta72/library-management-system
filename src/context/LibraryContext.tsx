import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  readingTime: number;
  booksRead: number;
}

interface LibraryContextType {
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;
  
  // User
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserPoints: (points: number) => void;
  
  // Books
  books: Book[];
  filteredBooks: Book[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Cart
  cartItems: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  
  // Reading
  currentReadingBook: Book | null;
  startReading: (book: Book) => void;
  updateReadingProgress: (timeSpent: number) => void;
  
  // Leaderboard
  leaderboard: User[];
  showLeaderboard: boolean;
  setShowLeaderboard: (show: boolean) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Adventure',
    author: 'Sarah Johnson',
    description: 'An epic tale of courage and discovery in a mystical land.',
    category: 'Adventure',
    price: 12.99,
    coverImage: '/assets/1.avif',
    rating: 4.5,
    pages: 320,
    readingTime: 8
  },
  {
    id: '2',
    title: 'Love in Paris',
    author: 'Emma Williams',
    description: 'A romantic story set in the beautiful streets of Paris.',
    category: 'Romance',
    price: 9.99,
    coverImage: '/assets/2.avif',
    rating: 4.2,
    pages: 280,
    readingTime: 6
  },
  {
    id: '3',
    title: 'The Quantum Mystery',
    author: 'Dr. Michael Chen',
    description: 'A mind-bending science fiction thriller about quantum physics.',
    category: 'Science Fiction',
    price: 14.99,
    coverImage: '/assets/3.jpeg',
    rating: 4.7,
    pages: 450,
    readingTime: 12
  },
  {
    id: '4',
    title: 'Cooking with Joy',
    author: 'Chef Maria Rodriguez',
    description: 'Delicious recipes and cooking techniques from around the world.',
    category: 'Cooking',
    price: 19.99,
    coverImage: '/assets/4.avif',
    rating: 4.8,
    pages: 200,
    readingTime: 4
  },
  {
    id: '5',
    title: 'The Great Adventure',
    author: 'Sarah Johnson',
    description: 'An epic tale of courage and discovery in a mystical land.',
    category: 'Adventure',
    price: 12.99,
    coverImage: '/assets/5.avif',
    rating: 4.5,
    pages: 320,
    readingTime: 8
  },
  {
    id: '6',
    title: 'Love in Paris',
    author: 'Emma Williams',
    description: 'A romantic story set in the beautiful streets of Paris.',
    category: 'Romance',
    price: 9.99,
    coverImage: '/assets/7.avif',
    rating: 4.2,
    pages: 280,
    readingTime: 6
  },
  {
    id: '7',
    title: 'The Quantum Mystery',
    author: 'Dr. Michael Chen',
    description: 'A mind-bending science fiction thriller about quantum physics.',
    category: 'Science Fiction',
    price: 14.99,
    coverImage: '/assets/7.avif',
    rating: 4.7,
    pages: 450,
    readingTime: 12
  },
  {
    id: '8',
    title: 'Cooking with Joy',
    author: 'Chef Maria Rodriguez',
    description: 'Delicious recipes and cooking techniques from around the world.',
    category: 'Cooking',
    price: 19.99,
    coverImage: '/assets/8.avif',
    rating: 4.8,
    pages: 200,
    readingTime: 4
  },
  {
    id: '9',
    title: 'The Great Adventure',
    author: 'Sarah Johnson',
    description: 'An epic tale of courage and discovery in a mystical land.',
    category: 'Adventure',
    price: 12.99,
    coverImage: '/assets/9.avif',
    rating: 4.5,
    pages: 320,
    readingTime: 8
  },
  {
    id: '10',
    title: 'Love in Paris',
    author: 'Emma Williams',
    description: 'A romantic story set in the beautiful streets of Paris.',
    category: 'Romance',
    price: 9.99,
    coverImage: '/assets/10.avif',
    rating: 4.2,
    pages: 280,
    readingTime: 6
  },
  {
    id: '11',
    title: 'The Quantum Mystery',
    author: 'Dr. Michael Chen',
    description: 'A mind-bending science fiction thriller about quantum physics.',
    category: 'Science Fiction',
    price: 14.99,
    coverImage: '/assets/11.avif',
    rating: 4.7,
    pages: 450,
    readingTime: 12
  },
  {
    id: '12',
    title: 'Cooking with Joy',
    author: 'Chef Maria Rodriguez',
    description: 'Delicious recipes and cooking techniques from around the world.',
    category: 'Cooking',
    price: 19.99,
    coverImage: '/assets/12.avif',
    rating: 4.8,
    pages: 200,
    readingTime: 4
  },
  {
    id: '13',
    title: 'The Great Adventure',
    author: 'Sarah Johnson',
    description: 'An epic tale of courage and discovery in a mystical land.',
    category: 'Adventure',
    price: 12.99,
    coverImage: '/assets/13.avif',
    rating: 4.5,
    pages: 320,
    readingTime: 8
  },
  {
    id: '14',
    title: 'Love in Paris',
    author: 'Emma Williams',
    description: 'A romantic story set in the beautiful streets of Paris.',
    category: 'Romance',
    price: 9.99,
    coverImage: '/assets/14.avif',
    rating: 4.2,
    pages: 280,
    readingTime: 6
  },
  {
    id: '15',
    title: 'The Quantum Mystery',
    author: 'Dr. Michael Chen',
    description: 'A mind-bending science fiction thriller about quantum physics.',
    category: 'Science Fiction',
    price: 14.99,
    coverImage: '/assets/15.avif',
    rating: 4.7,
    pages: 450,
    readingTime: 12
  },
  {
    id: '16',
    title: 'Cooking with Joy',
    author: 'Chef Maria Rodriguez',
    description: 'Delicious recipes and cooking techniques from around the world.',
    category: 'Cooking',
    price: 19.99,
    coverImage: '/assets/16.jpeg',
    rating: 4.8,
    pages: 200,
    readingTime: 4
  },
  {
    id: '17',
    title: 'The Great Adventure',
    author: 'Sarah Johnson',
    description: 'An epic tale of courage and discovery in a mystical land.',
    category: 'Adventure',
    price: 12.99,
    coverImage: '/assets/17.webp',
    rating: 4.5,
    pages: 320,
    readingTime: 8
  },
  {
    id: '18',
    title: 'Love in Paris',
    author: 'Emma Williams',
    description: 'A romantic story set in the beautiful streets of Paris.',
    category: 'Romance',
    price: 9.99,
    coverImage: '/assets/18.webp',
    rating: 4.2,
    pages: 280,
    readingTime: 6
  },
  {
    id: '19',
    title: 'The Quantum Mystery',
    author: 'Dr. Michael Chen',
    description: 'A mind-bending science fiction thriller about quantum physics.',
    category: 'Science Fiction',
    price: 14.99,
    coverImage: '/assets/19.webp',
    rating: 4.7,
    pages: 450,
    readingTime: 12
  },
  {
    id: '20',
    title: 'Cooking with Joy',
    author: 'Chef Maria Rodriguez',
    description: 'Delicious recipes and cooking techniques from around the world.',
    category: 'Cooking',
    price: 19.99,
    coverImage: '/assets/20.webp',
    rating: 4.8,
    pages: 200,
    readingTime: 4
  },
];

const mockUsers: User[] = [
  { id: '1', name: 'Alex Reader', email: 'alex@email.com', points: 850, readingTime: 85, booksRead: 12 },
  { id: '2', name: 'Sarah Bookworm', email: 'sarah@email.com', points: 720, readingTime: 72, booksRead: 8 },
  { id: '3', name: 'Mike Scholar', email: 'mike@email.com', points: 680, readingTime: 68, booksRead: 15 },
  { id: '4', name: 'Emma Pages', email: 'emma@email.com', points: 520, readingTime: 52, booksRead: 6 },
];

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [books] = useState<Book[]>(mockBooks);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [currentReadingBook, setCurrentReadingBook] = useState<Book | null>(null);
  const [leaderboard] = useState<User[]>(mockUsers.sort((a, b) => b.points - a.points));
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const categories = ['All', ...Array.from(new Set(books.map(book => book.category)))];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cartItems.reduce((sum, book) => sum + book.price, 0);
  const isLoggedIn = user !== null;

  useEffect(() => {
    const savedTheme = localStorage.getItem('library-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const savedUser = localStorage.getItem('library-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('library-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('library-theme', 'light');
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login logic
    if (email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        points: 0,
        readingTime: 0,
        booksRead: 0
      };
      setUser(newUser);
      localStorage.setItem('library-user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock signup logic
    if (name && email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        points: 0,
        readingTime: 0,
        booksRead: 0
      };
      setUser(newUser);
      localStorage.setItem('library-user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('library-user');
    setCartItems([]);
    setCurrentReadingBook(null);
  };

  const updateUserPoints = (points: number) => {
    if (user) {
      const updatedUser = { ...user, points: user.points + points };
      setUser(updatedUser);
      localStorage.setItem('library-user', JSON.stringify(updatedUser));
    }
  };

  const addToCart = (book: Book) => {
    if (!cartItems.find(item => item.id === book.id)) {
      setCartItems([...cartItems, book]);
    }
  };

  const removeFromCart = (bookId: string) => {
    setCartItems(cartItems.filter(item => item.id !== bookId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const startReading = (book: Book) => {
    setCurrentReadingBook(book);
  };

  const updateReadingProgress = (timeSpent: number) => {
    if (user) {
      const pointsEarned = Math.floor(timeSpent / 60) * 10; // 10 points per hour
      updateUserPoints(pointsEarned);
    }
  };

  const value: LibraryContextType = {
    isDarkMode,
    toggleTheme,
    user,
    isLoggedIn,
    login,
    signup,
    logout,
    updateUserPoints,
    books,
    filteredBooks,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    currentReadingBook,
    startReading,
    updateReadingProgress,
    leaderboard,
    showLeaderboard,
    setShowLeaderboard
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};