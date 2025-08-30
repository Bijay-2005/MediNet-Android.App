import { useState, useMemo } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import CategoryTabs from "./CatagoryTab";
import HeroSection from "./HeroSection";
import HealthPackageCard from "./HealthPackageCard";
import CollectionMethodSelector from "./CollectionMethodSelector";
import TestimonialsSection from "./TestimonialsSection";
import CartModal from "./CartModal";
import AdvertiesingCarousel from "./AdvertiesingCarousel";

import { useCart } from "@/app/routes/useCart";  
import { healthPackages } from "./HealthPackages";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("health-checks");
  const [collectionMethod, setCollectionMethod] = useState<"home" | "center" | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    clearCart,
    isInCart,
  } = useCart();

  const getFilteredPackages = () => {
    let packages = healthPackages;
    
    // Apply search filter across all categories if search query exists
    if (searchQuery.trim()) {
      packages = packages.filter((pkg: any) => 
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.features.some((feature: any) => feature.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    } else {
      // Only filter by category if no search query
      packages = packages.filter((pkg: any) => pkg.category === activeTab);
    }
    
    return packages;
  };

  const filteredPackages = getFilteredPackages();

  const handleAddToCart = (pkg: any) => {
    if ((activeTab === "lab-tests" || activeTab === "health-checks") && !collectionMethod) {
      toast({
        title: "Collection Method Required",
        description: "Please select a collection method before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    addToCart(pkg);
  };

  const handleViewMore = () => {
    if (activeTab === "health-checks") {
      router.push("/health-checks");
    } else if (activeTab === "lab-tests") {
      router.push("/lab-tests");
    } else if (activeTab === "radiology") {
      router.push("/radiology");
    }
  };

  const handleProceedToPayment = () => {
    setIsCartOpen(false);
    clearCart();
    toast({
      title: "Payment Successful!",
      description: "Your order has been confirmed. Thank you!",
    });
    // Here you would integrate with your payment system
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <Header
        cartItemsCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Advertising Cards */}
        <section className="py-4 bg-background">
          <div className="container mx-auto px-4">
            <AdvertiesingCarousel />
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-6 bg-background">
          <div className="container mx-auto px-4">
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </section>

        {/* Category Tabs */}
        <section className="py-4 bg-background">
          <div className="container mx-auto px-4">
            <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </section>

        {/* Health Packages */}
        <section className="py-6 bg-background">
          <div className="container mx-auto px-4">
            {searchQuery ? (
              <div className="bg-card border border-border rounded-lg p-4 shadow-card">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Search Results
                </h2>
                <p className="text-muted-foreground mb-4">
                  Found {filteredPackages.length} result(s) for "{searchQuery}"
                </p>
                <div className="space-y-3">
                  {filteredPackages.map((pkg: any) => (
                    <HealthPackageCard
                      key={pkg.id}
                      package={pkg}
                      onAddToCart={handleAddToCart}
                      isSelected={isInCart(pkg.id)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-4 shadow-card">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {activeTab === "health-checks" && "Comprehensive Health Packages"}
                  {activeTab === "lab-tests" && "Book a Lab Test"}
                  {activeTab === "radiology" && "Advanced Radiology and Imaging"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {activeTab === "health-checks" && "Choose from our curated wellness packages for a complete health overview."}
                  {activeTab === "lab-tests" && "Select one or more tests and choose your preferred collection method."}
                  {activeTab === "radiology" && "High-quality scans with fast, accurate reporting. Collection only available at centres."}
                </p>
                
                <div className="space-y-3 mb-4">
                  {filteredPackages.slice(0, 3).map((pkg: any) => (
                    <HealthPackageCard
                      key={pkg.id}
                      package={pkg}
                      onAddToCart={handleAddToCart}
                      isSelected={isInCart(pkg.id)}
                    />
                  ))}
                </div>

                {filteredPackages.length > 3 && (
                  <div className="text-center mb-4">
                    <Button variant="outline" className="w-full" onClick={handleViewMore}>
                      View More Tests
                    </Button>
                  </div>
                )}

                {/* Collection Method Selector - Hidden for radiology */}
                {activeTab !== "radiology" && (
                  <CollectionMethodSelector
                    selectedMethod={collectionMethod}
                    onMethodChange={setCollectionMethod}
                  />
                )}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Footer */}
        <footer className="bg-muted py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              © 2025 LabLink. All rights reserved.
            </p>
          </div>
        </footer>
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

export default Index;
