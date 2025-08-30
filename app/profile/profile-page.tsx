import { ProfileCard } from "@/app/profile/ProfileCard";
import { PatientIdCard } from"@/app/profile/PatientIdCard";
import { HealthConditions } from "@/app/profile/HealthConditions";
import {CriticalAllergies} from "@/app/profile/CriticalAllergies";
import { MedicationsReminders } from "@/app/profile/MedicationsReminder";
import { NavigationSections } from "@/app/profile/NevigationSections";

const Profile = () => {
  return (
    <div className="min-h-screen bg-blue-50"> {/* Changed to bg-blue-50 for baby blue */}
      {/* Mobile-first responsive container */}
      <div className="max-w-md mx-auto px-3 py-3 space-y-4">
        {/* Profile Card */}
        <ProfileCard />
        
        {/* Patient ID Card */}
        <PatientIdCard />
        
        {/* Health Conditions */}
        <HealthConditions />
        
        {/* Critical Allergies */}
        <CriticalAllergies />
        
        {/* Medications & Reminders */}
        <MedicationsReminders />
        
        {/* Navigation Sections */}
        <NavigationSections />
        
        {/* PWA Footer */}
        <div className="text-center text-xs text-muted-foreground pt-2 pb-6">
          <p>Medical Dashboard PWA v1.0</p>
          <p>Always consult healthcare providers for medical decisions</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;