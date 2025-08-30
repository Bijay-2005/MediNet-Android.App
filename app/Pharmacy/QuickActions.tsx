import { RefreshCw, MessageCircle, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

const quickActions = [
  {
    title: "Refill Prescription",
    description: "Reorder your regular medicines",
    icon: RefreshCw,
    variant: "prescription" as const,
    bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
    buttonColor: "bg-blue-600 hover:bg-blue-700 text-white"
  },
  {
    title: "Talk to Pharmacist",
    description: "Get expert medical advice",
    icon: MessageCircle,
    variant: "medical" as const,
    bgColor: "bg-gradient-to-r from-green-500 to-green-600",
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
    hoverColor: "hover:from-green-600 hover:to-green-700",
    buttonColor: "bg-green-600 hover:bg-green-700 text-white"
  },
  {
    title: "Store Locator",
    description: "Find nearest pharmacy",
    icon: MapPin,
    variant: "outline" as const,
    bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
    hoverColor: "hover:from-purple-600 hover:to-purple-700",
    buttonColor: "bg-purple-600 hover:bg-purple-700 text-white"
  },
  {
    title: "Emergency Helpline",
    description: "24/7 medical support",
    icon: Phone,
    variant: "success" as const,
    bgColor: "bg-gradient-to-r from-red-500 to-red-600",
    iconColor: "text-red-600",
    iconBgColor: "bg-red-100",
    hoverColor: "hover:from-red-600 hover:to-red-700",
    buttonColor: "bg-red-600 hover:bg-red-700 text-white"
  }
]

export function QuickActions() {
  const handleEmergencyCall = () => {
    try {
      // Try multiple methods to ensure phone dialer opens
      const phoneNumber = "9337257442";
      
      // Method 1: Direct tel link
      window.location.href = `tel:${phoneNumber}`;
      
      // Method 2: Create and click a link (fallback)
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = `tel:${phoneNumber}`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 100);
      
      // Method 3: For mobile devices, try window.open
      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        setTimeout(() => {
          window.open(`tel:${phoneNumber}`, '_self');
        }, 200);
      }
      
      toast.success("Calling emergency helpline...");
    } catch (error) {
      console.error("Error making emergency call:", error);
      toast.error("Unable to make call. Please dial 9337257442 manually.");
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 animate-fade-in delay-400">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Quick Actions</h2>
      
      <div className="grid grid-cols-1 gap-2 sm:gap-3">
        {quickActions.map((action, index) => (
          <Card 
            key={action.title}
                         className={`group cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border-0 overflow-hidden ${action.bgColor} ${action.hoverColor}`}
             style={{ animationDelay: `${400 + index * 100}ms` }}
             onClick={action.title === "Emergency Helpline" ? handleEmergencyCall : undefined}
           >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${action.iconBgColor} rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                  <action.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${action.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm sm:text-base mb-1 text-white group-hover:text-gray-100 transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 mb-2 group-hover:text-gray-100 transition-colors duration-300">
                    {action.description}
                  </p>
                </div>
                                 {action.title !== "Emergency Helpline" && (
                   <Button 
                     size="sm" 
                     className={`text-xs h-8 sm:h-9 px-3 sm:px-4 flex-shrink-0 ${action.buttonColor} shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold`}
                   >
                     {action.title}
                   </Button>
                 )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}