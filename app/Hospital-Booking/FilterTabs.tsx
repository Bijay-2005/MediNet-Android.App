import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterTab {
  id: string;
  label: string;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const FilterTabs = ({ tabs, activeTab, onTabChange }: FilterTabsProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-3 pb-2 min-w-max px-1">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "h-10 px-6 rounded-full whitespace-nowrap font-medium transition-all duration-200",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-card hover:bg-primary-hover"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
};