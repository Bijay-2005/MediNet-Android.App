"use client"
import { useState, useEffect } from "react"
import { ArrowLeft, CreditCard, Lock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useParams, useRouter } from "next/navigation"

interface AppointmentData {
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

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const hospitalId = params.hospitalId as string
  const departmentId = params.departmentId as string
  const doctorId = params.doctorId as string

  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null)
  const [cardNumber, setCardNumber] = useState("")
  const [cardHolder, setCardHolder] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Retrieve appointment data from localStorage
    const storedData = localStorage.getItem("appointmentData")
    if (storedData) {
      setAppointmentData(JSON.parse(storedData))
    } else {
      // Redirect to home if no appointment data
      router.push("/")
    }
  }, [router])

  const handlePayment = async () => {
    if (!cardNumber || !cardHolder || !expiry || !cvv) {
      alert("Please fill all payment details")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Store payment data for confirmation page
      const paymentData = {
        transactionId: `TXN${Date.now()}`,
        amount: appointmentData?.consultationFee || 0,
        paidAt: new Date().toISOString(),
        appointmentData
      }
      localStorage.setItem("paymentData", JSON.stringify(paymentData))

      // Redirect to confirmation page after a delay
      setTimeout(() => {
        router.push(`/HospitalBooking/Hospitals/deparment/${departmentId}/doctors/${doctorId}/confirmation`)
      }, 2000)
    }, 3000)
  }

  if (!appointmentData) {
    return <div>Loading...</div>
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-8 border-[#4CBB17]/30"></div>
            <div className="absolute inset-0 rounded-full border-8 border-t-[#4CBB17] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Processing...</h2>
            <p className="text-gray-600 mt-2">Redirecting to confirmation page</p>
          </div>
        </div>
      </div>
    )
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
              <h1 className="font-bold text-xl text-gray-800">Payment</h1>
              <p className="text-sm text-gray-600">Complete your appointment booking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full md:max-w-md mx-auto p-4 space-y-4">
        {/* Appointment Summary */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Appointment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Patient:</span>
                <span>{appointmentData.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{new Date(appointmentData.selectedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{appointmentData.selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-bold text-primary">₹{appointmentData.consultationFee}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Details
            </h3>
            
            <div>
              <label className="text-sm font-medium">Card Number</label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="mt-1"
                maxLength={19}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Card Holder Name</label>
              <Input
                placeholder="John Doe"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Expiry Date</label>
                <Input
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="mt-1"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="text-sm font-medium">CVV</label>
                <Input
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="mt-1"
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </CardContent>
        </Card>

        {/* Pay Button */}
        <Button 
          onClick={handlePayment}
          className="w-full bg-[#4CBB17] hover:bg-[#43a314] text-white"
          disabled={isProcessing || !cardNumber || !cardHolder || !expiry || !cvv}
        >
          {isProcessing ? "Processing..." : `Pay ₹${appointmentData.consultationFee}`}
        </Button>
      </div>
    </div>
  )
}
