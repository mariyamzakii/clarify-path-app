import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface I20FormProps {
  onSubmit: () => void;
}

const I20Form = ({ onSubmit }: I20FormProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "I-20 Form Submitted!",
      description: "Your I-20 request has been sent to your school.",
    });
    setTimeout(() => {
      onSubmit();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">I-20 Form Request</h1>

      <form onSubmit={handleSubmit}>
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Student Information</h2>
            
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>Country of Birth</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Current Address</Label>
              <Input />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">School Information</h2>
            
            <div className="space-y-2">
              <Label>School Name</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>School Address</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Admission Letter Date</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>Student ID Number</Label>
              <Input />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Program Details</h2>
            
            <div className="space-y-2">
              <Label>Degree Level</Label>
              <Input placeholder="e.g., Bachelor's, Master's" />
            </div>

            <div className="space-y-2">
              <Label>Major/Field of Study</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Expected Program Start Date</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>Expected Program End Date</Label>
              <Input type="date" />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit I-20 Request
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default I20Form;
