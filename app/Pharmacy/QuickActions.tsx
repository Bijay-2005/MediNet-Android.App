import { RefreshCw, MessageCircle, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const quickActions = [
  {
    title: "Refill Prescription",
    description: "Reorder your regular medicines",
    icon: RefreshCw,
    variant: "prescription" as const,
  },
  {
    title: "Talk to Pharmacist",
    description: "Get expert medical advice",
    icon: MessageCircle,
    variant: "medical" as const,
  },
  {
    title: "Emergency Helpline",
    description: "24/7 medical support",
    icon: Phone,
    variant: "success" as const,
  },
  {
    title: "Store Locator",
    description: "Find nearest pharmacy",
    icon: MapPin,
    variant: "outline" as const,
  }
]

export function QuickActions() {
  return (
    <div className="space-y-4 animate-fade-in delay-400">
      <h2 className="text-2xl font-bold">Quick Actions</h2>
      
      <div className="grid grid-cols-1 gap-3">
        {quickActions.map((action, index) => (
          <Card 
            key={action.title}
            className={`group cursor-pointer hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in`}
            style={{ animationDelay: `${400 + index * 75}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <action.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                </div>
                <Button 
                  variant={action.variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined} 
                  size="sm" 
                  className="text-xs h-8 px-3"
                >
                  {action.title}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}