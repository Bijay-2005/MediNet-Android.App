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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.tqM_U2p2Qgdxjv2O-slGswHaFp%3Fpid%3DApi&f=1&ipt=c7ff8dd6b5b0fc3c81ad67420cb6b5a8909fe5a002620938101c237c0099f206&ipo=images',
          available: true,
        },
        {
          id: 'bed-3',
          name: 'ICU Bed with Monitor',
          price: 150,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.isePLdyUvOvfVAJShlKyuwHaE7%3Fpid%3DApi&f=1&ipt=b97c462f90d545c78a68a73ec92f022e79f695fcf76f7a705f77b38cddc5707c&ipo=images',
          emergency: true,
          available: true,
        },
        {
          id: 'bed-4',
          name: 'Pediatric Hospital Bed',
          price: 70,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.ZmqoH_OmhbtPjuHeyrJpiQHaFu%3Fpid%3DApi&f=1&ipt=ed262580c5882a77d1fef43dcd6a27120a74ab6217dec7ea1975509d8ac5d831&ipo=imagess',
          available: true,
        },
        {
          id: 'bed-5',
          name: 'Bariatric Hospital Bed',
          price: 120,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP._BdLFmCsKpkMGrshBtV1QgHaE8%3Fr%3D0%26pid%3DApi&f=1&ipt=707b98cacd1c9388e57650915a0c35d8fe01783a45f6063c89c26b0bcceaf972&ipo=images',
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthf.bing.com%2Fth%2Fid%2FOIP.OtRVPmdna40ue9MBk_qWnQHaGo%3Fcb%3Dthfc1%26pid%3DApi&f=1&ipt=06d40816ab77ceec3d894a8ffe3c41f6af5232f456438d248cdeb2a465d1bc2c&ipo=images',
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthfvnext.bing.com%2Fth%2Fid%2FOIP.hI6jjQ1_JFMGtC8NRaRl7wHaHa%3Fcb%3Dthfvnext%26pid%3DApi&f=1&ipt=c606c99f796bc1f8d17502c3752fa4bae558172a464885738f962e4f4404d375&ipo=images',
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthfvnext.bing.com%2Fth%2Fid%2FOIP.0Dj-w12CcQzo7Qnk-4oGBAHaH0%3Fr%3D0%26cb%3Dthfvnext%26pid%3DApi&f=1&ipt=83efd243748c23b170a5ca31f106911161558018150bce6cbccd38855171c51a&ipo=images',
          emergency: true,
          available: true,
        },
        {
          id: 'mob-5',
          name: 'Crutches',
          price: 8,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.nKrOm1K_N3eGFOdtI8q3agHaHa%3Fpid%3DApi&f=1&ipt=1fdc86a4762d50b7ba6f8adcde4178f887f95b0f85e65ae0d7b8687d36d532a0&ipo=images',
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fdigital-thermometer-used-to-monitoring-patients-temperature-hospital-205191159.jpg&f=1&nofb=1&ipt=fd732f2aad71547a4a0c11f816e78931191226bbf85a4f4e90b0900e3a78d6b8',
          available: true,
        },
      ],
      therapy: [
        {
          id: 'ther-1',
          name: 'Nebulizer',
          price: 35,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.3zt4XN7UwULPIt_plU37kAHaI2%3Fpid%3DApi&f=1&ipt=a07e9789017001cde2ab37f42847464392efa00aa476afa340274c51e2908b6b&ipo=images',
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.95dwMX3VepeILKitQERV_AAAAA%3Fpid%3DApi&f=1&ipt=c9246326de3f876ebb147ca2e328202b2343cda138dbba920a13803853f5dae3&ipo=images',
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.EWKCALrMrrvX9CGa66oMBgHaHa%3Fpid%3DApi&f=1&ipt=57d453bdfb091adac37008050eb461e364d0969e34fbafbe91dc3a03d8a0c313&ipo=images',
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.JTp-D5I4u6yQo4bXYJLHRgHaD4%3Fpid%3DApi&f=1&ipt=f212cca19d184af0c145ca360b41cbda8c15c2cd41f0cc853bdad7e88a410ba6&ipo=images',
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthfvnext.bing.com%2Fth%2Fid%2FOIP.e7P7vzJgvnKuLuhvJ8GX8AHaHa%3Fr%3D0%26cb%3Dthfvnext%26pid%3DApi&f=1&ipt=7d2a21c18ecb601d31fd1259e0c061164ef6ac137cdabde44ff356d5c99fbcb0&ipo=images',
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.tzbLQuUUO5IfopeqCPrZowHaHa%3Fpid%3DApi&f=1&ipt=a63eb5a7bd1a9616cfa91e3a392d3b819573aeb1a09fa1e723d705a880df8b87&ipo=images',
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.jDflJbfBKWTsHQxeoT4fXQHaHa%3Fpid%3DApi&f=1&ipt=21916f805baf6ee1f6f02fca44e6e7a0e8ef48158873d6d1b861bc273b353be5&ipo=images',
          available: true,
        },
        {
          id: 'img-4',
          name: 'Fluoroscopy Machine',
          price: 600,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.ZTydJHjP1mqP8pGp3Z5HYQHaE8%3Fpid%3DApi&f=1&ipt=433c4a010bbf1a4919a45e152045bfe17e30d6d65b3605b6b3ad7e171d2b4d59&ipo=images',
          available: true,
        },
        {
          id: 'img-5',
          name: 'Mammography Unit',
          price: 450,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthf.bing.com%2Fth%2Fid%2FOIP.WXMq7Gj6K8KiXUQcvuiuwAHaHa%3Fcb%3Dthfc1%26pid%3DApi&f=1&ipt=06b24f35f27def2228ceb4c1658d721b6ac5e3ce9120c1f934f18b848744ff42&ipo=images',
          available: true,
        },
      ],
      rehabilitation: [
        {
          id: 'rehab-1',
          name: 'Exercise Bike',
          price: 35,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthf.bing.com%2Fth%2Fid%2FOIP.F-OKjJBVvMMoKKjAXh70HQHaLF%3Fcb%3Dthfc1%26pid%3DApi&f=1&ipt=9a906ce223ce953748fafdc7c9f9b64dd5261cfb4ad518e6d88b044b92607f3e&ipo=images',
          available: true,
        },
        {
          id: 'rehab-2',
          name: 'Parallel Bars',
          price: 50,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthf.bing.com%2Fth%2Fid%2FOIP.5KXnN-6P9YZtFOq5j4-uMwHaEt%3Fr%3D0%26cb%3Dthfc1%26pid%3DApi&f=1&ipt=4eb6f065fcb1c34993c7fb2dde00ab0968d46706ff9a95ee13f14817526b4266&ipo=images',
          available: true,
        },
        {
          id: 'rehab-3',
          name: 'Balance Board',
          price: 20,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.kPNlBfESKjG8_grjEYGLFgHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=ac9562584882c356dec0a944de8de03d4924cc4b5c91ca6fafe5cda5fdc48ce8&ipo=images',
          available: true,
        },
        {
          id: 'rehab-4',
          name: 'Resistance Bands Set',
          price: 15,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.Q4Vcg1twauKAy2jkhnbOngHaG0%3Fr%3D0%26pid%3DApi&f=1&ipt=876d8587020a93b362bbb72d9090f439b0d2c24451d62b2868197d277ac274d5&ipo=images',
          available: true,
        },
        {
          id: 'rehab-5',
          name: 'Standing Frame',
          price: 80,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthf.bing.com%2Fth%2Fid%2FOIP.tf-DkUAWKRRXaf-kgZ6xbQAAAA%3Fcb%3Dthfc1%26pid%3DApi&f=1&ipt=909b1d51093919e167c21af6ce05dff77c0070f2c2ef1aec5a39bfb50ad2c8a7&ipo=images',
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