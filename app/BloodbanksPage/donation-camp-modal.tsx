"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Clock, Users } from "lucide-react"

interface DonationCampsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBecomeOrganizer: () => void
  onRegisterForCamp: (camp: any) => void
}

export default function DonationCampsModal({
  open,
  onOpenChange,
  onBecomeOrganizer,
  onRegisterForCamp,
}: DonationCampsModalProps) {
  const upcomingCamps = [
    {
      id: 1,
      title: "Community Blood Drive",
      organizer: "Red Cross Society",
      date: "Tomorrow, Jan 16",
      time: "9:00 AM - 5:00 PM",
      location: "Central Community Center",
      address: "123 Main Street, Downtown",
      distance: "1.2 km away",
      expectedDonors: 150,
      spotsLeft: 23,
      bloodTypes: ["O+", "A+", "B+"],
    },
    {
      id: 2,
      title: "Corporate Blood Donation",
      organizer: "Tech Corp Foundation",
      date: "Jan 18, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Tech Corp Headquarters",
      address: "456 Business Ave, Tech District",
      distance: "3.5 km away",
      expectedDonors: 200,
      spotsLeft: 45,
      bloodTypes: ["All Types"],
    },
    {
      id: 3,
      title: "University Health Fair",
      organizer: "State University",
      date: "Jan 20, 2024",
      time: "11:00 AM - 6:00 PM",
      location: "University Medical Center",
      address: "789 Campus Drive, University District",
      distance: "5.8 km away",
      expectedDonors: 300,
      spotsLeft: 78,
      bloodTypes: ["O-", "A-", "AB+"],
    },
  ]

  const handleRegister = (camp: any) => {
    onRegisterForCamp(camp)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-red-600">Upcoming Donation Camps</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {upcomingCamps.map((camp) => (
            <Card key={camp.id} className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{camp.title}</h3>
                      <p className="text-sm text-gray-600">{camp.organizer}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{camp.spotsLeft} spots left</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{camp.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{camp.time}</span>
                    </div>
                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <div>
                        <p className="font-medium">{camp.location}</p>
                        <p className="text-xs">{camp.address}</p>
                        <p className="text-xs text-red-500">{camp.distance}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Expected: {camp.expectedDonors} donors</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Priority Blood Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {camp.bloodTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-red-500 hover:bg-red-600"
                      onClick={() => handleRegister(camp)}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-800 mb-1">Want to organize a camp?</p>
              <p className="text-xs text-blue-600 mb-3">
                Partner with us to organize blood donation camps in your area
              </p>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={onBecomeOrganizer}>
                Become Organizer
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
