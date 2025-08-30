import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Equipment {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  emergency?: boolean;
  available: boolean;
}

interface SearchResultsProps {
  searchQuery: string;
  onAddToCart: (item: Omit<Equipment, 'available' | 'category'>) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  onAddToCart,
}) => {
  // All equipment data for searching
  const allEquipment: Equipment[] = [
    // Featured equipment
    {
      id: "eq-001",
      name: "Digital Blood Pressure Monitor",
      price: 25,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      category: "monitoring",
      emergency: false,
      available: true,
    },
    {
      id: "eq-002", 
      name: "Oxygen Concentrator",
      price: 150,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
      category: "oxygen",
      emergency: true,
      available: true,
    },
    {
      id: "eq-003",
      name: "Manual Wheelchair",
      price: 35,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
      category: "mobility",
      emergency: false,
      available: true,
    },
    {
      id: "eq-004",
      name: "Hospital Bed",
      price: 120,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      category: "beds",
      emergency: false,
      available: false,
    },
    {
      id: "eq-005",
      name: "Nebulizer Machine",
      price: 45,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
      category: "respiratory",
      emergency: true,
      available: true,
    },
    // Category equipment examples
    {
      id: "bed-001",
      name: "Electric Hospital Bed",
      price: 85,
      image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=300&h=200&fit=crop",
      category: "beds",
      emergency: false,
      available: true,
    },
    {
      id: "oxy-001",
      name: "Portable Oxygen Tank",
      price: 65,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
      category: "oxygen",
      emergency: true,
      available: true,
    },
    {
      id: "mob-001",
      name: "Walking Frame with Wheels",
      price: 32,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
      category: "mobility",
      emergency: false,
      available: true,
    },
    {
      id: "mon-001",
      name: "Pulse Oximeter",
      price: 18,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      category: "monitoring",
      emergency: false,
      available: true,
    },
    {
      id: "ther-001",
      name: "Physical Therapy Mat",
      price: 25,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      category: "therapy",
      emergency: false,
      available: true,
    },
    {
      id: "resp-001",
      name: "CPAP Machine",
      price: 180,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
      category: "respiratory",
      emergency: true,
      available: true,
    },
    {
      id: "surg-001",
      name: "Surgical Light",
      price: 200,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=200&fit=crop",
      category: "surgical",
      emergency: false,
      available: true,
    },
    {
      id: "img-001",
      name: "Portable X-Ray Machine",
      price: 450,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      category: "imaging",
      emergency: true,
      available: true,
    },
    {
      id: "rehab-001",
      name: "Rehabilitation Bike",
      price: 95,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      category: "rehabilitation",
      emergency: false,
      available: true,
    },
  ];

  const filteredEquipment = allEquipment.filter(equipment =>
    equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    equipment.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!searchQuery.trim()) {
    return null;
  }

  if (filteredEquipment.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">No equipment found for "{searchQuery}"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Search Results for "{searchQuery}"
        </h2>
        <p className="text-muted-foreground">
          Found {filteredEquipment.length} equipment{filteredEquipment.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-4">
        {filteredEquipment.map((equipment) => (
          <div key={equipment.id} className="bg-card border border-border rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow">
            <div className="relative w-24 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
              <img
                src={equipment.image}
                alt={equipment.name}
                className="w-full h-full object-cover"
              />
              {equipment.emergency && (
                <Badge
                  variant="destructive"
                  className="absolute top-1 right-1 bg-medical-red text-white text-xs"
                >
                  Emergency
                </Badge>
              )}
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{equipment.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {equipment.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <span className="text-primary font-bold text-lg">
                    ${equipment.price}/day
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${equipment.available ? 'text-green-600' : 'text-red-600'}`}>
                  {equipment.available ? 'Available' : 'Out of Stock'}
                </span>
                <Button
                  onClick={() => onAddToCart(equipment)}
                  disabled={!equipment.available}
                  className="px-6"
                >
                  {equipment.available ? 'Add to Cart' : 'Not Available'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};