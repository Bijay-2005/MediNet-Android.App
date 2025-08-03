"use client"

import { DoctorCard } from "./doctors-card"
import { FilterSheet } from "./filter-shit"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, ArrowLeft } from "lucide-react"
import { useState } from "react" // Import useState


export default function DermatologyPage({ 
  onScheduleAppointment, 
  onBackToDepartments 
}: { 
  onScheduleAppointment?: (doctorId: string, type: string) => void
  onBackToDepartments?: () => void
}) {
  console.log("DermatologyPage component is rendering"); // Debug log
  const [searchQuery, setSearchQuery] = useState("") // State for search query

  const doctors = [
    {
      id: "1",
      name: "Dr.Kumar sanu",
      specialization: "Dermatologist",
      experience: "22 YEARS",
      degrees: "MBBS, MD(DERMATOLOGY), D...",
      clinic: "Modern Dermatology Clinic",
      location: "Kolkata",
      fees: 1875,
      onlineConsultAvailability: "Available Today",
      visitDoctorAvailability: "Available Tomorrow",
      rating: 92,
      patientCount: 500,
      imageSrc: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "Dr.Rajesh kumar",
      specialization: "Dermatologist",
      experience: "35 YEARS",
      degrees: "MBBS, MD(DERMATOLOGY), D...",
      clinic: "Clear Skin Clinic",
      location: "Chennai",
      fees: 700,
      onlineConsultAvailability: "Available in 30 mins",
      visitDoctorAvailability: "No Booking Fees",
      rating: 88,
      patientCount: 1200,
      imageSrc: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      name: "Dr.Bismay kumar",
      specialization: "Radiant Dermatology:",
      experience: "13 YEARS",
      degrees: "MBBS, MD(DERMATOLOGY), D...",
      clinic: "Ashu dermatology Clinic",
      location: "Kolkata",
      fees: 1100,
      onlineConsultAvailability: "Available Today",
      visitDoctorAvailability: "Available Tomorrow",
      rating: 90,
      patientCount: 25,
      imageSrc: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "4",
      name: "Dr.Satunu Naidu",
      specialization: "Dermatologist",
      experience: "13 YEARS",
      degrees: "MBBS, MD(DERMATOLOGY), D...",
      clinic: "Dermacare Clinic:",
      location: "Kolkata",
      fees: 1000,
      onlineConsultAvailability: "Not available",
      visitDoctorAvailability: "Available Today",
      rating: 95,
      patientCount: 750,
      imageSrc: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "5",
      name: " Dr. Anita Rath ",
      specialization: "Dermatologist",
      experience: "13 YEARS",
      degrees: "MBBS, MD(DERMATOLOGY), D...",
      clinic: "Fortis Healthcare",
      location: "Pune",
      fees: 800,
      onlineConsultAvailability: "Available in 15 mins",
      visitDoctorAvailability: "Not available",
      rating: 98,
      patientCount: 375,
      imageSrc: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "6",
        name: "Dr. Nikunja Dash",
      specialization: "Dermatologist",
      experience: "15 YEARS",
      degrees: "MBBS, MD(DERMATOLOGY), D...",
      clinic: "kaya clinic",
      location: "Bengaluru",
      fees: 400,
      onlineConsultAvailability: "Available in 2 minutes",
      visitDoctorAvailability: "No Booking Fees",
      rating: 85,
      patientCount: 150,
      imageSrc: "/placeholder.svg?height=80&width=80",
    },
  ]

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter((doctor) => doctor.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Top section: Back Button, Location, Search, Filter */}
      <header className="sticky top-0 z-10 bg-white shadow-md p-4 border-b border-blue-100">
        <div className="flex items-center justify-between gap-2">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToDepartments}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Button>

          {/* Location Tab */}
          <Select defaultValue="select-address">
            <SelectTrigger className="w-[160px] flex items-center gap-2 border-blue-300 text-blue-700 font-medium">
              <MapPin className="w-4 h-4 text-blue-500" />
              <SelectValue placeholder="Select Address" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select-address">Select Address</SelectItem>
              <SelectItem value="kolkata">Kolkata</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
              <SelectItem value="bengaluru">Bengaluru</SelectItem>
            </SelectContent>
          </Select>

          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search doctors by name..."
              className="w-full pl-9 pr-2 py-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={searchQuery} // Bind value to state
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
            />
          </div>

          {/* Filter */}
          <FilterSheet />
        </div>
      </header>

      {/* Make main content scrollable */}
      <main className="flex-1 p-4 space-y-6 overflow-auto pb-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Select defaultValue="availability">
            <SelectTrigger className="w-full sm:w-[140px] border-blue-300 text-blue-700 font-medium">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="availability">Availability</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="next-7-days">Next 7 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="w-full sm:w-auto text-sm bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-colors"
            onClick={() => alert("Showing doctors near your location!")} // Placeholder for activation
          >
            Show Doctors Near Me
          </Button>
        </div>

        <h2 className="text-xl font-bold text-gray-800">
          Consult Dermatologists Online - Skin Specialists ({filteredDoctors.length} doctors)
        </h2>

        <div className="grid gap-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} {...doctor} onScheduleAppointment={onScheduleAppointment || (() => {})} />)
          ) : (
            <p className="text-center text-gray-500 mt-8">No doctors found matching your search.</p>
          )}
        </div>
      </main>
    </div>
  )
}
