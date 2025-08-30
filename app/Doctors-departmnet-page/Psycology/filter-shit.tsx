"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Filter } from "lucide-react"
import { useState } from "react"

export function FilterSheet() {
  const [fees, setFees] = useState([2000])
  const [experience, setExperience] = useState([10])
  const [rating, setRating] = useState([80])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Filter Doctors</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div className="space-y-4">
            <Label className="text-base font-semibold">Consultation Fees</Label>
            <div className="px-2">
              <Slider
                value={fees}
                onValueChange={setFees}
                max={5000}
                min={500}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>₹500</span>
                <span>₹{fees[0]}</span>
                <span>₹5000</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Experience</Label>
            <div className="px-2">
              <Slider
                value={experience}
                onValueChange={setExperience}
                max={30}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>1 year</span>
                <span>{experience[0]} years</span>
                <span>30 years</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Rating</Label>
            <div className="px-2">
              <Slider
                value={rating}
                onValueChange={setRating}
                max={100}
                min={50}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>50%</span>
                <span>{rating[0]}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Availability</Label>
            <RadioGroup defaultValue="all" className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="text-sm">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="today" id="today" />
                <Label htmlFor="today" className="text-sm">Available Today</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tomorrow" id="tomorrow" />
                <Label htmlFor="tomorrow" className="text-sm">Available Tomorrow</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="text-sm">Online Consultation</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Location</Label>
            <RadioGroup defaultValue="all" className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="location-all" />
                <Label htmlFor="location-all" className="text-sm">All Locations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mumbai" id="mumbai" />
                <Label htmlFor="mumbai" className="text-sm">Mumbai</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delhi" id="delhi" />
                <Label htmlFor="delhi" className="text-sm">Delhi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bangalore" id="bangalore" />
                <Label htmlFor="bangalore" className="text-sm">Bangalore</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hyderabad" id="hyderabad" />
                <Label htmlFor="hyderabad" className="text-sm">Hyderabad</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chennai" id="chennai" />
                <Label htmlFor="chennai" className="text-sm">Chennai</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pune" id="pune" />
                <Label htmlFor="pune" className="text-sm">Pune</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => {
              setFees([2000])
              setExperience([10])
              setRating([80])
            }}>
              Reset
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 