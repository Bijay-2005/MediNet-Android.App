import { Activity, TestTube, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CategoryTabs = ({ activeTab, onTabChange }: CategoryTabsProps) => {
  const tabs = [
    { id: "health-checks", label: "Health Checks", icon: Activity },
    { id: "lab-tests", label: "Lab Tests", icon: TestTube },
    { id: "radiology", label: "Radiology Tests", icon: Stethoscope },
  ];

  return (
    <div className="flex justify-center gap-1 max-w-md mx-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-1 rounded-full py-2 px-3 text-xs transition-all duration-200 ${
              activeTab === tab.id 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-background hover:bg-accent border border-border text-muted-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;