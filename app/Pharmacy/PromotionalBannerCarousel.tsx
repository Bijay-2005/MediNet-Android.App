import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Shield, Star, Zap, Pill } from "lucide-react"

const banners = [
  {
    id: 1,
    title: "Express Delivery",
    subtitle: "Free delivery in 30 mins",
    condition: "On orders above ₹299",
    gradient: "from-orange-400 to-pink-500",
    icon: Truck,
    symbol: "🚚",
    buttons: [
      { text: "24/7 Available", variant: "glass" },
      { text: "20% OFF", variant: "glass" }
    ]
  },
  {
    id: 2,
    title: "Health Consultation",
    subtitle: "Free doctor consultation",
    condition: "With medicine orders",
    gradient: "from-blue-400 to-purple-500",
    icon: Shield,
    symbol: "👨‍⚕️",
    buttons: [
      { text: "Book Now", variant: "glass" },
      { text: "Free", variant: "glass" }
    ]
  },
  {
    id: 3,
    title: "Loyalty Program",
    subtitle: "Earn points on every purchase",
    condition: "Redeem for discounts",
    gradient: "from-green-400 to-teal-500",
    icon: Star,
    symbol: "⭐",
    buttons: [
      { text: "Join Now", variant: "glass" },
      { text: "500 Pts", variant: "glass" }
    ]
  },
  {
    id: 4,
    title: "Emergency Care",
    subtitle: "Instant medicine delivery",
    condition: "Critical medicines only",
    gradient: "from-red-400 to-orange-500",
    icon: Zap,
    symbol: "⚡",
    buttons: [
      { text: "Urgent", variant: "glass" },
      { text: "Priority", variant: "glass" }
    ]
  }
]

export function PromotionalBannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 4000) // 4 seconds interval

    return () => clearInterval(interval)
  }, [])

  const currentBanner = banners[currentIndex]
  const IconComponent = currentBanner.icon

  return (
    <div className="space-y-3 sm:space-y-4 animate-fade-in delay-200">
      <Card className={`bg-gradient-to-r ${currentBanner.gradient} text-white border-0 shadow-lg relative overflow-hidden transition-all duration-500 hover:shadow-xl`}>
        <CardContent className="p-4 sm:p-6 h-40 sm:h-48 flex flex-col justify-between relative">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 opacity-20">
            <div className="w-full h-full bg-white/20 rounded-full"></div>
          </div>
          
          {/* Symbol Circle */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-lg sm:text-2xl opacity-80">{currentBanner.symbol}</span>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold">{currentBanner.title}</h3>
            </div>
            
            <div className="space-y-1 mb-3 sm:mb-4">
              <p className="text-base sm:text-lg font-semibold">{currentBanner.subtitle}</p>
              <p className="text-xs sm:text-sm opacity-90">{currentBanner.condition}</p>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-1 sm:gap-2 relative z-10">
            {currentBanner.buttons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 transition-all duration-200 hover:scale-105 rounded-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium"
              >
                {button.text}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Indicator Dots */}
      <div className="flex justify-center gap-1 sm:gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-4 sm:w-6' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}