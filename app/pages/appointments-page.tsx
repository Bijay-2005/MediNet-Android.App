"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, ChevronRight, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function AppointmentsPage() {
  const [activeFilter, setActiveFilter] = useState("upcoming")

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      hospital: "City General Hospital",
      date: "Today",
      time: "2:30 PM",
      status: "confirmed",
      avatar: "👩‍⚕️",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Neurologist",
      hospital: "MediCare Center",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "confirmed",
      avatar: "👨‍⚕️",
    },
    {
      id: 3,
      doctor: "Dr. Emily Davis",
      specialty: "Pediatrician",
      hospital: "Health Plus Clinic",
      date: "Jan 15",
      time: "3:45 PM",
      status: "pending",
      avatar: "👩‍⚕️",
    },
  ]

  const pastAppointments = [
    {
      id: 4,
      doctor: "Dr. Robert Wilson",
      specialty: "Orthopedic",
      hospital: "City General Hospital",
      date: "Jan 8",
      time: "11:30 AM",
      status: "completed",
      avatar: "👨‍⚕️",
    },
    {
      id: 5,
      doctor: "Dr. Lisa Brown",
      specialty: "Dermatologist",
      hospital: "Skin Care Clinic",
      date: "Dec 28",
      time: "4:15 PM",
      status: "completed",
      avatar: "👩‍⚕️",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-[#2A5CAA]">My Appointments</h1>
            <Button size="sm" className="bg-[#2A5CAA] hover:bg-[#1e4080]">
              <Plus className="w-4 h-4 mr-2" />
              Book New
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Input placeholder="Search appointments..." className="pr-10" />
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {[
              { id: "upcoming", label: "Upcoming", count: 3 },
              { id: "past", label: "Past", count: 2 },
              { id: "cancelled", label: "Cancelled", count: 0 },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.id ? "bg-[#2A5CAA] text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-4">
        {activeFilter === "upcoming" && (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                      {appointment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800">{appointment.doctor}</h3>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>{appointment.status}</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{appointment.hospital}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          Reschedule
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-red-600 border-red-200 bg-transparent"
                        >
                          Cancel
                        </Button>
                        <Button size="sm" className="bg-[#2A5CAA] hover:bg-[#1e4080]">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeFilter === "past" && (
          <div className="space-y-4">
            {pastAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                      {appointment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800">{appointment.doctor}</h3>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>{appointment.status}</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          View Report
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeFilter === "cancelled" && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Cancelled Appointments</h3>
            <p className="text-gray-600">You haven't cancelled any appointments recently.</p>
          </div>
        )}
      </div>
    </div>
  )
}
