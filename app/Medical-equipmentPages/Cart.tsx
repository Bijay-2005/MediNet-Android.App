import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard, Clock, Smartphone, Building2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  emergency?: boolean;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateItem: (id: string, quantity: number) => void;
  total: number;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateItem,
  total,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });
  const { toast } = useToast();

  const emergencyItems = items.filter(item => item.emergency);
  const regularItems = items.filter(item => !item.emergency);
  const finalTotal = total + 15 + (emergencyItems.length > 0 ? 25 : 0);

  const handleCheckout = () => {
    if (!paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue.",
        variant: "destructive",
      });
      return;
    }
    setShowPaymentForm(true);
  };

  const handlePayment = () => {
    // Simulate payment processing
    setShowPaymentForm(false);
    setShowSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setPaymentMethod('');
      setPaymentDetails({
        upiId: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
      });
      onClose();
    }, 3000);
  };

  if (items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 flex items-center justify-center h-64">
            <div className="text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-2">
                Add medical equipment to get started
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {/* Emergency Items Section */}
          {emergencyItems.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="bg-emergency-bg border-emergency-border text-medical-red">
                  <Clock className="w-3 h-3 mr-1" />
                  Emergency Items
                </Badge>
              </div>
              
              {emergencyItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={(quantity) => onUpdateItem(item.id, quantity)}
                />
              ))}
              
              {regularItems.length > 0 && <Separator />}
            </div>
          )}

          {/* Regular Items */}
          {regularItems.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onUpdateQuantity={(quantity) => onUpdateItem(item.id, quantity)}
            />
          ))}
        </div>

        {/* Cart Summary & Payment */}
        <div className="border-t pt-4 space-y-4">
          {showSuccess ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-green-600">Payment Successful!</h3>
                <p className="text-sm text-muted-foreground">
                  Order total: ${finalTotal.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  You will receive a confirmation email shortly.
                </p>
              </div>
            </div>
          ) : showPaymentForm ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Payment Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPaymentForm(false)}
                >
                  Back
                </Button>
              </div>

              {paymentMethod === 'upi' && (
                <div className="space-y-3">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input
                    id="upi-id"
                    placeholder="example@paytm"
                    value={paymentDetails.upiId}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, upiId: e.target.value }))}
                  />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      value={paymentDetails.cardName}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={paymentDetails.expiryDate}
                        onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentDetails.cvv}
                        onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    You will be redirected to your bank's website
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    Pay when your order is delivered
                  </p>
                </div>
              )}

              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total Amount</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                className="w-full"
                size="lg"
              >
                Complete Payment
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>$15.00</span>
                </div>
                {emergencyItems.length > 0 && (
                  <div className="flex justify-between text-sm text-medical-amber">
                    <span>Emergency Delivery</span>
                    <span>$25.00</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Select Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        <span>UPI (PhonePe, Google Pay, UPI ID)</span>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>Net Banking</span>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Credit/Debit Card</span>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>Cash on Delivery</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Proceed to Checkout
              </Button>

              {emergencyItems.length > 0 && (
                <p className="text-xs text-center text-medical-amber">
                  Emergency items will be delivered within 2 hours
                </p>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onUpdateQuantity }) => {
  return (
    <div className="flex gap-3 p-3 border rounded-lg">
      <div className="relative w-16 h-16 bg-muted rounded overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {item.emergency && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-medical-red"
          >
            !
          </Badge>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
        <p className="text-primary font-semibold text-sm">
          ${item.price}/day
        </p>
        
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity(item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="text-sm font-medium w-8 text-center">
            {item.quantity}
          </span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdateQuantity(item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
            onClick={() => onUpdateQuantity(0)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};