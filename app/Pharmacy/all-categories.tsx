"use client"

import { ArrowLeft, Search, ShoppingCart, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const categories = [
  { 
    name: "First Aid", 
    description: "Essential medicines and products",
    image: "https://sc04.alicdn.com/kf/He2f1dc768fa74c5faaa0bf0334cc871fg/200146776/He2f1dc768fa74c5faaa0bf0334cc871fg.jpg"
  },
  { 
    name: "Diabetes Essentials", 
    description: "Diabetes care products",
    image: "https://www.japantimes.co.jp/uploads/imported_images/uploads/2023/05/np_file_226441.jpeg"
  },
  { 
    name: "Vitamins & Supplements", 
    description: "Vitamins and health supplements",
    image: "https://domf5oio6qrcr.cloudfront.net/media/content/images/Vitaminsdreamstime_m_34701589.jpg"
  },
  { 
    name: "Eye Care", 
    description: "Eye care products",
    image: "https://i5.walmartimages.com/asr/bd8583b8-d726-46c5-b2cd-0e0940214403_1.8bbf427cdf7e3abb2600a3379d8bbbd9.jpeg"
  },
  { 
    name: "Heart Care", 
    description: "Cardiovascular health products",
    image: "https://www.southtees.nhs.uk/wp-content/uploads/2022/02/common-medicines-2048x1024.jpg"
  },
  { 
    name: "Ayurvedic Care", 
    description: "Traditional Ayurvedic medicines",
    image: "https://thomasprocessing.com/wp-content/uploads/2022/06/Herbal-medicine-Leaves-bottles-and-pills.jpg"
  },
  { 
    name: "Sports Nutrition", 
    description: "Sports and fitness supplements",
    image: "https://cdn.shopify.com/s/files/1/0009/1943/7372/t/16/assets/Sports-Nutrition-banner.jpg"
  },
  { 
    name: "Skin Care", 
    description: "Skincare and beauty products",
    image: "https://img.freepik.com/premium-photo/natural-herbal-skincare-products-ingredients-from-top-view_235573-9607.jpg"
  },
  { 
    name: "Mobility & Elderly Care", 
    description: "Urinary Support And Care",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop"
  },
  { 
    name: "Health Food and Drinks", 
    description: "Shop By Category, Snacks",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
  },
  { 
    name: "Mother and Baby Care", 
    description: "Baby Hygiene, Baby Food",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop"
  },
  { 
    name: "Personal Care", 
    description: "Hair Care, Men Care, Apparel",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
  },
  { 
    name: "Sexual Wellness", 
    description: "Sexual Wellness",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&h=200&fit=crop"
  },
  { 
    name: "Health Concerns", 
    description: "Stomach Care, Skin Care",
    image: "https://images.unsplash.com/photo-1559757196-4b3f5c5b7e3a?w=300&h=200&fit=crop"
  },
  { 
    name: "Healthcare Devices", 
    description: "Glucometer & Strips, BP Monitor",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
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
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 animate-fade-in border-orange-200 hover:border-orange-400 bg-gradient-to-br from-white to-orange-50"
              style={{ animationDelay: `${200 + index * 50}ms` }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <CardContent className="p-2 sm:p-3 flex flex-col items-center justify-center">
                {/* Category Image */}
                <div className="w-full h-20 sm:h-24 bg-orange-100 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-orange-200 transition-colors duration-200 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
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
                  <div className="hidden items-center justify-center w-full h-full">
                    <span className="text-2xl sm:text-3xl">💊</span>
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
      </main>
    </div>
  )
} 