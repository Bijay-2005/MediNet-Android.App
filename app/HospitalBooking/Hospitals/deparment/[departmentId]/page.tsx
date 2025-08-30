"use client"
import { ArrowLeft, Users, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

const doctors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialization: "Senior Cardiologist",
    experience: "15 years",
    rating: 4.9,
    reviews: 234,
    nextAvailable: "Today, 2:30 PM",
    consultationFee: 800,
    image: "/doctor-male-cardiologist.png",
    languages: ["English", "Hindi", "Odia"],
    education: "MBBS, MD Cardiology",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialization: "Interventional Cardiologist",
    experience: "12 years",
    rating: 4.8,
    reviews: 189,
    nextAvailable: "Tomorrow, 10:00 AM",
    consultationFee: 1000,
    image: "/doctor-female-cardiologist.png",
    languages: ["English", "Hindi"],
    education: "MBBS, DM Cardiology",
  },
  {
    id: 3,
    name: "Dr. Amit Patel",
    specialization: "Pediatric Cardiologist",
    experience: "10 years",
    rating: 4.7,
    reviews: 156,
    nextAvailable: "Today, 4:00 PM",
    consultationFee: 900,
    image: "/doctor-male-pediatric-cardiologist.png",
    languages: ["English", "Hindi", "Gujarati"],
    education: "MBBS, MD Pediatrics, DM Cardiology",
  },
  {
    id: 4,
    name: "Dr. Sunita Rao",
    specialization: "Cardiac Surgeon",
    experience: "18 years",
    rating: 4.9,
    reviews: 298,
    nextAvailable: "Next Week",
    consultationFee: 1200,
    image: "/doctor-female-cardiac-surgeon.png",
    languages: ["English", "Hindi", "Telugu"],
    education: "MBBS, MS General Surgery, MCh Cardiothoracic Surgery",
  },
]

const departmentNames: { [key: string]: string } = {
  "1": "Cardiology",
  "2": "Orthopedics",
  "3": "Pediatrics",
  "4": "Emergency",
  "5": "General Medicine",
  "6": "Urology",
}

const hospitalNames: { [key: string]: string } = {
  "1": "Apollo Hospitals Bhubaneswar",
  "2": "AIIMS Bhubaneswar",
  "3": "Kalinga Hospital",
}

export default function DoctorsPage() {
  const params = useParams()
  const router = useRouter()
  const departmentId = params.departmentId as string
  const departmentName = departmentNames[departmentId] || "Department"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-3">
        <div className="w-full max-w-full md:max-w-md mx-auto px-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2 bg-transparent hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-semibold text-lg text-balance">{departmentName} Doctors</h1>
              <p className="text-sm text-muted-foreground">Select a doctor to continue</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Doctors List */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {doctors.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-3">🔍</div>
            <h2 className="text-lg font-semibold">Doctor not found</h2>
            <p className="text-sm text-muted-foreground mt-1">No doctors are listed for this department right now.</p>
          </div>
        ) : doctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-20 h-20 flex-shrink-0">
                  <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-base">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                        <span>{doctor.experience} exp</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          <span>{doctor.rating}</span>
                          <span>({doctor.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <Link href={`/HospitalBooking/Hospitals/deparment/${departmentId}/doctors/${doctor.id}/appointment`}>
                      <Button size="sm" className="bg-[#4CBB17] hover:bg-[#43a314] text-white">Select</Button>
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Next: {doctor.nextAvailable}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
