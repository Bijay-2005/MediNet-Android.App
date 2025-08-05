import { useState, useMemo } from "react";
import { SearchBar } from "./SearchBar";
import { FilterTabs } from "./FilterTabs";

import { HospitalCard } from "./HospitalCard";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown } from "lucide-react";
// Online hospital images from Unsplash
const apolloHospital = "https://i.ytimg.com/vi/8ArVomFrFMA/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGEogWShlMA8=&rs=AOn4CLCGtGq-xLZXhyHZ-xlGDNOfXWjoJQ";
const careHospital = "https://tse3.mm.bing.net/th/id/OIP.H81ge2pJkWImJP9A-OBO4QHaE7?pid=Api&P=0&h=180";
const aiimsHospital = "https://tse4.mm.bing.net/th/id/OIP.CQmoRg3f69OUWiB0Pc4zNwHaE8?pid=Api&P=0&h=180";
const cardiologyHospital = "https://tse1.mm.bing.net/th/id/OIP.8j00QSPryTPt1-ThuMdgRgHaD4?pid=Api&P=0&h=180";
const orthopedicHospital = "https://tse2.mm.bing.net/th/id/OIP.r5TrKM1wQmdPM_QyeTX2vgHaEh?pid=Api&P=0&h=180";
const neurologyHospital = "https://tse1.mm.bing.net/th/id/OIP.Th4xP-bXxZJL7l_TjirQRwHaE8?pid=Api&P=0&h=180";


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
    image: "https://i.ytimg.com/vi/8ArVomFrFMA/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGEogWShlMA8=&rs=AOn4CLCGtGq-xLZXhyHZ-xlGDNOfXWjoJQ",
    rating: 4.8,
    location: "Gajapati Nagar, Bhubaneswar",
    phone: "‪+91-1860-500-1066‬",
    bedCount: 350,
    specialty: "Multi-specialty",
    isEmergency: true,
  },
  {
    id: "2",
    name: "CARE Hospitals",
    image: "https://icco.co.in/wp-content/uploads/2019/02/Pic-1030x773.jpeg",
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
    image:"https://cache.careers360.mobi/media/presets/720X480/colleges/social-media/media-gallery/784/2018/4/3/All-India-Institute-of-Medical-Sciences-Bhubaneswar-1.jpg",
    rating: 4.9,
    location: "Sijua, Patrapada, Bhubaneswar",
    phone: "‪+91-674-247-6789‬",
    bedCount: 750,
    specialty: "Multi-specialty",
    isEmergency: true,
    isGovernment: true,
  },
  {
    id: "4",
    name: "Amri Hospital",
    image: "https://www.thetechoutlook.com/wp-content/uploads/2022/07/Representational-image-3.jpg",
    rating: 4.6,
    location: "Plot No-1, Kalinga Nagar",
    phone: "‪+91-674-230-0000‬",
    bedCount: 120,  
    specialty: "Cardiology",
    isEmergency: true,
  },
  {
    id: "5",
    name: "Manipal Hospital",
    image:"https://www.manipalhospitalsglobal.com/assets/frontend-assets/images/hospitals/bhubaneswar-hospital-image.jpg",
    rating: 4.4,
    location: "Khandagiri, Bhubaneswar",
    phone: "‪+91-674-235-0000‬",
    bedCount: 400,
    specialty: "Orthopedics",
    isEmergency: true,
  },
  {
    id: "6",
    name: "Sunshine Hospital",
    image: "https://i.ytimg.com/vi/dnsBDTb9sKc/maxresdefault.jpg",
    rating: 4.5,
    location: "Laxmisagar,Rasulgarh",
    phone: "‪+91-674-258-9999‬",
    bedCount: 180,
    specialty: "Neurology",
    isEmergency: true,
  },
  {
    id: "7",
    name: "SUM Ultimate Medicare",
    image: "https://odishabytes.com/wp-content/uploads/2021/05/WhatsApp-Image-2021-05-24-at-17.39.30.jpeg",
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
    image: "https://capitalhospital.nic.in/sites/default/files/DSC_0027_0.jpg",
    rating: 4.2,
    location: "Unit-6, Bhubaneswar",
    phone: "+91-674-253-9999",
    bedCount: 200,
    specialty: "General Medicine",
    isEmergency: true,
  },
  {
    id: "9",
    name: "Cardiacare Hospitals",
    image: "https://www.topteny.com/wp-content/uploads/2019/05/Massachusetts-General-Hospital.jpg",
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
    image: "https://kims.kiit.ac.in/wp-content/uploads/2022/08/KIMS-Super-Speciality-Hospital-Bhubaneswar-5-1200x890.jpg",
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
    image:"https://cdn.hexahealth.com/Image/32ad325d-fda6-43e9-aa48-e41a231559fb.jpg",
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
    image: "https://www.medicoverhospitals.in/images/hospitals/medicover-bangalore.webp",
    rating: 4.5,
    location: "Patia, Bhubaneswar",
    phone: "+91-674-888-9999",
    bedCount: 250,
    specialty: "Multi-specialty",
    isEmergency: true,
  },
  {
    id:"13",
    name:"Bagchi-sri shankar cancer centre and research institute",
    image:"https://cdn.prod.website-files.com/65f3e468dffb0bdbd0527514/660eaee4b5f42b6f29b77910_bhubaneswar-homepage_pg-01_m_1.webp",
    rating:4.9,
    location:" Badaraghunathpur, Chandiheta, Odisha 752054",
    phone:"+91-674-272-7777",
    bedCount:750,
    specialty:"Cancer Care",
    isEmergency:true,
    isGovernment:false,
  }
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