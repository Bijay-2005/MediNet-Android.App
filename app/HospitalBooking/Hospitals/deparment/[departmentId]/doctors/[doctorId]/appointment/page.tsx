"use client"
import { useState } from "react"
import { ArrowLeft, Calendar, Clock, User, Phone, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useParams, useRouter } from "next/navigation"

const doctors = {
  "1": {
    name: "Dr. Rajesh Kumar",
    specialization: "Senior Cardiologist",
    consultationFee: 800,
    image: "/doctor-male-cardiologist.png",
  },
  "2": {
    name: "Dr. Priya Sharma",
    specialization: "Interventional Cardiologist",
    consultationFee: 1000,
    image: "/doctor-female-cardiologist.png",
  },
}

const getNextDays = (count: number) => {
  const days = []
  for (let i = 0; i < count; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    days.push({
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      available: true
    })
  }
  return days
}

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
]

export default function AppointmentBookingPage() {
  const params = useParams()
  const router = useRouter()
  const hospitalId = params.hospitalId as string
  const departmentId = params.departmentId as string
  const doctorId = params.doctorId as string

  const doctor = doctors[doctorId as keyof typeof doctors]
  const availableDays = getNextDays(7)

  const [selectedDate, setSelectedDate] = useState(availableDays[0].date)
  const [selectedTime, setSelectedTime] = useState("")
  const [patientName, setPatientName] = useState("")
  const [patientAge, setPatientAge] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [symptoms, setSymptoms] = useState("")

  const handleProceedToPayment = () => {
    if (!selectedTime || !patientName || !patientAge || !patientPhone) {
      alert("Please fill all required fields")
      return
    }

    const appointmentData = {
      hospitalId,
      departmentId,
      doctorId,
      selectedDate,
      selectedTime,
      patientName,
      patientAge,
      patientPhone,
      symptoms,
      consultationFee: doctor?.consultationFee || 0,
    }

    // Store appointment data in localStorage for payment page
    localStorage.setItem("appointmentData", JSON.stringify(appointmentData))

    // Navigate to payment page
    router.push(`/HospitalBooking/Hospitals/deparment/${departmentId}/doctors/${doctorId}/payment`)
  }

  if (!doctor) {
    return <div>Doctor not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm px-4 py-3">
        <div className="w-full max-w-full md:max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2 hover:bg-blue-50 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div className="flex-1">
              <h1 className="font-bold text-xl text-gray-800">Book Appointment</h1>
              <p className="text-sm text-gray-600">{doctor.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full md:max-w-md mx-auto p-4 space-y-4">
        {/* Doctor Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {doctor.image ? (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center border-2 border-blue-300">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
              )}
              <div>
                <h3 className="font-bold text-lg text-gray-800">{doctor.name}</h3>
                <p className="text-sm text-gray-600 font-medium">{doctor.specialization}</p>
                <p className="text-sm font-bold text-green-600">₹{doctor.consultationFee}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Select Date
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {availableDays.map((day) => (
                <Button
                  key={day.date}
                  variant={selectedDate === day.date ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDate(day.date)}
                  className="flex flex-col h-auto py-2"
                >
                  <span className="text-xs">{day.day}</span>
                  <span className="text-xs">{new Date(day.date).getDate()}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Selection */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Select Time
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Details */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Patient Details
            </h3>
            
            <div>
              <label className="text-sm font-medium">Full Name *</label>
              <Input
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Age *</label>
              <Input
                placeholder="Enter age"
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone Number *</label>
              <Input
                placeholder="Enter phone number"
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Symptoms (Optional)</label>
              <Textarea
                placeholder="Describe your symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appointment Summary */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Appointment Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{selectedDate ? new Date(selectedDate).toLocaleDateString() : "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{selectedTime || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span>Consultation Fee:</span>
                <span>₹{doctor.consultationFee}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proceed Button */}
        <Button 
          onClick={handleProceedToPayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 transform transition-all duration-200 hover:scale-[1.02] active:scale-98 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedTime || !patientName || !patientAge || !patientPhone}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  )
}
