import { 
  Pill, 
  Heart, 
  Baby, 
  Thermometer, 
  Eye, 
  Stethoscope,
  Bone,
  Brain
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const categories = [
  { 
    name: "Prescription Meds", 
    icon: Pill, 
    color: "text-primary", 
    bgColor: "bg-primary/10",
    description: "Doctor prescribed medicines"
  },
  { 
    name: "OTC Medicines", 
    icon: Heart, 
    color: "text-accent", 
    bgColor: "bg-accent/10",
    description: "Over-the-counter drugs"
  },
  { 
    name: "Baby Care", 
    icon: Baby, 
    color: "text-success", 
    bgColor: "bg-success/10",
    description: "Baby & infant products"
  },
  { 
    name: "Wellness", 
    icon: Thermometer, 
    color: "text-warning", 
    bgColor: "bg-warning/10",
    description: "Health & wellness items"
  },
  { 
    name: "Eye Care", 
    icon: Eye, 
    color: "text-primary", 
    bgColor: "bg-primary/10",
    description: "Vision care products"
  },
  { 
    name: "Medical Devices", 
    icon: Stethoscope, 
    color: "text-accent", 
    bgColor: "bg-accent/10",
    description: "Healthcare equipment"
  },
  { 
    name: "Orthopedic", 
    icon: Bone, 
    color: "text-success", 
    bgColor: "bg-success/10",
    description: "Bone & joint care"
  },
  { 
    name: "Mental Health", 
    icon: Brain, 
    color: "text-warning", 
    bgColor: "bg-warning/10",
    description: "Mental wellness support"
  },
  { 
    name: "Skin Care", 
    icon: Heart, 
    color: "text-accent", 
    bgColor: "bg-accent/10",
    description: "Dermatological products"
  }
]

export function CategoriesGrid() {
  return (
    <div className="space-y-6 animate-fade-in delay-200">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Shop by Category</h2>
        <button className="text-primary hover:text-primary-hover text-sm font-medium">
          View All →
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {categories.slice(0, 9).map((category, index) => (
          <Card 
            key={category.name}
            className={cn(
              "group cursor-pointer hover:shadow-md transition-all duration-300",
              "animate-fade-in aspect-square flex flex-col",
              "border rounded-lg" // Added for rectangular shape
            )}
            style={{ animationDelay: `${200 + index * 50}ms` }}
          >
            <CardContent className="p-3 flex flex-col items-center justify-center h-full">
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3",
                category.bgColor
              )}>
                <category.icon className={cn("h-5 w-5", category.color)} />
              </div>
              <h3 className="font-semibold text-sm mb-1 text-center leading-tight">{category.name}</h3>
              <p className="text-xs text-muted-foreground text-center leading-tight">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}