"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Search, BookOpen, ChevronRight } from "lucide-react"

interface MentalHealthPageProps {
  onBack: () => void
}

export default function MentalHealthPage({ onBack }: MentalHealthPageProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "All", icon: "📚" },
    { id: "mental", label: "Mental Health", icon: "🧠" },
    { id: "stress", label: "Stress Management", icon: "😌" },
    { id: "sleep", label: "Sleep", icon: "😴" },
    { id: "wellness", label: "Wellness", icon: "🌿" },
  ]

  const healthTips = [
    {
      id: 1,
      title: "Managing Stress: Simple Techniques for Better Mental Health",
      category: "stress",
      readTime: "7 min read",
      author: "Dr. Michael Chen",
      image: "🧠",
      excerpt: "Learn effective stress management techniques that can improve your overall mental well-being.",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "The Science of Sleep: How Quality Rest Improves Mental Health",
      category: "sleep",
      readTime: "6 min read",
      author: "Dr. Sarah Johnson",
      image: "😴",
      excerpt: "Discover how proper sleep hygiene can significantly impact your mental health and daily performance.",
      date: "3 days ago",
    },
    {
      id: 3,
      title: "Mindfulness Meditation: A Beginner's Guide",
      category: "mental",
      readTime: "8 min read",
      author: "Dr. Emily Davis",
      image: "🧘",
      excerpt: "Start your mindfulness journey with simple meditation techniques for better mental clarity.",
      date: "5 days ago",
    },
    {
      id: 4,
      title: "Natural Wellness: Herbs and Supplements for Mental Health",
      category: "wellness",
      readTime: "9 min read",
      author: "Dr. Robert Wilson",
      image: "🌿",
      excerpt: "Explore natural remedies and supplements that can support your mental health journey.",
      date: "1 week ago",
    },
  ]

  const dailyTips = [
    {
      icon: "🧘",
      title: "Practice Mindfulness",
      description: "Take 5 minutes daily for deep breathing exercises",
    },
    {
      icon: "😴",
      title: "Quality Sleep",
      description: "Aim for 7-9 hours of uninterrupted sleep",
    },
    {
      icon: "🚶",
      title: "Daily Walk",
      description: "30 minutes of walking can reduce stress levels",
    },
  ]

  const filteredTips =
    activeCategory === "all" ? healthTips : healthTips.filter((tip) => tip.category === activeCategory)

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-[#2A5CAA]">Mental Health Support</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-4">
        {/* Mental Health Support Section */}
        <div className="mb-8">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🧠</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Mental Health Support</h3>
            <p className="text-gray-600 mb-4">Your mental health matters. Find resources and tips to support your well-being.</p>
          </div>
        </div>

        {/* Health Tips Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#2A5CAA]">Health Tips & Resources</h2>
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Saved
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Input placeholder="Search mental health topics..." className="pr-10" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category.id ? "bg-[#2A5CAA] text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Daily Health Tips */}
          <div className="mb-6">
            <h3 className="text-md font-bold text-[#2A5CAA] mb-4">Daily Wellness Tips</h3>
            <div className="grid gap-3">
              {dailyTips.map((tip, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                        {tip.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{tip.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Health Articles */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-bold text-[#2A5CAA]">Latest Articles</h3>
              <Button variant="ghost" size="sm" className="text-[#2A5CAA]">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {filteredTips.map((tip) => (
                <Card key={tip.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center text-2xl">
                        {tip.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-800 line-clamp-2">{tip.title}</h3>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tip.excerpt}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span>By {tip.author}</span>
                          <span>{tip.date}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              {categories.find((cat) => cat.id === tip.category)?.label}
                            </Badge>
                            <span className="text-xs text-gray-500">{tip.readTime}</span>
                          </div>

                          <Button size="sm" variant="outline">
                            Read More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mental Health Tracker Section */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-[#2A5CAA] mb-4">Mental Health Tracker</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 text-center">
                <div className="text-2xl mb-2">😌</div>
                <div className="text-sm font-semibold text-gray-800">Mood Tracker</div>
                <div className="text-xs text-gray-600 mt-1">Daily mood check</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 text-center">
                <div className="text-2xl mb-2">😴</div>
                <div className="text-sm font-semibold text-gray-800">Sleep Quality</div>
                <div className="text-xs text-gray-600 mt-1">Track sleep patterns</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Support */}
        <div className="mt-8">
          <Card className="border-0 shadow-sm bg-gradient-to-r from-red-50 to-pink-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
                  🆘
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Need Immediate Support?</h3>
                  <p className="text-sm text-gray-600 mt-1">24/7 mental health crisis helpline available</p>
                </div>
                <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
