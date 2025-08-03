"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Clock, Heart, Users, Calendar, CheckCircle } from "lucide-react"

interface NotificationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function NotificationsModal({ open, onOpenChange }: NotificationsModalProps) {
  const notifications = [
    {
      id: 1,
      type: "emergency",
      title: "Urgent Blood Request",
      message: "O- blood needed at City General Hospital. 3 units required immediately.",
      time: "2 min ago",
      isRead: false,
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      id: 2,
      type: "camp",
      title: "Donation Camp Reminder",
      message: "Community Blood Drive tomorrow at Central Community Center. You're registered!",
      time: "1 hour ago",
      isRead: false,
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      type: "success",
      title: "Registration Confirmed",
      message: "Your organizer application has been received. Verification in progress.",
      time: "3 hours ago",
      isRead: false,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      id: 4,
      type: "request",
      title: "Blood Request Response",
      message: "2 donors have responded to your A+ blood request at Regional Medical Center.",
      time: "5 hours ago",
      isRead: true,
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      id: 5,
      type: "reminder",
      title: "Donation Eligibility",
      message: "You're eligible to donate blood again! Last donation was 3 months ago.",
      time: "1 day ago",
      isRead: true,
      icon: Heart,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      id: 6,
      type: "camp",
      title: "New Camp Available",
      message: "University Health Fair blood camp is now open for registration. 78 spots left.",
      time: "2 days ago",
      isRead: true,
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ]

  const handleMarkAsRead = (notificationId: number) => {
    console.log("Marking notification as read:", notificationId)
    // Handle mark as read logic
  }

  const handleMarkAllAsRead = () => {
    console.log("Marking all notifications as read")
    // Handle mark all as read logic
  }

  const handleNotificationAction = (notification: any) => {
    console.log("Notification action:", notification)
    // Handle notification-specific actions
    onOpenChange(false)
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-red-600 flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
              {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount}</Badge>}
            </DialogTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="text-red-500" onClick={handleMarkAllAsRead}>
                Mark all read
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-3">
          {notifications.map((notification) => {
            const IconComponent = notification.icon
            return (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !notification.isRead ? "border-l-4 border-l-red-500" : ""
                }`}
                onClick={() => handleNotificationAction(notification)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${notification.bgColor}`}>
                      <IconComponent className={`h-4 w-4 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className={`font-semibold text-gray-800 ${!notification.isRead ? "font-bold" : ""}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          {!notification.isRead && <div className="w-2 h-2 bg-red-500 rounded-full" />}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-gray-500 hover:text-gray-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMarkAsRead(notification.id)
                            }}
                          >
                            {!notification.isRead ? "Mark read" : "Read"}
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {notifications.length === 0 && (
          <Card className="bg-gray-50">
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No notifications yet</p>
              <p className="text-sm text-gray-500 mt-1">
                You'll receive updates about blood requests, camps, and more here.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="pt-4">
          <Button variant="outline" className="w-full bg-transparent" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
