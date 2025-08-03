"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, MapPin, Calendar, Heart, Edit, Save, X, Award, Clock, Users } from "lucide-react"

interface UserDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UserDetailsModal({ open, onOpenChange }: UserDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userDetails, setUserDetails] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    bloodType: "A+",
    age: "28",
    weight: "75",
    address: "123 Main Street, Downtown, City 12345",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+1 (555) 987-6543",
    lastDonation: "2024-10-15",
    totalDonations: 12,
    joinDate: "2022-03-15",
  })

  const [editedDetails, setEditedDetails] = useState(userDetails)

  const handleInputChange = (field: string, value: string) => {
    setEditedDetails({ ...editedDetails, [field]: value })
  }

  const handleSave = () => {
    setUserDetails(editedDetails)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedDetails(userDetails)
    setIsEditing(false)
  }

  const donationStats = [
    {
      label: "Total Donations",
      value: userDetails.totalDonations,
      icon: Heart,
      color: "text-red-500",
    },
    {
      label: "Lives Saved",
      value: userDetails.totalDonations * 3, // Assuming 1 donation saves 3 lives
      icon: Users,
      color: "text-green-500",
    },
    {
      label: "Member Since",
      value: new Date(userDetails.joinDate).getFullYear(),
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      label: "Last Donation",
      value: new Date(userDetails.lastDonation).toLocaleDateString(),
      icon: Clock,
      color: "text-purple-500",
    },
  ]

  const achievements = [
    { name: "First Time Donor", earned: true },
    { name: "Regular Donor", earned: true },
    { name: "Life Saver", earned: true },
    { name: "Hero Donor", earned: userDetails.totalDonations >= 10 },
    { name: "Champion Donor", earned: userDetails.totalDonations >= 25 },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-red-600">User Profile</DialogTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)} className="text-red-500">
              {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="bg-gradient-to-r from-red-50 to-red-100">
            <CardContent className="p-4 text-center">
              <Avatar className="w-20 h-20 mx-auto mb-3">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="text-lg font-semibold">
                  {userDetails.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold text-gray-800">{userDetails.fullName}</h3>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Badge className="bg-red-500 text-white">{userDetails.bloodType}</Badge>
                <Badge variant="outline">Verified Donor</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Donation Stats */}
          <div className="grid grid-cols-2 gap-3">
            {donationStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="bg-white">
                  <CardContent className="p-3 text-center">
                    <IconComponent className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
                    <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Personal Information */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Personal Information</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <div className="flex-1">
                      <Label htmlFor="fullName" className="text-xs">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={editedDetails.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-gray-700">{userDetails.fullName}</span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <div className="flex-1">
                      <Label htmlFor="email" className="text-xs">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedDetails.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-gray-700">{userDetails.email}</span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <div className="flex-1">
                      <Label htmlFor="phone" className="text-xs">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={editedDetails.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-gray-700">{userDetails.phone}</span>
                  )}
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  {isEditing ? (
                    <div className="flex-1">
                      <Label htmlFor="address" className="text-xs">
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={editedDetails.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-gray-700">{userDetails.address}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Medical Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-600">Blood Type</Label>
                  <p className="font-semibold text-red-600">{userDetails.bloodType}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Age</Label>
                  {isEditing ? (
                    <Input
                      id="age"
                      type="number"
                      min="18"
                      max="65"
                      value={editedDetails.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold">{userDetails.age} years</p>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Weight</Label>
                  {isEditing ? (
                    <Input
                      id="weight"
                      type="number"
                      min="50"
                      value={editedDetails.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold">{userDetails.weight} kg</p>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Last Donation</Label>
                  {isEditing ? (
                    <Input
                      id="lastDonation"
                      type="date"
                      value={editedDetails.lastDonation}
                      onChange={(e) => handleInputChange("lastDonation", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold text-sm">{new Date(userDetails.lastDonation).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Achievements */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Achievements</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg text-center ${
                      achievement.earned ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <Award
                      className={`h-4 w-4 mx-auto mb-1 ${achievement.earned ? "text-yellow-500" : "text-gray-400"}`}
                    />
                    <p className={`text-xs font-medium ${achievement.earned ? "text-yellow-800" : "text-gray-500"}`}>
                      {achievement.name}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="outline" className="w-full bg-transparent" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
