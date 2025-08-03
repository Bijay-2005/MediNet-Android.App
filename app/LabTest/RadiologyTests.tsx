import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "./Header";
import HealthPackageCard from "./HealthPackageCard";
import CartModal from "./CartModal";
import { useCart } from "@/app/routes/useCart";
import { healthPackages } from "./healthPackages";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const RadiologyTests = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    clearCartAfterPayment,
    isInCart,
  } = useCart();

  const radiologyPackages = healthPackages.filter(pkg => pkg.category === "radiology");

  const handleProceedToPayment = () => {
    setIsCartOpen(false);
    clearCartAfterPayment();
    toast({
      title: "Payment Successful!",
      description: "Your order has been confirmed. Thank you!",
    });
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <Header
        cartItemsCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="pt-16 pb-20">
        {/* Header with back button */}
        <div className="p-4 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Radiology & Imaging</h1>
          <p className="text-muted-foreground mt-1">
            Advanced imaging services available at our centers
          </p>
        </div>

        {/* Note about center-only collection */}
        <div className="p-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> All radiology tests are only available at our centers.
            </p>
          </div>
        </div>

        {/* Radiology Tests */}
        <div className="p-4">
          <div className="space-y-3">
            {radiologyPackages.map((pkg) => (
              <HealthPackageCard
                key={pkg.id}
                package={pkg}
                onAddToCart={addToCart}
                isSelected={isInCart(pkg.id)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onProceedToPayment={handleProceedToPayment}
      />
    </div>
  );
};

export default RadiologyTests;