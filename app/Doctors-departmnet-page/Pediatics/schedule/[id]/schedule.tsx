"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { TimeSlots } from "../time-slot"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { PaymentModal } from "../../payment-modal"
import { ConfirmationModal } from "../confomation-modal"

export default function ScheduleAppointmentPage({ params, onBack }: { params: { id: string }, onBack?: () => void }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const consultType = searchParams.get("type") || "clinic" // Default to clinic if not specified

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  // Dummy data for a specific doctor
  const doctor = {
    name: "Dr. S B Bhattacharyya",
    address: "202, Omrom Regency, Above - Eye Appliances, Bandra (W), Mumbai",
    fees: 800,
  }

  const morningSlots = [
    "09:00 AM",
    "09:20 AM",
    "09:40 AM",
    "10:00 AM",
    "10:20 AM",
    "10:40 AM",
    "11:00 AM",
    "11:20 AM",
    "11:40 AM",
  ]

  const afternoonSlots = [
    "12:00 PM",
    "12:20 PM",
    "12:40 PM",
    "01:00 PM",
    "01:20 PM",
    "01:40 PM",
    "02:00 PM",
    "02:20 PM",
    "02:40 PM",
    "03:00 PM",
    "03:20 PM",
    "03:40 PM",
    "04:00 PM",
    "04:20 PM",
    "04:40 PM",
  ]

  const eveningSlots = [
    "05:00 PM",
    "05:20 PM",
    "05:40 PM",
    "06:00 PM",
    "06:20 PM",
    "06:40 PM",
    "07:00 PM",
    "07:20 PM",
    "07:40 PM",
  ]

  const paymentOptionText = consultType === "online" ? "Online Payment" : "Pay at Clinic"
  const footerButtonText = consultType === "online" ? "Continue" : "Confirm Slot"

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time for your appointment.")
      return
    }

    if (consultType === "online") {
      setShowPaymentModal(true)
    } else {
      // For clinic visits, directly show confirmation
      setShowConfirmationModal(true)
    }
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    setShowConfirmationModal(true)
  }

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A"

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md p-4 border-b border-blue-100 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack || (() => router.push('/'))} className="text-gray-600 hover:text-gray-800">
          <ChevronLeft className="w-6 h-6" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-xl font-bold text-gray-800">Schedule Appointment</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-base font-semibold text-gray-800">{doctor.name}</p>
          <p className="text-sm text-gray-500 mt-1">{doctor.address}</p>
        </div>

        {/* Calendar for date selection */}
        <div className="flex justify-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            initialFocus
          />
        </div>

        <TimeSlots
          label="Morning"
          slots={morningSlots}
          availableSlotsCount={morningSlots.length}
          onSelectTime={setSelectedTime}
          selectedTime={selectedTime}
        />
        <TimeSlots
          label="Afternoon"
          slots={afternoonSlots}
          availableSlotsCount={afternoonSlots.length}
          onSelectTime={setSelectedTime}
          selectedTime={selectedTime}
        />
        <TimeSlots
          label="Evening"
          slots={eveningSlots}
          availableSlotsCount={eveningSlots.length}
          onSelectTime={setSelectedTime}
          selectedTime={selectedTime}
        />
      </main>

      {/* Fixed Footer */}
      <footer className="sticky bottom-0 z-10 bg-white shadow-lg p-4 border-t border-blue-100 flex items-center justify-between">
        <div>
          <p className="text-xl font-bold text-blue-700">₹{doctor.fees}</p>
          <p className="text-sm text-gray-500">{paymentOptionText}</p>
        </div>
        <Button size="lg" className="w-1/2 bg-blue-600 hover:bg-blue-700 transition-colors" onClick={handleContinue}>
          {footerButtonText}
        </Button>
      </footer>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onConfirmPayment={handlePaymentSuccess}
        amount={doctor.fees}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        doctorName={doctor.name}
        appointmentDate={formattedDate}
        appointmentTime={selectedTime || "N/A"}
        consultType={consultType}
      />
    </div>
  )
}
