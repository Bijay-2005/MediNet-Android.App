"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, User } from "lucide-react"

interface BloodRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function BloodRequestModal({ open, onOpenChange }: BloodRequestModalProps) {
  const [formData, setFormData] = useState({
    bloodType: "",
    unitsNeeded: "",
    urgency: "",
    hospital: "",
    location: "",
    contactPerson: "",
    additionalInfo: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - notify blood banks
    console.log("Blood request submitted:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      bloodType: "",
      unitsNeeded: "",
      urgency: "",
      hospital: "",
      location: "",
      contactPerson: "",
      additionalInfo: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-red-600">Request Blood</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bloodType">Blood Type *</Label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="unitsNeeded">Units Needed *</Label>
              <Input
                id="unitsNeeded"
                type="number"
                min="1"
                value={formData.unitsNeeded}
                onChange={(e) => setFormData({ ...formData, unitsNeeded: e.target.value })}
                placeholder="1"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="urgency">Urgency Level *</Label>
            <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical (Within 1 hour)</SelectItem>
                <SelectItem value="urgent">Urgent (Within 6 hours)</SelectItem>
                <SelectItem value="moderate">Moderate (Within 24 hours)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="hospital">Hospital/Medical Center *</Label>
            <Input
              id="hospital"
              value={formData.hospital}
              onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
              placeholder="Enter hospital name"
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter address or use current location"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contactPerson">Contact Person *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="Doctor/Nurse name"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              placeholder="Any additional details..."
              rows={3}
            />
          </div>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Privacy Notice</p>
                  <p className="text-xs text-red-600 mt-1">
                    Your request will be sent to nearby blood banks and registered donors. Personal contact details will
                    only be shared with verified responders.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-red-500 hover:bg-red-600">
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
