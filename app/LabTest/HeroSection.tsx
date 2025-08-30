import { Check, Users, Clock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const HeroSection = () => {
  return <section className="py-6 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-primary mb-2">
            Welcome to LabLink
          </h1>
          <p className="text-sm text-muted-foreground">
            Your health, simplified. Book tests and checkups in minutes.
          </p>
        </div>
      </div>
    </section>;
};
export default HeroSection;