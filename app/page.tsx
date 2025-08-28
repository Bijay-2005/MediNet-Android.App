"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, Search, User, MapPin, Shield, ChevronRight } from "lucide-react" // Import Shield icon and ChevronRight
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import LoadingScreen from "./LoadingScreen"

// Import page components
import { AuthProvider, useAuth } from "./routes/auth-context"
import AppointmentsPage from "./pages/appointments-page"
import PharmacyPage from "./Pharmacy/pharmacy-page"
import HealthTipsPage from "./pages/health-tips-page"
import ProfilePage from "./profile/profile-page"
import LabTestsPage from "@/app/LabTest/lab-tests-page"
import BloodBankPage from "./BloodbanksPage/blood-bank-page"
import HospitalBooking from "./HospitalBooking/Hospitals/page"
import EquipmentRentalPage from "./Medical-equipmentPages/medical-equipmentpage"
import MentalHealthPage from "./pages/mental-health-page"
import InsuranceDetailPage from "@/app/Insurancedetails-pages/insurance-page"
import NotificationsPage from "./pages/notification-page"
import EmergencyPage from "@/app/pages/EmergencySOS-page"
import AIChatModal from "@/app/AI-Bot/AIChatModal";
import CardiologyPage from "./Doctors-departmnet-page/cardiology/Cardiologypage";
import DermatologyPage from "./Doctors-departmnet-page/Dermatology/Dermatologypage";
import NeurologyPage from "./Doctors-departmnet-page/Neurology/Neurologypage";
import PediatricsPage from "./Doctors-departmnet-page/Pediatics/pediaticspage";
import OrthopedicsPage from "./Doctors-departmnet-page/Orthopedics/Orthopedicspage";
import GynecologyPage from "./Doctors-departmnet-page/Gynecology/Gynecologypage";
import OphthalmologyPage from "./Doctors-departmnet-page/Ophthalmology/OphthalmologyPage";
import EntPage from "./Doctors-departmnet-page/Entdoctors/Entpage";
import PsychiatryPage from "./Doctors-departmnet-page/Psycology/Psychiatrypage";
import UrologyPage from "./Doctors-departmnet-page/Urology/Urologypage";
import OncologyPage from "./Doctors-departmnet-page/Oncology/Oncologypage";
import ScheduleAppointmentPage from "./Doctors-departmnet-page/cardiology/schedule/[id]/schedule";
import MapComponent from './routes/MapComponent';
import { AuthPage } from './auth'
import { LogoutButton } from './auth'


    
function MediNetAppContent() {
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, user, logout, loading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("home")
  const [showLocationMap, setShowLocationMap] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("Select Location")
  const [showAIChat, setShowAIChat] = useState(false)
  const [showEmergency, setShowEmergency] = useState(false)
  const [showAllDepartments, setShowAllDepartments] = useState(false)
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [currentInsuranceIndex, setCurrentInsuranceIndex] = useState(0)
  const [showInsuranceDetailPage, setShowInsuranceDetailPage] = useState(false)
  const [selectedInsuranceId, setSelectedInsuranceId] = useState("")
  const [selectedDoctorId, setSelectedDoctorId] = useState("")
  const [consultationType, setConsultationType] = useState("clinic")
  const mainCarouselRef = useRef<HTMLDivElement>(null)
  const insuranceCarouselRef = useRef<HTMLDivElement>(null)
  const totalMainAds = 3
  const totalInsuranceCards = 5
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);


  // Debug logging for authentication state
  useEffect(() => {
    console.log('MediNetAppContent: Auth state changed - isAuthenticated:', isAuthenticated, 'user:', user, 'authLoading:', authLoading);
  }, [isAuthenticated, user, authLoading]);



  // Loading screen effect (skip when skipSplash=1 in URL)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const skip = params.get('skipSplash');
      if (skip === '1') {
        setIsLoading(false);
        return;
      }
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Handle URL parameters for tab navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  // Auto-scroll main advertisement carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % totalMainAds
        if (mainCarouselRef.current) {
          const scrollWidth = mainCarouselRef.current.scrollWidth / totalMainAds
          mainCarouselRef.current.scrollTo({
            left: scrollWidth * nextIndex,
            behavior: "smooth",
          })
        }
        return nextIndex
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll insurance carousel every 6 seconds//
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsuranceIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % totalInsuranceCards
        if (insuranceCarouselRef.current) {
          const scrollWidth = insuranceCarouselRef.current.scrollWidth / totalInsuranceCards
          insuranceCarouselRef.current.scrollTo({
            left: scrollWidth * nextIndex,
            behavior: "smooth",
          })
        }
        return nextIndex
      })
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Handle manual scroll for main carousel to update current index
  const handleMainScroll = () => {
    if (mainCarouselRef.current) {
      const scrollLeft = mainCarouselRef.current.scrollLeft
      const scrollWidth = mainCarouselRef.current.scrollWidth / totalMainAds
      const newIndex = Math.round(scrollLeft / scrollWidth)
      setCurrentAdIndex(newIndex)
    }
  }

  // Handle manual scroll for insurance carousel to update current index
  const handleInsuranceScroll = () => {
    if (insuranceCarouselRef.current) {
      const scrollLeft = insuranceCarouselRef.current.scrollLeft
      const scrollWidth = insuranceCarouselRef.current.scrollWidth / totalInsuranceCards
      const newIndex = Math.round(scrollLeft / scrollWidth)
      setCurrentInsuranceIndex(newIndex)
    }
  }

  const departments = [
    { name: "Cardiology", icon: "❤️", color: "bg-red-50" },
    { name: "Neurology", icon: "🧠", color: "bg-purple-50" },
    { name: "Pediatrics", icon: "👶", color: "bg-blue-50" },
    { name: "Orthopedics", icon: "🦴", color: "bg-gray-50" },
    { name: "Dermatology", icon: "🌡️", color: "bg-orange-50" },
    { name: "Gynecology", icon: "👩", color: "bg-pink-50" },
    { name: "Ophthalmology", icon: "👁️", color: "bg-cyan-50" },
    { name: "ENT", icon: "👂", color: "bg-indigo-50" },
    { name: "Psychiatry", icon: "🧘", color: "bg-violet-50" },
    { name: "Urology", icon: "🫘", color: "bg-teal-50" },
    { name: "Oncology", icon: "🎗️", color: "bg-rose-50" },
    { name: "Emergency", icon: "🚨", color: "bg-red-100" },
  ]
    // All insurance cards will have the same content as per the new design
  const insurancePlans = [
    {
      id: "ayushman",
      title: "Health Insurance",
      subtitle: "Starting from ₹99/month",
      coverage: "Up to ₹5 Lakh coverage",
      features: ["Cashless Treatment", "No Waiting Period"],
      bgColor: "from-blue-400 via-purple-500 to-pink-500", // Gradient from image
    },
    {
      id: "family-care",
      title: "Health Insurance",
      subtitle: "Starting from ₹99/month",
      coverage: "Up to ₹5 Lakh coverage",
      features: ["Cashless Treatment", "No Waiting Period"],
      bgColor: "from-blue-400 via-purple-500 to-pink-500",
    },
    {
      id: "senior-citizen",
      title: "Health Insurance",
      subtitle: "Starting from ₹99/month",
      coverage: "Up to ₹5 Lakh coverage",
      features: ["Cashless Treatment", "No Waiting Period"],
      bgColor: "from-blue-400 via-purple-500 to-pink-500",
    },
    {
      id: "critical-illness",
      title: "Health Insurance",
      subtitle: "Starting from ₹99/month",
      coverage: "Up to ₹5 Lakh coverage",
      features: ["Cashless Treatment", "No Waiting Period"],
      bgColor: "from-blue-400 via-purple-500 to-pink-500",
    },
    {
      id: "personal-accident",
      title: "Health Insurance",
      subtitle: "Starting from ₹99/month",
      coverage: "Up to ₹5 Lakh coverage",
      features: ["Cashless Treatment", "No Waiting Period"],
      bgColor: "from-blue-400 via-purple-500 to-pink-500",
    },
  ]

  const handleLogin = () => {
    // Login is handled by the auth context
    // The authentication state will automatically update
    // and the main app will be displayed
    console.log('MediNetAppContent: Login successful, redirecting to main app...');
  }

  const handleSignOut = () => {
    logout()
    setActiveTab("home") // Reset to home tab
  }

  const handleInsuranceCardClick = (id: string) => {
    setSelectedInsuranceId(id)
    setShowInsuranceDetailPage(true)
  }

  // Show loading screen
  if (isLoading || authLoading) {
    return <LoadingScreen />
  }

  // Show login page if not logged in
  if (!isAuthenticated) {
    console.log('MediNetAppContent: User not authenticated, showing login page');
    return <AuthPage onLoginSuccess={() => console.log('Login successful!')} />
  }

  console.log('MediNetAppContent: User authenticated, showing main app with user:', user);

  // Render different pages based on active tab
  const renderPage = () => {
    if (showInsuranceDetailPage) {
      return <InsuranceDetailPage insuranceId={selectedInsuranceId} onBack={() => setShowInsuranceDetailPage(false)} />
    }

    switch (activeTab) {
      case "appointments":
        return <AppointmentsPage />
      case "pharmacy":
        return <PharmacyPage />
      case "tips":
        return <HealthTipsPage />
      case "profile":
        return <ProfilePage />
      case "notifications":
        return <NotificationsPage onBack={() => setActiveTab("home")} />
      case "lab-tests":
        return <LabTestsPage />
      case "blood-bank":
        return <BloodBankPage />
      case "hospitals":
        return <HospitalBooking />
      case "insurance":
        // You need to manage insuranceId state for InsuranceDetailPage
        return <InsuranceDetailPage onBack={() => setActiveTab("home")} insuranceId={selectedInsuranceId} />
      case "equipment-rental":
        return <EquipmentRentalPage />
      case "mental-health":
        return <MentalHealthPage onBack={() => setActiveTab("home")} />
      case "emergency":
        return <EmergencyPage />
      case "cardiology":
        return <CardiologyPage onScheduleAppointment={(doctorId, type) => {
          setSelectedDoctorId(doctorId);
          setConsultationType(type);
          setActiveTab("schedule-appointment");
        }} />
      // case "dermatology": // Removed to avoid conflicts with doctor-appointment routing
      //   return <DermatologyPage onScheduleAppointment={(doctorId, type) => {
      //     setSelectedDoctorId(doctorId);
      //     setConsultationType(type);
      //     setActiveTab("schedule-appointment");
      //   }} />
      case "schedule-appointment":
        return <ScheduleAppointmentPage 
          params={{ id: selectedDoctorId }} 
          onBack={() => setActiveTab("cardiology")}
        />
      case "doctor-appointment":
        // Dynamically render department page or show 404
        console.log("Selected Department:", selectedDepartment); // Debug log
        switch (selectedDepartment) {
          case "Cardiology":
            return <CardiologyPage 
              onScheduleAppointment={(doctorId, type) => {
                setSelectedDoctorId(doctorId);
                setConsultationType(type);
                setActiveTab("schedule-appointment");
              }}
              onBackToDepartments={() => {
                setSelectedDepartment(null);
                setShowAllDepartments(true);
              }}
            />;
          case "Dermatology":
            console.log("Rendering Dermatology Page"); // Debug log
            return <DermatologyPage 
              onScheduleAppointment={(doctorId, type) => {
                setSelectedDoctorId(doctorId);
                setConsultationType(type);
                setActiveTab("schedule-appointment");
              }}
              onBackToDepartments={() => {
                setSelectedDepartment(null);
                setShowAllDepartments(true);
              }}
            />;
          case "Neurology":
            console.log("Rendering Neurology Page"); // Debug log
            return <NeurologyPage 
              onScheduleAppointment={(doctorId, type) => {
                setSelectedDoctorId(doctorId);
                setConsultationType(type);
                setActiveTab("schedule-appointment");
              }}
              onBackToDepartments={() => {
                setSelectedDepartment(null);
                setShowAllDepartments(true);
              }}
            />;
          case "Pediatrics":
            console.log("Rendering Pediatrics Page"); // Debug log
            return <PediatricsPage 
              onScheduleAppointment={(doctorId, type) => {
                setSelectedDoctorId(doctorId);
                setConsultationType(type);
                setActiveTab("schedule-appointment");
              }}
              onBackToDepartments={() => {
                setSelectedDepartment(null);
                setShowAllDepartments(true);
              }}
            />;
          case "Orthopedics":
            console.log("Rendering Orthopedics Page"); // Debug log
            return <OrthopedicsPage 
              onScheduleAppointment={(doctorId, type) => {
                setSelectedDoctorId(doctorId);
                setConsultationType(type);
                setActiveTab("schedule-appointment");
              }}
              onBackToDepartments={() => {
                setSelectedDepartment(null);
                setShowAllDepartments(true);
              }}
            />;
          case "Gynecology":
            console.log("Rendering Gynecology Page"); // Debug log
            return <GynecologyPage 
              onScheduleAppointment={(doctorId, type) => {
                setSelectedDoctorId(doctorId);
                setConsultationType(type);
                setActiveTab("schedule-appointment");
              }}
              onBackToDepartments={() => {
                setSelectedDepartment(null);
                setShowAllDepartments(true);
              }}
            />;
          case "Ophthalmology":
            console.log("Rendering Ophthalmology Page"); // Debug log
            return <OphthalmologyPage 
              onScheduleAppointment={(doctorId, type) => {
                setSelectedDoctorId(doctorId);
                setConsultationType(type);
                setActiveTab("schedule-appointment");
              }}
              onBackToDepartments={() => {
                setSelectedDepartment(null);
                setShowAllDepartments(true);
              }}
            />;
          case "ENT":
            console.log("Rendering ENT Page"); // Debug log
            return <EntPage 
              onScheduleAppointment={(doctorId, type) => {
                setSelectedDoctorId(doctorId);
                setConsultationType(type);
                setActiveTab("schedule-appointment");
              }}
              onBackToDepartments={() => {
                setSelectedDepartment(null);
                setShowAllDepartments(true);
              }}
            />;
          case "Psychiatry":
            console.log("Rendering Psychiatry Page"); // Debug log
            return <PsychiatryPage 
              onScheduleAppointment={(doctorId, type) => {
                setSelectedDoctorId(doctorId);
                setConsultationType(type);
                setActiveTab("schedule-appointment");
              }}
              onBackToDepartments={() => {
                setSelectedDepartment(null);
                setShowAllDepartments(true);
              }}
            />;
          case "Urology":
            console.log("Rendering Urology Page"); // Debug log
            return <UrologyPage 
              onScheduleAppointment={(doctorId, type) => {
                setSelectedDoctorId(doctorId);
                setConsultationType(type);
                setActiveTab("schedule-appointment");
              }}
              onBackToDepartments={() => {
                setSelectedDepartment(null);
                setShowAllDepartments(true);
              }}
            />;
          case "Oncology":
            console.log("Rendering Oncology Page"); // Debug log
            return <OncologyPage 
              onScheduleAppointment={(doctorId, type) => {
                setSelectedDoctorId(doctorId);
                setConsultationType(type);
                setActiveTab("schedule-appointment");
              }}
              onBackToDepartments={() => {
                setSelectedDepartment(null);
                setShowAllDepartments(true);
              }}
            />;
          default:
            return (
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏥</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Department Not Found</h3>
                  <p className="text-gray-600 mb-4">The selected department is not available.</p>
                  <Button onClick={() => setActiveTab("home")}>Go Back Home</Button>
                </div>
              </div>
            );
        }
      default:
        return renderHomePage();
    }
  }

  const renderHomePage = () => (
    <>
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-3">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-3">
            {/* Left Section */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">➕</span>
                <h1 className="text-lg font-bold text-[#2A5CAA]">MediNet+</h1>
              </div>
              <button
                onClick={() => setShowLocationMap(true)}
                className="flex items-center gap-1 text-sm text-gray-600"
              >
                <MapPin className="w-4 h-4" />
                <span>{selectedLocation}</span>
              </button>
            </div>
                   
            {/* Right Section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm" 
                  className="p-2" 
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="w-5 h-4" />
                </Button>
                <Badge className="absolute top-0 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-xs">
                  3
                </Badge>
              </div>
          
              {/* Circular SOS Button */}
              <button
                onClick={() => setActiveTab("emergency")}
                className="w-14 h-8 bg-[#FF2400] hover:bg-[#e01e00] rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-108 hover:-translate-y-1 animate-pulse"
              >
                SOS
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Input placeholder="Search services, doctors, health topics..." className="pr-10" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          

        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        {/* Advertisement Carousel */}
        <div className="px-4 mt-4">
          <div className="relative">
            <div
              ref={mainCarouselRef}
              className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
              style={{ scrollSnapType: "x mandatory" }}
              onScroll={handleMainScroll}
            >
              {/* Ad 1 - Health Insurance */}
              <div
                className="min-w-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl p-6 relative overflow-hidden flex-shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white text-xl font-bold mb-2">Health Insurance</h3>
                      <p className="text-white text-lg">Starting from ₹99/month</p>
                      <p className="text-white/90 text-sm">Up to ₹5 Lakh coverage</p>
                    </div>
                    <div className="text-6xl opacity-20">🛡️</div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-xs font-medium">Cashless Treatment</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-xs font-medium">No Waiting Period</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              </div>

              {/* Ad 2 - Lab Tests */}
              <div
                className="min-w-full bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 rounded-2xl p-6 relative overflow-hidden flex-shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white text-xl font-bold mb-2">Lab Tests at Home</h3>
                      <p className="text-white text-lg">Starting from ₹199</p>
                      <p className="text-white/90 text-sm">Free sample collection</p>
                    </div>
                    <div className="text-6xl opacity-20">🔬</div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-xs font-medium">Same Day Reports</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-xs font-medium">50% OFF</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              </div>

              {/* Ad 3 - Medicine Delivery */}
              <div
                className="min-w-full bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-2xl p-6 relative overflow-hidden flex-shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white text-xl font-bold mb-2">Medicine Delivery</h3>
                      <p className="text-white text-lg">Free delivery in 30 mins</p>
                      <p className="text-white/90 text-sm">On orders above ₹299</p>
                    </div>
                    <div className="text-6xl opacity-20">💊</div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-xs font-medium">24/7 Available</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-xs font-medium">20% OFF</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentAdIndex === index ? "bg-[#2A5CAA]" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Book Doctor Appointments Section */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#2A5CAA]">Book Doctor Appointment</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {departments.slice(0, 6).map((dept, index) => (
              <Card
                key={index}
                className="transform transition-all duration-200 active:scale-105 hover:shadow-md border-0 shadow-sm cursor-pointer"
                onClick={() => {
                  setSelectedDepartment(dept.name);
                  setActiveTab("doctor-appointment");
                }}
              >
                <CardContent className={`p-3 ${dept.color} text-center relative overflow-hidden`}>
                  <div className="text-2xl mb-2">{dept.icon}</div>
                  <div className="text-xs font-semibold text-gray-800">{dept.name}</div>
                  <div className="text-xs text-gray-600 mt-1">Available</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              size="sm"
              className="text-[#2A5CAA] border-[#2A5CAA] bg-transparent"
              onClick={() => setShowAllDepartments(true)}
            >
              View More
            </Button>
          </div>
        </div>

        {/* Book Hospital Section */}
        <div className="px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#2A5CAA]">Book Hospital</h2>
          </div>
          <Card
            className="transform transition-all duration-200 active:scale-105 hover:shadow-md border-0 shadow-sm cursor-pointer"
            onClick={() => setActiveTab("hospitals")}
          >
            <CardContent className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Find & Book Hospital Services</div>
                  <div className="text-sm text-gray-600 mt-1">Browse nearby hospitals, check availability, book appointments</div>
                  <div className="flex gap-2 mt-3">
                    <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Emergency Care</div>
                    <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Specialized Treatment</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

         {/* Lab Test Booking Section */}
        <div className="px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#2A5CAA]">Health Diagnostics</h2>
          </div>
          <Card
            className="card-hover"
            onClick={() => setActiveTab("lab-tests")}
          >
            <CardContent className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔬</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Book Your Health Diagnostics Now</div>
                  <div className="text-sm text-gray-600 mt-1">Pathology tests, Radiology scans, and more</div>
                  <div className="text-xs text-purple-600 font-medium mt-2">Starting from ₹199</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Blood Bank Section */}
        <div className="px-4 mt-8">
           <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#2A5CAA]">Blood Bank Section</h2>
          </div>
          <Card
            className="transform transition-all duration-200 active:scale-105 hover:shadow-md border-0 shadow-sm"
            onClick={() => setActiveTab("blood-bank")}
          >
            <CardContent className="p-5 bg-gradient-to-r from-red-50 to-pink-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💉</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Blood Bank Services</div>
                  <div className="text-sm text-gray-600 mt-1">Find donors, donate blood, check availability</div>
                  <div className="flex gap-4 mt-3">
                    <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">A+ Available</div>
                    <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">O- Needed</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Multi Health Insurance Section - Now a Carousel */}
        <div className="px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#2A5CAA]">Health Insurance Plans</h2>
            {/* Removed "View All" button */}
          </div>
          <div className="relative">
            <div
              ref={insuranceCarouselRef}
              className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
              style={{ scrollSnapType: "x mandatory" }}
              onScroll={handleInsuranceScroll}
            >
              {insurancePlans.map((plan, index) => (
                <Card
                  key={plan.id}
                  className={`min-w-full transform transition-all duration-200 active:scale-105 hover:shadow-md border-0 shadow-sm flex-shrink-0 rounded-2xl`}
                  style={{ scrollSnapAlign: "start" }}
                >
                  <CardContent className={`p-6 bg-gradient-to-r ${plan.bgColor} relative overflow-hidden text-white`}>
                    {/* Background Shield Icon */}
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 text-white/20">
                      <Shield className="w-32 h-32" />
                    </div>

                    <div className="relative z-10 flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                        <p className="text-lg mb-1">{plan.subtitle}</p>
                        <p className="text-sm">{plan.coverage}</p>
                      </div>
                      {/* Box space for insurance image on the right */}
                      <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center ml-4 flex-shrink-0">
                        {/* Placeholder for image */}
                        <span className="text-3xl">🖼️</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {plan.features.map((feature, fIndex) => (
                        <div
                          key={fIndex}
                          className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-medium"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-white/30 hover:bg-white/40 text-white font-semibold rounded-lg mt-4"
                      onClick={() => handleInsuranceCardClick(plan.id)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(totalInsuranceCards)].map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentInsuranceIndex === index ? "bg-[#2A5CAA]" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        {/* Medical Accessories Rent Section */}
        <div className="px-4 mt-8">
          <Card
            className="transform transition-all duration-200 active:scale-105 hover:shadow-md border-0 shadow-sm"
            onClick={() => setActiveTab("equipment-rental")}
          >
            <CardContent className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">♿</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Medical Equipment Rental</div>
                  <div className="text-sm text-gray-600 mt-1">Wheelchairs, Oxygen, Hospital beds</div>
                  <div className="flex gap-2 mt-3">
                    <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Home Delivery</div>
                    <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">24/7 Support</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mental Health Support Section */}
        <div className="px-4 mt-8 mb-8">
          <Card
            className="transform transition-all duration-200 active:scale-105 hover:shadow-md border-0 shadow-sm"
            onClick={() => setActiveTab("mental-health")}
          >
            <CardContent className="p-5 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Mental Health Support</div>
                  <div className="text-sm text-gray-600 mt-1">Talk to certified therapists & counselors</div>
                  <div className="flex gap-2 mt-3">
                    <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Video Call</div>
                    <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Chat Support</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Tips Section Card */}
        <div className="px-4 mt-8 mb-8">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#2A5CAA]">Health Tips & Wellness</h2>
          </div>
          
          <Card
            className="transform transition-all duration-200 active:scale-105 hover:shadow-md border-0 shadow-sm cursor-pointer"
            onClick={() => setActiveTab("tips")}
          >
            <CardContent className="p-5 bg-gradient-to-r from-green-50 to-teal-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Health Tips & Wellness</div>
                  <div className="text-sm text-gray-600 mt-1">Daily health tips, wellness articles, and expert advice</div>
                  <div className="flex gap-2 mt-3">
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Daily Tips</div>
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Expert Articles</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Floating Button - Positioned above bottom navbar */}
      <div className="fixed bottom-24 right-4 z-40">
        <Button
          onClick={() => setShowAIChat(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-0"
        >
          <div className="flex flex-col items-center">
            <span className="text-xl">🤖</span>
            <span className="text-[10px] font-medium">MediBot</span>
          </div>
        </Button>
      </div>

      {/* AI Chat Modal */}
      {showAIChat && (
        <AIChatModal onClose={() => setShowAIChat(false)} />
      )}

      {/* Location Map Modal */}
      {showLocationMap && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
            <h2 className="text-lg font-bold text-[#2A5CAA]">Select Location</h2>
            <Button variant="ghost" onClick={() => setShowLocationMap(false)}>
              ✕
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-200">
            <div className="min-h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-600 mb-4">Interactive map would be here</p>
                <div className="text-4xl mb-4">📍</div>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3 bg-white border-t sticky bottom-0">
            <Input placeholder="Search for address..." />
            <Button
              className="w-full bg-[#2A5CAA]"
              onClick={() => {
                setSelectedLocation("Current Location")
                setShowLocationMap(false)
              }}
            >
              Confirm Location
            </Button>
          </div>
        </div>
      )}

      {/* Emergency Page Modal */}
      {showEmergency && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-red-50 sticky top-0 z-10">
            <h2 className="text-lg font-bold text-red-600">Emergency Services</h2>
            <Button variant="ghost" onClick={() => setShowEmergency(false)}>
              ✕
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 pb-20">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚨</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Emergency Page</h3>
                <p className="text-gray-600">Emergency services will be designed here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View More Departments Modal */}
      {showAllDepartments && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
            <h2 className="text-lg font-bold text-[#2A5CAA]">All Departments</h2>
            <Button variant="ghost" onClick={() => setShowAllDepartments(false)}>
              ✕
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3 pb-20">
              {departments.map((dept, index) => (
                <Card
                  key={index}
                  className="transform transition-all duration-200 active:scale-105 hover:shadow-md border-0 shadow-sm cursor-pointer"
                  onClick={() => {
                    setShowAllDepartments(false);
                    setSelectedDepartment(dept.name);
                    setActiveTab("doctor-appointment");
                  }}
                >
                  <CardContent className={`p-4 ${dept.color}`}>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{dept.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{dept.name}</div>
                        <div className="text-sm text-gray-600">Available Now</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}


    </>
  )

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Render current page */}
      {renderPage()}

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t shadow-lg">
        <div className="flex justify-around py-2 px-2">
          {[
            { id: "home", icon: "🏠", label: "Home" },
            { id: "appointments", icon: "📅", label: "Appointments" },
            { id: "pharmacy", icon: "💊", label: "Pharmacy" },
            { id: "profile", icon: "👤", label: "Profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-colors min-w-[72px] ${
                activeTab === tab.id ? "bg-[#2A5CAA] text-white" : "text-gray-600"
              }`}
            >
              <span className="text-xl mb-1 leading-none">{tab.icon}</span>
              <span className="text-[11px] font-medium leading-none">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function MediNetApp() {
  return (
    <AuthProvider>
      <MediNetAppContent />
    </AuthProvider>
  )
}