import { Pill, Plus, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    brand: "Crocin",
    price: 25,
    originalPrice: 30,
    discount: 17,
    inStock: true,
    prescription: false,
    image: "/placeholder.jpg"
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    brand: "Amoxil",
    price: 120,
    originalPrice: 150,
    discount: 20,
    inStock: true,
    prescription: true,
    image: "/placeholder1.jpg"
  },
  {
    id: 3,
    name: "Aspirin 75mg",
    brand: "Disprin",
    price: 15,
    originalPrice: 20,
    discount: 25,
    inStock: true,
    prescription: false,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Ibuprofen 400mg",
    brand: "Brufen",
    price: 45,
    originalPrice: 55,
    discount: 18,
    inStock: true,
    prescription: false,
    image: "/placeholder-logo.png"
  },
  {
    id: 5,
    name: "Cetirizine 10mg",
    brand: "Zyrtec",
    price: 35,
    originalPrice: 45,
    discount: 22,
    inStock: true,
    prescription: false,
    image: "/placeholder-logo.svg"
  },
  {
    id: 6,
    name: "Omeprazole 20mg",
    brand: "Prilosec",
    price: 85,
    originalPrice: 100,
    discount: 15,
    inStock: false,
    prescription: true,
    image: "/placeholder.jpg"
  },
  {
    id: 7,
    name: "Metformin 500mg",
    brand: "Glucophage",
    price: 65,
    originalPrice: 75,
    discount: 13,
    inStock: true,
    prescription: true,
    image: "/placeholder1.jpg"
  },
  {
    id: 8,
    name: "Vitamin D3",
    brand: "Calcirol",
    price: 95,
    originalPrice: 120,
    discount: 21,
    inStock: true,
    prescription: false,
    image: "/placeholder.svg"
  },
  {
    id: 9,
    name: "Azithromycin 500mg",
    brand: "Zithromax",
    price: 180,
    originalPrice: 220,
    discount: 18,
    inStock: true,
    prescription: true,
    image: "/placeholder-logo.png"
  },
  {
    id: 10,
    name: "Loratadine 10mg",
    brand: "Claritin",
    price: 55,
    originalPrice: 70,
    discount: 21,
    inStock: true,
    prescription: false,
    image: "/placeholder-logo.svg"
  },
  {
    id: 11,
    name: "Multivitamin",
    brand: "Centrum",
    price: 145,
    originalPrice: 180,
    discount: 19,
    inStock: true,
    prescription: false,
    image: "/placeholder.jpg"
  },
  {
    id: 12,
    name: "Calcium 500mg",
    brand: "Caltrate",
    price: 75,
    originalPrice: 90,
    discount: 17,
    inStock: true,
    prescription: false,
    image: "/placeholder1.jpg"
  },
  {
    id: 13,
    name: "Diclofenac 50mg",
    brand: "Voltaren",
    price: 42,
    originalPrice: 50,
    discount: 16,
    inStock: true,
    prescription: true,
    image: "/placeholder.svg"
  },
  {
    id: 14,
    name: "Ranitidine 150mg",
    brand: "Zantac",
    price: 38,
    originalPrice: 45,
    discount: 16,
    inStock: false,
    prescription: false,
    image: "/placeholder-logo.png"
  },
  {
    id: 15,
    name: "Ciprofloxacin 500mg",
    brand: "Cipro",
    price: 125,
    originalPrice: 155,
    discount: 19,
    inStock: true,
    prescription: true,
    image: "/placeholder-logo.svg"
  },
  {
    id: 16,
    name: "Pantoprazole 40mg",
    brand: "Protonix",
    price: 92,
    originalPrice: 110,
    discount: 16,
    inStock: true,
    prescription: true,
    image: "/placeholder.jpg"
  },
  {
    id: 17,
    name: "Levothyroxine 50mcg",
    brand: "Synthroid",
    price: 135,
    originalPrice: 160,
    discount: 16,
    inStock: true,
    prescription: true,
    image: "/placeholder1.jpg"
  },
  {
    id: 18,
    name: "Montelukast 10mg",
    brand: "Singulair",
    price: 215,
    originalPrice: 250,
    discount: 14,
    inStock: true,
    prescription: true,
    image: "/placeholder.svg"
  }
]

interface MedicineGridProps {
  onAddToCart?: (medicine?: any) => void
}

export function MedicineGrid({ onAddToCart }: MedicineGridProps) {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in delay-300">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-green-600">Popular Medicines</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {medicines.slice(0, 12).map((medicine, index) => (
          <Card 
            key={medicine.id}
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 animate-fade-in border-green-200 hover:border-green-400 bg-gradient-to-br from-white to-green-50"
            style={{ animationDelay: `${300 + index * 25}ms` }}
          >
            <CardContent className="p-2 sm:p-3">
              {/* Medicine Image */}
              <div className="w-full h-16 sm:h-20 bg-green-100 flex items-center justify-center mb-2 hover:bg-green-200 transition-colors duration-200 overflow-hidden">
                <img 
                  src={medicine.image} 
                  alt={medicine.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to pill icon if image fails to load
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const nextSibling = target.nextElementSibling as HTMLElement;
                    if (nextSibling) {
                      nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <Pill className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 hidden" />
              </div>
              
              {/* Medicine Info */}
              <div className="space-y-1 sm:space-y-1.5">
                <h3 className="font-semibold text-xs line-clamp-2 leading-tight">{medicine.name}</h3>
                <p className="text-xs text-muted-foreground">{medicine.brand}</p>
                
                {/* Price */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-bold text-green-600 text-xs sm:text-sm">₹{medicine.price}</span>
                  <span className="text-xs text-gray-500 line-through">₹{medicine.originalPrice}</span>
                  <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 px-1 py-0.5">
                    {medicine.discount}% OFF
                  </Badge>
                </div>
                
                {/* Stock Status */}
                <div className="flex items-center justify-between">
                  {medicine.inStock ? (
                    <span className="text-xs text-success font-medium">● In Stock</span>
                  ) : (
                    <span className="text-xs text-destructive font-medium">● Out of Stock</span>
                  )}
                  
                  {medicine.prescription && (
                    <Badge variant="outline" className="text-xs text-warning border-warning px-1 py-0.5">
                      Rx Required
                    </Badge>
                  )}
                </div>
                
                {/* Add to Cart Button */}
                <Button 
                  variant={medicine.inStock ? "default" : "secondary"} 
                  size="sm" 
                  className="w-full gap-1 text-xs h-6 sm:h-7 bg-green-600 hover:bg-green-700 text-white transition-all duration-200 hover:scale-105 shadow-md"
                  disabled={!medicine.inStock}
                  onClick={() => {
                    if (medicine.inStock && onAddToCart) {
                      onAddToCart({
                        id: `medicine-${medicine.id}`,
                        name: medicine.name,
                        price: medicine.price,
                        dosage: medicine.brand
                      })
                    }
                  }}
                >
                  <Plus className="h-3 w-3" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Medicines Button */}
      <Button 
        variant="outline" 
        className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 transition-all duration-300 group"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-600 font-medium">View All Medicines</span>
          <ChevronRight className="h-4 w-4 text-gray-500 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </Button>
    </div>
  )
}