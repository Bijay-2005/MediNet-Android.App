"use client"

import { useState, useMemo } from "react"
import { Bell, Search, MapPin, Heart, Users, Calendar, User, Phone, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BloodRequestModal from "./blood-request-modal"
import DonationCampsModal from "./donation-camp-modal"
import NearbyBanksModal from "./nearby-banks-modal"
import ChatModal from "./chart-modal"
import OrganizerModal from "./organizer-modal"
import DonorRegistrationModal from "./donor-registration-modal"
import NotificationsModal from "./notification-modal"
import UserDetailsModal from "./user-details-modal"
import EmergencyResponseModal from "./emergency-response-modal"

export default function BloodBankApp() {
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [showCampsModal, setShowCampsModal] = useState(false)
  const [showBanksModal, setShowBanksModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showOrganizerModal, setShowOrganizerModal] = useState(false)
  const [showDonorRegistrationModal, setShowDonorRegistrationModal] = useState(false)
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false)
  const [showEmergencyResponseModal, setShowEmergencyResponseModal] = useState(false)
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [selectedCamp, setSelectedCamp] = useState<any>(null)
  const [selectedEmergencyRequest, setSelectedEmergencyRequest] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const emergencyRequests = [
    {
      id: 1,
      bloodType: "O-",
      hospital: "City General Hospital",
      urgency: "Critical",
      location: "2.3 km away",
      time: "5 min ago",
      unitsNeeded: 3,
      address: "123 Healthcare Ave, Medical District",
      contactPerson: "Dr. Sarah Johnson",
      contactPhone: "+1 (555) 123-4567",
      description: "Emergency surgery patient requires immediate O- blood transfusion. Patient is stable but critical.",
    },
    {
      id: 2,
      bloodType: "A+",
      hospital: "Cedars-Sinai Medical Center",
      urgency: "Urgent",
      location: "4.1 km away",
      time: "12 min ago",
      unitsNeeded: 2,
      address: "456 Medical Center Blvd, Downtown",
      contactPerson: "Dr. Michael Chen",
      contactPhone: "+1 (555) 234-5678",
      description: "Cancer patient undergoing chemotherapy needs A+ blood for treatment continuation.",
    },
    {
      id: 3,
      bloodType: "B+",
      hospital: "St. Mary's Hospital",
      urgency: "Moderate",
      location: "6.8 km away",
      time: "25 min ago",
      unitsNeeded: 1,
      address: "789 Saint Mary's Road, Westside",
      contactPerson: "Dr. Emily Rodriguez",
      contactPhone: "+1 (555) 345-6789",
      description: "Scheduled surgery patient requires B+ blood for upcoming procedure tomorrow morning.",
    },
  ]

  const bloodBanks = [
    {
      id: 1,
      name: "City General Blood Bank",
      location: "Downtown Medical District",
      address: "123 Healthcare Ave, Medical District",
      distance: "0.8 km",
      availableTypes: ["A+", "O+", "B+", "AB+"],
      phone: "+1 (555) 123-4567",
      hours: "24/7 Emergency",
      rating: 4.8,
      isOpen: true,
      availability: {
        "A+": "High",
        "O+": "Medium",
        "B+": "Low",
        "AB+": "High",
        "A-": "Medium",
        "O-": "Critical",
        "B-": "Low",
        "AB-": "Medium",
      },
    },
    {
      id: 2,
      name: "Regional Medical Center",
      location: "Central City",
      address: "456 Hospital Road, Central City",
      distance: "2.1 km",
      availableTypes: ["O-", "A-", "B-", "AB-"],
      phone: "+1 (555) 234-5678",
      hours: "Mon-Fri: 8AM-6PM",
      rating: 4.6,
      isOpen: true,
      availability: {
        "A+": "Medium",
        "O+": "High",
        "B+": "Medium",
        "AB+": "Low",
        "A-": "High",
        "O-": "Medium",
        "B-": "Critical",
        "AB-": "Low",
      },
    },
    {
      id: 3,
      name: "Community Health Blood Center",
      location: "Suburb Area",
      address: "789 Community Blvd, Suburb Area",
      distance: "4.3 km",
      availableTypes: ["A+", "B+", "O+", "AB+"],
      phone: "+1 (555) 345-6789",
      hours: "Mon-Sat: 7AM-7PM",
      rating: 4.4,
      isOpen: false,
      availability: {
        "A+": "Low",
        "O+": "Medium",
        "B+": "High",
        "AB+": "Medium",
        "A-": "Low",
        "O-": "High",
        "B-": "Medium",
        "AB-": "Critical",
      },
    },
    {
      id: 4,
      name: "Metro Blood Services",
      location: "Business District",
      address: "1010 Commerce St, Business District",
      distance: "3.2 km",
      availableTypes: ["O+", "A+", "AB-", "B-"],
      phone: "+1 (555) 456-7890",
      hours: "24/7 Emergency",
      rating: 4.7,
      isOpen: true,
      availability: {
        "A+": "High",
        "O+": "High",
        "B+": "Medium",
        "AB+": "Low",
        "A-": "Medium",
        "O-": "Low",
        "B-": "High",
        "AB-": "Critical",
      },
    },
    {
      id: 5,
      name: "University Medical Blood Bank",
      location: "University Campus",
      address: "202 University Way, University Campus",
      distance: "5.1 km",
      availableTypes: ["All Types"],
      phone: "+1 (555) 567-8901",
      hours: "Mon-Sun: 6AM-10PM",
      rating: 4.5,
      isOpen: true,
      availability: {
        "A+": "Medium",
        "O+": "Medium",
        "B+": "Medium",
        "AB+": "Medium",
        "A-": "Medium",
        "O-": "Medium",
        "B-": "Medium",
        "AB-": "Medium",
      },
    },
    {
      id: 6,
      name: "Children's Hospital Blood Center",
      location: "Pediatric Medical Complex",
      address: "303 Child Health Dr, Pediatric Medical Complex",
      distance: "7.2 km",
      availableTypes: ["O-", "A-", "B+", "AB+"],
      phone: "+1 (555) 678-9012",
      hours: "24/7 Pediatric Emergency",
      rating: 4.9,
      isOpen: true,
      availability: {
        "A+": "Low",
        "O+": "Low",
        "B+": "High",
        "AB+": "High",
        "A-": "High",
        "O-": "Critical",
        "B-": "Medium",
        "AB-": "Low",
      },
    },
  ]

  const recentChats = [
    {
      id: 1,
      name: "City Blood Bank",
      lastMessage: "Thank you for your donation!",
      time: "2 min ago",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Emergency Response Team",
      lastMessage: "We need A+ blood urgently",
      time: "15 min ago",
      unread: 1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter emergency requests and blood banks based on search query
  const filteredEmergencyRequests = useMemo(() => {
    if (!searchQuery) return emergencyRequests
    return emergencyRequests.filter(
      (request) =>
        request.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.hospital.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  const filteredBloodBanks = useMemo(() => {
    if (!searchQuery) return bloodBanks
    return bloodBanks.filter(
      (bank) =>
        bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bank.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bank.availableTypes.some((type) => type.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }, [searchQuery])

  const handleChatOpen = (chat: any) => {
    setSelectedChat(chat)
    setShowChatModal(true)
  }

  const handleCampRegistration = (camp: any) => {
    setSelectedCamp(camp)
    setShowDonorRegistrationModal(true)
  }

  const handleEmergencyResponse = (request: any) => {
    setSelectedEmergencyRequest(request)
    setShowEmergencyResponseModal(true)
  }

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://maps.google.com/?q=${encodedAddress}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      {/* Header with Background Image */}
      <div
        className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-b-3xl relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.8)), url('/images/blood-donation-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">Hi, John</h2>
                <p className="text-red-100 text-sm">Welcome to LifeSaver</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-red-400 relative"
                onClick={() => setShowNotificationsModal(true)}
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                  3
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-red-400"
                onClick={() => setShowUserDetailsModal(true)}
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Hero Section */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Donate Blood</h3>
                  <p className="text-red-100 text-sm">Save Life</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search blood banks, blood groups..."
              className="pl-10 bg-white/90 border-white/30 text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="bg-red-100 text-red-600 hover:bg-red-200 h-12 rounded-2xl"
            onClick={() => setShowRequestModal(true)}
          >
            <Users className="h-5 w-5 mr-2" />
            Request Blood
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600 h-12 rounded-2xl"
            onClick={() => setShowCampsModal(true)}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Donation Camps
          </Button>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Search Results</h3>

            {/* Blood Banks Results */}
            {filteredBloodBanks.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">Blood Banks</h4>
                <div className="space-y-2">
                  {filteredBloodBanks.map((bank) => (
                    <Card key={bank.id} className="bg-white shadow-sm">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-semibold text-gray-800">{bank.name}</h5>
                            <p className="text-sm text-gray-600">
                              {bank.location} • {bank.distance}
                            </p>
                            <p className="text-xs text-gray-500">{bank.hours}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {bank.availableTypes.map((type) => (
                                <Badge key={type} variant="outline" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => handleCall(bank.phone)}
                            >
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                            <Button
                              size="sm"
                              className="bg-blue-500 hover:bg-blue-600"
                              onClick={() => handleDirections(bank.address)}
                            >
                              <Navigation className="h-3 w-3 mr-1" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Emergency Requests Results */}
            {filteredEmergencyRequests.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">Emergency Requests</h4>
                <div className="space-y-2">
                  {filteredEmergencyRequests.map((request) => (
                    <Card key={request.id} className="bg-white shadow-sm">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">{request.bloodType}</span>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-800">{request.hospital}</h5>
                              <p className="text-sm text-gray-600">
                                {request.location} • {request.time}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleEmergencyResponse(request)}
                          >
                            Respond
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {filteredBloodBanks.length === 0 && filteredEmergencyRequests.length === 0 && (
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600">No results found for "{searchQuery}"</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Tabs for different sections - only show when not searching */}
        {!searchQuery && (
          <Tabs defaultValue="emergency" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl">
              <TabsTrigger value="emergency" className="rounded-lg">
                Emergency
              </TabsTrigger>
              <TabsTrigger value="chats" className="rounded-lg">
                Messages
              </TabsTrigger>
              <TabsTrigger value="nearby" className="rounded-lg">
                Nearby
              </TabsTrigger>
            </TabsList>

            <TabsContent value="emergency" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Emergency Blood Requests</h3>
                <Button variant="ghost" className="text-red-500">
                  See All
                </Button>
              </div>

              <div className="space-y-3">
                {emergencyRequests.map((request) => (
                  <Card key={request.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{request.bloodType}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{request.hospital}</h4>
                            <p className="text-sm text-gray-500">{request.location}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            request.urgency === "Critical"
                              ? "destructive"
                              : request.urgency === "Urgent"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {request.urgency}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{request.unitsNeeded} units needed</span>
                          <span>{request.time}</span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleEmergencyResponse(request)}
                        >
                          Respond
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="chats" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Recent Messages</h3>
                <Button variant="ghost" className="text-red-500">
                  See All
                </Button>
              </div>

              <div className="space-y-3">
                {recentChats.map((chat) => (
                  <Card
                    key={chat.id}
                    className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleChatOpen(chat)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-800">{chat.name}</h4>
                            <span className="text-xs text-gray-500">{chat.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && <Badge className="bg-red-500 text-white">{chat.unread}</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nearby" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Nearby Blood Banks</h3>
                <Button variant="ghost" className="text-red-500" onClick={() => setShowBanksModal(true)}>
                  <MapPin className="h-4 w-4 mr-1" />
                  View Map
                </Button>
              </div>

              <div className="space-y-3">
                {bloodBanks.slice(0, 3).map((bank) => (
                  <Card key={bank.id} className="bg-white shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{bank.name}</h4>
                          <p className="text-sm text-gray-600">{bank.location}</p>
                          <p className="text-xs text-gray-500">
                            {bank.distance} • {bank.hours}
                          </p>
                        </div>
                        <div className="text-right flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleCall(bank.phone)}
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600"
                            onClick={() => handleDirections(bank.address)}
                          >
                            <Navigation className="h-3 w-3 mr-1" />
                            Directions
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {bank.availableTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowBanksModal(true)}>
                View All Blood Banks
              </Button>
            </TabsContent>
          </Tabs>
        )}

        {/* Footer with License and Emergency Contact - Now at end of content */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mt-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <span>Licensed by Health Ministry</span>
              <span>•</span>
              <span>Reg. No: HM/2024/BB/001</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm font-medium text-red-600">Mednet+ Emergency:</span>
              <a href="tel:+1-800-MEDNET" className="text-sm font-bold text-red-600 hover:underline">
                +1-800-MEDNET (633638)
              </a>
            </div>
            <p className="text-xs text-gray-500">Available 24/7 for emergency blood requirements</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BloodRequestModal open={showRequestModal} onOpenChange={setShowRequestModal} />
      <DonationCampsModal
        open={showCampsModal}
        onOpenChange={setShowCampsModal}
        onBecomeOrganizer={() => setShowOrganizerModal(true)}
        onRegisterForCamp={handleCampRegistration}
      />
      <NearbyBanksModal open={showBanksModal} onOpenChange={setShowBanksModal} bloodBanks={bloodBanks} />
      <ChatModal open={showChatModal} onOpenChange={setShowChatModal} selectedChat={selectedChat} />
      <OrganizerModal open={showOrganizerModal} onOpenChange={setShowOrganizerModal} />
      <DonorRegistrationModal
        open={showDonorRegistrationModal}
        onOpenChange={setShowDonorRegistrationModal}
        selectedCamp={selectedCamp}
      />
      <NotificationsModal open={showNotificationsModal} onOpenChange={setShowNotificationsModal} />
      <UserDetailsModal open={showUserDetailsModal} onOpenChange={setShowUserDetailsModal} />
      <EmergencyResponseModal
        open={showEmergencyResponseModal}
        onOpenChange={setShowEmergencyResponseModal}
        selectedRequest={selectedEmergencyRequest}
      />
    </div>
  )
}
