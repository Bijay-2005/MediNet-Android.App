"use client"
import { SearchSection } from "./SearchSection";  
import { UploadPrescription } from "./UploadPrescription";
import { CategoriesGrid } from "./CatagoriesGrid";
import { PromotionalBannerCarousel } from "./PromotionalBannerCarousel";
import { QuickActions } from "./QuickActions";
import { MedicineGrid } from "./MedicineGrid";
import { LocationModal } from "./LocationModal";
import { CartSheet } from "./CartSheet";
import { SidebarSheet } from "./SidebarSheet";
import { AdvertiseCard } from "./advertisecard";
import { ArrowLeft, ShoppingCart, MapPin, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useCart } from "./UseCart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const Index = () => {
  const router = useRouter();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    getTotalItems,
    getTotalAmount,
    clearCart
  } = useCart();
  const handleAddToCart = (medicine?: any) => {
    // Add specific medicine to cart or default sample
    const item = medicine || {
      id: `medicine-${Date.now()}`,
      name: "Aspirin 75mg",
      price: 9.99,
      dosage: "75mg - 28 tablets"
    };
    addToCart(item);
    toast.success("Medicine added to cart!");
  };
  const handleCheckout = () => {
    toast.success("Redirecting to payment...");
    // Here you would implement the actual payment flow
    console.log("Proceeding to checkout with items:", cartItems);
    console.log("Total amount:", getTotalAmount() + 2.99); // Including delivery fee
  };
  return <div className="min-h-screen bg-background">
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-gradient-to-r from-green-600 via-green-500 to-green-400 backdrop-blur supports-[backdrop-filter]:bg-green-500/95 border-b border-green-700 shadow-xl">
          <div className="flex h-14 sm:h-16 items-center px-3 sm:px-4 lg:px-6">
            <div className="flex flex-col items-start gap-1">
              {/* MedPharma Logo */}
              <div className="flex items-center group">
                <h1 className="text-lg sm:text-xl font-bold text-white transition-all duration-300 group-hover:text-green-100 group-hover:scale-105 cursor-pointer">
                  MedPharma
                </h1>
              </div>
              
              {/* Location */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1 sm:gap-2 text-xs h-6 -ml-3 hover:bg-white/20 transition-all duration-200 hover:scale-105 text-white" 
                onClick={() => setIsLocationModalOpen(true)}
              >
                <MapPin className="h-3 w-3 text-white" />
                <span className="text-xs text-white/90 hover:text-white transition-colors max-w-[80px] sm:max-w-none truncate">{selectedLocation}</span>
              </Button>
            </div>
            
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              {/* Cart */}
              <CartSheet cartItems={cartItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} onCheckout={handleCheckout}>
                <Button variant="ghost" size="sm" className="gap-1 sm:gap-2 relative h-9 sm:h-10 hover:bg-white/20 transition-all duration-200 hover:scale-105 text-white">
                  <ShoppingCart className="h-4 w-4 text-white" />
                  {getTotalItems() > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-red-500 animate-pulse">
                      {getTotalItems()}
                    </Badge>}
                  <span className="hidden sm:inline text-white/90 hover:text-white transition-colors">Cart</span>
                </Button>
              </CartSheet>
              
              {/* Sidebar Menu Button */}
              <SidebarSheet>
                <Button variant="ghost" size="sm" className="gap-2 h-9 sm:h-10 hover:bg-white/20 transition-all duration-200 hover:scale-105 text-white">
                  <Menu className="h-4 w-4 text-white" />
                </Button>
              </SidebarSheet>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Shop Medicines Header */}
          <div className="flex items-center animate-fade-in">
            <h1 className="text-xl sm:text-2xl font-bold text-green-600">
              Shop Medicines
            </h1>
          </div>

          {/* Promotional Banner Carousel */}
          <PromotionalBannerCarousel />

          {/* Search Section */}
          <SearchSection />

          {/* Upload Prescription */}
          <UploadPrescription />

          {/* Categories Grid */}
          <CategoriesGrid />

          {/* Medicine Grid */}
          <MedicineGrid onAddToCart={handleAddToCart} />

          {/* Quick Actions */}
          <QuickActions />

          {/* Footer */}
          <footer className="mt-8 sm:mt-12 lg:mt-16 py-6 sm:py-8 pb-20 sm:pb-8 border-t text-center text-sm text-muted-foreground">
            <div className="space-y-2">
              <p>© 2024 MedPharma. All rights reserved.</p>
              <p>
                Contact:{" "}
                <a href="mailto:support@medpharma.com" className="text-primary hover:underline">
                  support@medpharma.com
                </a>
              </p>
            </div>
          </footer>
        </div>
      </main>
      
      {/* Location Modal */}
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} onLocationSelect={setSelectedLocation} />
    </div>;
};
export default Index;