import React, { useState } from 'react';
import { SearchHeader } from './SearchHeader';
import { EquipmentCarousel } from './EquipmentCarousel';
import { CategorySection } from './CategorySection';
import { Cart } from './Cart';
import { MapModal } from './MapModal';
import { SearchResults } from './searchResult';
import { useRouter } from 'next/navigation';      

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  emergency?: boolean;
}

const Index = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  // Remove showAbout state

  // Sample equipment card data
  const featuredEquipment = {
    id: 'About Equipment',
    title: 'Know about Equipment and Its usage',
    about: 'Reliable Medical Equipment, When You Need It Most ,Why buy just rent to home',
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartItem = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);



  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Search Header */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
        onMapOpen={() => setIsMapOpen(true)}
        cartItemCount={cartItemCount}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-8">
        {searchQuery.trim() ? (
          <SearchResults searchQuery={searchQuery} onAddToCart={addToCart} />
        ) : (
          <>
            {/* Equipment Carousel */}
            <EquipmentCarousel onAddToCart={addToCart} />

            {/* Category Sections */}
            <div className="space-y-8">
              <CategorySection
                title="Hospital Beds"
                category="beds"
                onAddToCart={addToCart}
              />
              <CategorySection
                title="Oxygen Equipment"
                category="oxygen"
                onAddToCart={addToCart}
              />
              <CategorySection
                title="Mobility Equipment"
                category="mobility"
                onAddToCart={addToCart}
              />
              <CategorySection
                title="Monitoring Devices"
                category="monitoring"
                onAddToCart={addToCart}
              />
              <CategorySection
                title="Therapy Devices"
                category="therapy"
                onAddToCart={addToCart}
              />
              <CategorySection
                title="Respiratory Equipment"
                category="respiratory"
                onAddToCart={addToCart}
              />
              <CategorySection
                title="Surgical Equipment"
                category="surgical"
                onAddToCart={addToCart}
              />
              <CategorySection
                title="Imaging Equipment"
                category="imaging"
                onAddToCart={addToCart}
              />
              <CategorySection
                title="Rehabilitation Equipment"
                category="rehabilitation"
                onAddToCart={addToCart}
              />
            </div>
{/* Featured Equipment Card at the end */}
<div className="relative p-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out group">
  {/* Decorative background elements */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-12 translate-y-12"></div>
  
  <h3 className="relative text-2xl font-bold mb-3 text-white group-hover:text-blue-100 transition-colors duration-300">
    {featuredEquipment.title}
  </h3>
  
  <p className="relative text-white/90 mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
    {featuredEquipment.about}
  </p>
  
  <button 
    className="relative w-full py-3 px-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 border border-white/30 hover:border-white/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
    onClick={() => router.push('/Medical-equipmentPages/equipment-about')}
  >
    <span className="flex items-center justify-center gap-2">
      View Details
      <svg 
        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </span>
  </button>
</div>
</>
        )}
      </main>
      {/* Remove About Equipment Modal */}

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateItem={updateCartItem}
        total={cartTotal}
      />

      {/* Map Modal */}
      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onLocationSelect={setSelectedLocation}
      />
    </div>
  );
};

export default Index;