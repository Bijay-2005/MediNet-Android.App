import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Info, MapPin, Star } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DoctorCardProps {
  id: string
  name: string
  specialization: string
  experience: string
  degrees: string
  clinic: string
  location: string
  fees: number
  onlineConsultAvailability: string 
  visitDoctorAvailability: string 
  rating?: number
  patientCount?: number
  imageSrc: string
  onScheduleAppointment: (doctorId: string, type: string) => void
}

export function DoctorCard({
  id,
  name,
  specialization,
  experience,
  degrees,
  clinic,
  location,
  fees,
  onlineConsultAvailability,
  visitDoctorAvailability,
  rating,
  patientCount,
  imageSrc,
  onScheduleAppointment,
}: DoctorCardProps) {

  return (
    <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start gap-4">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={`Dr. ${name}`}
          width={80}
          height={80}
          className="rounded-full object-cover aspect-square border border-gray-200"
        />
        <div className="grid gap-1 flex-1">
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-1">
            Dr. {name}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>More details about Dr. {name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          <p className="text-sm text-blue-600 font-medium">{specialization}</p>
          <p className="text-xs text-gray-500">
            {experience} • {degrees}
          </p>
          <p className="text-xs text-gray-500">{clinic}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gray-400" />
            {location}
          </p>
          {rating !== undefined && patientCount !== undefined && (
            <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
              <Star className="w-3 h-3 fill-green-600 stroke-green-600" />
              <span>
                {rating}% ({patientCount}+ Patients)
              </span>
            </div>
          )}
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-1 text-xs">
              <span className="text-gray-500">Online:</span>
              <span className={`text-xs font-medium ${
                onlineConsultAvailability.includes("Available") || onlineConsultAvailability.includes("in") 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}>
                {onlineConsultAvailability}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-gray-500">Clinic:</span>
              <span className={`text-xs font-medium ${
                visitDoctorAvailability.includes("Available") || visitDoctorAvailability.includes("No Booking") 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}>
                {visitDoctorAvailability}
              </span>
            </div>
          </div>
        </div>
        <div className="text-xl font-bold text-blue-700">₹{fees}</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="w-full text-sm h-10 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors bg-transparent"
          onClick={() => onScheduleAppointment(id, "online")}
        >
          Online Consult
        </Button>
        <Button
          className="w-full text-sm h-10 bg-blue-600 hover:bg-blue-700 transition-colors"
          onClick={() => onScheduleAppointment(id, "clinic")}
        >
          Visit Doctor
        </Button>
      </div>
    </div>
  )
}
