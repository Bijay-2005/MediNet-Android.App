import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";    
export function AdvertiseCard() {
  return(
    <Card className="w-full max-w-sm">
        <CardContent>
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Advertise with us</h3>
            </div>
        </CardContent>
    </Card>
  )
}