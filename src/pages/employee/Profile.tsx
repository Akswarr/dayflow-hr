import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Save, X, User, Briefcase, FileText, Shield } from "lucide-react";

export default function EmployeeProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"resume" | "private" | "salary" | "security">("resume");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 234 567 8900",
    address: "123 Main Street, San Francisco, CA 94102",
    dateOfBirth: "1990-05-15",
    nationality: "United States",
    maritalStatus: "Single",
    personalEmail: "personal@email.com",
    gender: "Male",
    dateOfJoining: "2023-01-15",
    company: "Dayflow Inc.",
    department: user?.department || "Engineering",
    position: user?.position || "Software Developer",
    manager: "Jane Smith",
    location: "San Francisco Office",
  });

  const tabs = [
    { id: "resume", label: "Resume", icon: FileText },
    { id: "private", label: "Private Info", icon: User },
    { id: "salary", label: "Salary Info", icon: Briefcase },
    { id: "security", label: "Security", icon: Shield },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-2xl font-serif text-foreground mb-6">My Profile</h1>

        {/* Profile Header */}
        <div className="dayflow-card-elevated p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-medium text-primary">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Pencil size={12} />
              </button>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-medium text-foreground">{profileData.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.employeeId}</p>
              <p className="text-sm text-muted-foreground">{profileData.email}</p>
              <p className="text-sm text-muted-foreground">{profileData.phone}</p>
            </div>

            <div className="text-right hidden sm:block">
              <p className="text-sm text-foreground">{profileData.company}</p>
              <p className="text-sm text-muted-foreground">{profileData.department}</p>
              <p className="text-sm text-muted-foreground">{profileData.manager}</p>
              <p className="text-sm text-muted-foreground">{profileData.location}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="dayflow-card p-6">
          {activeTab === "resume" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">About</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <X size={16} /> : <Pencil size={16} />}
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">About me</Label>
                  <p className="text-sm text-foreground mt-1">
                    Passionate software developer with 5+ years of experience building scalable web applications. 
                    Love working with React and TypeScript.
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">What I love about my job</Label>
                  <p className="text-sm text-foreground mt-1">
                    The collaborative environment and the opportunity to solve complex problems with a talented team.
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"].map((skill) => (
                      <span key={skill} className="px-2 py-1 text-xs rounded-full bg-accent text-accent-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">Certifications</Label>
                  <p className="text-sm text-foreground mt-1">AWS Certified Developer, Google Cloud Professional</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "private" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
                {!isEditing ? (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    <Pencil size={16} className="mr-2" /> Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save size={16} className="mr-2" /> Save
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Date of Birth" value={profileData.dateOfBirth} isEditing={isEditing} />
                <FormField label="Nationality" value={profileData.nationality} isEditing={isEditing} />
                <FormField label="Gender" value={profileData.gender} isEditing={isEditing} />
                <FormField label="Marital Status" value={profileData.maritalStatus} isEditing={isEditing} />
                <FormField label="Personal Email" value={profileData.personalEmail} isEditing={isEditing} />
                <FormField label="Residing Address" value={profileData.address} isEditing={isEditing} />
                <FormField label="Date of Joining" value={profileData.dateOfJoining} isEditing={isEditing} />
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-4">Bank Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Bank Name" value="Chase Bank" isEditing={isEditing} />
                  <FormField label="Account Number" value="****4532" isEditing={isEditing} />
                  <FormField label="IFSC Code" value="CHASUS33" isEditing={isEditing} />
                  <FormField label="PAN No" value="****1234" isEditing={isEditing} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "salary" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-medium text-foreground">Salary Information</h3>
              <p className="text-sm text-muted-foreground">
                View only. Contact HR for any changes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Monthly Wage</p>
                    <p className="text-2xl font-medium text-foreground">$5,000</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Yearly Wage</p>
                    <p className="text-2xl font-medium text-foreground">$60,000</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <SalaryRow label="Basic Salary" value="$2,500" percent="50%" />
                  <SalaryRow label="House Rent Allowance" value="$1,250" percent="25%" />
                  <SalaryRow label="Standard Allowance" value="$625" percent="12.5%" />
                  <SalaryRow label="Performance Bonus" value="$625" percent="12.5%" />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-4">Deductions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SalaryRow label="Employee PF" value="$300" percent="12%" />
                  <SalaryRow label="Professional Tax" value="$200" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-medium text-foreground">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Change Password</p>
                      <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function FormField({ label, value, isEditing }: { label: string; value: string; isEditing: boolean }) {
  return (
    <div>
      <Label className="text-muted-foreground text-xs uppercase tracking-wide">{label}</Label>
      {isEditing ? (
        <Input defaultValue={value} className="mt-1" />
      ) : (
        <p className="text-sm text-foreground mt-1">{value}</p>
      )}
    </div>
  );
}

function SalaryRow({ label, value, percent }: { label: string; value: string; percent?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="text-right">
        <span className="text-sm font-medium text-foreground">{value}</span>
        {percent && <span className="text-xs text-muted-foreground ml-2">{percent}</span>}
      </div>
    </div>
  );
}
