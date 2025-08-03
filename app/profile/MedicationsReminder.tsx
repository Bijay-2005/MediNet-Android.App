import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pill, Check, Clock, Plus, Settings, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  instructions: string;
  status: 'normal' | 'overdue' | 'as-needed';
  taken: boolean;
}

export const MedicationsReminders = () => {
  const { toast } = useToast();
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      nextDose: '06:00 AM',
      instructions: 'Take with meals',
      status: 'normal',
      taken: false
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      nextDose: '05:00 AM',
      instructions: 'Take in the morning',
      status: 'overdue',
      taken: false
    },
    {
      id: '3',
      name: 'Albuterol Inhaler',
      dosage: '90mcg',
      frequency: 'As needed',
      nextDose: 'As needed',
      instructions: 'For asthma symptoms',
      status: 'as-needed',
      taken: false
    }
  ]);
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    nextDose: '',
    instructions: '',
    status: 'normal' as const
  });

  const handleTakeMedication = (id: string) => {
    setMedications(meds => 
      meds.map(med => 
        med.id === id 
          ? { ...med, taken: !med.taken }
          : med
      )
    );
    
    const medication = medications.find(med => med.id === id);
    if (medication) {
      toast({
        title: medication.taken ? "Medication Untaken" : "Medication Taken",
        description: `${medication.name} has been ${medication.taken ? 'unmarked' : 'marked'} as taken.`,
      });
    }
  };

  const handleConfigureReminder = (medication: Medication) => {
    setSelectedMedication(medication);
    setShowReminderDialog(true);
  };

  const handleAddMedication = () => {
    if (newMedication.name.trim()) {
      const medication: Medication = {
        id: Date.now().toString(),
        ...newMedication,
        taken: false
      };
      setMedications([...medications, medication]);
      setNewMedication({
        name: '',
        dosage: '',
        frequency: '',
        nextDose: '',
        instructions: '',
        status: 'normal'
      });
      setShowAddDialog(false);
      toast({
        title: "Medication Added",
        description: `${medication.name} has been added to your medications.`,
      });
    }
  };

  const getStatusBadge = (medication: Medication) => {
    if (medication.taken) {
      return <Badge className="bg-success text-success-foreground">Taken</Badge>;
    }
    
    switch (medication.status) {
      case 'overdue':
        return <Badge className="bg-destructive text-destructive-foreground">Overdue</Badge>;
      case 'as-needed':
        return <Badge variant="outline">As Needed</Badge>;
      default:
        return null;
    }
  };

  const removeMedication = (id: string) => {
    setMedications(meds => meds.filter(med => med.id !== id));
    toast({
      title: "Medication Removed",
      description: "The medication has been removed from your list.",
    });
  };

  return (
    <>
      <Card className="p-4 shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <Pill className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Medications & Reminders</h3>
        </div>
        
        <div className="space-y-4">
          {medications.map((medication) => (
            <div key={medication.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{medication.name}</h4>
                    {getStatusBadge(medication)}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <p><span className="font-medium">Dosage:</span> {medication.dosage}</p>
                    <p><span className="font-medium">Frequency:</span> {medication.frequency}</p>
                    <p><span className="font-medium">Next Dose:</span> {medication.nextDose}</p>
                    <p><span className="font-medium">Instructions:</span> {medication.instructions}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMedication(medication.id)}
                  className="text-muted-foreground hover:text-destructive p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={medication.taken ? "taken" : "success"}
                  size="sm"
                  onClick={() => handleTakeMedication(medication.id)}
                  className="flex-1"
                >
                  <Check className="w-4 h-4 mr-1" />
                  {medication.taken ? "Taken ✓" : "Mark Taken"}
                </Button>
                <Button
                  variant="medical"
                  size="sm"
                  onClick={() => handleConfigureReminder(medication)}
                  className="flex-1"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Configure Smart Reminder
                </Button>
              </div>
              
              {medication.status === 'overdue' && (
                <div className="text-xs text-destructive bg-destructive/10 p-2 rounded">
                  This medication is overdue. Please take it as soon as possible.
                </div>
              )}
            </div>
          ))}
          
          <Button 
            onClick={() => setShowAddDialog(true)}
            className="w-full bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white border-0 rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Medication
          </Button>
        </div>
      </Card>

      {/* Add Medication Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Medication</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="med-name">Medication Name</Label>
              <Input
                id="med-name"
                value={newMedication.name}
                onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                placeholder="Enter medication name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                placeholder="e.g., 500mg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={newMedication.frequency} onValueChange={(value) => setNewMedication({...newMedication, frequency: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Once daily">Once daily</SelectItem>
                  <SelectItem value="Twice daily">Twice daily</SelectItem>
                  <SelectItem value="Three times daily">Three times daily</SelectItem>
                  <SelectItem value="Four times daily">Four times daily</SelectItem>
                  <SelectItem value="As needed">As needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="next-dose">Next Dose Time</Label>
              <Input
                id="next-dose"
                value={newMedication.nextDose}
                onChange={(e) => setNewMedication({...newMedication, nextDose: e.target.value})}
                placeholder="e.g., 08:00 AM"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                value={newMedication.instructions}
                onChange={(e) => setNewMedication({...newMedication, instructions: e.target.value})}
                placeholder="Special instructions"
                rows={2}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMedication}>
              Add Medication
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Configure Reminder Dialog */}
      <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Smart Reminder Settings</DialogTitle>
          </DialogHeader>
          {selectedMedication && (
            <div className="space-y-4 py-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <h4 className="font-medium">{selectedMedication.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedMedication.dosage} - {selectedMedication.frequency}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Get notified on your device</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Smart Watch Alerts</p>
                    <p className="text-sm text-muted-foreground">Vibrate on your wrist</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Snooze Options</p>
                    <p className="text-sm text-muted-foreground">Allow 5-15 minute delays</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Reminder Time</Label>
                <Input
                  value={selectedMedication.nextDose}
                  placeholder="Set reminder time"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowReminderDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowReminderDialog(false);
              toast({
                title: "Reminder Configured",
                description: "Smart reminder has been set up successfully.",
              });
            }}>
              Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};