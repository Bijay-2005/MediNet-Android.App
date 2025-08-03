import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HealthPackage } from "@/types";

interface HealthPackageCardProps {
  package: HealthPackage;
  onAddToCart: (packageItem: HealthPackage) => void;
  isSelected?: boolean;
}

const HealthPackageCard = ({ package: pkg, onAddToCart, isSelected }: HealthPackageCardProps) => {
  const handleAddToCart = () => {
    onAddToCart(pkg);
  };

  return (
    <Card className="group relative overflow-hidden shadow-card border-border hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {pkg.name}
            </h3>
            <p className="text-muted-foreground text-xs mb-2 leading-relaxed">
              {pkg.description}
            </p>
          </div>
          <div className="ml-4 text-right">
            <div className="text-xl font-bold text-primary mb-1">
              ₹{pkg.price.toLocaleString()}
            </div>
            {pkg.originalPrice && (
              <div className="text-xs text-muted-foreground line-through">
                ₹{pkg.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {pkg.features.slice(0, 4).map((feature: any, index: any) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
              <span className="text-muted-foreground truncate">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <span className="capitalize">{pkg.category.replace('-', ' ')}</span>
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={isSelected}
            size="sm"
            className={`${
              isSelected 
                ? "bg-green-500 hover:bg-green-600 text-white" 
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            } transition-all duration-200 shadow-md hover:shadow-lg`}
          >
            {isSelected ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                Added
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 mr-1" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthPackageCard;