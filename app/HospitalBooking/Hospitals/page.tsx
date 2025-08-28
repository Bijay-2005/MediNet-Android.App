"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { Search, Filter, MapPin, Phone, Bed, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

const specialties = ["General Medicine", "Emergency", "Urology", "Cardiology", "Orthopedics", "Pediatrics"]

const hospitals = [
  // General Medicine Hospitals
  {
    id: "apollo-hospitals-bhubaneswar",
    name: "Apollo Hospitals Bhubaneswar",
    location: "Gajapati Nagar, Bhubaneswar",
    phone: "+91-1860-500-1066",
    beds: 350,
    distance: "2.1 km",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "General Medicine",
  },
  {
    id: "aiims-bhubaneswar",
    name: "AIIMS Bhubaneswar",
    location: "Sijua, Bhubaneswar",
    phone: "+91-674-247-3999",
    beds: 750,
    distance: "8.5 km",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "General Medicine",
  },
  {
    id: "kalinga-hospital",
    name: "Kalinga Hospital",
    location: "Bapuji Nagar, Bhubaneswar",
    phone: "+91-674-666-0101",
    beds: 200,
    distance: "3.2 km",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "General Medicine",
  },
  {
    id: "care-hospitals",
    name: "CARE Hospitals Bhubaneswar",
    location: "Unit-15, Bhubaneswar",
    phone: "+91-674-666-8888",
    beds: 300,
    distance: "4.7 km",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "General Medicine",
  },
  {
    id: "sum-hospital",
    name: "SUM Hospital",
    location: "Kalinga Nagar, Bhubaneswar",
    phone: "+91-674-235-0200",
    beds: 500,
    distance: "6.1 km",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "General Medicine",
  },
  {
    id: "hi-tech-medical",
    name: "Hi-Tech Medical College",
    location: "Pandara, Bhubaneswar",
    phone: "+91-674-230-8308",
    beds: 400,
    distance: "12.3 km",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "General Medicine",
  },
  {
    id: "kims-hospital",
    name: "KIMS Hospital",
    location: "Patia, Bhubaneswar",
    phone: "+91-674-274-2555",
    beds: 250,
    distance: "9.8 km",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "General Medicine",
  },
  {
    id: "institute-medical-sciences",
    name: "Institute of Medical Sciences",
    location: "Siksha O Anusandhan University",
    phone: "+91-674-235-8032",
    beds: 600,
    distance: "15.2 km",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "General Medicine",
  },
  {
    id: "capital-hospital",
    name: "Capital Hospital",
    location: "Unit-6, Bhubaneswar",
    phone: "+91-674-253-9655",
    beds: 180,
    distance: "1.8 km",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "General Medicine",
  },
  {
    id: "bmch-hospital",
    name: "BMCH Hospital",
    location: "Jaydev Vihar, Bhubaneswar",
    phone: "+91-674-230-4050",
    beds: 220,
    distance: "5.4 km",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "General Medicine",
  },

  // Emergency Hospitals
  {
    id: "emergency-care-center",
    name: "Emergency Care Center",
    location: "Master Canteen Square",
    phone: "+91-674-108-1008",
    beds: 150,
    distance: "1.2 km",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Emergency",
  },
  {
    id: "trauma-care-hospital",
    name: "Trauma Care Hospital",
    location: "NH-16, Bhubaneswar",
    phone: "+91-674-911-0911",
    beds: 100,
    distance: "7.3 km",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Emergency",
  },
  {
    id: "city-emergency-hospital",
    name: "City Emergency Hospital",
    location: "Saheed Nagar, Bhubaneswar",
    phone: "+91-674-254-0108",
    beds: 80,
    distance: "3.8 km",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Emergency",
  },
  {
    id: "rapid-response-center",
    name: "Rapid Response Medical Center",
    location: "Patia Square, Bhubaneswar",
    phone: "+91-674-108-2424",
    beds: 120,
    distance: "11.2 km",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Emergency",
  },
  {
    id: "accident-emergency-hospital",
    name: "Accident & Emergency Hospital",
    location: "Rasulgarh, Bhubaneswar",
    phone: "+91-674-108-9999",
    beds: 90,
    distance: "6.7 km",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Emergency",
  },
  {
    id: "critical-care-hospital",
    name: "Critical Care Hospital",
    location: "Chandrasekharpur",
    phone: "+91-674-108-7777",
    beds: 110,
    distance: "8.9 km",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Emergency",
  },
  {
    id: "emergency-medical-services",
    name: "Emergency Medical Services",
    location: "Khandagiri, Bhubaneswar",
    phone: "+91-674-108-5555",
    beds: 70,
    distance: "4.5 km",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Emergency",
  },
  {
    id: "urgent-care-clinic",
    name: "Urgent Care Clinic",
    location: "Nayapalli, Bhubaneswar",
    phone: "+91-674-108-3333",
    beds: 60,
    distance: "2.9 km",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Emergency",
  },
  {
    id: "emergency-response-unit",
    name: "Emergency Response Unit",
    location: "Old Town, Bhubaneswar",
    phone: "+91-674-108-1111",
    beds: 50,
    distance: "5.1 km",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Emergency",
  },
  {
    id: "24x7-emergency-center",
    name: "24x7 Emergency Center",
    location: "Jayadev Vihar",
    phone: "+91-674-108-2222",
    beds: 85,
    distance: "7.8 km",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Emergency",
  },

  // Urology Hospitals
  {
    id: "advanced-urology-center",
    name: "Advanced Urology Center",
    location: "Kalinga Nagar",
    phone: "+91-674-301-2001",
    beds: 120,
    distance: "4.2 km",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Urology",
  },
  {
    id: "kidney-stone-hospital",
    name: "Kidney Stone Hospital",
    location: "Patia, Bhubaneswar",
    phone: "+91-674-301-3003",
    beds: 80,
    distance: "9.1 km",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Urology",
  },
  {
    id: "uro-care-hospital",
    name: "Uro Care Hospital",
    location: "Saheed Nagar",
    phone: "+91-674-301-4004",
    beds: 100,
    distance: "3.7 km",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Urology",
  },
  {
    id: "nephro-urology-institute",
    name: "Nephro Urology Institute",
    location: "Unit-8, Bhubaneswar",
    phone: "+91-674-301-5005",
    beds: 150,
    distance: "2.8 km",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Urology",
  },
  {
    id: "stone-laser-center",
    name: "Stone & Laser Center",
    location: "Chandrasekharpur",
    phone: "+91-674-301-6006",
    beds: 60,
    distance: "8.4 km",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Urology",
  },
  {
    id: "urological-sciences-center",
    name: "Urological Sciences Center",
    location: "Khandagiri",
    phone: "+91-674-301-7007",
    beds: 90,
    distance: "4.9 km",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Urology",
  },
  {
    id: "kidney-care-hospital",
    name: "Kidney Care Hospital",
    location: "Nayapalli",
    phone: "+91-674-301-8008",
    beds: 70,
    distance: "3.1 km",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Urology",
  },
  {
    id: "uro-surgical-center",
    name: "Uro Surgical Center",
    location: "Jaydev Vihar",
    phone: "+91-674-301-9009",
    beds: 110,
    distance: "6.3 km",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Urology",
  },
  {
    id: "minimally-invasive-urology",
    name: "Minimally Invasive Urology",
    location: "Rasulgarh",
    phone: "+91-674-301-1010",
    beds: 50,
    distance: "7.2 km",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Urology",
  },
  {
    id: "prostate-care-center",
    name: "Prostate Care Center",
    location: "Old Town",
    phone: "+91-674-301-1111",
    beds: 40,
    distance: "5.6 km",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Urology",
  },

  // Cardiology Hospitals
  {
    id: "heart-care-institute",
    name: "Heart Care Institute",
    location: "Kalinga Nagar",
    phone: "+91-674-401-2001",
    beds: 200,
    distance: "4.5 km",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Cardiology",
  },
  {
    id: "cardiac-surgery-center",
    name: "Cardiac Surgery Center",
    location: "Unit-15, Bhubaneswar",
    phone: "+91-674-401-3003",
    beds: 150,
    distance: "5.2 km",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Cardiology",
  },
  {
    id: "cardiovascular-hospital",
    name: "Cardiovascular Hospital",
    location: "Patia, Bhubaneswar",
    phone: "+91-674-401-4004",
    beds: 180,
    distance: "9.8 km",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Cardiology",
  },
  {
    id: "heart-rhythm-center",
    name: "Heart Rhythm Center",
    location: "Saheed Nagar",
    phone: "+91-674-401-5005",
    beds: 100,
    distance: "3.9 km",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Cardiology",
  },
  {
    id: "interventional-cardiology",
    name: "Interventional Cardiology",
    location: "Chandrasekharpur",
    phone: "+91-674-401-6006",
    beds: 120,
    distance: "8.7 km",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Cardiology",
  },
  {
    id: "cardiac-catheterization",
    name: "Cardiac Catheterization Lab",
    location: "Khandagiri",
    phone: "+91-674-401-7007",
    beds: 80,
    distance: "5.1 km",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Cardiology",
  },
  {
    id: "heart-valve-center",
    name: "Heart Valve Center",
    location: "Nayapalli",
    phone: "+91-674-401-8008",
    beds: 90,
    distance: "3.4 km",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Cardiology",
  },
  {
    id: "pediatric-cardiology",
    name: "Pediatric Cardiology Center",
    location: "Jaydev Vihar",
    phone: "+91-674-401-9009",
    beds: 60,
    distance: "6.8 km",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Cardiology",
  },
  {
    id: "cardiac-rehabilitation",
    name: "Cardiac Rehabilitation Center",
    location: "Rasulgarh",
    phone: "+91-674-401-1010",
    beds: 70,
    distance: "7.5 km",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Cardiology",
  },
  {
    id: "heart-failure-clinic",
    name: "Heart Failure Clinic",
    location: "Old Town",
    phone: "+91-674-401-1111",
    beds: 50,
    distance: "6.2 km",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Cardiology",
  },

  // Orthopedics Hospitals
  {
    id: "bone-joint-hospital",
    name: "Bone & Joint Hospital",
    location: "Kalinga Nagar",
    phone: "+91-674-501-2001",
    beds: 150,
    distance: "4.8 km",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Orthopedics",
  },
  {
    id: "spine-surgery-center",
    name: "Spine Surgery Center",
    location: "Unit-8, Bhubaneswar",
    phone: "+91-674-501-3003",
    beds: 100,
    distance: "2.9 km",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Orthopedics",
  },
  {
    id: "joint-replacement-hospital",
    name: "Joint Replacement Hospital",
    location: "Patia, Bhubaneswar",
    phone: "+91-674-501-4004",
    beds: 120,
    distance: "10.1 km",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Orthopedics",
  },
  {
    id: "sports-medicine-center",
    name: "Sports Medicine Center",
    location: "Saheed Nagar",
    phone: "+91-674-501-5005",
    beds: 80,
    distance: "4.1 km",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Orthopedics",
  },
  {
    id: "trauma-orthopedics",
    name: "Trauma & Orthopedics",
    location: "Chandrasekharpur",
    phone: "+91-674-501-6006",
    beds: 110,
    distance: "9.2 km",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Orthopedics",
  },
  {
    id: "arthroscopy-center",
    name: "Arthroscopy Center",
    location: "Khandagiri",
    phone: "+91-674-501-7007",
    beds: 60,
    distance: "5.3 km",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Orthopedics",
  },
  {
    id: "pediatric-orthopedics",
    name: "Pediatric Orthopedics",
    location: "Nayapalli",
    phone: "+91-674-501-8008",
    beds: 70,
    distance: "3.6 km",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Orthopedics",
  },
  {
    id: "hand-surgery-center",
    name: "Hand Surgery Center",
    location: "Jaydev Vihar",
    phone: "+91-674-501-9009",
    beds: 40,
    distance: "7.1 km",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Orthopedics",
  },
  {
    id: "foot-ankle-clinic",
    name: "Foot & Ankle Clinic",
    location: "Rasulgarh",
    phone: "+91-674-501-1010",
    beds: 50,
    distance: "8.0 km",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Orthopedics",
  },
  {
    id: "bone-tumor-center",
    name: "Bone Tumor Center",
    location: "Old Town",
    phone: "+91-674-501-1111",
    beds: 90,
    distance: "6.4 km",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Orthopedics",
  },

  // Pediatrics Hospitals
  {
    id: "childrens-hospital",
    name: "Children's Hospital",
    location: "Kalinga Nagar",
    phone: "+91-674-601-2001",
    beds: 200,
    distance: "4.3 km",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Pediatrics",
  },
  {
    id: "pediatric-care-center",
    name: "Pediatric Care Center",
    location: "Unit-6, Bhubaneswar",
    phone: "+91-674-601-3003",
    beds: 120,
    distance: "2.1 km",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Pediatrics",
  },
  {
    id: "child-health-hospital",
    name: "Child Health Hospital",
    location: "Patia, Bhubaneswar",
    phone: "+91-674-601-4004",
    beds: 150,
    distance: "9.5 km",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Pediatrics",
  },
  {
    id: "neonatal-intensive-care",
    name: "Neonatal Intensive Care",
    location: "Saheed Nagar",
    phone: "+91-674-601-5005",
    beds: 80,
    distance: "4.0 km",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    emergency: true,
    specialty: "Pediatrics",
  },
  {
    id: "pediatric-surgery-center",
    name: "Pediatric Surgery Center",
    location: "Chandrasekharpur",
    phone: "+91-674-601-6006",
    beds: 100,
    distance: "8.8 km",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Pediatrics",
  },
  {
    id: "child-development-center",
    name: "Child Development Center",
    location: "Khandagiri",
    phone: "+91-674-601-7007",
    beds: 60,
    distance: "5.7 km",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Pediatrics",
  },
  {
    id: "pediatric-cardiology-center",
    name: "Pediatric Cardiology Center",
    location: "Nayapalli",
    phone: "+91-674-601-8008",
    beds: 70,
    distance: "3.8 km",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Pediatrics",
  },
  {
    id: "child-neurology-center",
    name: "Child Neurology Center",
    location: "Jaydev Vihar",
    phone: "+91-674-601-9009",
    beds: 50,
    distance: "7.4 km",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Pediatrics",
  },
  {
    id: "pediatric-oncology",
    name: "Pediatric Oncology Center",
    location: "Rasulgarh",
    phone: "+91-674-601-1010",
    beds: 90,
    distance: "8.3 km",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Pediatrics",
  },
  {
    id: "child-psychiatry-center",
    name: "Child Psychiatry Center",
    location: "Old Town",
    phone: "+91-674-601-1111",
    beds: 40,
    distance: "6.9 km",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
    emergency: false,
    specialty: "Pediatrics",
  },
]

export default function HospitalsPage() {
  const router = useRouter()

  // Debounced search state
  const [query, setQuery] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")

  // Debounce input → searchTerm
  useEffect(() => {
    const t = setTimeout(() => setSearchTerm(query), 200)
    return () => clearTimeout(t)
  }, [query])

  // Prefetch likely next routes
  useEffect(() => {
    router.prefetch("/HospitalBooking/Hospitals/deparment")
  }, [router])

  // Memoized filtering
  const filteredHospitals = useMemo(() => {
    const q = searchTerm.toLowerCase()
    return hospitals.filter((h) => {
      const matchesText =
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.specialty.toLowerCase().includes(q)
      const matchesSpecialty = selectedSpecialty === "All" || h.specialty === selectedSpecialty
      return matchesText && matchesSpecialty
    })
  }, [searchTerm, selectedSpecialty])

  // Small render helper (memoized to avoid re-renders on list)
  const renderHospitalCard = useCallback((hospital: any) => (
    <Card key={hospital.id} className="overflow-hidden">
      <div className="relative">
        <Image
          src={hospital.image || "/placeholder.svg"}
          alt={hospital.name}
          width={800}
          height={300}
          priority={false}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {hospital.emergency && (
            <Badge className="bg-destructive text-destructive-foreground">24/7 Emergency</Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-secondary text-secondary-foreground flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            {hospital.rating}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-balance">{hospital.name}</h3>

        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4" />
          {hospital.location}
        </div>

        <div className="flex items-center gap-1 text-secondary text-sm">
          <Phone className="h-4 w-4" />
          {hospital.phone}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {hospital.beds} beds
          </div>
          <span>{hospital.distance}</span>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {hospital.specialty}
          </Badge>
          <Link href={`/HospitalBooking/Hospitals/deparment`} prefetch>
            <Button className="bg-[#4CBB17] hover:bg-[#43a314] text-white">Book Now</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  ), [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-3">
        <div className="w-full max-w-full md:max-w-md mx-auto px-2 space-y-3">
          {/* Search Bar (debounced) */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search hospitals or specialties..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 w-full"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full">
            <Button
              variant={selectedSpecialty === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpecialty("All")}
              className={`whitespace-nowrap ${
                selectedSpecialty === "All"
                  ? "bg-[#2A5CAA] text-white"
                  : "bg-white text-[#2A5CAA] border border-[#2A5CAA] hover:bg-[#2A5CAA] hover:text-white"
              }`}
            >
              <Filter className="h-3 w-3 mr-1" />
              All
            </Button>
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpecialty(specialty)}
                className={`whitespace-nowrap ${
                  selectedSpecialty === specialty
                    ? "bg-[#2A5CAA] text-white"
                    : "bg-white text-[#2A5CAA] border border-[#2A5CAA] hover:bg-[#2A5CAA] hover:text-white"
                }`}
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Hospital Cards */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {filteredHospitals.map(renderHospitalCard)}
      </div>

      {/* Bottom Tab Bar (reused behavior via tab query) */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t shadow-lg">
        <div className="flex justify-around py-2">
          {[
            { id: "home", icon: "🏠", label: "Home", path: "/?skipSplash=1&tab=home" },
            { id: "appointments", icon: "📅", label: "Appointments", path: "/?skipSplash=1&tab=appointments" },
            { id: "pharmacy", icon: "💊", label: "Pharmacy", path: "/?skipSplash=1&tab=pharmacy" },
            { id: "profile", icon: "👤", label: "Profile", path: "/?skipSplash=1&tab=profile" },
          ].map((tab: any) => (
            <Link key={tab.id} href={tab.path} prefetch className="flex flex-col items-center py-2 px-3 rounded-lg transition-colors text-gray-600">
              <span className="text-lg mb-1">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

