import React from 'react';
import { Search, MapPin, ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLocation: string;
  onLocationSelect: (location: string) => void;
  onMapOpen: () => void;
  cartItemCount: number;
  onCartOpen: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedLocation,
  onLocationSelect,
  onMapOpen,
  cartItemCount,
  onCartOpen,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4 w-full">
          {/* Search Bar */}
          <div className="flex items-center flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medical equipment..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Location Tab Button */}
          <Button
            variant="outline"
            onClick={onMapOpen}
            className="flex items-center gap-2 px-4 py-2 border-2 border-primary/20 hover:border-primary hover:bg-primary/5"
          >
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">
              {selectedLocation || 'Select Location'}
            </span>
            <span className="sm:hidden">Location</span>
          </Button>

          {/* Cart Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={onCartOpen}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </Badge>
            )}
          </Button>
        </div>

      </div>
    </header>
  );
};