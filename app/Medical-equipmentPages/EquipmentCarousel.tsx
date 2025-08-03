import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Clock } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  emergency?: boolean;
  available: boolean;
}

interface EquipmentCarouselProps {
  onAddToCart: (item: Omit<Equipment, 'available' | 'category'>) => void;
}

export const EquipmentCarousel: React.FC<EquipmentCarouselProps> = ({ onAddToCart }) => {
  const featuredEquipment: Equipment[] = [
    {
      id: 'eq-001',
      name: 'Digital Blood Pressure Monitor',
      price: 25,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwlx7Tp2RwbOPD33kd-p2Bi5pAVx5sfNWSuA&s', // placeholder image
      category: 'monitoring',
      emergency: false,
      available: true,
    },
    {
      id: 'eq-002', 
      name: 'Oxygen Concentrator',
      price: 150,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvRgbvSiSsUNve4bS9-vES_nBhBJxuVkgGew&s',
      category: 'oxygen',
      emergency: true,
      available: true,
    },
    {
      id: 'eq-003',
      name: 'Manual Wheelchair',
      price: 35,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKo29qVQaKVOGNWSYzcB6PAzPqbod4pZ9xCg&s',
      category: 'mobility',
      emergency: false,
      available: true,
    },
    {
      id: 'eq-004',
      name: 'Hospital Bed',
      price: 120,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStt91YCMtZ2ItwAQvPsO8dkwb9lkRloat34g&s',
      category: 'beds',
      emergency: false,
      available: true,
    },
    {
      id: 'eq-005',
      name: 'Nebulizer Machine',
      price: 45,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhrz0hy6ZBfB8-jBbXB5Er7tnED5VpR_7tng&s',
      category: 'respiratory',
      emergency: true,
      available: true,
    },
    {
      id: 'eq-006',
      name: 'Walking Frame',
      price: 28,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuxoRrUfoqlSv38Qa-6IN8Qy0sQw6JfusdNw&s',
      category: 'mobility',
      emergency: false,
      available: true,
    },
    {
      id: 'eq-007',
      name: 'CPAP Machine',
      price: 180,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCBTHgBQbBtW-6mcF01-XA6aXqSnFBctROw&s',
      category: 'respiratory',
      emergency: true,
      available: true,
    },
    {
      id: 'eq-008',
      name: 'Multi Parameter Monitor',
      price: 15,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Hk7a1YawQRn0EY8C5kaLlrQ06EkgE3otQw&s',
      category: 'monitoring',
      emergency: false,
      available: true,
    },
    {
      id: 'eq-009',
      name: 'Electric Wheelchair',
      price: 250,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyin2XF98hxGFJba5qObGOS4rPjloBo9WEBg&s',
      category: 'mobility',
      emergency: false,
      available: true,
    },
    {
      id: 'eq-010',
      name: 'Syringe Pump',
      price: 200,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfPqJ1rnK18izVEuo1DYXjMhU1nvDbu5IC_w&s',
      category: 'beds',
      emergency: false,
      available: true,
    },
    {
      id: 'eq-011',
      name: 'Portable Ventilator',
      price: 500,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgX7JipowyjPCWhHOSiLzalRavsQtESHbM-vMVWWaL7jRKNEcBWyR1Y_wzpsSXHb4yAnU&usqp=CAU',
      category: 'respiratory',
      emergency: true,
      available: true,
    },
    {
      id: 'eq-012',
      name: 'Crutches Pair',
      price: 20,
      image: 'https://m.media-amazon.com/images/I/71IRTLZ8NpL.jpg',
      category: 'mobility',
      emergency: false,
      available: true,
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Equipment</h2>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          12 Items Available
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {featuredEquipment.slice(0, 12).map((equipment) => (
          <div key={equipment.id} className="bg-card border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
            <div className="relative w-full aspect-[4/3] bg-muted rounded overflow-hidden mb-3">
              <img
                src={equipment.image}
                alt={equipment.name}
                className="w-full h-full object-cover"
              />
              {equipment.emergency && (
                <Badge
                  variant="destructive"
                  className="absolute top-2 right-2 bg-medical-red text-white text-xs px-1 py-0.5"
                >
                  !
                </Badge>
              )}
              {!equipment.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">Out of Stock</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-sm line-clamp-2 leading-tight min-h-[2.5rem]">
                {equipment.name}
              </h3>
              <div className="flex flex-col gap-2">
                <span className="text-primary font-bold text-sm">
                  ${equipment.price}/day
                </span>
                <Button
                  size="sm"
                  onClick={() => onAddToCart({
                    id: equipment.id,
                    name: equipment.name,
                    price: equipment.price,
                    image: equipment.image,
                    emergency: equipment.emergency,
                  })}
                  disabled={!equipment.available}
                  className="w-full h-8 text-xs"
                >
                  {equipment.available ? 'Add' : 'N/A'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};