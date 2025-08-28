"use client"
import { ArrowLeft, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

const departments = [
  {
    id: 1,
    name: "Cardiology",
    description: "Heart and cardiovascular care",
    doctors: 12,
    waitTime: "30 mins",
    availability: "Available",
    icon: "❤️",
  },
  {
    id: 2,
    name: "Orthopedics",
    description: "Bone and joint specialists",
    doctors: 8,
    waitTime: "45 mins",
    availability: "Available",
    icon: "🦴",
  },
  {
    id: 3,
    name: "Pediatrics",
    description: "Children's healthcare",
    doctors: 15,
    waitTime: "20 mins",
    availability: "Available",
    icon: "👶",
  },
  {
    id: 4,
    name: "Emergency",
    description: "24/7 emergency services",
    doctors: 6,
    waitTime: "Immediate",
    availability: "Available",
    icon: "🚨",
  },
  {
    id: 5,
    name: "General Medicine",
    description: "General health consultations",
    doctors: 20,
    waitTime: "25 mins",
    availability: "Available",
    icon: "🩺",
  },
  {
    id: 6,
    name: "Urology",
    description: "Urinary system specialists",
    doctors: 5,
    waitTime: "1 hour",
    availability: "Limited",
    icon: "🫘",
  },
]

const hospitalNames: { [key: string]: string } = {
  "1": "Apollo Hospitals Bhubaneswar",
  "2": "AIIMS Bhubaneswar",
  "3": "Kalinga Hospital",
}

export default function DepartmentsPage() {
  const params = useParams()
  const router = useRouter()
  const hospitalId = params.hospitalId as string
  const hospitalName = hospitalNames[hospitalId] || "Hospital"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-3">
        <div className="w-full max-w-full md:max-w-md mx-auto px-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push('/HospitalBooking/Hospitals')} className="p-2 bg-transparent hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-semibold text-lg text-balance">Departments</h1>
              <p className="text-sm text-muted-foreground">{hospitalName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Departments List */}
      <div className="max-w-md mx-auto p-4 space-y-3">
        {departments.map((department) => (
          <Card key={department.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-2xl">{department.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base">{department.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{department.description}</p>

                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {department.doctors} doctors
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {department.waitTime}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant={department.availability === "Available" ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {department.availability}
                  </Badge>
                  <Link href={`/HospitalBooking/Hospitals/deparment/${department.id}`}>
                    <Button size="sm" className="bg-[#4CBB17] hover:bg-[#43a314] text-white font-medium transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                      Select
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
