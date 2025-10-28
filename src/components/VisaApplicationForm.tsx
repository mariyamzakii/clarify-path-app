import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ChatBot from "./ChatBot";

const VisaApplicationForm = () => {
  const [selectedText, setSelectedText] = useState("");
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatBotPosition, setChatBotPosition] = useState({ x: 0, y: 0 });

  const handleTextSelect = (text: string, event: React.MouseEvent) => {
    const selection = window.getSelection();
    const selectedContent = selection?.toString().trim();
    
    if (selectedContent) {
      setSelectedText(selectedContent);
      setChatBotPosition({ x: event.clientX, y: event.clientY });
      setShowChatBot(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Visa Application Form</h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Back to Progress
        </Button>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          
          <div className="space-y-2" onMouseUp={(e) => handleTextSelect("Full Legal Name", e)}>
            <Label className="cursor-text select-text">
              Full Legal Name (as shown on passport)
            </Label>
            <Input placeholder="Enter your full legal name" />
            <p className="text-sm text-muted-foreground select-text">
              This must match exactly with your passport. Include all names in the order they appear.
            </p>
          </div>

          <div className="space-y-2" onMouseUp={(e) => handleTextSelect("Date of Birth", e)}>
            <Label className="cursor-text select-text">Date of Birth</Label>
            <Input type="date" />
            <p className="text-sm text-muted-foreground select-text">
              Enter your date of birth as shown on your passport or birth certificate.
            </p>
          </div>

          <div className="space-y-2" onMouseUp={(e) => handleTextSelect("Place of Birth", e)}>
            <Label className="cursor-text select-text">Place of Birth</Label>
            <Input placeholder="City, Country" />
            <p className="text-sm text-muted-foreground select-text">
              Enter the city and country where you were born.
            </p>
          </div>

          <div className="space-y-2" onMouseUp={(e) => handleTextSelect("Nationality", e)}>
            <Label className="cursor-text select-text">Nationality/Citizenship</Label>
            <Input placeholder="Your nationality" />
            <p className="text-sm text-muted-foreground select-text">
              List all countries where you hold citizenship.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Travel Information</h2>
          
          <div className="space-y-2" onMouseUp={(e) => handleTextSelect("Purpose of Visit", e)}>
            <Label className="cursor-text select-text">Purpose of Visit</Label>
            <Textarea placeholder="Describe the purpose of your visit" />
            <p className="text-sm text-muted-foreground select-text">
              Clearly state why you are traveling. Common purposes include tourism, business meetings, 
              visiting family, or attending conferences.
            </p>
          </div>

          <div className="space-y-2" onMouseUp={(e) => handleTextSelect("Intended Duration", e)}>
            <Label className="cursor-text select-text">Intended Duration of Stay</Label>
            <Input placeholder="Number of days" type="number" />
            <p className="text-sm text-muted-foreground select-text">
              Specify how many days you plan to stay in the destination country.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Employment History</h2>
          
          <div className="space-y-2" onMouseUp={(e) => handleTextSelect("Current Employer", e)}>
            <Label className="cursor-text select-text">Current Employer Name</Label>
            <Input placeholder="Company/Organization name" />
            <p className="text-sm text-muted-foreground select-text">
              Enter the full legal name of your current employer or "Self-employed" if applicable.
            </p>
          </div>

          <div className="space-y-2" onMouseUp={(e) => handleTextSelect("Job Title", e)}>
            <Label className="cursor-text select-text">Job Title/Position</Label>
            <Input placeholder="Your current position" />
            <p className="text-sm text-muted-foreground select-text">
              Your official job title at your current place of employment.
            </p>
          </div>

          <div className="space-y-2" onMouseUp={(e) => handleTextSelect("Employment Duration", e)}>
            <Label className="cursor-text select-text">Employment Duration</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Start Date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label className="text-sm">End Date</Label>
                <Input type="date" placeholder="Present if current" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground select-text">
              Provide the dates of your employment. If currently employed, leave end date blank or write "Present".
            </p>
          </div>
        </div>

        <Button className="w-full" size="lg">
          Save Progress
        </Button>
      </Card>

      {showChatBot && (
        <ChatBot
          selectedText={selectedText}
          onClose={() => setShowChatBot(false)}
          position={chatBotPosition}
        />
      )}
    </div>
  );
};

export default VisaApplicationForm;
