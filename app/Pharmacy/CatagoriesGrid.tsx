import { 
  Pill, 
  Heart, 
  Baby, 
  Thermometer, 
  Eye, 
  Stethoscope,
  Bone,
  Brain,
  ChevronRight
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import AllCategoriesPage from "./all-categories"


const categories = [
  { 
    name: "First Aid", 
    icon: Pill, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Essential medicines and products",
    image: "https://sc04.alicdn.com/kf/He2f1dc768fa74c5faaa0bf0334cc871fg/200146776/He2f1dc768fa74c5faaa0bf0334cc871fg.jpg"
  },
  { 
    name: "Diabetes Essentials", 
    icon: Heart, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Diabetes care products",
    image: "https://www.japantimes.co.jp/uploads/imported_images/uploads/2023/05/np_file_226441.jpeg"
  },
  { 
    name: "Vitamins & Supplements", 
    icon: Baby, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Vitamins and health supplements",
    image: "https://domf5oio6qrcr.cloudfront.net/media/content/images/Vitaminsdreamstime_m_34701589.jpg"
  },
  { 
    name: "Eye Care", 
    icon: Thermometer, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Eye care products",
    image: "https://i5.walmartimages.com/asr/bd8583b8-d726-46c5-b2cd-0e0940214403_1.8bbf427cdf7e3abb2600a3379d8bbbd9.jpeg"
  },
  { 
    name: "Heart Care", 
    icon: Eye, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Cardiovascular health products",
    image: "https://www.southtees.nhs.uk/wp-content/uploads/2022/02/common-medicines-2048x1024.jpg"
  },
  { 
    name: "Ayurvedic Care", 
    icon: Stethoscope, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Traditional Ayurvedic medicines",
    image: "https://thomasprocessing.com/wp-content/uploads/2022/06/Herbal-medicine-Leaves-bottles-and-pills.jpg"
  },
  { 
    name: "Sports Nutrition", 
    icon: Bone, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Sports and fitness supplements",
    image: "https://cdn.shopify.com/s/files/1/0009/1943/7372/t/16/assets/Sports-Nutrition-banner.jpg"
  },
  { 
    name: "Skin Care", 
    icon: Brain, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Skincare and beauty products",
    image: "https://img.freepik.com/premium-photo/natural-herbal-skincare-products-ingredients-from-top-view_235573-9607.jpg"
  }
]


export function CategoriesGrid() {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const mainCategories = categories.slice(0, 6)
  const remainingCategories = categories.slice(6)

  console.log('CategoriesGrid render - showAllCategories:', showAllCategories)

  if (showAllCategories) {
    console.log('Rendering AllCategoriesPage')
    return <AllCategoriesPage onBack={() => setShowAllCategories(false)} />
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in delay-200">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-orange-600">Shop by Category</h2>
      </div>
      
      {/* Main 6 Categories - 2 rows of 3 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {mainCategories.map((category, index) => (
          <Card 
            key={category.name}
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 animate-fade-in border-orange-200 hover:border-orange-400 bg-gradient-to-br from-white to-orange-50"
            style={{ animationDelay: `${200 + index * 50}ms` }}
          >
            <CardContent className="p-2 sm:p-3 flex flex-col items-center justify-center">
              {/* Category Image */}
              <div className="w-full h-20 sm:h-24 bg-orange-100 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-orange-200 transition-colors duration-200 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden items-center justify-center w-full h-full">
                  <category.icon className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              
              {/* Category Name */}
              <h3 className="font-bold text-xs sm:text-sm text-center leading-tight text-gray-800">
                {category.name}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Categories Button */}
      <Button 
        variant="outline" 
        className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 transition-all duration-300 group"
        onClick={() => {
          console.log('View All Categories button clicked')
          setShowAllCategories(true)
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-600 font-medium">View All Categories</span>
          <ChevronRight className="h-4 w-4 text-gray-500 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </Button>
    </div>
  )
} 