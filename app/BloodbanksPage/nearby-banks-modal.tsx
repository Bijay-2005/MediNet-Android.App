"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Navigation } from "lucide-react"

interface NearbyBanksModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bloodBanks: any[]
}

export default function NearbyBanksModal({ open, onOpenChange, bloodBanks }: NearbyBanksModalProps) {
  const getAvailabilityColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-orange-100 text-orange-800"
      case "Critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleDirections = (address: string) => {
    // Open maps with directions
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://maps.google.com/?q=${encodedAddress}`, "_blank")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-red-600">Nearby Blood Banks</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {bloodBanks.map((bank) => {
            // Ensure address and phone are available, provide fallbacks if necessary
            const addressToUse = bank.address || bank.location || "Unknown Address"
            const phoneToUse = bank.phone || ""

            return (
              <Card key={bank.id} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{bank.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-600">{addressToUse}</p>
                        </div>
                        <p className="text-xs text-red-500 mt-1">{bank.distance} away</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${bank.isOpen ? "bg-green-500" : "bg-red-500"}`} />
                        <span className={`text-xs ${bank.isOpen ? "text-green-600" : "text-red-600"}`}>
                          {bank.isOpen ? "Open" : "Closed"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Clock className="h-3 w-3" />
                      <span>{bank.hours}</span>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">Blood Availability:</p>
                      <div className="grid grid-cols-4 gap-1">
                        {Object.entries(bank.availability || {}).map(([type, level]) => (
                          <div key={type} className="text-center">
                            <div className="text-xs font-medium text-gray-700">{type}</div>
                            <Badge className={`text-xs px-1 py-0 ${getAvailabilityColor(level as string)}`}>
                              {level as string}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleCall(phoneToUse)}
                        disabled={!phoneToUse}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-500 hover:bg-blue-600"
                        onClick={() => handleDirections(addressToUse)}
                        disabled={!addressToUse || addressToUse === "Unknown Address"}
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 mb-1">Can't find what you need?</p>
              <p className="text-xs text-gray-600 mb-3">Contact our 24/7 helpline for emergency blood requirements</p>
              <Button size="sm" className="bg-red-500 hover:bg-red-600">
                Emergency Helpline
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
