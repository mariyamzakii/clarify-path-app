import { useState } from "react";
import Hero from "@/components/Hero";
import DocumentUploader from "@/components/DocumentUploader";
import LanguageSelector from "@/components/LanguageSelector";
import CameraCapture from "@/components/CameraCapture";
import ProgressTracker from "@/components/ProgressTracker";
import VisaApplicationForm from "@/components/VisaApplicationForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type View = "home" | "upload" | "camera" | "progress" | "visa-form";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [visaCompleted, setVisaCompleted] = useState(false);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
  };

  const handleCapture = (file: File) => {
    setUploadedFile(file);
    setCurrentView("upload");
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === "home" && (
        <Hero
          onUploadClick={() => setCurrentView("upload")}
          onCameraClick={() => setCurrentView("camera")}
          onTrackClick={() => setCurrentView("progress")}
        />
      )}

      {currentView !== "home" && (
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentView("home")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          {currentView === "upload" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              <DocumentUploader onFileSelect={handleFileSelect} />
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
              {uploadedFile && (
                <Button
                  size="lg"
                  onClick={() => setCurrentView("progress")}
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  Start Translation
                </Button>
              )}
            </div>
          )}

          {currentView === "camera" && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <CameraCapture
                onCapture={handleCapture}
                onClose={() => setCurrentView("home")}
              />
            </div>
          )}

          {currentView === "progress" && (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <ProgressTracker 
                onVisaFormClick={() => setCurrentView("visa-form")} 
                visaCompleted={visaCompleted}
              />
            </div>
          )}

          {currentView === "visa-form" && (
            <div className="animate-fade-in">
              <VisaApplicationForm 
                onSubmit={() => {
                  setVisaCompleted(true);
                  setCurrentView("progress");
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
