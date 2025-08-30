"use client"

import { useState } from "react"
import { Search, BookOpen, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function HealthTipsPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "All", icon: "📚" },
    { id: "heart", label: "Heart", icon: "❤️" },
    { id: "brain", label: "Mental", icon: "🧠" },
    { id: "fitness", label: "Fitness", icon: "💪" },
    { id: "nutrition", label: "Nutrition", icon: "🥗" },
  ]

  const healthTips = [
    {
      id: 1,
      title: "10 Heart-Healthy Foods to Include in Your Diet",
      category: "heart",
      readTime: "5 min read",
      author: "Dr. Sarah Johnson",
      image: "❤️",
      excerpt: "Discover the best foods that can help maintain cardiovascular health and reduce heart disease risk.",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Managing Stress: Simple Techniques for Better Mental Health",
      category: "brain",
      readTime: "7 min read",
      author: "Dr. Michael Chen",
      image: "🧠",
      excerpt: "Learn effective stress management techniques that can improve your overall mental well-being.",
      date: "3 days ago",
    },
    {
      id: 3,
      title: "The Importance of Regular Exercise for Overall Health",
      category: "fitness",
      readTime: "6 min read",
      author: "Dr. Emily Davis",
      image: "💪",
      excerpt: "Understanding how regular physical activity can transform your health and boost your energy levels.",
      date: "5 days ago",
    },
    {
      id: 4,
      title: "Nutrition Myths Debunked: What You Really Need to Know",
      category: "nutrition",
      readTime: "8 min read",
      author: "Dr. Robert Wilson",
      image: "🥗",
      excerpt: "Separating fact from fiction in the world of nutrition and healthy eating habits.",
      date: "1 week ago",
    },
  ]

  const dailyTips = [
    {
      icon: "💧",
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily",
    },
    {
      icon: "🚶",
      title: "Take a Walk",
      description: "10,000 steps can improve your cardiovascular health",
    },
    {
      icon: "😴",
      title: "Get Quality Sleep",
      description: "7-9 hours of sleep is essential for recovery",
    },
  ]

  const filteredTips =
    activeCategory === "all" ? healthTips : healthTips.filter((tip) => tip.category === activeCategory)

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-[#2A5CAA]">Health Tips</h1>
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Saved
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Input placeholder="Search health topics..." className="pr-10" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
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
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-4">
        {/* Daily Health Tips */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#2A5CAA] mb-4">Daily Health Tips</h2>
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
            <h2 className="text-lg font-bold text-[#2A5CAA]">Latest Articles</h2>
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

        {/* Health Tracker Section */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-[#2A5CAA] mb-4">Health Tracker</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 text-center">
                <div className="text-2xl mb-2">💓</div>
                <div className="text-sm font-semibold text-gray-800">Heart Rate</div>
                <div className="text-xs text-gray-600 mt-1">Track daily</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 text-center">
                <div className="text-2xl mb-2">⚖️</div>
                <div className="text-sm font-semibold text-gray-800">Weight</div>
                <div className="text-xs text-gray-600 mt-1">Monitor progress</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
