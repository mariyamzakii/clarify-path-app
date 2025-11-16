import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

interface BundleItem {
  id: string;
  name: string;
  completed: boolean;
}

interface BundleChecklistProps {
  bundleName: string;
  onFormClick: (formId: string) => void;
  onBack: () => void;
}

const BundleChecklist = ({ bundleName, onFormClick, onBack }: BundleChecklistProps) => {
  const getBundleItems = (bundleType: string): BundleItem[] => {
    switch (bundleType) {
      case "citizenship":
        return [
          { id: "n-400", name: "Form N-400: Application for Naturalization", completed: false },
          { id: "biometrics", name: "Biometrics Appointment Confirmation", completed: false },
          { id: "evidence", name: "Supporting Evidence Checklist", completed: false },
          { id: "photos", name: "Passport Photos (2)", completed: false },
          { id: "payment", name: "Fee Payment Receipt", completed: false },
        ];
      case "country-visa":
        return [
          { id: "ds-160", name: "DS-160: Online Nonimmigrant Visa Application", completed: false },
          { id: "passport-copy", name: "Passport Copy", completed: false },
          { id: "photo", name: "Visa Photo", completed: false },
          { id: "appointment", name: "Embassy Appointment Confirmation", completed: false },
          { id: "financial", name: "Financial Documents", completed: false },
          { id: "travel-itinerary", name: "Travel Itinerary", completed: false },
          { id: "accommodation", name: "Accommodation Proof", completed: false },
          { id: "fee-receipt", name: "Visa Fee Receipt", completed: false },
        ];
      case "student-package":
        return [
          { id: "fafsa", name: "FAFSA Application", completed: true },
          { id: "student-visa", name: "F-1 Student Visa Application", completed: true },
          { id: "i-20", name: "I-20 Form from School", completed: false },
        ];
      default:
        return [];
    }
  };

  const [items, setItems] = useState<BundleItem[]>(getBundleItems(bundleName));

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(item => item.completed).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-soft bg-gradient-card border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {bundleName === "citizenship" && "Citizenship Forms Bundle"}
              {bundleName === "country-visa" && "Country Visa Applications"}
              {bundleName === "student-package" && "Student Package"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {completedCount} of {items.length} forms completed
            </p>
          </div>
          <Button onClick={onBack} variant="outline">
            Back to Selection
          </Button>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-3" />
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <Card
              key={item.id}
              className="p-4 cursor-pointer hover:shadow-medium transition-all"
              onClick={() => onFormClick(item.id)}
            >
              <div className="flex items-center gap-4">
                <div onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}>
                  {item.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${item.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {item.name}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BundleChecklist;
