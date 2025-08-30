import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Edit } from "lucide-react";

interface Allergy {
  id: string;
  name: string;
  severity: 'SEVERE' | 'MODERATE' | 'MILD';
  reaction: string;
}

export const CriticalAllergies = () => {
  const [allergies, setAllergies] = useState<Allergy[]>([
    { id: '1', name: 'Penicillin', severity: 'SEVERE', reaction: 'Anaphylaxis' },
    { id: '2', name: 'Shellfish', severity: 'MODERATE', reaction: 'Hives, swelling' },
    { id: '3', name: 'Pollen', severity: 'MILD', reaction: 'Runny nose, sneezing' }
  ]);
  
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingAllergy, setEditingAllergy] = useState<Allergy | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'SEVERE': return 'bg-destructive text-destructive-foreground';
      case 'MODERATE': return 'bg-warning text-warning-foreground';
      case 'MILD': return 'bg-info text-info-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleEditAllergy = (allergy: Allergy) => {
    setEditingAllergy({ ...allergy });
    setShowEditDialog(true);
  };

  const handleSaveAllergy = () => {
    if (editingAllergy) {
      if (editingAllergy.id) {
        setAllergies(allergies.map(a => a.id === editingAllergy.id ? editingAllergy : a));
      } else {
        setAllergies([...allergies, { ...editingAllergy, id: Date.now().toString() }]);
      }
      setShowEditDialog(false);
      setEditingAllergy(null);
    }
  };

  const handleAddNewAllergy = () => {
    setEditingAllergy({ id: '', name: '', severity: 'MODERATE', reaction: '' });
    setShowEditDialog(true);
  };

  return (
    <>
      <Card className="p-3 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <h3 className="text-base font-semibold text-destructive">Critical Allergies</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowEditDialog(true)}
            className="gap-1 text-xs"
          >
            <Edit className="w-3 h-3" />
            Edit Allergies
          </Button>
        </div>
        
        <div className="space-y-2">
          {allergies.map((allergy) => (
            <div 
              key={allergy.id} 
              className="p-2 border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => handleEditAllergy(allergy)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{allergy.name}</span>
                <Badge className={`text-xs ${getSeverityColor(allergy.severity)}`}>
                  {allergy.severity}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Reaction:</span> {allergy.reaction}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-3 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-3 h-3 text-destructive mt-0.5 flex-shrink-0" />
            <div className="text-xs">
              <p className="font-medium text-destructive">Emergency Note:</p>
              <p className="text-destructive/80">Always inform healthcare providers about these allergies before any treatment.</p>
            </div>
          </div>
        </div>

        <Button 
          variant="medical" 
          size="sm" 
          onClick={handleAddNewAllergy}
          className="mt-3 w-full text-xs"
        >
          Add New Allergy
        </Button>
      </Card>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-base">
              {editingAllergy?.id ? 'Edit Allergy' : 'Add New Allergy'}
            </DialogTitle>
          </DialogHeader>
          {editingAllergy && (
            <div className="space-y-3 py-4">
              <div className="space-y-2">
                <Label htmlFor="allergy-name" className="text-xs">Allergy Name</Label>
                <Input
                  id="allergy-name"
                  value={editingAllergy.name}
                  onChange={(e) => setEditingAllergy({...editingAllergy, name: e.target.value})}
                  placeholder="Enter allergy name"
                  className="text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="severity" className="text-xs">Severity</Label>
                <Select value={editingAllergy.severity} onValueChange={(value: any) => setEditingAllergy({...editingAllergy, severity: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SEVERE">SEVERE</SelectItem>
                    <SelectItem value="MODERATE">MODERATE</SelectItem>
                    <SelectItem value="MILD">MILD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reaction" className="text-xs">Reaction</Label>
                <Textarea
                  id="reaction"
                  value={editingAllergy.reaction}
                  onChange={(e) => setEditingAllergy({...editingAllergy, reaction: e.target.value})}
                  placeholder="Describe the allergic reaction"
                  rows={2}
                  className="text-xs"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)} size="sm">
              Cancel
            </Button>
            <Button onClick={handleSaveAllergy} size="sm">
              Save Allergy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};