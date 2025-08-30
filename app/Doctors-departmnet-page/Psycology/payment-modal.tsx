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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmPayment: () => void
  amount: number
}

export function PaymentModal({ isOpen, onClose, onConfirmPayment, amount }: PaymentModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card") // 'card', 'upi', 'netbanking'

  // Card details
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  // UPI details
  const [upiId, setUpiId] = useState("")

  // Net Banking details
  const [selectedBank, setSelectedBank] = useState("")

  const handlePayment = () => {
    // In a real application, you would integrate with a payment gateway here
    // based on the selectedPaymentMethod.
    console.log("Processing payment for:", amount, "via", selectedPaymentMethod)

    switch (selectedPaymentMethod) {
      case "card":
        console.log("Card Details:", { cardNumber, expiryDate, cvv })
        break
      case "upi":
        console.log("UPI ID:", upiId)
        break
      case "netbanking":
        console.log("Selected Bank:", selectedBank)
        break
    }

    // Simulate payment success
    setTimeout(() => {
      onConfirmPayment()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Complete Your Payment</DialogTitle>
          <DialogDescription className="text-gray-600">
            You are about to pay <span className="font-bold text-blue-700">₹{amount}</span> for your online
            consultation.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="card" className="w-full" onValueChange={setSelectedPaymentMethod}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card">Cards</TabsTrigger>
            <TabsTrigger value="upi">UPI</TabsTrigger>
            <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
          </TabsList>
          <TabsContent value="card" className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">
                  Expiry Date (MM/YY)
                </Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">
                  CVV
                </Label>
                <Input id="cvv" placeholder="XXX" value={cvv} onChange={(e) => setCvv(e.target.value)} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="upi" className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="upiId" className="text-sm font-medium text-gray-700">
                UPI ID (e.g., yourname@bank)
              </Label>
              <Input id="upiId" placeholder="yourupiid@bank" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            </div>
            <p className="text-sm text-gray-500">
              You will receive a payment request on your UPI app (Google Pay, PhonePe, Paytm, etc.).
            </p>
          </TabsContent>
          <TabsContent value="netbanking" className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="bankSelect" className="text-sm font-medium text-gray-700">
                Select Your Bank
              </Label>
              <Select onValueChange={setSelectedBank}>
                <SelectTrigger id="bankSelect">
                  <SelectValue placeholder="Choose Bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sbi">State Bank of India</SelectItem>
                  <SelectItem value="hdfc">HDFC Bank</SelectItem>
                  <SelectItem value="icici">ICICI Bank</SelectItem>
                  <SelectItem value="axis">Axis Bank</SelectItem>
                  <SelectItem value="pnb">Punjab National Bank</SelectItem>
                  <SelectItem value="other">Other Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-gray-500">
              You will be redirected to your bank's net banking portal to complete the payment.
            </p>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
          >
            Cancel
          </Button>
          <Button onClick={handlePayment} className="bg-blue-600 hover:bg-blue-700">
            Pay ₹{amount}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
