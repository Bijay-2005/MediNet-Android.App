"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface InsuranceDetailPageProps {
  onBack: () => void
  insuranceId: string 
}

export default function InsuranceDetailPage({ onBack, insuranceId }: InsuranceDetailPageProps) {
  // The content for all insurance plans is now constant as per the new design.
  // The 'insuranceId' can still be used to log or differentiate if needed in a real app.
  const insuranceDetails = {
    title: "Health Insurance",
    description:
      "Get comprehensive health insurance coverage starting from just ₹99/month with up to ₹5 Lakh coverage. Enjoy cashless treatment and no waiting period for essential services.",
    features: [
      "Cashless Treatment",
      "No Waiting Period",
      "Up to ₹5 Lakh coverage",
      "24/7 Customer Support",
      "Easy Claim Process",
    ],
    price: "₹99/month",
    coverage: "Up to ₹5 Lakh coverage",
    image: "/placeholder.svg?height=200&width=300", // Placeholder image for the detail page
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-[#2A5CAA]">{insuranceDetails.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-4">
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-6">
            <img
              src={insuranceDetails.image || "/placeholder.svg"}
              alt={insuranceDetails.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-[#2A5CAA] mb-2">{insuranceDetails.title}</h2>
            <p className="text-gray-700 mb-4">{insuranceDetails.description}</p>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-green-600">₹{insuranceDetails.price}</span>
              <span className="text-lg text-gray-500 line-through">₹{insuranceDetails.originalPrice}</span>
              <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                {insuranceDetails.discount}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">Key Features:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
              {insuranceDetails.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <Button className="w-full bg-[#2A5CAA] hover:bg-[#1e4080]">Enroll Now</Button>
          </CardContent>
        </Card>

        <div className="text-center py-6 text-gray-600">
          <p>For more details, contact our support.</p>
        </div>
      </div>
    </div>
  )
}
