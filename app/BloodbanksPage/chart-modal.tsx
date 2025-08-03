"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Phone, Video, MoreVertical, Shield } from "lucide-react"

interface ChatModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedChat?: any
}

export default function ChatModal({ open, onOpenChange, selectedChat }: ChatModalProps) {
  const [message, setMessage] = useState("")

  const sampleMessages = [
    {
      id: 1,
      sender: "blood_bank",
      message:
        "Hello! Thank you for registering as a blood donor. We currently need A+ blood urgently. Are you available now?",
      time: "10:25 AM",
      isRead: true,
    },
    {
      id: 2,
      sender: "user",
      message: "Hi! Yes, I'm A+ and available right now. Where should I come for the blood donation process to begin?",
      time: "10:30 AM",
      isRead: true,
    },
    {
      id: 3,
      sender: "blood_bank",
      message:
        "Thank you, Sara. Please visit our Blood Bank at City Hospital Main Building 2nd Floor. Can you come today?",
      time: "10:25 AM",
      isRead: true,
    },
    {
      id: 4,
      sender: "user",
      message: "Yes, I can come today. What time would be best?",
      time: "10:32 AM",
      isRead: false,
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto h-[80vh] flex flex-col p-0">
        {/* Chat Header */}
        <div className="bg-red-500 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>BB</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">City Blood Bank</h3>
                <p className="text-red-100 text-sm">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-red-400">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-red-400">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-red-400">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border-b border-blue-200 p-3">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <p className="text-xs text-blue-700">
              This is a secure, private conversation. Your personal information is protected.
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              Today, May 10
            </Badge>
          </div>

          {sampleMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-end space-x-2 max-w-[80%]">
                {msg.sender === "blood_bank" && (
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback className="text-xs">BB</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      msg.sender === "user"
                        ? "bg-red-500 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">{msg.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type Here..."
              className="flex-1 rounded-full border-gray-300"
            />
            <Button onClick={handleSendMessage} size="icon" className="rounded-full bg-red-500 hover:bg-red-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
