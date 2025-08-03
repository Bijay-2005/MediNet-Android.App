import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Clock, ChevronRight } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  price: number;
  image: string;
  emergency?: boolean;
  available: boolean;
}

interface CategorySectionProps {
  title: string;
  category: string;
  onAddToCart: (item: Omit<Equipment, 'available'>) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  category,
  onAddToCart,
}) => {
  const [showAll, setShowAll] = useState(false);
  const getEquipmentByCategory = (cat: string): Equipment[] => {
    const equipmentData = {
      beds: [
        {
          id: 'bed-1',
          name: 'Electric Hospital Bed',
          price: 85,
          image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
        {
          id: 'bed-2',
          name: 'Manual Hospital Bed',
          price: 60,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd5F9_0-a5Y9CQ-yYBd4Vc5oTvjsnGq3UKzA&s',
          available: true,
        },
        {
          id: 'bed-3',
          name: 'ICU Bed with Monitor',
          price: 150,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfdxuiHrAapmRjcwI37paWHO0sDNcQ3GscBw&s',
          emergency: true,
          available: true,
        },
        {
          id: 'bed-4',
          name: 'Pediatric Hospital Bed',
          price: 70,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw6Vz_GnZcMWtawJubmsVxlrtycMUEt3NTcg&s',
          available: true,
        },
        {
          id: 'bed-5',
          name: 'Bariatric Hospital Bed',
          price: 120,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpmcxWQ39fZNEpmbNNZZTM_RNnk3TVpFPbUA&s',
          available: true,
        },
      ],
      oxygen: [
        {
          id: 'oxy-1',
          name: 'Portable Oxygen Concentrator',
          price: 65,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB2QnS1m9-bVNYeHKBU_M5R0kzWOELMbGt2w&s',
          emergency: true,
          available: true,
        },
        {
          id: 'oxy-2',
          name: 'Oxygen Cylinder with Regulator',
          price: 40,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuU0thdHP_DpsEB9d5ogfUp3sg1J_EA6Ygxg&s',
          available: true,
        },
        {
          id: 'oxy-3',
          name: 'BiPAP Machine',
          price: 80,
          image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5p1R5msIwWIcds9J6l5Lp-gBuUKlyEPxnig&s',
          emergency: true,
          available: true,
        },
        {
          id: 'oxy-4',
          name: 'Pulse Oximeter',
          price: 12,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXfB1g4W3hzjXBDWDAgoJNqWMcO3v9IF_izee5IYR0ZptvcRo0-hDk9opWqsHEabDaLvE&usqp=CAU',
          available: true,
        },
        {
          id: 'oxy-5',
          name: 'CPAP Machine',
          price: 75,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-9TbRpESGJX9Ms7pr7gKWuMvyba6x_h66n0ciQc1cZZks_W0Dx3hzzKmLFjmTNuMaDuk&usqp=CAU',
          available: true,
        },
      ],
      mobility: [
        {
          id: 'mob-1',
          name: 'Standard Wheelchair',
          price: 20,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv5Mk87SAovu48zUjE0qJ35EP3RPbwYu5xxQ&s',
          available: true,
        },
        {
          id: 'mob-2',
          name: 'Electric Wheelchair',
          price: 95,
          image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
        {
          id: 'mob-3',
          name: 'Walking Frame',
          price: 15,
          image: 'https://th.bing.com/th/id/OIP.8g4RhO-B6dWGXDQEm9NQBAHaHa?w=191&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          available: true,
        },
        {
          id: 'mob-4',
          name: 'Patient Lift',
          price: 120,
          image: 'hhttps://th.bing.com/th/id/OIP.Vu2bTnbYEAuih0JHVz0jdwHaHb?w=195&h=196&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          emergency: true,
          available: true,
        },
        {
          id: 'mob-5',
          name: 'Crutches',
          price: 8,
          image: 'https://th.bing.com/th/id/OIP.0g72kxAb16n_M8x53tOBCAHaH7?w=174&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          available: true,
        },
      ],
      monitoring: [
        {
          id: 'mon-1',
          name: 'Blood Pressure Monitor',
          price: 25,
          image: 'https://th.bing.com/th/id/OIP.DbSiOMI1JrbA4q846jonqgHaIF?w=194&h=212&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          available: true,
        },
        {
          id: 'mon-2',
          name: 'Heart Rate Monitor',
          price: 30,
          image: 'https://th.bing.com/th/id/OIP.ILVE90j5mEgQG1q7yUMMZgHaFj?w=228&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          available: true,
        },
        {
          id: 'mon-3',
          name: 'Glucose Monitor',
          price: 20,
          image: 'https://th.bing.com/th/id/OIP._wnpVvhmLvrysZNC9ePyTAHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          available: true,
        },
        {
          id: 'mon-4',
          name: 'ECG Machine',
          price: 200,
          image: 'https://th.bing.com/th/id/OIP.jE518balr-w66950vMFMgAHaFj?w=211&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          emergency: true,
          available: true,
        },
        {
          id: 'mon-5',
          name: 'Temperature Monitor',
          price: 15,
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
      ],
      therapy: [
        {
          id: 'ther-1',
          name: 'Nebulizer',
          price: 35,
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
        {
          id: 'ther-2',
          name: 'TENS Unit',
          price: 40,
           image: 'https://ts1.mm.bing.net/th?id=OIP.5zPopreHjH9QAJS3KyQOTAAAAA&pid=15.1',
          available: true,
        },
        {
          id: 'ther-3',
          name: 'Compression Pump',
          price: 80,
          image: 'https://th.bing.com/th/id/OIP.-tUVd-5vl7Z_a_6BBO0UdQHaEK?w=366&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          available: true,
        },
        {
          id: 'ther-4',
          name: 'UV Light Therapy',
          price: 60,
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
        {
          id: 'ther-5',
          name: 'Hot/Cold Therapy Unit',
          price: 25,
          image: 'https://th.bing.com/th/id/OIP.hG0unE5wG0_1UNQVFxTw7QAAAA?w=190&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          available: true,
        },
      ],
      respiratory: [
        {
          id: 'resp-1',
          name: 'Ventilator',
          price: 300,
          image: 'https://th.bing.com/th/id/OIP.nqwDNh45LnI2Peviynjy5AHaHa?w=189&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          emergency: true,
          available: true,
        },
        {
          id: 'resp-2',
          name: 'Suction Machine',
          price: 50,
          image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
        {
          id: 'resp-3',
          name: 'Spirometer',
          price: 45,
          image: 'https://th.bing.com/th/id/OIP.4IJrA90XFkCVkUOXbetIhwHaHa?w=185&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          available: true,
        },
        {
          id: 'resp-4',
          name: 'Humidifier',
          price: 20,
          image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
        {
          id: 'resp-5',
          name: 'Peak Flow Meter',
          price: 15,
          image: 'https://th.bing.com/th/id/OIP.QUkiylRYKoqYdw3UnVFGCAHaFj?w=256&h=192&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          available: true,
        },
      ],
      surgical: [
        {
          id: 'surg-1',
          name: 'Surgical Light',
          price: 150,
          image: 'https://th.bing.com/th/id/OIP.2zziUHhUpu-VQdHeo8yQXgHaDv?w=343&h=176&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          available: true,
        },
        {
          id: 'surg-2',
          name: 'Electrocautery Unit',
          price: 180,
          image: 'https://th.bing.com/th/id/OIP.bPiyL0r_XCEnyD5PhY9r_QHaEK?w=303&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          emergency: true,
          available: true,
        },
        {
          id: 'surg-3',
          name: 'Anesthesia Machine',
          price: 250,
          image: 'https://th.bing.com/th/id/OIP.LrDqavQiqkR8nByOT47nMAHaJ4?w=146&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          emergency: true,
          available: true,
        },
        {
          id: 'surg-4',
          name: 'Surgical Table',
          price: 100,
          image: 'https://th.bing.com/th/id/OIP.wMKsCYRxEpkiST1s6hHm9gHaE8?w=324&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          available: true,
        },
        {
          id: 'surg-5',
          name: 'Defibrillator',
          price: 200,
          image: 'https://th.bing.com/th/id/OIP.jAJ_AFKi5za3_sr9XM8YngHaFf?w=226&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          emergency: true,
          available: true,
        },
      ],
      imaging: [
        {
          id: 'img-1',
          name: 'Portable X-Ray',
          price: 400,
          image: 'https://th.bing.com/th/id/OIP.vZu1Ptq3jgYr-kYUF28mlAHaHa?w=136&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          emergency: true,
          available: true,
        },
        {
          id: 'img-2',
          name: 'Ultrasound Machine',
          price: 350,
          image: 'https://th.bing.com/th/id/OIP.t3QIMIzlGe0UFoCtYrAvAQHaFi?w=267&h=200&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
          available: true,
        },
        {
          id: 'img-3',
          name: 'Digital Radiography',
          price: 500,
          image: 'https://images.unsplash.com/photo-1559757196-4b3f5c5b7e3a?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
        {
          id: 'img-4',
          name: 'Fluoroscopy Machine',
          price: 600,
          image: 'https://images.unsplash.com/photo-1559757196-4b3f5c5b7e3a?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
        {
          id: 'img-5',
          name: 'Mammography Unit',
          price: 450,
          image: 'https://images.unsplash.com/photo-1559757196-4b3f5c5b7e3a?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
      ],
      rehabilitation: [
        {
          id: 'rehab-1',
          name: 'Exercise Bike',
          price: 35,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
        {
          id: 'rehab-2',
          name: 'Parallel Bars',
          price: 50,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
        {
          id: 'rehab-3',
          name: 'Balance Board',
          price: 20,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
        {
          id: 'rehab-4',
          name: 'Resistance Bands Set',
          price: 15,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
        {
          id: 'rehab-5',
          name: 'Standing Frame',
          price: 80,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=300',
          available: true,
        },
      ],
    };

    return equipmentData[cat as keyof typeof equipmentData] || [];
  };

  const equipment = getEquipmentByCategory(category);
  const availableCount = equipment.filter(item => item.available).length;
  const displayedEquipment = showAll ? equipment : equipment.slice(0, 5);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {availableCount} Available
        </Badge>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin">
        {displayedEquipment.map((item) => (
          <Card key={item.id} className="flex-shrink-0 w-64 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-[4/3] bg-muted">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              
              {/* Emergency Badge */}
              {item.emergency && (
                <Badge
                  variant="destructive"
                  className="absolute top-2 left-2 bg-emergency-bg border-emergency-border text-medical-red"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  Emergency
                </Badge>
              )}

              {/* Availability Badge */}
              {!item.available && (
                <Badge
                  variant="secondary"
                  className="absolute top-2 right-2 bg-muted text-muted-foreground"
                >
                  Out of Stock
                </Badge>
              )}
            </div>

            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-sm capitalize">
                  {category}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  ${item.price}/day
                </span>
                
                <Button
                  size="sm"
                  disabled={!item.available}
                  onClick={() => onAddToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    emergency: item.emergency,
                  })}
                  className="bg-primary hover:bg-primary/90"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {equipment.length > 5 && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2"
          >
            {showAll ? 'Show Less' : 'More Equipment'}
            <ChevronRight className={`w-4 h-4 transition-transform ${showAll ? 'rotate-90' : ''}`} />
          </Button>
        </div>
      )}
    </section>
  );
};