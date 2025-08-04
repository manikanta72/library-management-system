import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, BookOpen, Sun, Moon, Trophy } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import AuthModal from './modals/AuthModal';
import CartModal from './modals/CartModal';
import { Button } from './ui/button';

const Navbar = () => {
  const { 
    isDarkMode, 
    toggleTheme, 
    isLoggedIn, 
    user, 
    logout,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cartItems,
    setShowLeaderboard
  } = useLibrary();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Authors', href: '#authors' },
    { name: 'Books', href: '#books' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                LibraryHub
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}

              {/* Category Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center space-x-1"
                >
                  <span>Categories</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>

                {showCategoryDropdown && (
                  <div className="absolute top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-medium z-50">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowCategoryDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                          selectedCategory === category ? 'bg-primary text-primary-foreground' : ''
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search books, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted transition-all duration-300"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-primary animate-fade-in" />
                ) : (
                  <Moon className="h-5 w-5 text-primary animate-fade-in" />
                )}
              </Button>

              {/* Leaderboard */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLeaderboard(true)}
                className="hidden md:flex items-center space-x-2 hover:bg-muted transition-all duration-300"
              >
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm">Leaderboard</span>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCartModal(true)}
                className="relative p-2 rounded-full hover:bg-muted transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5 text-primary" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-bounce-in">
                    {cartItems.length}
                  </span>
                )}
              </Button>

              {/* User Menu */}
              {isLoggedIn ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-2 hover:bg-muted transition-all duration-300"
                  >
                    <User className="h-5 w-5 text-primary" />
                    <span className="hidden md:block text-sm">{user?.name}</span>
                    <div className="hidden md:flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded-full">
                      <Trophy className="h-3 w-3 text-primary" />
                      <span className="text-xs text-primary font-semibold">{user?.points}</span>
                    </div>
                  </Button>

                  {showUserDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-medium z-50">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                        <p className="text-sm text-primary font-semibold">{user?.points} points</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-destructive hover:bg-muted transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2"
              >
                {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search books, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-background border-t border-border animate-slide-in">
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.name}
                </a>
              ))}
              
              <div className="border-t border-border pt-4">
                <h3 className="text-sm font-semibold mb-2">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowMobileMenu(false);
                      }}
                      className={`text-left p-2 rounded hover:bg-muted transition-colors ${
                        selectedCategory === category ? 'bg-primary text-primary-foreground' : ''
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  setShowLeaderboard(true);
                  setShowMobileMenu(false);
                }}
                variant="outline"
                className="w-full justify-start"
              >
                <Trophy className="h-4 w-4 mr-2" />
                View Leaderboard
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <CartModal isOpen={showCartModal} onClose={() => setShowCartModal(false)} />
    </>
  );
};

export default Navbar;