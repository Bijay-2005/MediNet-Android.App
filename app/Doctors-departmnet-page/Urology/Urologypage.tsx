"use client"

import { DoctorCard } from "./doctors-card"
import { FilterSheet } from "./filter-shit"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function UrologyPage({ 
  onScheduleAppointment, 
  onBackToDepartments 
}: { 
  onScheduleAppointment?: (doctorId: string, type: string) => void
  onBackToDepartments?: () => void
}) {
  console.log("UrologyPage component is rendering")
  const [searchQuery, setSearchQuery] = useState("")

  const doctors = [
    {
      id: "1",
      name: "Dr. Vikram Singh",
      specialization: "Urologist",
      experience: "24 YEARS",
      degrees: "MBBS, MS(UROLOGY), DM...",
      clinic: "Urology Care Center",
      location: "Mumbai",
      fees: 2800,
      onlineConsultAvailability: "Available Today",
      visitDoctorAvailability: "Available Tomorrow",
      rating: 95,
      patientCount: 850,
      imageSrc: "https://tse4.mm.bing.net/th/id/OIP.Z5rJWW6n8IIo8dH50ALmmAHaF_?pid=Api&P=0&h=180",
    },
    {
      id: "2",
      name: "Dr. Priya Sharma",
      specialization: "Urologist",
      experience: "20 YEARS",
      degrees: "MBBS, MS(UROLOGY), FRCS...",
      clinic: "Urology Institute",
      location: "Delhi",
      fees: 2500,
      onlineConsultAvailability: "Available in 30 mins",
      visitDoctorAvailability: "No Booking Fees",
      rating: 92,
      patientCount: 680,
      imageSrc: "https://tse2.mm.bing.net/th/id/OIP.7TRImGCOmEYNy6jJBWthRAHaFn?pid=Api&P=0&h=180",
    },
    {
      id: "3",
      name: "Dr. Rajesh Kumar",
      specialization: "Urologist",
      experience: "26 YEARS",
      degrees: "MBBS, MS(UROLOGY), DM...",
      clinic: "Advanced Urology Clinic",
      location: "Bangalore",
      fees: 3200,
      onlineConsultAvailability: "Available Today",
      visitDoctorAvailability: "Available Tomorrow",
      rating: 97,
      patientCount: 1100,
      imageSrc: "https://tse2.mm.bing.net/th/id/OIP.1eDj2_mMeVfbl7L512JbDgHaEK?pid=Api&P=0&h=180",
    },
    {
      id: "4",
      name: "Dr. Sunita Reddy",
      specialization: "Urologist",
      experience: "22 YEARS",
      degrees: "MBBS, MS(UROLOGY), FRCS...",
      clinic: "Urology Solutions",
      location: "Hyderabad",
      fees: 2200,
      onlineConsultAvailability: "Not available",
      visitDoctorAvailability: "Available Today",
      rating: 89,
      patientCount: 520,
      imageSrc: "https://tse3.mm.bing.net/th/id/OIP.211V_0Mif6xNHW7kAv-UdwHaKX?pid=Api&P=0&h=180",
    },
    {
      id: "5",
      name: "Dr. Amit Patel",
      specialization: "Urologist",
      experience: "28 YEARS",
      degrees: "MBBS, MS(UROLOGY), DM...",
      clinic: "Urology & Kidney Hospital",
      location: "Chennai",
      fees: 3500,
      onlineConsultAvailability: "Available in 15 mins",
      visitDoctorAvailability: "Not available",
      rating: 98,
      patientCount: 1200,
      imageSrc: "https://tse3.mm.bing.net/th/id/OIP._oJhY8p3jeFOENLO3smXlgAAAA?pid=Api&P=0&h=180",
    },
    {
      id: "6",
      name: "Dr. Meera Iyer",
      specialization: "Urologist",
      experience: "18 YEARS",
      degrees: "MBBS, MS(UROLOGY), FRCS...",
      clinic: "UroMed Clinic",
      location: "Pune",
      fees: 2000,
      onlineConsultAvailability: "Available in 2 minutes",
      visitDoctorAvailability: "No Booking Fees",
      rating: 87,
      patientCount: 450,
      imageSrc: "https://tse4.mm.bing.net/th/id/OIP.v02JvvGGxryqp36Wn_MxPQAAAA?pid=Api&P=0&h=180",
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
          Consult Urologists Online - Urinary System Specialists ({filteredDoctors.length} doctors)
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