"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  doctorName: string
  appointmentDate: string
  appointmentTime: string
  consultType: string
}

export function ConfirmationModal({
  isOpen,
  onClose,
  doctorName,
  appointmentDate,
  appointmentTime,
  consultType,
}: ConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 text-center">
        <DialogHeader className="items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <DialogTitle className="text-3xl font-bold text-gray-800">Appointment Confirmed!</DialogTitle>
          <DialogDescription className="text-gray-600 text-base mt-2">
            Your {consultType === "online" ? "Online Consultation" : "Clinic Visit"} appointment with{" "}
            <span className="font-semibold">{doctorName}</span> has been successfully booked.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 text-left mt-4">
          <p className="text-gray-700">
            <span className="font-medium">Date:</span> {appointmentDate}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Time:</span> {appointmentTime}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Type:</span>{" "}
            {consultType === "online" ? "Online Consultation" : "Clinic Visit"}
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2 mt-6">
          <Button onClick={onClose} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
            View My Appointments
          </Button>
          <Link href="/doctors" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent">
              Book Another Appointment
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}