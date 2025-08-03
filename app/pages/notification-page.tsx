"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface NotificationsPageProps {
  onBack: () => void
}

export default function NotificationsPage({ onBack }: NotificationsPageProps) {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-[#2A5CAA]">Notifications</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-4">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No New Notifications</h3>
          <p className="text-gray-600">You're all caught up!</p>
        </div>
      </div>
    </div>
  )
}
