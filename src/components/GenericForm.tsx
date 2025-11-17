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

interface GenericFormProps {
  formName: string;
  formType: string;
  onSubmit: () => void;
}

const GenericForm = ({ formName, formType, onSubmit }: GenericFormProps) => {
  const { toast } = useToast();
  const [selectedText, setSelectedText] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    additionalInfo: "",
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
      `• Email: ${formData.email || "Not filled"}\n` +
      `• Phone: ${formData.phone || "Not filled"}\n` +
      `• Address: ${formData.address || "Not filled"}`;
    
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
      title: "Form submitted successfully!",
      description: `Your ${formName} has been submitted.`,
    });
    setTimeout(() => {
      onSubmit();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{formName}</h1>
      
      <FormHelper />

      <form onSubmit={handleSubmit}>
        <Card className="p-6 space-y-6" onMouseUp={handleTextSelect}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            
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

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'email' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Email Address</Label>
              <Input 
                type="email"
                placeholder="Enter email address" 
                value={formData.email}
                onChange={(e) => handleFieldUpdate('email', e.target.value)}
              />
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'phone' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Phone Number</Label>
              <Input 
                type="tel"
                placeholder="Enter phone number" 
                value={formData.phone}
                onChange={(e) => handleFieldUpdate('phone', e.target.value)}
              />
            </div>

            <div className={`space-y-2 transition-all duration-300 ${highlightedField === 'address' ? 'p-3 bg-accent/30 rounded-lg border-2 border-primary shadow-lg' : ''}`}>
              <Label className="cursor-text select-text">Address</Label>
              <Textarea 
                placeholder="Enter full address" 
                value={formData.address}
                onChange={(e) => handleFieldUpdate('address', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label className="cursor-text select-text">Additional Information</Label>
              <Textarea 
                placeholder="Any additional information for this form" 
                value={formData.additionalInfo}
                onChange={(e) => handleFieldUpdate('additionalInfo', e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" onClick={handleCheckForm} variant="outline" className="gap-2 flex-1">
              <CheckCircle className="w-4 h-4" />
              Check Form
            </Button>
            <Button type="submit" size="lg" className="flex-1">
              Submit {formName}
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

export default GenericForm;
