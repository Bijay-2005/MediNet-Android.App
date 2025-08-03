import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Receipt, TestTube, FileText, Download, Eye, Plus, Calendar, DollarSign, User, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const NavigationSections = () => {
  const { toast } = useToast();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const hospitalBills = [
    {
      id: 1,
      hospital: "City Medical Center",
      date: "Jan 15, 2024",
      amount: "$1,250.00",
      status: "Paid",
      services: ["Consultation", "Blood Tests", "X-Ray"]
    },
    {
      id: 2,
      hospital: "Heart Care Clinic",
      date: "Jan 08, 2024",
      amount: "$890.00",
      status: "Pending",
      services: ["ECG", "Consultation", "Medication"]
    }
  ];

  const labResults = [
    {
      id: 1,
      test: "Complete Blood Count",
      date: "Jan 20, 2024",
      doctor: "Dr. Sarah Wilson",
      status: "Normal",
      description: "All values within normal range"
    },
    {
      id: 2,
      test: "Lipid Panel",
      date: "Jan 18, 2024",
      doctor: "Dr. Michael Chen",
      status: "Attention Required",
      description: "Cholesterol levels slightly elevated"
    }
  ];

  const doctorNotes = [
    {
      id: 1,
      doctor: "Dr. Sarah Wilson",
      specialty: "Cardiology",
      date: "Jan 22, 2024",
      diagnosis: "Hypertension - Well controlled",
      notes: "Patient shows improvement in blood pressure management. Continue current medication."
    },
    {
      id: 2,
      doctor: "Dr. Emily Rodriguez",
      specialty: "Endocrinology",
      date: "Jan 15, 2024",
      diagnosis: "Type 2 Diabetes - Stable",
      notes: "Diabetes management is stable. HbA1c levels improved."
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hospital Bills Section */}
      <Card className="bg-background border shadow-sm">
        <div 
          className="p-4 cursor-pointer flex items-center justify-between hover:bg-muted/50 transition-colors"
          onClick={() => toggleSection('bills')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Hospital Bills</h3>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.includes('bills') ? 'rotate-180' : ''}`} />
        </div>
        
        {expandedSections.includes('bills') && (
          <div className="px-4 pb-4 space-y-3">
            {hospitalBills.map((bill) => (
              <Card key={bill.id} className="p-4 bg-muted/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{bill.hospital}</h4>
                    <Badge variant={bill.status === 'Paid' ? 'default' : 'secondary'} className="mt-1">
                      {bill.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {bill.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {bill.amount}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {bill.services.map((service, idx) => (
                      <span key={idx} className="text-xs bg-background px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
            
            <Button variant="outline" className="w-full gap-2 mt-4">
              <Plus className="w-4 h-4" />
              Add Bill
            </Button>
          </div>
        )}
      </Card>

      {/* Lab Test Results Section */}
      <Card className="bg-background border shadow-sm">
        <div 
          className="p-4 cursor-pointer flex items-center justify-between hover:bg-muted/50 transition-colors"
          onClick={() => toggleSection('lab')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TestTube className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Lab Test Results</h3>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.includes('lab') ? 'rotate-180' : ''}`} />
        </div>
        
        {expandedSections.includes('lab') && (
          <div className="px-4 pb-4 space-y-3">
            {labResults.map((result) => (
              <Card key={result.id} className="p-4 bg-muted/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{result.test}</h4>
                    <Badge 
                      variant={result.status === 'Normal' ? 'default' : 'destructive'} 
                      className="mt-1"
                    >
                      {result.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View Report
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {result.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {result.doctor}
                  </div>
                </div>
                
                <p className="text-sm">{result.description}</p>
              </Card>
            ))}
            
            <Button variant="outline" className="w-full gap-2 mt-4">
              <Plus className="w-4 h-4" />
              Add Test Result
            </Button>
          </div>
        )}
      </Card>

      {/* Doctor Visit Notes Section */}
      <Card className="bg-background border shadow-sm">
        <div 
          className="p-4 cursor-pointer flex items-center justify-between hover:bg-muted/50 transition-colors"
          onClick={() => toggleSection('notes')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Doctor Visit Notes</h3>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.includes('notes') ? 'rotate-180' : ''}`} />
        </div>
        
        {expandedSections.includes('notes') && (
          <div className="px-4 pb-4 space-y-3">
            {doctorNotes.map((note) => (
              <Card key={note.id} className="p-4 bg-muted/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{note.doctor}</h4>
                    <span className="text-sm text-primary">{note.specialty}</span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Full Notes
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {note.date}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Diagnosis:</p>
                      <p className="text-sm">{note.diagnosis}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Notes:</p>
                    <p className="text-sm text-muted-foreground">{note.notes}</p>
                  </div>
                </div>
              </Card>
            ))}
            
            <Button variant="outline" className="w-full gap-2 mt-4">
              <Plus className="w-4 h-4" />
              Add Visit Note
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};