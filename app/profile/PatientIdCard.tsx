import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, CreditCard, Edit2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientData {
  name: string;
  patientId: string;
  bloodType: string;
  emergencyContact: string;
  dateOfBirth: string;
  address: string;
  insurance: string;
  issueDate: string;
  expiryDate: string;
}

export const PatientIdCard = () => {
  const { toast } = useToast();
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({
    name: "John Doe",
    patientId: "PAT-2024-001",
    bloodType: "O+",
    emergencyContact: "John Johnson (555) 987-6543",
    dateOfBirth: "1990-05-15",
    address: "123 Main St, City, State 12345",
    insurance: "HealthCare Plus - Policy #HC123456",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-14"
  });
  const [editData, setEditData] = useState<PatientData>(patientData);

  // Simulate fetching patient data from profile
  useEffect(() => {
    // In a real app, this would fetch from your backend or local storage
    const fetchPatientData = async () => {
      // Simulate API call delay
      setTimeout(() => {
        // Auto-generate patient ID and dates
        const generatedId = `PAT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
        const issueDate = new Date().toISOString().split('T')[0];
        const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        setPatientData(prev => ({
          ...prev,
          patientId: generatedId,
          issueDate,
          expiryDate
        }));
      }, 100);
    };
    
    fetchPatientData();
  }, []);

  const handleEdit = () => {
    setEditData(patientData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setPatientData(editData);
    setIsEditing(false);
    toast({
      title: "Card Updated",
      description: "Your patient ID card has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setEditData(patientData);
    setIsEditing(false);
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-emerald-400 to-green-500 text-white border-0 shadow-soft rounded-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-white/80" />
                <div>
                  <h3 className="text-sm font-medium text-white/80">Patient ID</h3>
                  <p className="text-lg font-bold text-white">{patientData.patientId}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-white/80">Emergency Contact:</p>
                <p className="text-base font-semibold text-white">{patientData.emergencyContact.split(' (')[0]}</p>
                <p className="text-sm text-white/90">{patientData.emergencyContact.match(/\(([^)]+)\)/)?.[1] || ''}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setShowQrDialog(true)}
                className="text-white/80 hover:text-white hover:bg-white/10 text-xs px-3 py-1 h-auto rounded-lg"
              >
                Show QR Details
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                <DialogTitle>Emergency QR Details</DialogTitle>
              </div>
              {!isEditing && (
                <Button variant="ghost" size="icon" onClick={handleEdit}>
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </DialogHeader>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Full Name</Label>
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Patient ID</Label>
                  <Input
                    value={editData.patientId}
                    onChange={(e) => setEditData({ ...editData, patientId: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Blood Type</Label>
                  <Input
                    value={editData.bloodType}
                    onChange={(e) => setEditData({ ...editData, bloodType: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Emergency Contact</Label>
                  <Input
                    value={editData.emergencyContact}
                    onChange={(e) => setEditData({ ...editData, emergencyContact: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Date of Birth</Label>
                  <Input
                    type="date"
                    value={editData.dateOfBirth}
                    onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Insurance</Label>
                  <Input
                    value={editData.insurance}
                    onChange={(e) => setEditData({ ...editData, insurance: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Address</Label>
                <Input
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-48 h-48 bg-white p-4 rounded-lg flex items-center justify-center shadow-lg border border-gray-100">
                  <div className="w-full h-full bg-gray-900 rounded grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'} rounded-sm transition-all duration-200`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium">Emergency Access Code</p>
                  <Badge variant="outline" className="font-mono text-lg px-4 py-2">
                    {patientData.patientId}
                  </Badge>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium text-sm">Patient Details:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><strong>Name:</strong> {patientData.name}</div>
                  <div><strong>Blood Type:</strong> {patientData.bloodType}</div>
                  <div><strong>DOB:</strong> {patientData.dateOfBirth}</div>
                  <div><strong>Insurance:</strong> {patientData.insurance}</div>
                </div>
                <div className="text-xs"><strong>Address:</strong> {patientData.address}</div>
                <div className="text-xs"><strong>Emergency:</strong> {patientData.emergencyContact}</div>
              </div>
            </>
          )}
          
          {!isEditing && (
            <div className="flex justify-center">
              <Button onClick={() => setShowQrDialog(false)}>
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};