import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, CreditCard, Truck } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { Button } from '../ui/button';
import PaymentModal from './PaymentModal';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart, cartTotal, isLoggedIn } = useLibrary();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert('Please login to proceed with checkout');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    clearCart();
    setShowPaymentModal(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-background border border-border rounded-2xl shadow-strong max-w-lg w-full max-h-[80vh] overflow-hidden animate-bounce-in">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
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

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto max-h-96">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground text-center">
                  Add some books to get started with your reading journey!
                </p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {cartItems.map((book) => (
                  <div key={book.id} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded-md shadow-soft"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <p className="font-bold text-primary">${book.price}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(book.id)}
                      className="p-2 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="flex-1"
                >
                  Clear Cart
                </Button>
                <Button
                  onClick={handleCheckout}
                  className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Checkout
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Truck className="h-4 w-4" />
                  <span>Free delivery</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CreditCard className="h-4 w-4" />
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        total={cartTotal}
        items={cartItems}
      />
    </>
  );
};

export default CartModal;