"use client"

import { DoctorCard } from "./doctors-card"
import { FilterSheet } from "./filter-shit"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function NeurologyPage({ 
  onScheduleAppointment, 
  onBackToDepartments 
}: { 
  onScheduleAppointment?: (doctorId: string, type: string) => void
  onBackToDepartments?: () => void
}) {
  console.log("NeurologyPage component is rendering")
  const [searchQuery, setSearchQuery] = useState("")

  const doctors = [
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      specialization: "Neurologist",
      experience: "25 YEARS",
      degrees: "MBBS, MD(NEUROLOGY), DM...",
      clinic: "Brain & Spine Institute",
      location: "Mumbai",
      fees: 2500,
      onlineConsultAvailability: "Available Today",
      visitDoctorAvailability: "Available Tomorrow",
      rating: 95,
      patientCount: 800,
      imageSrc: "https://tse4.mm.bing.net/th/id/OIP.LEB5K8CmmB7Atsn1g8MQGAHaHa?pid=Api&P=0&h=180",
    },
    {
      id: "2",
      name: "Dr. Priya Sharma",
      specialization: "Neurologist",
      experience: "18 YEARS",
      degrees: "MBBS, MD(NEUROLOGY), DM...",
      clinic: "NeuroCare Center",
      location: "Delhi",
      fees: 1800,
      onlineConsultAvailability: "Available in 30 mins",
      visitDoctorAvailability: "No Booking Fees",
      rating: 92,
      patientCount: 650,
      imageSrc: "https://thumbs.dreamstime.com/b/female-doctor-neurologist-working-clinic-female-doctor-neurologist-working-clinic-143953342.jpg",
    },
    {
      id: "3",
      name: "Dr. Amit Patel",
      specialization: "Neurologist",
      experience: "22 YEARS",
      degrees: "MBBS, MD(NEUROLOGY), DM...",
      clinic: "Advanced Neurology Clinic",
      location: "Bangalore",
      fees: 2200,
      onlineConsultAvailability: "Available Today",
      visitDoctorAvailability: "Available Tomorrow",
      rating: 89,
      patientCount: 450,
      imageSrc: "https://tse3.mm.bing.net/th/id/OIP.YmKgwfpOoin17lOs1b5-ugHaE7?pid=Api&P=0&h=180",
    },
    {
      id: "4",
      name: "Dr. Sunita Reddy",
      specialization: "Neurologist",
      experience: "20 YEARS",
      degrees: "MBBS, MD(NEUROLOGY), DM...",
      clinic: "Neuro Solutions",
      location: "Hyderabad",
      fees: 1600,
      onlineConsultAvailability: "Not available",
      visitDoctorAvailability: "Available Today",
      rating: 94,
      patientCount: 720,
      imageSrc: "https://tse4.mm.bing.net/th/id/OIP.yFCiwlJT_PDP40tTJPrSAQHaEK?pid=Api&P=0&h=180",
    },
    {
      id: "5",
      name: "Dr. Vikram Singh",
      specialization: "Neurologist",
      experience: "28 YEARS",
      degrees: "MBBS, MD(NEUROLOGY), DM...",
      clinic: "Brain & Nerve Hospital",
      location: "Chennai",
      fees: 3000,
      onlineConsultAvailability: "Available in 15 mins",
      visitDoctorAvailability: "Not available",
      rating: 97,
      patientCount: 1200,
      imageSrc: "https://tse3.mm.bing.net/th/id/OIP.TjJg_qr_0hV4J2hDCdsv0QHaJF?pid=Api&P=0&h=180",
    },
    {
      id: "6",
      name: "Dr. Meera Iyer",
      specialization: "Neurologist",
      experience: "15 YEARS",
      degrees: "MBBS, MD(NEUROLOGY), DM...",
      clinic: "NeuroMed Clinic",
      location: "Pune",
      fees: 1400,
      onlineConsultAvailability: "Available in 2 minutes",
      visitDoctorAvailability: "No Booking Fees",
      rating: 88,
      patientCount: 380,
      imageSrc: "https://tse4.mm.bing.net/th/id/OIP.daOlEEcK2GVO3U_dtX_d8gHaE8?pid=Api&P=0&h=180",
    },
  ]

  const filteredDoctors = doctors.filter((doctor) => doctor.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
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

          <Select defaultValue="select-address">
            <SelectTrigger className="w-[160px] flex items-center gap-2 border-blue-300 text-blue-700 font-medium">
              <MapPin className="w-4 h-4 text-blue-500" />
              <SelectValue placeholder="Select Address" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select-address">Select Address</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search doctors by name..."
              className="w-full pl-9 pr-2 py-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <FilterSheet />
        </div>
      </header>

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
            onClick={() => alert("Showing doctors near your location!")}
          >
            Show Doctors Near Me
          </Button>
        </div>

        <h2 className="text-xl font-bold text-gray-800">
          Consult Neurologists Online - Brain & Nerve Specialists ({filteredDoctors.length} doctors)
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