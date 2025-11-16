import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormHelper from "./FormHelper";
import { useToast } from "@/hooks/use-toast";

interface StudentVisaFormProps {
  onSubmit: () => void;
}

const StudentVisaForm = ({ onSubmit }: StudentVisaFormProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "F-1 Student Visa Submitted!",
      description: "Your student visa application has been sent to USCIS.",
    });
    setTimeout(() => {
      onSubmit();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">F-1 Student Visa Application</h1>
      
      <FormHelper />

      <form onSubmit={handleSubmit}>
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>Country of Citizenship</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Passport Number</Label>
              <Input />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Education Information</h2>
            
            <div className="space-y-2">
              <Label>School Name</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Program of Study</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Expected Start Date</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>SEVIS ID</Label>
              <Input />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Financial Support</h2>
            
            <div className="space-y-2">
              <Label>Source of Funding</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Total Funds Available (USD)</Label>
              <Input type="number" />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit F-1 Visa Application
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default StudentVisaForm;
