import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChatBot from "./ChatBot";
import FormHelper from "./FormHelper";
import { CheckCircle, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface I20FormProps {
  onSubmit: () => void;
}

const I20Form = ({ onSubmit }: I20FormProps) => {
  const { toast } = useToast();
  const [selectedText, setSelectedText] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    countryOfBirth: "",
    currentAddress: "",
    schoolName: "",
    schoolAddress: "",
    admissionDate: "",
    studentId: "",
    degreeLevel: "",
    major: "",
    programStartDate: "",
    programEndDate: "",
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
      `• Country of Birth: ${formData.countryOfBirth || "Not filled"}\n` +
      `• School: ${formData.schoolName || "Not filled"}\n` +
      `• Major: ${formData.major || "Not filled"}\n` +
      `• Degree Level: ${formData.degreeLevel || "Not filled"}\n` +
      `• Program Start: ${formData.programStartDate || "Not filled"}\n` +
      `• Program End: ${formData.programEndDate || "Not filled"}`;
    
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
      
      <FormHelper />

      <form onSubmit={handleSubmit}>
        <Card className="p-6 space-y-6" onMouseUp={handleTextSelect}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Student Information</h2>
            
            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'fullName' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Full Name</Label>
              <Input 
                placeholder="Enter full name" 
                value={formData.fullName}
                onChange={(e) => handleFieldUpdate('fullName', e.target.value)}
              />
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'dateOfBirth' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Date of Birth</Label>
              <Input 
                type="date" 
                value={formData.dateOfBirth}
                onChange={(e) => handleFieldUpdate('dateOfBirth', e.target.value)}
              />
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'countryOfBirth' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Country of Birth</Label>
              <Input 
                placeholder="Enter country" 
                value={formData.countryOfBirth}
                onChange={(e) => handleFieldUpdate('countryOfBirth', e.target.value)}
              />
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'currentAddress' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Current Address</Label>
              <Input 
                placeholder="Enter address" 
                value={formData.currentAddress}
                onChange={(e) => handleFieldUpdate('currentAddress', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">School Information</h2>
            
            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'schoolName' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">School Name</Label>
              <Input 
                placeholder="Enter school name" 
                value={formData.schoolName}
                onChange={(e) => handleFieldUpdate('schoolName', e.target.value)}
              />
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'schoolAddress' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">School Address</Label>
              <Input 
                placeholder="Enter school address" 
                value={formData.schoolAddress}
                onChange={(e) => handleFieldUpdate('schoolAddress', e.target.value)}
              />
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'admissionDate' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Admission Letter Date</Label>
              <Input 
                type="date" 
                value={formData.admissionDate}
                onChange={(e) => handleFieldUpdate('admissionDate', e.target.value)}
              />
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'studentId' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Student ID Number</Label>
              <Input 
                placeholder="Enter student ID" 
                value={formData.studentId}
                onChange={(e) => handleFieldUpdate('studentId', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Program Details</h2>
            
            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'degreeLevel' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Degree Level</Label>
              <Input 
                placeholder="e.g., Bachelor's, Master's" 
                value={formData.degreeLevel}
                onChange={(e) => handleFieldUpdate('degreeLevel', e.target.value)}
              />
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'major' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Major/Field of Study</Label>
              <Input 
                placeholder="Enter major" 
                value={formData.major}
                onChange={(e) => handleFieldUpdate('major', e.target.value)}
              />
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'programStartDate' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Expected Program Start Date</Label>
              <Input 
                type="date" 
                value={formData.programStartDate}
                onChange={(e) => handleFieldUpdate('programStartDate', e.target.value)}
              />
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'programEndDate' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Expected Program End Date</Label>
              <Input 
                type="date" 
                value={formData.programEndDate}
                onChange={(e) => handleFieldUpdate('programEndDate', e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" onClick={handleCheckForm} variant="outline" className="gap-2 flex-1">
              <CheckCircle className="w-4 h-4" />
              Check Form
            </Button>
            <Button type="submit" size="lg" className="flex-1">
              Submit I-20 Request
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

export default I20Form;
