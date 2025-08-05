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
    name: "Must Haves", 
    icon: Pill, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Essential medicines and products",
    image: "💊"
  },
  { 
    name: "Diabetes Essentials", 
    icon: Heart, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Diabetes care products",
    image: "💊"
  },
  { 
    name: "Vitamins & Supplements", 
    icon: Baby, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Vitamins and health supplements",
    image: "💊"
  },
  { 
    name: "Monsoon Store", 
    icon: Thermometer, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Seasonal health products",
    image: "💊"
  },
  { 
    name: "Heart Care", 
    icon: Eye, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Cardiovascular health products",
    image: "💊"
  },
  { 
    name: "Ayurvedic Care", 
    icon: Stethoscope, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Traditional Ayurvedic medicines",
    image: "💊"
  },
  { 
    name: "Sports Nutrition", 
    icon: Bone, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Sports and fitness supplements",
    image: "💊"
  },
  { 
    name: "Skin Care", 
    icon: Brain, 
    color: "text-gray-700", 
    bgColor: "bg-white",
    description: "Skincare and beauty products",
    image: "💊"
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
        <h2 className="text-xl sm:text-2xl font-bold">Shop by Category</h2>
      </div>
      
      {/* Main 6 Categories - 2 rows of 3 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {mainCategories.map((category, index) => (
          <Card 
            key={category.name}
            className={cn(
              "group cursor-pointer hover:shadow-lg transition-all duration-300",
              "animate-fade-in flex flex-col",
              "border border-gray-200 shadow-sm hover:shadow-md bg-white"
            )}
            style={{ animationDelay: `${200 + index * 50}ms` }}
          >
            <CardContent className="p-2 sm:p-3 flex flex-col items-center justify-center">
              {/* Image Placeholder - Sharp corners and full width */}
              <div className="w-full h-20 sm:h-24 bg-gray-100 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-gray-50 transition-colors duration-300">
                <span className="text-2xl sm:text-3xl">{category.image}</span>
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