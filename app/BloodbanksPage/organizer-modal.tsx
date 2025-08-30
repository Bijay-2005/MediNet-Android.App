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
import { Upload, CheckCircle, User, Building, Phone, Mail, MapPin, FileText } from "lucide-react"

interface OrganizerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function OrganizerModal({ open, onOpenChange }: OrganizerModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    organizationType: "",
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    licenseNumber: "",
    licenseType: "",
    experience: "",
    previousCamps: "",
    description: "",
    documents: {
      license: null as File | null,
      registration: null as File | null,
      identity: null as File | null,
    },
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData({
      ...formData,
      documents: { ...formData.documents, [field]: file },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Organizer application submitted:", formData)
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
      organizationType: "",
      organizationName: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      licenseNumber: "",
      licenseType: "",
      experience: "",
      previousCamps: "",
      description: "",
      documents: {
        license: null,
        registration: null,
        identity: null,
      },
    })
    onOpenChange(false)
  }

  if (step === 3) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md mx-auto">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in becoming a blood donation camp organizer. One of our verifier team members
              will verify your details soon.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>What's next?</strong>
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Document verification (2-3 business days)</li>
                <li>• Background check and license validation</li>
                <li>• Interview with our team</li>
                <li>• Approval notification via email</li>
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
          <DialogTitle className="text-red-600">Become a Camp Organizer</DialogTitle>
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
              <Label htmlFor="organizationType">Organization Type *</Label>
              <Select
                value={formData.organizationType}
                onValueChange={(value) => handleInputChange("organizationType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="educational">Educational Institution</SelectItem>
                  <SelectItem value="government">Government Agency</SelectItem>
                  <SelectItem value="religious">Religious Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="organizationName">Organization Name *</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange("organizationName", e.target.value)}
                  placeholder="Enter organization name"
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
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                  placeholder="Full name of contact person"
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

            <div>
              <Label htmlFor="address">Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Street address"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="State"
                  required
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  placeholder="12345"
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licenseType">License Type *</Label>
                <Select value={formData.licenseType} onValueChange={(value) => handleInputChange("licenseType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical License</SelectItem>
                    <SelectItem value="ngo">NGO Registration</SelectItem>
                    <SelectItem value="corporate">Corporate License</SelectItem>
                    <SelectItem value="educational">Educational License</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="licenseNumber">License Number *</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                  placeholder="License/Registration #"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="experience">Experience (Years) *</Label>
              <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="2-5">2-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="previousCamps">Previous Camps Organized</Label>
              <Input
                id="previousCamps"
                type="number"
                value={formData.previousCamps}
                onChange={(e) => handleInputChange("previousCamps", e.target.value)}
                placeholder="Number of camps organized"
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="description">Organization Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of your organization and mission..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Required Documents *</Label>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">License/Registration Certificate</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("license-upload")?.click()}
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </Button>
                  <input
                    id="license-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileUpload("license", e.target.files?.[0] || null)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Organization Registration</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("registration-upload")?.click()}
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </Button>
                  <input
                    id="registration-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileUpload("registration", e.target.files?.[0] || null)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Identity Proof</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("identity-upload")?.click()}
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </Button>
                  <input
                    id="identity-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileUpload("identity", e.target.files?.[0] || null)}
                  />
                </div>
              </div>
            </div>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> All documents will be verified by our team. Please ensure all information is
                  accurate and documents are clear and valid.
                </p>
              </CardContent>
            </Card>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" className="flex-1 bg-red-500 hover:bg-red-600">
                Submit Application
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
