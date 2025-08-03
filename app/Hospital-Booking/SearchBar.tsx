import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const filterOptions = [
  { id: "all", label: "All" },
  { id: "nearby", label: "Nearby" },
  { id: "top-rated", label: "Top Rated" },
  { id: "emergency", label: "24/7 Emergency" },
  { id: "open-now", label: "Open Now" },
  { id: "bed-availability", label: "With Bed Availability" },
  { id: "government", label: "Government Hospitals" },
  { id: "private", label: "Private Hospitals" },
];

export const SearchBar = ({ 
  placeholder = "Search hospitals or specialties...",
  onSearch,
  activeFilter = "all",
  onFilterChange
}: SearchBarProps) => {
  const activeFilterLabel = filterOptions.find(f => f.id === activeFilter)?.label || "All";
  
  return (
    <div className="relative w-full flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder={placeholder}
          className="pl-12 h-14 text-base bg-card border-border shadow-card rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-14 px-4 bg-card border-border shadow-card rounded-2xl hover:bg-secondary/80 transition-all duration-200"
          >
            <Filter className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">{activeFilterLabel}</span>
            {activeFilter !== "all" && (
              <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
                1
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2" align="end">
          <div className="space-y-1">
            {filterOptions.map((option) => (
              <Button
                key={option.id}
                variant="ghost"
                className="w-full justify-start h-10 px-3 text-sm"
                onClick={() => onFilterChange?.(option.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                  {activeFilter === option.id && (
                    <Badge variant="default" className="h-5 px-2 text-xs">
                      ✓
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};