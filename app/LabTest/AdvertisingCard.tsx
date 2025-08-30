import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImagePlus } from "lucide-react";

interface AdvertisingCardProps {
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  bgColor: string;
}

const AdvertisingCard = ({ title, subtitle, discount, image, bgColor }: AdvertisingCardProps) => {
  return (
    <Card className={`w-full h-40 ${bgColor} border-0 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200`}>
      <CardContent className="p-4 h-full flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-white font-bold text-base leading-tight">{title}</h3>
          <p className="text-white/90 text-xs mt-1">{subtitle}</p>
          <Badge className="mt-2 bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs">
            {discount}
          </Badge>
        </div>
        <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center ml-4 border-2 border-dashed border-white/40">
          <ImagePlus className="w-8 h-8 text-white/60" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvertisingCard;