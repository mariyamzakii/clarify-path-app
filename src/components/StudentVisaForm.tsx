import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChatBot from "./ChatBot";
import FormHelper from "./FormHelper";
import LanguageSelector from "./LanguageSelector";
import { useToast } from "@/hooks/use-toast";

interface StudentVisaFormProps {
  onSubmit: () => void;
}

const StudentVisaForm = ({ onSubmit }: StudentVisaFormProps) => {
  const { toast } = useToast();
  const [selectedText, setSelectedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleTextSelect = () => {
    setTimeout(() => {
      const selection = window.getSelection();
      const selectedContent = selection?.toString().trim();
      
      if (selectedContent && selectedContent.length > 0) {
        setSelectedText(selectedContent);
      }
    }, 0);
  };

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
    <div className="flex gap-6">
      <div className="flex-1 max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">F-1 Student Visa Application</h1>
        
        <Card className="p-6 bg-gradient-card border-border">
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </Card>
        
        <FormHelper />

        <form onSubmit={handleSubmit}>
          <Card className="p-6 space-y-6" onMouseUp={handleTextSelect}>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              
              <div className="space-y-2">
                <Label className="cursor-text select-text">Full Name</Label>
                <Input placeholder="Enter full name" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Date of Birth</Label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Country of Citizenship</Label>
                <Input placeholder="Enter country" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Passport Number</Label>
                <Input placeholder="Enter passport number" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Education Information</h2>
              
              <div className="space-y-2">
                <Label className="cursor-text select-text">School Name</Label>
                <Input placeholder="Enter school name" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Program of Study</Label>
                <Input placeholder="Enter program" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Expected Start Date</Label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">SEVIS ID</Label>
                <Input placeholder="Enter SEVIS ID" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Financial Support</h2>
              
              <div className="space-y-2">
                <Label className="cursor-text select-text">Source of Funding</Label>
                <Input placeholder="Enter funding source" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Total Funds Available (USD)</Label>
                <Input type="number" placeholder="Enter amount" />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Submit F-1 Visa Application
            </Button>
          </Card>
        </form>
      </div>
      
      <ChatBot selectedText={selectedText} />
    </div>
  );
};

export default StudentVisaForm;
