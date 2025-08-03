import { Home, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CollectionMethodSelectorProps {
  selectedMethod: "home" | "center" | null;
  onMethodChange: (method: "home" | "center") => void;
}

const CollectionMethodSelector = ({ selectedMethod, onMethodChange }: CollectionMethodSelectorProps) => {
  const methods = [
    {
      id: "home" as const,
      title: "Home Collection",
      description: "A phlebotomist will visit you.",
      icon: Home,
    },
    {
      id: "center" as const,
      title: "Visit a Centre",
      description: "Choose a nearby lab.",
      icon: Building2,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Choose Collection Method</h3>
      <div className="grid grid-cols-2 gap-4">
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <Card
              key={method.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-card ${
                selectedMethod === method.id
                  ? "ring-2 ring-primary bg-accent"
                  : "hover:bg-accent/50"
              }`}
              onClick={() => onMethodChange(method.id)}
            >
              <CardContent className="p-4 text-center">
                <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h4 className="font-medium text-foreground mb-1">{method.title}</h4>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionMethodSelector;