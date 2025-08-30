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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthfvnext.bing.com%2Fth%2Fid%2FOIP.V7Y-gpYU2fjqV94AycDAEwHaHa%3Fcb%3Dthfvnext%26pid%3DApi&f=1&ipt=467b8596abe28316066082749e6c1a94f11a414b820751e39a36b01778f057f1&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.7b_OgiPsC45t3IOt3woGvQHaFP%3Fpid%3DApi&f=1&ipt=7a25f1a78372e544d4c806a2f2d83fb4cf68cb5b0ec1034bc851ab6202d2b677&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.A1KF5u91X2eyMyRcvBClEgHaHa%3Fpid%3DApi&f=1&ipt=4e3db61a69af75e564dc56994b410b28b0e2c2963b73de8b36fdd2f78df70841&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthf.bing.com%2Fth%2Fid%2FOIP.kMy6BzDK0FtYo1UaawkyGwHaHa%3Fcb%3Dthfc1%26pid%3DApi&f=1&ipt=fc56be685bf533a67f573f8a0ba2aa88175d0140b600afd688c92a82196a110b&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthfvnext.bing.com%2Fth%2Fid%2FOIP.kPf4Jx2XkAq2W4a4aw_01wHaEj%3Fcb%3Dthfvnext%26pid%3DApi&f=1&ipt=50304306fe6cc4ad38e7b5a6ead5140d7878940551a54c5562a65eb0dd583cf3&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.d7DoLshanxmYRGc2hK2rrgHaHa%3Fpid%3DApi&f=1&ipt=0d5711f032f126b2b9b5eecfee70e3335c9998dc87bacc60df86899be016e337&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.WOjBtm2koEd6BIS38g2A_wHaHa%3Fpid%3DApi&f=1&ipt=bc6d57d06c05c76573fc0172c86f980538bad479f5de69d8d35592b413cc8d92&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.KCsiwZxBTjTZYaJ-Y1NmbgHaLH%3Fpid%3DApi&f=1&ipt=04d51ff34a6296e51a7af111bab3bab5da7c5673807bed948a4a6cb2c79d668b&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthf.bing.com%2Fth%2Fid%2FOIP._YUERNBvUIrbvelZtu6twwHaHa%3Fcb%3Dthfc1%26pid%3DApi&f=1&ipt=7d20599aebafcbe3d6d552ab7bd137035b55ac29c4a032490ecfac23d94476fb&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthf.bing.com%2Fth%2Fid%2FOIP.UkrC8qIgC4nmi4pjt_44wgHaHa%3Fcb%3Dthfc1%26pid%3DApi&f=1&ipt=a0d33f71e50aa3b03a0d0c91460ccc44c25c94e9a2a0c96bac932b22949b03cb&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.wSK5i1seEIw2OVpQ5cWATwHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=46beee0108ff0bc2f9f053fe9330a3b2956f9ab5815b5d0ada95f4b13391d294&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.48WfthIVNAY-Vf73kn3XagHaNk%3Fr%3D0%26pid%3DApi&f=1&ipt=f91f497035b784df6097be4abb95a1bac1c774a3f40d87a410e0121163c3ccee&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkw.rosheta.com%2Fupload%2F5fd734eb2dfac0fa1b2d687221b758685cdfceec083f168321a028a4ed58ba13.jpg&f=1&nofb=1&ipt=93d63eadeb03be3bf155ec3fafd1907146a990ac09cdfe2d5630ce184adf60ff"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.dZWO4IXg1Gn2yZqx0HjF2QHaHa%3Fpid%3DApi&f=1&ipt=59ab43c3752b69b6e47c25316a4bae5d94fc0eb9e51bcd4f19f735b6f95e4bd2&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.il6scHIsYyJqjnlKkFT9YgHaEK%3Fpid%3DApi&f=1&ipt=c2a94d2b003ed43e27a0ce824d9f444bf9167279b74d859414b9cd1b79d39162&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthfvnext.bing.com%2Fth%2Fid%2FOIP.tawt-a8yG1Lng14teJ9hCQHaFV%3Fcb%3Dthfvnext%26pid%3DApi&f=1&ipt=d8df9359a7913f728573530e93b7e7e9d979b6ea260c52fae12b16dac9054d63&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthfvnext.bing.com%2Fth%2Fid%2FOIP.4HyZBXw6cXBGULeflG4vsQHaHa%3Fr%3D0%26cb%3Dthfvnext%26pid%3DApi&f=1&ipt=6d2eea767ab6e4894629631c31f243e9842695d786f9799260cc73af831b56ab&ipo=images"
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
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.08e2INmtoCLonD19WjnYdwHaHa%3Fpid%3DApi&f=1&ipt=5eb97caed7db811fc7b92bdeb411237912022a41631cf22a12ac8048819a30b2&ipo=images"
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