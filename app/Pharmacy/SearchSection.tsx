import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export function SearchSection() {
  return (
    <div className="w-full animate-fade-in-up">
      <div className="relative flex items-center w-full group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5 z-10 transition-all duration-300 group-focus-within:scale-110" />
        <Input 
          placeholder="Search medicines or healthcare products..." 
          className="pl-8 pr-20 h-12 text-base bg-white backdrop-blur border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl w-full transition-all duration-300 hover:border-green-400 focus:shadow-lg" 
        />
        <Button 
          size="sm" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 px-4 text-sm bg-green-600 hover:bg-green-700 text-white transition-all duration-200 hover:scale-105 shadow-md"
        >
          Search
        </Button>
      </div>
    </div>
  );
}