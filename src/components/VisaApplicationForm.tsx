import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ChatBot from "./ChatBot";
import FormHelper from "./FormHelper";
import LanguageSelector from "./LanguageSelector";
import { useToast } from "@/hooks/use-toast";

interface VisaApplicationFormProps {
  onSubmit: () => void;
}

const VisaApplicationForm = ({ onSubmit }: VisaApplicationFormProps) => {
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
      title: "Form filled successfully!",
      description: "Your visa application has been sent to Travel.state.gov",
    });
    setTimeout(() => {
      onSubmit();
    }, 1500);
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1 max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Visa Application Form</h1>
        </div>
        
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
                <Label className="cursor-text select-text">
                  Full Legal Name (as shown on passport)
                </Label>
                <Input placeholder="Enter full name" />
                <p className="text-sm text-muted-foreground select-text">
                  This must match exactly with your passport. Include all names in the order they appear.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Date of Birth</Label>
                <Input type="date" />
                <p className="text-sm text-muted-foreground select-text">
                  Enter your date of birth as shown on your passport or birth certificate.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Place of Birth</Label>
                <Input placeholder="Enter place of birth" />
                <p className="text-sm text-muted-foreground select-text">
                  Enter the city and country where you were born.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Nationality/Citizenship</Label>
                <Input placeholder="Enter nationality" />
                <p className="text-sm text-muted-foreground select-text">
                  List all countries where you hold citizenship.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Travel Information</h2>
              
              <div className="space-y-2">
                <Label className="cursor-text select-text">Purpose of Visit</Label>
                <Textarea placeholder="Enter purpose of visit" />
                <p className="text-sm text-muted-foreground select-text">
                  Clearly state why you are traveling. Common purposes include tourism, business meetings, 
                  visiting family, or attending conferences.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Intended Duration of Stay</Label>
                <Input type="number" placeholder="Number of days" />
                <p className="text-sm text-muted-foreground select-text">
                  Specify how many days you plan to stay in the destination country.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Employment History</h2>
              
              <div className="space-y-2">
                <Label className="cursor-text select-text">Current Employer Name</Label>
                <Input placeholder="Enter employer name" />
                <p className="text-sm text-muted-foreground select-text">
                  Enter the full legal name of your current employer or "Self-employed" if applicable.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Job Title/Position</Label>
                <Input placeholder="Enter job title" />
                <p className="text-sm text-muted-foreground select-text">
                  Your official job title at your current place of employment.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="cursor-text select-text">Employment Duration</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label className="text-sm">End Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground select-text">
                  Provide the dates of your employment. If currently employed, leave end date blank or write "Present".
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Submit Application
            </Button>
          </Card>
        </form>
      </div>
      
      <ChatBot selectedText={selectedText} />
    </div>
  );
};

export default VisaApplicationForm;
