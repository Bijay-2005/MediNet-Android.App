import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Filter } from "lucide-react"

export function FilterSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filter Doctors</SheetTitle>
          <SheetDescription>Apply filters to find the best doctors for you.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-2">
            <Label htmlFor="experience">Experience</Label>
            <RadioGroup defaultValue="any" id="experience">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="experience-any" />
                <Label htmlFor="experience-any">Any</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5-years" id="experience-5" />
                <Label htmlFor="experience-5">{"5+ Years"}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="10-years" id="experience-10" />
                <Label htmlFor="experience-10">{"10+ Years"}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fees">Fees</Label>
            <Slider id="fees" defaultValue={[500]} max={2000} step={50} className="w-[80%]" />
            <span className="text-sm text-muted-foreground">Max: ₹500</span>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Near by my Location</Label>
            <RadioGroup defaultValue="any" id="location">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="location-any" />
                <Label htmlFor="location-any">Any</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1km" id="location-1km" />
                <Label htmlFor="location-1km">{"< 1 km"}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5km" id="location-5km" />
                <Label htmlFor="location-5km">{"< 5 km"}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="patient-ratings">Patient Ratings</Label>
            <RadioGroup defaultValue="any" id="patient-ratings">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="ratings-any" />
                <Label htmlFor="ratings-any">Any</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="90-plus" id="ratings-90" />
                <Label htmlFor="ratings-90">{"90%+"}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="80-plus" id="ratings-80" />
                <Label htmlFor="ratings-80">{"80%+"}</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline">Reset</Button>
          <Button>Apply Filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
} 