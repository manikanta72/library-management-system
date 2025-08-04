import React, { useState } from 'react';
import { X, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  total: number;
  items: Book[];
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  total, 
  items 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    address: '',
    city: '',
    zipCode: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
        setIsSuccess(false);
      }, 2000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-background border border-border rounded-2xl shadow-strong max-w-md w-full animate-bounce-in">
          <div className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4 animate-bounce-in" />
            <h2 className="text-2xl font-bold text-success mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-4">
              Your order has been placed successfully. You will receive a confirmation email shortly.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold">Order Total: <span className="text-primary">${total.toFixed(2)}</span></p>
              <p className="text-sm text-muted-foreground">{items.length} item(s) purchased</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-2xl shadow-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-bounce-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">Complete Your Purchase</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold mb-3">Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-border'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'online' | 'cod')}
                  className="text-primary"
                />
                <CreditCard className="h-5 w-5 text-primary" />
                <span>Online Payment</span>
              </label>

              <label className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'online' | 'cod')}
                  className="text-primary"
                />
                <Truck className="h-5 w-5 text-primary" />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* Card Details (for online payment) */}
          {paymentMethod === 'online' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Card Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="col-span-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Cardholder Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Delivery Address */}
          <div className="space-y-4">
            <h3 className="font-semibold">Delivery Address</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 py-3"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Payment...</span>
              </div>
            ) : (
              `Complete Purchase - $${total.toFixed(2)}`
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            {paymentMethod === 'cod' && ' Payment will be collected upon delivery.'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;