import { ChevronDown, Receipt, TestTube, FileText, Download, Eye, Plus, Calendar, DollarSign, User, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogoutButton } from '../auth';
import { useState } from "react";

export const NavigationSections = () => {
  const { toast } = useToast();

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-3">
      {/* Medical Records Section */}
      <Card className="bg-background border shadow-sm">
        <div className="p-3">
          <Button
            variant="ghost"
            className="w-full justify-between h-12 text-base font-medium"
            onClick={() => toggleSection('medical')}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              Medical Records
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'medical' ? 'rotate-180' : ''}`} />
          </Button>
          {expandedSection === 'medical' && (
            <div className="mt-3 space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Eye className="w-4 h-4" />
                View Records
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Download className="w-4 h-4" />
                Download Records
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Plus className="w-4 h-4" />
                Add New Record
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Lab Results Section */}
      <Card className="bg-background border shadow-sm">
        <div className="p-3">
          <Button
            variant="ghost"
            className="w-full justify-between h-12 text-base font-medium"
            onClick={() => toggleSection('lab')}
          >
            <div className="flex items-center gap-3">
              <TestTube className="w-5 h-5" />
              Lab Results
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'lab' ? 'rotate-180' : ''}`} />
          </Button>
          {expandedSection === 'lab' && (
            <div className="mt-3 space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Eye className="w-4 h-4" />
                View Results
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Download className="w-4 h-4" />
                Download Results
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Calendar className="w-4 h-4" />
                Schedule Test
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Billing Section */}
      <Card className="bg-background border shadow-sm">
        <div className="p-3">
          <Button
            variant="ghost"
            className="w-full justify-between h-12 text-base font-medium"
            onClick={() => toggleSection('billing')}
          >
            <div className="flex items-center gap-3">
              <Receipt className="w-5 h-5" />
              Billing & Payments
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'billing' ? 'rotate-180' : ''}`} />
          </Button>
          {expandedSection === 'billing' && (
            <div className="mt-3 space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Receipt className="w-4 h-4" />
                View Bills
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <DollarSign className="w-4 h-4" />
                Make Payment
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Download className="w-4 h-4" />
                Download Invoice
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Appointments Section */}
      <Card className="bg-background border shadow-sm">
        <div className="p-3">
          <Button
            variant="ghost"
            className="w-full justify-between h-12 text-base font-medium"
            onClick={() => toggleSection('appointments')}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              Appointments
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'appointments' ? 'rotate-180' : ''}`} />
          </Button>
          {expandedSection === 'appointments' && (
            <div className="mt-3 space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Calendar className="w-4 h-4" />
                View Appointments
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Plus className="w-4 h-4" />
                Schedule New
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Stethoscope className="w-4 h-4" />
                Find Doctor
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Account Settings Section */}
      <Card className="bg-background border shadow-sm">
        <div className="p-3">
          <Button
            variant="ghost"
            className="w-full justify-between h-12 text-base font-medium"
            onClick={() => toggleSection('account')}
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5" />
              Account Settings
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'account' ? 'rotate-180' : ''}`} />
          </Button>
          {expandedSection === 'account' && (
            <div className="mt-3 space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <User className="w-4 h-4" />
                Edit Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Eye className="w-4 h-4" />
                Privacy Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Logout Section */}
      <Card className="bg-background border shadow-sm">
        <div className="p-3">
          <LogoutButton
            variant="destructive"
            className="w-full gap-2 h-12 text-base font-medium"
            showIcon={true}
          >
            Sign Out
          </LogoutButton>
        </div>
      </Card>
    </div>
  );
};