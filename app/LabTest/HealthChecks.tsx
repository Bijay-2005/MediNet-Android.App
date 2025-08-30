import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Header from "./Header";
import HealthPackageCard from "./HealthPackageCard";
import CollectionMethodSelector from "./CollectionMethodSelector";
import CartModal from "./CartModal";
import { useCart } from "@/app/routes/useCart";
import { healthPackages } from "./HealthPackages";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const HealthChecks = () => {
  const router = useRouter();
  const [collectionMethod, setCollectionMethod] = useState<"home" | "center" | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    clearCart,
    isInCart,
  } = useCart();

  const healthCheckPackages = healthPackages.filter(pkg => pkg.category === "health-checks");

  const handleAddToCart = (pkg: any) => {
    if (!collectionMethod) {
      toast({
        title: "Collection Method Required",
        description: "Please select a collection method before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    addToCart(pkg);
  };

  const handleProceedToPayment = () => {
    setIsCartOpen(false);
    clearCart();
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
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Health Check Packages</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive wellness packages for complete health overview
          </p>
        </div>

        {/* Collection Method Selector */}
        <div className="p-4">
          <CollectionMethodSelector
            selectedMethod={collectionMethod}
            onMethodChange={setCollectionMethod}
          />
        </div>

        {/* Health Packages */}
        <div className="p-4">
          <div className="space-y-3">
            {healthCheckPackages.map((pkg) => (
              <HealthPackageCard
                key={pkg.id}
                package={pkg}
                onAddToCart={handleAddToCart}
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

export default HealthChecks;