import { useState, useMemo } from "react";
import { SearchBar } from "./SearchBar";
import { FilterTabs } from "./FilterTabs";

import { HospitalCard } from "./HospitalCard";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown } from "lucide-react";
// Online hospital images from Unsplash
const apolloHospital = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3Hv53JzECdzjO8x3PVI4v16EkLR9LI_pRg&s";
const careHospital = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop";
const aiimsHospital = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop";
const cardiologyHospital = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop";
const orthopedicHospital = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop";
const neurologyHospital = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop";

// Simple distance calculation function
const updateHospitalDistances = (hospitals: any[], userLocation: { lat: number; lng: number } | null) => {
  if (!userLocation) return hospitals;
  
  return hospitals.map(hospital => ({
    ...hospital,
    distanceValue: Math.random() * 10 // Placeholder distance calculation
  }));
};

const filterTabs = [
  { id: "all", label: "All" },
  { id: "multi-specialty", label: "Multi-specialty" },
  { id: "cardiology", label: "Cardiology" },
  { id: "orthopedics", label: "Orthopedics" },
  { id: "neurology", label: "Neurology" },
  { id: "cancer-care", label: "Cancer Care" },
  { id: "pediatrics", label: "Pediatrics" },
  { id: "gynecology", label: "Gynecology" },
  { id: "general-medicine", label: "General Medicine" },
  { id: "emergency", label: "Emergency" },
  { id: "urology", label: "Urology" },
];

const mockHospitals = [
  {
    id: "1",
    name: "Apollo Hospitals Bhubaneswar",
    image: apolloHospital,
    rating: 4.8,
    location: "Gajapati Nagar, Bhubaneswar",
    phone: "+91-1860-500-1066",
    bedCount: 350,
    specialty: "Multi-specialty",
    isEmergency: true,
  },
  {
    id: "2",
    name: "CARE Hospitals",
    image: careHospital,
    rating: 4.7,
    location: "Chandrasekharpur, Bhubaneswar",
    phone: "1800-108-1234",
    bedCount: 280,
    specialty: "Cardiology",
    isEmergency: true,
  },
  {
    id: "3",
    name: "AIIMS Bhubaneswar",
    image: aiimsHospital,
    rating: 4.9,
    location: "Sijua, Patrapada, Bhubaneswar",
    phone: "+91-674-247-6789",
    bedCount: 750,
    specialty: "Multi-specialty",
    isEmergency: true,
    isGovernment: true,
  },
  {
    id: "4",
    name: "Kalinga Heart Foundation",
    image: cardiologyHospital,
    rating: 4.6,
    location: "Plot No-1, Kalinga Nagar",
    phone: "+91-674-230-0000",
    bedCount: 120,  
    specialty: "Cardiology",
    isEmergency: true,
  },
  {
    id: "5",
    name: "Manipal Hospital",
    image: orthopedicHospital,
    rating: 4.4,
    location: "Khandagiri, Bhubaneswar",
    phone: "+91-674-235-0000",
    bedCount: 400,
    specialty: "Orthopedics",
    isEmergency: true,
  },
  {
    id: "6",
    name: "Sunshine Hospital",
    image: neurologyHospital,
    rating: 4.5,
    location: "Laxmisagar,Rasulgarh",
    phone: "+91-674-258-9999",
    bedCount: 180,
    specialty: "Neurology",
    isEmergency: true,
  },
  {
    id: "7",
    name: "SUM Ultimate Medicare",
    image: apolloHospital,
    rating: 4.3,
    location: "K8, Kalinga Nagar, Bhubaneswar",
    phone: "+91-674-235-8888",
    bedCount: 500,
    specialty: "Multi-specialty",
    isEmergency: true,
  },
  {
    id: "8",
    name: "Capital Hospital",
    image: careHospital,
    rating: 4.2,
    location: "Unit-6, Bhubaneswar",
    phone: "+91-674-253-9999",
    bedCount: 200,
    specialty: "General Medicine",
    isEmergency: true,
  },
  {
    id: "9",
    name: "Manipal Hospitals",
    image: cardiologyHospital,
    rating: 4.7,
    location: "Plot No. 1, Bhubaneswar",
    phone: "+91-674-663-3333",
    bedCount: 350,
    specialty: "Multi-specialty",
    isEmergency: true,
  },
  {
    id: "10",
    name: "Kalinga Institute of Medical Sciences",
    image: aiimsHospital,
    rating: 4.6,
    location: "KIIT Campus, Patia, Bhubaneswar",
    phone: "+91-674-272-7777",
    bedCount: 800,
    specialty: "Multi-specialty",
    isEmergency: true,
    isGovernment: false,
  },
  {
    id: "11",
    name: "Sparsh Hospital",
    image: orthopedicHospital,
    rating: 4.4,
    location: "Saheed Nagar, Bhubaneswar",
    phone: "+91-674-654-3210",
    bedCount: 150,
    specialty: "Orthopedics",
    isEmergency: true,
  },
  {
    id: "12",
    name: "Medicover Hospitals",
    image: neurologyHospital,
    rating: 4.5,
    location: "Patia, Bhubaneswar",
    phone: "+91-674-888-9999",
    bedCount: 250,
    specialty: "Multi-specialty",
    isEmergency: true,
  },
];

const HospitalBooking = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Update hospital distances when user location changes
  const hospitalsWithDistance = useMemo(() => {
    return updateHospitalDistances(mockHospitals, userLocation);
  }, [userLocation]);

  const filteredHospitals = hospitalsWithDistance.filter((hospital: any) => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === "all" || 
                      hospital.specialty.toLowerCase().replace("-", " ") === activeTab.replace("-", " ") ||
                      (activeTab === "emergency" && hospital.isEmergency);
    
    const matchesFilter = activeFilter === "all" ||
                         (activeFilter === "emergency" && hospital.isEmergency) ||
                         (activeFilter === "government" && hospital.isGovernment) ||
                         (activeFilter === "private" && !hospital.isGovernment) ||
                         (activeFilter === "top-rated" && hospital.rating >= 4.7) ||
                         (activeFilter === "nearby" && userLocation && hospital.distanceValue && hospital.distanceValue <= 5);
    
    return matchesSearch && matchesTab && matchesFilter;
  });

  // Sort hospitals by distance when location is available
  const sortedHospitals = useMemo(() => {
    if (!userLocation) return filteredHospitals;
    
    return [...filteredHospitals].sort((a, b) => {
      const distanceA = a.distanceValue || Infinity;
      const distanceB = b.distanceValue || Infinity;
      return distanceA - distanceB;
    });
  }, [filteredHospitals, userLocation]);

  const handleLocationChange = (location: { lat: number; lng: number } | null) => {
    setUserLocation(location);
    // If location is enabled, automatically apply nearby filter
    if (location && activeFilter === "all") {
      setActiveFilter("nearby");
    }
  };
  const handleHospitalClick = (hospital: any) => {
    console.log("Hospital selected:", hospital);
    // Handle hospital selection logic here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="w-full p-3 space-y-3 sm:max-w-md sm:mx-auto sm:p-4 sm:space-y-4">
          <SearchBar 
            placeholder="Search hospitals or specialties..."
            onSearch={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          
          <FilterTabs 
            tabs={filterTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* Hospital Cards */}
      <div className="max-w-md mx-auto p-4">
        <div className="space-y-6">
          {sortedHospitals.length > 0 ? (
            sortedHospitals.map((hospital: any) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
                onClick={handleHospitalClick}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No hospitals found matching your criteria
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Try adjusting your search or filter options
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary/30 border-t border-border mt-8">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="text-center space-y-6">
            {/* Tagline */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                "Your Health, Our Priority — Find Trusted Hospitals Near You, Anytime."
              </h3>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="space-y-1">
                <p>www.medinet.in</p>
                <p>support@medinet.in</p>
              </div>
              <p>Available Across Major Indian Cities</p>
              <p>Secure | Mobile-Friendly | 24/7 Emergency Access</p>
            </div>

            {/* Copyright */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                © 2025 Medinet Healthcare Pvt. Ltd. | All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HospitalBooking;