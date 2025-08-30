"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface TimeSlotProps {
  label: string
  slots: string[]
  availableSlotsCount: number
  onSelectTime: (time: string) => void // Callback to update selected time in parent
  selectedTime: string | null // Currently selected time from parent
}

export function TimeSlots({ label, slots, availableSlotsCount, onSelectTime, selectedTime }: TimeSlotProps) {
  const [showAll, setShowAll] = useState(false)

  const displayedSlots = showAll ? slots : slots.slice(0, 6) // Show first 6 by default

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{label}</h3>
        <span className="text-sm text-muted-foreground">{availableSlotsCount} SLOTS</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {displayedSlots.map((time) => (
          <Button
            key={time}
            variant="outline"
            className={cn("h-12 text-base", selectedTime === time && "bg-blue-100 border-blue-500 text-blue-700")}
            onClick={() => onSelectTime(time)} // Use onSelectTime callback
          >
            {time}
          </Button>
        ))}
      </div>
      {slots.length > 6 && !showAll && (
        <Button variant="link" onClick={() => setShowAll(true)} className="justify-start px-0">
          View More Slots
        </Button>
      )}
    </div>
  )
}
