import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Activity } from "lucide-react";

interface HealthCondition {
  id: string;
  name: string;
  severity: 'Severe' | 'Moderate' | 'Controlled';
  tag: string;
}

export const HealthConditions = () => {
  const [conditions, setConditions] = useState<HealthCondition[]>([
    { id: '1', name: 'Type 2 Diabetes', severity: 'Severe', tag: '#Type 2 Diabetes' },
    { id: '2', name: 'Hypertension', severity: 'Moderate', tag: '#Hypertension' },
    { id: '3', name: 'Asthma', severity: 'Controlled', tag: '#Asthma' }
  ]);
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCondition, setNewCondition] = useState({ name: '', severity: 'Moderate' as const });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Severe': return 'bg-destructive text-destructive-foreground';
      case 'Moderate': return 'bg-warning text-warning-foreground';
      case 'Controlled': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleAddCondition = () => {
    if (newCondition.name.trim()) {
      const condition: HealthCondition = {
        id: Date.now().toString(),
        name: newCondition.name,
        severity: newCondition.severity,
        tag: `#${newCondition.name}`
      };
      setConditions([...conditions, condition]);
      setNewCondition({ name: '', severity: 'Moderate' });
      setShowAddDialog(false);
    }
  };

  return (
    <>
      <Card className="p-3 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <h3 className="text-base font-semibold">Health Conditions</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAddDialog(true)}
            className="gap-1 text-xs"
          >
            <Plus className="w-3 h-3" />
            Add Condition
          </Button>
        </div>
        
        <div className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {condition.tag}
                </Badge>
                <span className="text-xs font-medium">{condition.name}</span>
              </div>
              <Badge className={`text-xs ${getSeverityColor(condition.severity)}`}>
                {condition.severity}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="mt-3 flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-destructive"></div>
            <span>Severe</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-warning"></div>
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span>Controlled</span>
          </div>
        </div>
      </Card>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-base">Add Health Condition</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="space-y-2">
              <Label htmlFor="condition-name" className="text-xs">Condition Name</Label>
              <Input
                id="condition-name"
                value={newCondition.name}
                onChange={(e) => setNewCondition({...newCondition, name: e.target.value})}
                placeholder="Enter health condition"
                className="text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity" className="text-xs">Severity</Label>
              <Select value={newCondition.severity} onValueChange={(value: any) => setNewCondition({...newCondition, severity: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Severe">Severe</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Controlled">Controlled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddDialog(false)} size="sm">
              Cancel
            </Button>
            <Button onClick={handleAddCondition} size="sm">
              Add Condition
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};