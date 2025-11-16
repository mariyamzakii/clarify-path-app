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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">I-20 Form Request</h1>
        <Button onClick={handleCheckForm} variant="outline" className="gap-2">
          <CheckCircle className="w-4 h-4" />
          Check My Form
        </Button>
      </div>
      
      <FormHelper />

      <form onSubmit={handleSubmit}>
        <Card className="p-6 space-y-6" onMouseUp={handleTextSelect}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Student Information</h2>
            
            <div className={`space-y-2 ${highlightedField === 'fullName' ? 'p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-400' : ''}`}>
              <Label className="cursor-text select-text">Full Name</Label>
              <Input 
                placeholder="Enter full name" 
                value={formData.fullName}
                onChange={(e) => handleFieldUpdate('fullName', e.target.value)}
              />
            </div>

            <div className={`space-y-2 ${highlightedField === 'dateOfBirth' ? 'p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-400' : ''}`}>
              <Label className="cursor-text select-text">Date of Birth</Label>
              <Input 
                type="date" 
                value={formData.dateOfBirth}
                onChange={(e) => handleFieldUpdate('dateOfBirth', e.target.value)}
              />
            </div>

            <div className={`space-y-2 ${highlightedField === 'countryOfBirth' ? 'p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-400' : ''}`}>
              <Label className="cursor-text select-text">Country of Birth</Label>
              <Input 
                placeholder="Enter country" 
                value={formData.countryOfBirth}
                onChange={(e) => handleFieldUpdate('countryOfBirth', e.target.value)}
              />
            </div>

            <div className="space-y-2">
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
            
            <div className="space-y-2">
              <Label className="cursor-text select-text">School Name</Label>
              <Input 
                placeholder="Enter school name" 
                value={formData.schoolName}
                onChange={(e) => handleFieldUpdate('schoolName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="cursor-text select-text">School Address</Label>
              <Input 
                placeholder="Enter school address" 
                value={formData.schoolAddress}
                onChange={(e) => handleFieldUpdate('schoolAddress', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="cursor-text select-text">Admission Letter Date</Label>
              <Input 
                type="date" 
                value={formData.admissionDate}
                onChange={(e) => handleFieldUpdate('admissionDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
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
            
            <div className="space-y-2">
              <Label className="cursor-text select-text">Degree Level</Label>
              <Input 
                placeholder="e.g., Bachelor's, Master's" 
                value={formData.degreeLevel}
                onChange={(e) => handleFieldUpdate('degreeLevel', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="cursor-text select-text">Major/Field of Study</Label>
              <Input 
                placeholder="Enter major" 
                value={formData.major}
                onChange={(e) => handleFieldUpdate('major', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="cursor-text select-text">Expected Program Start Date</Label>
              <Input 
                type="date" 
                value={formData.programStartDate}
                onChange={(e) => handleFieldUpdate('programStartDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="cursor-text select-text">Expected Program End Date</Label>
              <Input 
                type="date" 
                value={formData.programEndDate}
                onChange={(e) => handleFieldUpdate('programEndDate', e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit I-20 Request
          </Button>
        </Card>
      </form>

      {showChat && (
        <ChatBot 
          selectedText={selectedText} 
          onClose={() => setShowChat(false)}
          onHighlightField={(field) => setHighlightedField(field)}
        />
      )}

      {/* Floating Help Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 z-40 group"
      >
        <div className="relative">
          <svg className="absolute -top-12 -right-8 w-32 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <defs>
              <path id="curve" d="M 10,40 Q 60,5 110,40" fill="transparent" />
            </defs>
            <text className="text-xs font-medium fill-primary">
              <textPath href="#curve" startOffset="50%" textAnchor="middle">
                Need help?
              </textPath>
            </text>
          </svg>
          <div className="bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-elegant hover:shadow-glow transition-all">
            <MessageCircle className="w-6 h-6" />
          </div>
        </div>
      </button>
    </div>
  );
};

export default I20Form;
