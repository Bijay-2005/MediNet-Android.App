import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, User } from "lucide-react";
import { ProfileEditDialog } from "./ProfileEditDialog";

interface ProfileData {
  name: string;
  profession: string;
  gender: string;
  age: number;
  height: string;
  weight: string;
  bloodGroup: string;
  bmi: number;
}

export const ProfileCard = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Sarah Johnson",
    profession: "Designer",
    gender: "Female",
    age: 28,
    height: "5'6\"",
    weight: "130 lbs",
    bloodGroup: "A+",
    bmi: 21.0
  });

  const handleEditProfile = (newData: ProfileData) => {
    setProfileData(newData);
    setIsEditDialogOpen(false);
  };

  return (
    <>
     <Card className="p-4 bg-gradient-to-br from-[#3A8DFF] via-[#B55EFF] to-[#FF5EC9] text-white shadow-md rounded-xl border-0">
  <div className="flex items-start justify-between mb-3">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
        <User className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-lg font-bold">{profileData.name}</h2>
        <p className="text-white/80 text-sm">{profileData.profession}</p>
      </div>
    </div>
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsEditDialogOpen(true)}
      className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs"
    >
      <Edit className="w-3 h-3 mr-1" />
      Edit
    </Button>
  </div>

  <div className="grid grid-cols-2 gap-3 text-xs">
    <div>
      <p className="text-white/70">Gender:</p>
      <p className="font-medium">{profileData.gender}</p>
    </div>
    <div>
      <p className="text-white/70">Age:</p>
      <p className="font-medium">{profileData.age} Years</p>
    </div>
    <div>
      <p className="text-white/70">Height:</p>
      <p className="font-medium">{profileData.height}</p>
    </div>
    <div>
      <p className="text-white/70">Weight:</p>
      <p className="font-medium">{profileData.weight}</p>
    </div>
    <div>
      <p className="text-white/70">Blood Group:</p>
      <p className="font-medium">{profileData.bloodGroup}</p>
    </div>
    <div>
      <p className="text-white/70">BMI:</p>
      <p className="font-medium">{profileData.bmi}</p>
    </div>
  </div>
</Card>
      <ProfileEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        profileData={profileData}
        onSave={handleEditProfile}
      />
    </>
  );
};