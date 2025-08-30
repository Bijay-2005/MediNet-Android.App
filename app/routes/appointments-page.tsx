"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, MapPin, ChevronRight, Filter, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface Appointment {
  _id: string
  doctorName: string
  doctorSpecialization: string
  hospitalName: string
  hospitalAddress: string
  selectedDate: string
  selectedTime: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  patientName: string
  patientAge: string
  patientPhone: string
  symptoms: string
  consultationFee: number
  transactionId: string
  createdAt: string
}

export default function AppointmentsPage() {
  const [activeFilter, setActiveFilter] = useState("upcoming")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      if (!token) {
        setError('Please login to view appointments')
        setLoading(false)
        return
      }

      const response = await fetch('http://localhost:3001/appointments/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAppointments(data.data || [])
      } else {
        setError('Failed to fetch appointments')
      }
    } catch (error) {
      setError('Network error while fetching appointments')
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast({
          title: "Error",
          description: "Please login to update appointments",
          variant: "destructive"
        })
        return
      }

      const response = await fetch(`http://localhost:3001/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Appointment status updated successfully"
        })
        fetchAppointments() // Refresh the list
      } else {
        toast({
          title: "Error",
          description: "Failed to update appointment status",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error while updating appointment",
        variant: "destructive"
      })
    }
  }

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast({
          title: "Error",
          description: "Please login to cancel appointments",
          variant: "destructive"
        })
        return
      }

      const response = await fetch(`http://localhost:3001/appointments/${appointmentId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Appointment cancelled successfully"
        })
        fetchAppointments() // Refresh the list
      } else {
        toast({
          title: "Error",
          description: "Failed to cancel appointment",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error while cancelling appointment",
        variant: "destructive"
      })
    }
  }

  const getFilteredAppointments = () => {
    const today = new Date()

    switch (activeFilter) {
      case 'upcoming':
        return appointments.filter(apt => 
          apt.status === 'confirmed' || apt.status === 'pending'
        ).filter(apt => {
          const aptDate = new Date(apt.selectedDate)
          return aptDate >= today
        })
      case 'past':
        return appointments.filter(apt => 
          apt.status === 'completed'
        ).filter(apt => {
          const aptDate = new Date(apt.selectedDate)
          return aptDate < today
        })
      case 'cancelled':
        return appointments.filter(apt => apt.status === 'cancelled')
      default:
        return appointments
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredAppointments = getFilteredAppointments()

  // Calculate counts for each filter
  const getFilterCounts = () => {
    const today = new Date()
    const upcoming = appointments.filter(apt => 
      (apt.status === 'confirmed' || apt.status === 'pending') && 
      new Date(apt.selectedDate) >= today
    ).length
    const past = appointments.filter(apt => 
      apt.status === 'completed' && 
      new Date(apt.selectedDate) < today
    ).length
    const cancelled = appointments.filter(apt => apt.status === 'cancelled').length
    
    return { upcoming, past, cancelled }
  }

  const filterCounts = getFilterCounts()

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-[#2A5CAA]">My Appointments</h1>
            <div className="text-sm text-gray-500">
              {appointments.length} total appointments
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Input placeholder="Search appointments..." className="pr-10" />
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {[
              { id: "upcoming", label: "Upcoming", count: filterCounts.upcoming },
              { id: "past", label: "Past", count: filterCounts.past },
              { id: "cancelled", label: "Cancelled", count: filterCounts.cancelled },
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
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#2A5CAA]" />
            <p className="text-gray-600">Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Appointments</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchAppointments} className="bg-[#2A5CAA] hover:bg-[#1e4080]">
              Try Again
            </Button>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No {activeFilter} Appointments</h3>
            <p className="text-gray-600">You don't have any {activeFilter} appointments yet.</p>
            <p className="text-sm text-gray-500 mt-2">
              Appointments are created when you book through the hospital booking system.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment._id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                      {appointment.doctorName.includes('Dr.') ? '👨‍⚕️' : '👩‍⚕️'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800">{appointment.doctorName}</h3>
                          <p className="text-sm text-gray-600">{appointment.doctorSpecialization}</p>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>{appointment.status}</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(appointment.selectedDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.selectedTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{appointment.hospitalName}</span>
                      </div>

                      <div className="flex gap-2">
                        {activeFilter === 'upcoming' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 bg-transparent"
                              onClick={() => updateAppointmentStatus(appointment._id, 'completed')}
                            >
                              Mark Complete
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-red-600 border-red-200 bg-transparent"
                              onClick={() => cancelAppointment(appointment._id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {activeFilter === 'past' && (
                          <>
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              View Report
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              Book Again
                            </Button>
                          </>
                        )}
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
      </div>
    </div>
  )
}
