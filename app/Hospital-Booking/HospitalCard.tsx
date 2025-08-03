import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Phone, MapPin, Bed, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Hospital {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  phone: string;
  bedCount: number;
  distance: string;
  specialty: string;
  isEmergency?: boolean;
  isGovernment?: boolean;
}

interface HospitalCardProps {
  hospital: Hospital;
  onClick?: (hospital: Hospital) => void;
}

export const HospitalCard = ({ hospital, onClick }: HospitalCardProps) => {
  return (
    <Card 
      className="group cursor-pointer border-border shadow-card hover:shadow-card-hover transition-all duration-300 rounded-2xl overflow-hidden bg-gradient-to-br from-card to-muted/30"
      onClick={() => onClick?.(hospital)}
    >
      <CardContent className="p-0">
        {/* Hospital Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={hospital.image}
            alt={hospital.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop";
            }}
          />
          
          {/* Emergency Badge */}
          {hospital.isEmergency && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-emergency text-emergency-foreground border-0 shadow-sm">
                <Clock className="w-3 h-3 mr-1" />
                24/7 Emergency
              </Badge>
            </div>
          )}
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-warning text-warning-foreground border-0 shadow-sm">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {hospital.rating}
            </Badge>
          </div>
        </div>

        {/* Hospital Details */}
        <div className="p-5 space-y-4">
          {/* Name and Location */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-card-foreground line-clamp-2">
              {hospital.name}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="line-clamp-1">{hospital.location}</span>
            </div>
          </div>

          {/* Contact and Capacity */}
          <div className="space-y-2">
            <div className="flex items-center text-success text-sm font-medium">
              <Phone className="w-4 h-4 mr-2" />
              {hospital.phone}
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-2" />
                {hospital.bedCount} beds
              </div>
              <div className="font-medium text-primary">
                {hospital.distance}
              </div>
            </div>
          </div>

          {/* Specialty Tag */}
          <div className="flex items-center justify-between">
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs border",
                hospital.isGovernment 
                  ? "bg-accent/10 text-accent border-accent/20" 
                  : "bg-primary/10 text-primary border-primary/20"
              )}
            >
              {hospital.isGovernment ? "Government Hospital" : hospital.specialty}
            </Badge>
            
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};