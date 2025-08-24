"use client"
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const EmergencyHelpline = () => {
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
    <Card 
      className="group cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border-0 overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
      onClick={handleEmergencyCall}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
            <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm sm:text-base mb-1 text-white group-hover:text-gray-100 transition-colors duration-300">
              Emergency Helpline
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 mb-2 group-hover:text-gray-100 transition-colors duration-300">
              24/7 medical support
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}; 