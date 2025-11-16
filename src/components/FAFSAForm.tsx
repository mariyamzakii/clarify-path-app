import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormHelper from "./FormHelper";
import { useToast } from "@/hooks/use-toast";

interface FAFSAFormProps {
  onSubmit: () => void;
}

const FAFSAForm = ({ onSubmit }: FAFSAFormProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "FAFSA Application Submitted!",
      description: "Your FAFSA has been sent for processing.",
    });
    setTimeout(() => {
      onSubmit();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">FAFSA Application</h1>
      
      <FormHelper />

      <form onSubmit={handleSubmit}>
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Student Information</h2>
            
            <div className="space-y-2">
              <Label>Social Security Number</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>Driver's License Number (if applicable)</Label>
              <Input />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Parent Information</h2>
            
            <div className="space-y-2">
              <Label>Parent's Name</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Parent's Social Security Number</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Parent's Date of Birth</Label>
              <Input type="date" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Financial Information</h2>
            
            <div className="space-y-2">
              <Label>Adjusted Gross Income</Label>
              <Input type="number" />
            </div>

            <div className="space-y-2">
              <Label>Federal Taxes Paid</Label>
              <Input type="number" />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit FAFSA Application
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default FAFSAForm;
