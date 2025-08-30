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
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, User, Phone, Mail, MapPin, Calendar, Heart } from "lucide-react"

interface DonorRegistrationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedCamp?: any
}

export default function DonorRegistrationModal({ open, onOpenChange, selectedCamp }: DonorRegistrationModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    bloodType: "",
    weight: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalHistory: "",
    medications: "",
    lastDonation: "",
    agreedToTerms: false,
    agreedToHealth: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Donor registration submitted:", formData, "for camp:", selectedCamp)
    setStep(3) // Show success message
  }

  const handleNext = () => {
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const resetForm = () => {
    setStep(1)
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      age: "",
      bloodType: "",
      weight: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
      medicalHistory: "",
      medications: "",
      lastDonation: "",
      agreedToTerms: false,
      agreedToHealth: false,
    })
    onOpenChange(false)
  }

  if (step === 3) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md mx-auto">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">Thank you for registering as a blood donor for the upcoming camp.</p>

            {selectedCamp && (
              <Card className="bg-red-50 border-red-200 mb-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-red-800 mb-2">{selectedCamp.title}</h3>
                  <div className="text-sm text-red-700 space-y-1">
                    <p>
                      <Calendar className="inline h-3 w-3 mr-1" />
                      {selectedCamp.date}
                    </p>
                    <p>
                      <MapPin className="inline h-3 w-3 mr-1" />
                      {selectedCamp.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>What's next?</strong>
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Confirmation email will be sent shortly</li>
                <li>• Pre-donation health screening reminder</li>
                <li>• Camp location and timing details</li>
                <li>• Post-donation care instructions</li>
              </ul>
            </div>
            <Button onClick={resetForm} className="bg-red-500 hover:bg-red-600">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-red-600">Register as Blood Donor</DialogTitle>
          {selectedCamp && <p className="text-sm text-gray-600">for {selectedCamp.title}</p>}
          <div className="flex items-center space-x-2 mt-2">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-red-500" : "bg-gray-300"}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-red-500" : "bg-gray-300"}`} />
            <span className="text-sm text-gray-600">Step {step} of 2</span>
          </div>
        </DialogHeader>

        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleNext()
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="65"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="25"
                  required
                />
              </div>

              <div>
                <Label htmlFor="bloodType">Blood Type *</Label>
                <Select value={formData.bloodType} onValueChange={(value) => handleInputChange("bloodType", value)}>
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
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  min="50"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="70"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Your complete address"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Contact person name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="emergencyPhone">Emergency Phone *</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>

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
                Next
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="lastDonation">Last Blood Donation</Label>
              <Input
                id="lastDonation"
                type="date"
                value={formData.lastDonation}
                onChange={(e) => handleInputChange("lastDonation", e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Leave blank if first time donor</p>
            </div>

            <div>
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                value={formData.medicalHistory}
                onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                placeholder="Any chronic conditions, surgeries, or medical issues..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={formData.medications}
                onChange={(e) => handleInputChange("medications", e.target.value)}
                placeholder="List any medications you're currently taking..."
                rows={2}
              />
            </div>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <Heart className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Pre-Donation Guidelines</p>
                    <ul className="text-xs text-yellow-700 mt-1 space-y-1">
                      <li>• Get adequate sleep (7-8 hours) before donation</li>
                      <li>• Eat a healthy meal 3 hours before donation</li>
                      <li>• Drink plenty of water and avoid alcohol</li>
                      <li>• Bring a valid ID and this registration confirmation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreedToHealth"
                  checked={formData.agreedToHealth}
                  onCheckedChange={(checked) => handleInputChange("agreedToHealth", checked as boolean)}
                />
                <Label htmlFor="agreedToHealth" className="text-sm">
                  I confirm that I am in good health and meet the eligibility criteria for blood donation *
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked as boolean)}
                />
                <Label htmlFor="agreedToTerms" className="text-sm">
                  I agree to the terms and conditions and consent to the blood donation process *
                </Label>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={handleBack}>
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-red-500 hover:bg-red-600"
                disabled={!formData.agreedToHealth || !formData.agreedToTerms}
              >
                Register for Donation
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
