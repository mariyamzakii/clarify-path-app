import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ChatBot from "./ChatBot";
import FormHelper from "./FormHelper";
import { CheckCircle, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VisaApplicationFormProps {
  onSubmit: () => void;
}

const VisaApplicationForm = ({ onSubmit }: VisaApplicationFormProps) => {
  const { toast } = useToast();
  const [selectedText, setSelectedText] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    purposeOfVisit: "",
    durationOfStay: "",
    employerName: "",
    jobTitle: "",
    employmentStartDate: "",
    employmentEndDate: "",
  });

  const handleTextSelect = () => {
    setTimeout(() => {
      const selection = window.getSelection();
      const selectedContent = selection?.toString().trim();
      
      if (selectedContent && selectedContent.length > 0) {
        setSelectedText(selectedContent);
        setShowChat(true);
      }
    }, 0);
  };

  const handleCheckForm = () => {
    const summary = `Based on your form:\n\n` +
      `• Name: ${formData.fullName || "Not filled"}\n` +
      `• Date of Birth: ${formData.dateOfBirth || "Not filled"}\n` +
      `• Place of Birth: ${formData.placeOfBirth || "Not filled"}\n` +
      `• Nationality: ${formData.nationality || "Not filled"}\n` +
      `• Purpose of Visit: ${formData.purposeOfVisit || "Not filled"}\n` +
      `• Duration of Stay: ${formData.durationOfStay ? formData.durationOfStay + " days" : "Not filled"}\n` +
      `• Current Employer: ${formData.employerName || "Not filled"}\n` +
      `• Job Title: ${formData.jobTitle || "Not filled"}`;
    
    setSelectedText(summary);
    setShowChat(true);
  };

  const handleFieldUpdate = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (highlightedField === field) {
      setHighlightedField(null);
    }
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
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Visa Application Form</h1>
      
      <FormHelper />

      <form onSubmit={handleSubmit}>
        <Card className="p-6 space-y-6" onMouseUp={handleTextSelect}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            
            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'fullName' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">
                Full Legal Name (as shown on passport)
              </Label>
              <Input 
                placeholder="Enter full name" 
                value={formData.fullName}
                onChange={(e) => handleFieldUpdate('fullName', e.target.value)}
              />
              <p className="text-sm text-muted-foreground select-text">
                This must match exactly with your passport. Include all names in the order they appear.
              </p>
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'dateOfBirth' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Date of Birth</Label>
              <Input 
                type="date" 
                value={formData.dateOfBirth}
                onChange={(e) => handleFieldUpdate('dateOfBirth', e.target.value)}
              />
              <p className="text-sm text-muted-foreground select-text">
                Enter your date of birth as shown on your passport or birth certificate.
              </p>
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'placeOfBirth' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Place of Birth</Label>
              <Input 
                placeholder="Enter place of birth" 
                value={formData.placeOfBirth}
                onChange={(e) => handleFieldUpdate('placeOfBirth', e.target.value)}
              />
              <p className="text-sm text-muted-foreground select-text">
                Enter the city and country where you were born.
              </p>
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'nationality' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Nationality/Citizenship</Label>
              <Input 
                placeholder="Enter nationality" 
                value={formData.nationality}
                onChange={(e) => handleFieldUpdate('nationality', e.target.value)}
              />
              <p className="text-sm text-muted-foreground select-text">
                List all countries where you hold citizenship.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Travel Information</h2>
            
            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'purposeOfVisit' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Purpose of Visit</Label>
              <Textarea 
                placeholder="Enter purpose of visit" 
                value={formData.purposeOfVisit}
                onChange={(e) => handleFieldUpdate('purposeOfVisit', e.target.value)}
              />
              <p className="text-sm text-muted-foreground select-text">
                Clearly state why you are traveling. Common purposes include tourism, business meetings, 
                visiting family, or attending conferences.
              </p>
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'durationOfStay' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Intended Duration of Stay</Label>
              <Input 
                type="number" 
                placeholder="Number of days" 
                value={formData.durationOfStay}
                onChange={(e) => handleFieldUpdate('durationOfStay', e.target.value)}
              />
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

          <div className="flex gap-3">
            <Button type="button" onClick={handleCheckForm} variant="outline" className="gap-2 flex-1">
              <CheckCircle className="w-4 h-4" />
              Check Form
            </Button>
            <Button type="submit" size="lg" className="flex-1">
              Submit Application
            </Button>
          </div>
        </Card>
      </form>

      {showChat && (
        <ChatBot 
          selectedText={selectedText} 
          onClose={() => setShowChat(false)}
          onHighlightField={(field) => setHighlightedField(field)}
        />
      )}

      {/* Translation Help Button */}
      <Button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 z-40 gap-2 shadow-elegant hover:shadow-glow bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Translation help?
        <MessageCircle className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default VisaApplicationForm;
