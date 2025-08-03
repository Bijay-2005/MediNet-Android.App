import { useState } from "react";
import { Phone, MapPin, Heart, BookOpen, Users, Stethoscope, AlertTriangle, Navigation, Shield, Download, Mail, Ambulance, Share, ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MapComponent from "@/app/routes/MapComponent";

const Index = () => {
  const [sosPressed, setSosPressed] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(0);
  const [showHospitals, setShowHospitals] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleSOS = () => {
    setSosPressed(true);
    setSosCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setSosCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              setUserLocation(location);
              console.log("Emergency location:", position.coords);
              setShowHospitals(true);
              setSosPressed(false);
            },
            (error) => {
              console.error("Location error:", error);
              alert("SOS Activated! Please provide your location to emergency services.");
              setSosPressed(false);
            }
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLocationShare = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const message = `Emergency: I need help! My location: https://maps.google.com/?q=${latitude},${longitude}`;
        if (navigator.share) {
          navigator.share({
            title: 'Emergency Location',
            text: message,
            url: `https://maps.google.com/?q=${latitude},${longitude}`
          });
        } else {
          navigator.clipboard.writeText(message);
          alert("Location copied to clipboard!");
        }
      },
      () => alert("Unable to get location. Please enable location services.")
    );
  };

  const emergencyContacts = [
    { name: "Emergency (911)", number: "911", icon: "🚨" },
    { name: "Poison Control", number: "1-800-222-1222", icon: "☠️" },
    { name: "Crisis Hotline", number: "988", icon: "💬" },
    { name: "Custom Emergency", number: "Add Number", icon: "📞" }
  ];

  const nearbyHospitals = [
    { name: "City General Hospital", distance: "0.8 miles", phone: "555-0101", lat: 40.7589, lng: -73.9851 },
    { name: "Emergency Medical Center", distance: "1.2 miles", phone: "555-0102", lat: 40.7614, lng: -73.9776 },
    { name: "St. Mary's Hospital", distance: "1.5 miles", phone: "555-0103", lat: 40.7505, lng: -73.9934 },
    { name: "Regional Medical Center", distance: "2.1 miles", phone: "555-0104", lat: 40.7648, lng: -73.9808 }
  ];

  const nearbyAmbulances = [
    { name: "Emergency Ambulance Service", distance: "0.5 miles", phone: "555-1001", eta: "3-5 mins" },
    { name: "Rapid Response Ambulance", distance: "0.7 miles", phone: "555-1002", eta: "4-6 mins" },
    { name: "City Ambulance Unit", distance: "1.0 miles", phone: "555-1003", eta: "5-8 mins" },
    { name: "Metro Emergency Transport", distance: "1.3 miles", phone: "555-1004", eta: "7-10 mins" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex flex-col">
      {/* Mobile Header */}
      <header className="bg-red-600 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6" />
            <h1 className="text-lg font-bold">MedNet+</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-red-700 p-2"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        {showMenu && (
          <div className="mt-4 text-sm bg-red-700 p-2 rounded">
            <span className="px-2 py-1">24/7 Emergency Services Available</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 h-auto">
            <TabsTrigger value="dashboard" className="flex flex-col items-center p-2 text-xs">
              <AlertTriangle className="h-4 w-4 mb-1" />
              SOS
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex flex-col items-center p-2 text-xs">
              <Phone className="h-4 w-4 mb-1" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="hospitals" className="flex flex-col items-center p-2 text-xs">
              <MapPin className="h-4 w-4 mb-1" />
              Hospitals
            </TabsTrigger>
            <TabsTrigger value="ambulance" className="flex flex-col items-center p-2 text-xs">
              <Ambulance className="h-4 w-4 mb-1" />
              Ambulance
            </TabsTrigger>
            <TabsTrigger value="firstaid" className="flex flex-col items-center p-2 text-xs">
              <BookOpen className="h-4 w-4 mb-1" />
              First Aid
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* SOS Button */}
            <div className="text-center">
              <Button
                onClick={handleSOS}
                className={`w-40 h-40 rounded-full text-2xl font-bold shadow-2xl transition-all duration-300 ${
                  sosPressed 
                    ? "bg-red-800 animate-pulse scale-110" 
                    : "bg-red-600 hover:bg-red-700 hover:scale-105"
                } text-white border-8 border-white`}
                disabled={sosPressed}
              >
                {sosPressed ? `${sosCountdown}` : "SOS"}
              </Button>
              <p className="mt-4 text-lg font-semibold text-red-700">
                Press for immediate emergency assistance
              </p>
            </div>

            {/* Quick Actions - Single column for mobile */}
            <div className="space-y-3">
              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => window.location.href = "tel:911"}>
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
                    <Ambulance className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Emergency Call</h3>
                    <p className="text-sm text-gray-600">Call 911 immediately</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300" onClick={handleLocationShare}>
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
                    <Share className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Share Location</h3>
                    <p className="text-sm text-gray-600">Send your location to contacts</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Find Doctors</h3>
                    <p className="text-sm text-gray-600">Emergency medical professionals</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center text-white">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Blood Bank</h3>
                    <p className="text-sm text-gray-600">Find blood donors & banks</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">First Aid Guide</h3>
                    <p className="text-sm text-gray-600">Step-by-step emergency care</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <h2 className="text-xl font-bold text-red-700 mb-4">Emergency Contacts</h2>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <Button
                      variant="ghost"
                      className="w-full h-auto text-left justify-start p-0"
                      onClick={() => contact.number.startsWith('+') || contact.number.match(/^[0-9-\(\)\s]+$/) 
                        ? window.location.href = `tel:${contact.number}`
                        : alert("Please add your custom emergency number")
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{contact.icon}</span>
                        <div>
                          <h3 className="font-semibold">{contact.name}</h3>
                          <p className="text-gray-600">{contact.number}</p>
                        </div>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hospitals" className="space-y-4">
            <h2 className="text-xl font-bold text-red-700">Nearby Hospitals</h2>
            <div className="space-y-3">
              {nearbyHospitals.map((hospital, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{hospital.name}</h3>
                        <p className="text-gray-600 text-sm">{hospital.distance} away</p>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => window.location.href = `tel:${hospital.phone}`}
                        className="ml-4"
                      >
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ambulance" className="space-y-4">
            <h2 className="text-xl font-bold text-red-700">Nearby Ambulances</h2>
            <div className="space-y-3">
              {nearbyAmbulances.map((ambulance, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{ambulance.name}</h3>
                        <p className="text-gray-600 text-sm">{ambulance.distance} • ETA: {ambulance.eta}</p>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => window.location.href = `tel:${ambulance.phone}`}
                        className="ml-4 bg-red-600 hover:bg-red-700"
                      >
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="firstaid" className="space-y-4">
            <h2 className="text-xl font-bold text-red-700">First Aid Guide</h2>
            <div className="space-y-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold">CPR Instructions</h3>
                  <p className="text-sm text-gray-600">Step-by-step CPR guide</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold">Choking Relief</h3>
                  <p className="text-sm text-gray-600">Heimlich maneuver guide</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold">Wound Care</h3>
                  <p className="text-sm text-gray-600">Basic wound treatment</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold">Emergency Kit</h3>
                  <p className="text-sm text-gray-600">Essential supplies checklist</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Hospital Dialog with Map */}
      <Dialog open={showHospitals} onOpenChange={setShowHospitals}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-red-700">Nearest Emergency Services - Your Location</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {userLocation && (
              <div className="h-64 w-full">
                <MapComponent 
                  userLocation={userLocation}
                  hospitals={nearbyHospitals}
                />
              </div>
            )}
            
            {/* Hospitals Section */}
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Nearby Hospitals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-32 overflow-y-auto">
                {nearbyHospitals.map((hospital, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-blue-50">
                    <div>
                      <h4 className="font-semibold text-sm">{hospital.name}</h4>
                      <p className="text-xs text-gray-600">{hospital.distance}</p>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => window.location.href = `tel:${hospital.phone}`}
                    >
                      Call {hospital.phone}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Ambulances Section */}
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center">
                <Ambulance className="mr-2 h-5 w-5" />
                Nearby Ambulances
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-32 overflow-y-auto">
                {nearbyAmbulances.map((ambulance, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-red-50">
                    <div>
                      <h4 className="font-semibold text-sm">{ambulance.name}</h4>
                      <p className="text-xs text-gray-600">{ambulance.distance} • ETA: {ambulance.eta}</p>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => window.location.href = `tel:${ambulance.phone}`}
                    >
                      Call {ambulance.phone}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Simplified Footer - Only MedNet+ Support and Certifications */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4">
          {/* MedNet+ Support */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-red-700 mb-2">MedNet+ Support</h3>
            <p className="text-gray-600 mb-3 text-sm">24/7 Emergency Support Helpline</p>
            <Button className="bg-red-600 hover:bg-red-700 mb-4">
              <Phone className="mr-2 h-4 w-4" />
              Call: 1-800-MEDNET
            </Button>
            <div className="text-xs text-gray-500">
              Email: support@mednet.com
            </div>
          </div>

          {/* Certifications */}
          <div className="text-center">
            <h4 className="font-semibold mb-3 text-gray-800">Certifications</h4>
            <div className="flex flex-col space-y-2 items-center">
              <Badge className="bg-blue-600 text-white px-4 py-2">
                <Shield className="mr-2 h-4 w-4" />
                HIPAA Compliant
              </Badge>
              <Badge className="bg-green-600 text-white px-4 py-2">
                <Shield className="mr-2 h-4 w-4" />
                ISO 27001 Certified
              </Badge>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
            © 2024 MedNet+ Emergency Services. Your safety is our priority.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;