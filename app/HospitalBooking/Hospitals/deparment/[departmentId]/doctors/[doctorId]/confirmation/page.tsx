"use client"
import { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle, Calendar, Clock, User, Phone, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useParams, useRouter } from "next/navigation"

interface PaymentData {
  transactionId: string
  amount: number
  paidAt: string
  appointmentData: {
    hospitalId: string
    departmentId: string
    doctorId: string
    selectedDate: string
    selectedTime: string
    patientName: string
    patientAge: string
    patientPhone: string
    symptoms: string
    consultationFee: number
  }
}

const doctors = {
  "1": {
    name: "Dr. Rajesh Kumar",
    specialization: "Senior Cardiologist",
    image: "/doctor-male-cardiologist.png",
  },
  "2": {
    name: "Dr. Priya Sharma",
    specialization: "Interventional Cardiologist",
    image: "/doctor-female-cardiologist.png",
  },
}

const hospitalNames: { [key: string]: string } = {
  "1": "Apollo Hospitals Bhubaneswar",
  "2": "AIIMS Bhubaneswar",
  "3": "Kalinga Hospital",
}

const hospitalAddresses: { [key: string]: string } = {
  "1": "Gajapati Nagar, Bhubaneswar, Odisha 751005",
  "2": "Sijua, Bhubaneswar, Odisha 751019",
  "3": "Kiit Road, Bhubaneswar, Odisha 751024",
}

export default function ConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const hospitalId = params.hospitalId as string
  const doctorId = params.doctorId as string

  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const doctor = doctors[doctorId as keyof typeof doctors]
  const hospitalName = hospitalNames[hospitalId] || "Hospital"
  const hospitalAddress = hospitalAddresses[hospitalId] || "Hospital Address"

  useEffect(() => {
    // Retrieve payment data from localStorage
    const storedData = localStorage.getItem("paymentData")
    if (storedData) {
      setPaymentData(JSON.parse(storedData))
      setShowSuccess(true)
    } else {
      // Redirect to home if no payment data
      router.push("/")
    }
  }, [router])

  const downloadAppointmentDetails = () => {
    if (!paymentData) return

    const appointmentDetails = `
Appointment Confirmation

Patient Details:
- Name: ${paymentData.appointmentData.patientName}
- Age: ${paymentData.appointmentData.patientAge}
- Phone: ${paymentData.appointmentData.patientPhone}

Appointment Details:
- Date: ${new Date(paymentData.appointmentData.selectedDate).toLocaleDateString()}
- Time: ${paymentData.appointmentData.selectedTime}
- Doctor: ${doctor?.name}
- Specialization: ${doctor?.specialization}
- Hospital: ${hospitalName}
- Address: ${hospitalAddress}

Payment Details:
- Transaction ID: ${paymentData.transactionId}
- Amount: ₹${paymentData.amount}
- Paid At: ${new Date(paymentData.paidAt).toLocaleString()}

Please arrive 15 minutes before your appointment time.
Bring your ID proof and any relevant medical reports.
    `.trim()

    const blob = new Blob([appointmentDetails], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'appointment-confirmation.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareAppointment = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Appointment Confirmation',
        text: `Appointment confirmed with ${doctor?.name} on ${paymentData?.appointmentData.selectedDate} at ${paymentData?.appointmentData.selectedTime}`,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`Appointment confirmed with ${doctor?.name} on ${paymentData?.appointmentData.selectedDate} at ${paymentData?.appointmentData.selectedTime}`)
      alert('Appointment details copied to clipboard!')
    }
  }

  if (!paymentData || !showSuccess) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-3">
        <div className="w-full max-w-full md:max-w-md mx-auto px-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="p-2 bg-transparent hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-semibold text-lg text-balance">Appointment Confirmed!</h1>
              <p className="text-sm text-muted-foreground">Details below</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full md:max-w-md mx-auto p-4 space-y-4">
        {/* Success Message */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-800 mb-2">Appointment Confirmed!</h2>
            <p className="text-green-700">Your appointment has been successfully booked</p>
          </CardContent>
        </Card>

        {/* Appointment Details */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Appointment Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{paymentData.appointmentData.patientName}</p>
                  <p className="text-xs text-muted-foreground">Age: {paymentData.appointmentData.patientAge}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{new Date(paymentData.appointmentData.selectedDate).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground">Appointment Date</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{paymentData.appointmentData.selectedTime}</p>
                  <p className="text-xs text-muted-foreground">Appointment Time</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doctor & Hospital Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Doctor & Hospital</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={doctor?.image || "/placeholder.svg"}
                  alt={doctor?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{doctor?.name}</p>
                  <p className="text-sm text-muted-foreground">{doctor?.specialization}</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium text-sm">{hospitalName}</p>
                <p className="text-xs text-muted-foreground">{hospitalAddress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span className="font-mono">{paymentData.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span className="font-bold text-primary">₹{paymentData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Date:</span>
                <span>{new Date(paymentData.paidAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-orange-800 mb-2">Important Notes</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Please arrive 15 minutes before your appointment</li>
              <li>• Bring your ID proof and medical reports</li>
              <li>• Wear a mask and follow hospital protocols</li>
              <li>• Contact hospital for any changes or cancellations</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={downloadAppointmentDetails}
            className="flex-1 bg-[#4CBB17] hover:bg-[#43a314] text-white">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            onClick={shareAppointment}
            className="flex-1 bg-[#4CBB17] hover:bg-[#43a314] text-white">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        <Button 
          onClick={() => router.push("/HospitalBooking/Hospitals")}
          className="w-full bg-[#4CBB17] hover:bg-[#43a314] text-white">
          Back to Home
        </Button>
      </div>
    </div>
  )
}
