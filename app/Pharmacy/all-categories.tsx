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
    image: "https://tse3.mm.bing.net/th/id/OIP.Zpf9FJCmrIpEDG2kkQlnDwHaE8?pid=Api&P=0&h=180"
  },
  { 
    name: "Diabetes Essentials", 
    description: "Diabetic Care OTC",
    bgColor: "bg-pink-50",
    image: "https://tse2.mm.bing.net/th/id/OIP.T3ITFvT_4G9xup7JncZXigHaEK?pid=Api&P=0&h=180"
  },
  { 
    name: "Vitamins & Supplements", 
    description: "Vitamins and Supplement...",
    bgColor: "bg-yellow-50",
    image: "https://tse3.mm.bing.net/th/id/OIP.14_1AGkgaAQLba5oOukBVAHaEK?pid=Api&P=0&h=180"
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
    image: "https://tse3.mm.bing.net/th/id/OIP.-SmpRM4pJ3BFtGe9AaAioAHaE8?pid=Api&P=0&h=180"
  },
  { 
    name: "Ayurvedic Care", 
    description: "Ayurvedic Medicines, Ay...",
    bgColor: "bg-pink-50",
    image: "https://tse1.mm.bing.net/th/id/OIP.8mdwIdKR9qtwFH3lPxmGWwHaFe?pid=Api&P=0&h=180"
  },
  { 
    name: "Sports Nutrition", 
    description: "Sports Nutrition",
    bgColor: "bg-pink-50",
    image: "https://tse2.mm.bing.net/th/id/OIP.PQ4Xty_v6bFT0MnS7ysgigHaE8?pid=Api&P=0&h=180"
  },
  { 
    name: "Skin Care", 
    description: "Skin Care, Anti Acne Topi...",
    bgColor: "bg-yellow-50",
    image: "https://tse3.mm.bing.net/th/id/OIP.FnueOmZQ5bMRMa4z1vFD4QHaFj?pid=Api&P=0&h=180"
  },
  { 
    name: "Mobility & Elderly Care", 
    description: "Urinary Support And Car...",
    bgColor: "bg-green-50",
    image: "https://tse2.mm.bing.net/th/id/OIP.ehtOhjpT1RSvOqXxSk-4GQHaDY?pid=Api&P=0&h=180"
  },
  { 
    name: "Health Food and Drinks", 
    description: "Shop By Category, Snack...",
    bgColor: "bg-blue-50",
    image: "https://tse2.mm.bing.net/th/id/OIP.PnkF0lP_5x8T_PPjlT796AHaE8?pid=Api&P=0&h=180"
  },
  { 
    name: "Mother and Baby Care", 
    description: "Baby Hygiene, Baby Foo...",
    bgColor: "bg-pink-50",
    image: "https://tse2.mm.bing.net/th/id/OIP.L4WvNocuwu3kz-drfxhcMwHaDV?pid=Api&P=0&h=180"
  },
  { 
    name: "Personal Care", 
    description: "Hair Care, Men Care, Ap...",
    bgColor: "bg-yellow-50",
    image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthf.bing.com%2Fth%2Fid%2FOIP.cQtl6cQg8mtZ0yYyDwOoDgHaEK%3Fr%3D0%26cb%3Dthfc1%26pid%3DApi&f=1&ipt=3b04950886fb115cf5e763b8e91b5d663ca0a1b3a4512dab0ae0ae21c4185214&ipo=images"
  },
  { 
    name: "Sexual Wellness", 
    description: "Sexual Wellness",
    bgColor: "bg-green-50",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.timZqLe733pWMzZTWf4MlAHaFE%3Fpid%3DApi&f=1&ipt=484d5ecacf2701efff0a8219fb7de8763f088bac05df46cf4ccd4f7f0cbf0bcf&ipo=images"
  },
  { 
    name: "Health Concerns", 
    description: "Stomach Care, Skin Care,...",
    bgColor: "bg-blue-50",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.ibvK3XHn4dYmIOX_pt1fDAHaD8%3Fr%3D0%26pid%3DApi&f=1&ipt=adc8785d953d6bafa9bfc2c9f6aa68c5da83c5a53e8f57df0a5cbd2aab3f7e71&ipo=images"
  },
  { 
    name: "Healthcare Devices", 
    description: "Glucometer & Strips, BP ...",
    bgColor: "bg-pink-50",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.kyGG3VZqmgU__MzxZdCoeQHaEY%3Fpid%3DApi&f=1&ipt=fb941e3c482d895e475f7a845153c456c4acc65a1243a7d4402797aead876370&ipo=images"
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