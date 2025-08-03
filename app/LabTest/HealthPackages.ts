import { HealthPackage } from "@/types";

export const healthPackages: HealthPackage[] = [
  // Health Checks
  {
    id: "basic-wellness",
    name: "Basic Wellness Check",
    price: 999,
    icon: "stethoscope",
    description: "Essential health screening for overall wellness",
    features: [
      "Complete Blood Count (CBC)",
      "Blood Sugar (Fasting)",
      "Lipid Profile",
      "Kidney Function Test",
      "Liver Function Test"
    ],
    category: "health-checks"
  },
  {
    id: "advanced-health",
    name: "Advanced Health Panel",
    price: 2499,
    icon: "heart",
    description: "Comprehensive health screening with detailed analysis",
    features: [
      "Complete Blood Count (CBC)",
      "Comprehensive Metabolic Panel",
      "Thyroid Function Tests",
      "Vitamin D3",
      "HbA1c",
      "ECG",
      "Chest X-Ray"
    ],
    category: "health-checks",
    popular: true
  },
  {
    id: "cardiac-pro",
    name: "Cardiac Pro Check",
    price: 1899,
    icon: "heart",
    description: "Specialized cardiac health assessment",
    features: [
      "ECG",
      "2D Echo",
      "Lipid Profile",
      "Troponin I",
      "BNP",
      "Stress Test"
    ],
    category: "health-checks"
  },
  {
    id: "diabetes-care",
    name: "Diabetes Care Package",
    price: 1299,
    icon: "blood",
    description: "Complete diabetes monitoring and care",
    features: [
      "Fasting Blood Sugar",
      "Post Meal Blood Sugar",
      "HbA1c",
      "Insulin Level",
      "Microalbumin",
      "Diabetic Eye Screening"
    ],
    category: "health-checks"
  },

  // Lab Tests
  {
    id: "cbc-test",
    name: "Complete Blood Count (CBC)",
    price: 299,
    icon: "blood",
    description: "Complete blood count analysis",
    features: [
      "Red Blood Cell Count",
      "White Blood Cell Count",
      "Platelet Count",
      "Hemoglobin Level"
    ],
    category: "lab-tests"
  },
  {
    id: "lipid-profile",
    name: "Lipid Profile",
    price: 599,
    icon: "heart",
    description: "Cholesterol and lipid analysis",
    features: [
      "Total Cholesterol",
      "HDL Cholesterol",
      "LDL Cholesterol",
      "Triglycerides"
    ],
    category: "lab-tests"
  },
  {
    id: "thyroid-panel",
    name: "Thyroid Panel",
    price: 799,
    icon: "brain",
    description: "Complete thyroid function assessment",
    features: [
      "TSH",
      "T3",
      "T4",
      "Free T4"
    ],
    category: "lab-tests"
  },
  {
    id: "vitamin-d",
    name: "Vitamin D Test",
    price: 499,
    icon: "stethoscope",
    description: "Vitamin D deficiency screening",
    features: [
      "25-Hydroxy Vitamin D",
      "Vitamin D2",
      "Vitamin D3",
      "Total Vitamin D"
    ],
    category: "lab-tests"
  },

  // Radiology Tests
  {
    id: "ultrasound",
    name: "Ultrasound",
    price: 1500,
    icon: "stethoscope",
    description: "Non-invasive imaging using sound waves",
    features: [
      "Abdominal Ultrasound",
      "Pelvic Ultrasound",
      "Real-time Imaging",
      "Radiologist Report"
    ],
    category: "radiology"
  },
  {
    id: "mri-scan",
    name: "MRI Scan",
    price: 7000,
    icon: "brain",
    description: "Detailed magnetic resonance imaging",
    features: [
      "High Resolution Images",
      "Soft Tissue Analysis",
      "3D Reconstruction",
      "Specialist Report"
    ],
    category: "radiology"
  },
  {
    id: "ct-scan",
    name: "CT Scan",
    price: 5000,
    icon: "brain",
    description: "Computed tomography scan",
    features: [
      "Cross-sectional Images",
      "Contrast Enhancement",
      "3D Imaging",
      "Quick Results"
    ],
    category: "radiology"
  },
  {
    id: "x-ray",
    name: "X-Ray",
    price: 500,
    icon: "stethoscope",
    description: "Basic radiographic imaging",
    features: [
      "Digital X-Ray",
      "Instant Results",
      "Bone Assessment",
      "Clear Images"
    ],
    category: "radiology"
  }
];