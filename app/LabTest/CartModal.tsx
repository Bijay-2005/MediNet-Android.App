import { useState } from "react";
import { X, ArrowLeft, MapPin, Trash2, CreditCard, Smartphone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CartItem, DiagnosticCenter } from "@/types";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (packageId: string, quantity: number) => void;
  onRemoveItem: (packageId: string) => void;
  onProceedToPayment: () => void;
}

const CartModal = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToPayment,
}: CartModalProps) => {
  const [step, setStep] = useState<"cart" | "center" | "payment">("cart");
  const [selectedCenter, setSelectedCenter] = useState<DiagnosticCenter | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const diagnosticCenters: DiagnosticCenter[] = [
    { id: "1", name: "Apex Diagnostics", distance: "2.1 km away" },
    { id: "2", name: "WellPath Labs", distance: "3.5 km away" },
    { id: "3", name: "City Health Scans", distance: "4.2 km away" },
  ];

  const subtotal = cartItems.reduce((sum: any, item: any) => sum + (item.package.price * item.quantity), 0);
  const convenienceFee = 0;
  const total = subtotal + convenienceFee;

  const paymentOptions = [
    { id: "phonepe", name: "PhonePe", icon: Smartphone, type: "upi" },
    { id: "googlepay", name: "Google Pay", icon: Smartphone, type: "upi" },
    { id: "debit", name: "Debit Card", icon: CreditCard, type: "card" },
    { id: "credit", name: "Credit Card", icon: CreditCard, type: "card" },
  ];

  if (step === "payment") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center space-y-0">
            <Button variant="ghost" size="icon" onClick={() => setStep("center")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <DialogTitle className="ml-2">Payment Options</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-muted-foreground">Choose your preferred payment method</p>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                <h4 className="font-medium text-sm">UPI</h4>
                {paymentOptions.filter(option => option.type === "upi").map((option) => {
                  const Icon = option.icon;
                  return (
                    <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Icon className="w-5 h-5 text-primary" />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        {option.name}
                      </Label>
                    </div>
                  );
                })}
                
                <h4 className="font-medium text-sm mt-4">Cards</h4>
                {paymentOptions.filter(option => option.type === "card").map((option) => {
                  const Icon = option.icon;
                  return (
                    <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Icon className="w-5 h-5 text-primary" />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        {option.name}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience Fee</span>
                <span>₹{convenienceFee}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Button
              onClick={onProceedToPayment}
              className="w-full"
              size="lg"
              disabled={!paymentMethod}
            >
              Pay ₹{total}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (step === "center") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center space-y-0">
            <Button variant="ghost" size="icon" onClick={() => setStep("cart")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <DialogTitle className="ml-2">Select a Diagnostic Centre</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-muted-foreground">Please visit your selected lab for the test.</p>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Showing centers near you.</span>
              <Button variant="link" className="p-0 h-auto text-primary">
                Change location
              </Button>
            </div>

            <div className="space-y-3">
              {diagnosticCenters.map((center: any) => (
                <Card
                  key={center.id}
                  className={`cursor-pointer transition-colors ${
                    selectedCenter?.id === center.id ? "ring-2 ring-primary" : ""   
                  }`}
                  onClick={() => setSelectedCenter(center)}
                >
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{center.name}</h4>
                      <p className="text-sm text-muted-foreground">{center.distance}</p>  
                    </div>
                    <Button variant="default" size="sm">
                      Select
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-semibold">Price Details</h3>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience Fee (Home)</span>
                <span>₹{convenienceFee}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Button
              onClick={() => setStep("payment")}
              className="w-full"
              size="lg"
              disabled={!selectedCenter}
            >
              Proceed to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Summary</DialogTitle>
        </DialogHeader>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button onClick={onClose} className="mt-4">Continue Shopping</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item: any, index: any) => (
                <Card key={item.package.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🩺</span>
                      <div>
                        <h4 className="font-medium">{item.package.name}</h4>
                        <p className="text-sm text-muted-foreground">₹{item.package.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.package.id, Math.max(0, item.quantity - 1))}
                        >
                          -
                        </Button>
                        <span className="px-2">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.package.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveItem(item.package.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            {/* Price Details */}
            <div className="space-y-2">
              <h3 className="font-semibold">Price Details</h3>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience Fee (Home)</span>
                <span>₹{convenienceFee}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                  <span>₹{total}</span>
              </div>
            </div>

            <Button
              onClick={() => setStep("center")}
              className="w-full"
              size="lg"
            >
              Select Diagnostic Centre
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;