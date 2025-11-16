import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChatBot from "./ChatBot";
import FormHelper from "./FormHelper";
import LanguageSelector from "./LanguageSelector";
import { useToast } from "@/hooks/use-toast";

interface I20FormProps {
  onSubmit: () => void;
}

const I20Form = ({ onSubmit }: I20FormProps) => {
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
      title: "I-20 Form Submitted!",
      description: "Your I-20 request has been sent to your school.",
    });
    setTimeout(() => {
      onSubmit();
    }, 1500);
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1 max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">I-20 Form Request</h1>
        
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
              <h2 className="text-xl font-semibold">Student Information</h2>
              
              <div className="space-y-2">
                <Label className="cursor-text select-text">Full Name</Label>
                <Input placeholder="Enter full name" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Date of Birth</Label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Country of Birth</Label>
                <Input placeholder="Enter country" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Current Address</Label>
                <Input placeholder="Enter address" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">School Information</h2>
              
              <div className="space-y-2">
                <Label className="cursor-text select-text">School Name</Label>
                <Input placeholder="Enter school name" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">School Address</Label>
                <Input placeholder="Enter school address" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Admission Letter Date</Label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Student ID Number</Label>
                <Input placeholder="Enter student ID" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Program Details</h2>
              
              <div className="space-y-2">
                <Label className="cursor-text select-text">Degree Level</Label>
                <Input placeholder="e.g., Bachelor's, Master's" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Major/Field of Study</Label>
                <Input placeholder="Enter major" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Expected Program Start Date</Label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Expected Program End Date</Label>
                <Input type="date" />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Submit I-20 Request
            </Button>
          </Card>
        </form>
      </div>
      
      <ChatBot selectedText={selectedText} />
    </div>
  );
};

export default I20Form;
