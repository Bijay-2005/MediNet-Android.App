"use client"

import { ArrowLeft, Search, ShoppingCart, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const categories = [
  { 
    name: "Must Haves", 
    description: "Diabetic Care, Vitamin, F...",
    bgColor: "bg-pink-50",
    image: "💊"
  },
  { 
    name: "Diabetes Essentials", 
    description: "Diabetic Care OTC",
    bgColor: "bg-pink-50",
    image: "💊"
  },
  { 
    name: "Vitamins & Supplements", 
    description: "Vitamins and Supplement...",
    bgColor: "bg-yellow-50",
    image: "💊"
  },
  { 
    name: "Monsoon Store", 
    description: "Immunity & Fever Care, ...",
    bgColor: "bg-green-50",
    image: "💊"
  },
  { 
    name: "Heart Care", 
    description: "Heart Store",
    bgColor: "bg-blue-50",
    image: "💊"
  },
  { 
    name: "Ayurvedic Care", 
    description: "Ayurvedic Medicines, Ay...",
    bgColor: "bg-pink-50",
    image: "💊"
  },
  { 
    name: "Sports Nutrition", 
    description: "Sports Nutrition",
    bgColor: "bg-pink-50",
    image: "💊"
  },
  { 
    name: "Skin Care", 
    description: "Skin Care, Anti Acne Topi...",
    bgColor: "bg-yellow-50",
    image: "💊"
  },
  { 
    name: "Mobility & Elderly Care", 
    description: "Urinary Support And Car...",
    bgColor: "bg-green-50",
    image: "💊"
  },
  { 
    name: "Health Food and Drinks", 
    description: "Shop By Category, Snack...",
    bgColor: "bg-blue-50",
    image: "💊"
  },
  { 
    name: "Mother and Baby Care", 
    description: "Baby Hygiene, Baby Foo...",
    bgColor: "bg-pink-50",
    image: "💊"
  },
  { 
    name: "Personal Care", 
    description: "Hair Care, Men Care, Ap...",
    bgColor: "bg-yellow-50",
    image: "💊"
  },
  { 
    name: "Sexual Wellness", 
    description: "Sexual Wellness",
    bgColor: "bg-green-50",
    image: "💊"
  },
  { 
    name: "Health Concerns", 
    description: "Stomach Care, Skin Care,...",
    bgColor: "bg-blue-50",
    image: "💊"
  },
  { 
    name: "Healthcare Devices", 
    description: "Glucometer & Strips, BP ...",
    bgColor: "bg-pink-50",
    image: "💊"
  }
]

interface AllCategoriesPageProps {
  onBack: () => void
}

export default function AllCategoriesPage({ onBack }: AllCategoriesPageProps) {
  const router = useRouter()

  const handleBack = () => {
    onBack()
  }

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to specific category page
    router.push(`/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex h-14 items-center px-4 gap-4">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 hover:bg-gray-100"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          {/* Title */}
          <h1 className="flex-1 text-lg font-semibold text-center">All Categories</h1>
          
          {/* Search and Cart */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-red-500">
                2
              </Badge>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {categories.map((category, index) => (
            <Card 
              key={category.name}
              className={cn(
                "group cursor-pointer hover:shadow-lg transition-all duration-300",
                "animate-fade-in flex flex-col",
                "border border-gray-200 shadow-sm hover:shadow-md bg-white"
              )}
              style={{ animationDelay: `${200 + index * 50}ms` }}
              onClick={() => handleCategoryClick(category.name)}
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
      </main>
    </div>
  )
} 