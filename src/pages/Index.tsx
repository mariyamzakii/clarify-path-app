import { useState } from "react";
import Hero from "@/components/Hero";
import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";
import MainMenu from "@/components/MainMenu";
import DocumentSelector from "@/components/DocumentSelector";
import DocumentUploader from "@/components/DocumentUploader";
import LanguageSelector from "@/components/LanguageSelector";
import CameraCapture from "@/components/CameraCapture";
import ProgressTracker from "@/components/ProgressTracker";
import VisaApplicationForm from "@/components/VisaApplicationForm";
import BundleChecklist from "@/components/BundleChecklist";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type View = "home" | "login" | "main-menu" | "browse-forms" | "upload" | "camera" | "progress" | "visa-form" | "bundle" | "ai-chat";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [visaCompleted, setVisaCompleted] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<string>("");
  const [inProgressDocs, setInProgressDocs] = useState<Array<{ id: string; name: string; status: string }>>([
    { id: "visa", name: "Visa Application", status: "In Progress" }
  ]);

  const handleLogin = (email: string) => {
    const name = email.split("@")[0];
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    setUserName(capitalizedName);
    setIsLoggedIn(true);
    setCurrentView("main-menu");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setCurrentView("home");
    setUploadedFile(null);
    setVisaCompleted(false);
    setSelectedBundle("");
    setInProgressDocs([{ id: "visa", name: "Visa Application", status: "In Progress" }]);
  };

  const handleTitleDoubleClick = () => {
    handleLogout();
  };

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
  };

  const handleCapture = (file: File) => {
    setUploadedFile(file);
    setCurrentView("upload");
  };

  const handleDocumentSelect = (docType: string) => {
    if (docType === "visa") {
      setCurrentView("visa-form");
    } else {
      setCurrentView("progress");
    }
  };

  const handleBundleSelect = (bundleType: string) => {
    setSelectedBundle(bundleType);
    
    // Add to in-progress if not already there
    const bundleId = `${bundleType}-bundle`;
    if (!inProgressDocs.find(doc => doc.id === bundleId)) {
      const bundleNames: Record<string, string> = {
        "citizenship": "Citizenship Forms Bundle",
        "country-visa": "Country Visa Applications",
        "student-package": "Student Package"
      };
      setInProgressDocs(prev => [...prev, { 
        id: bundleId, 
        name: bundleNames[bundleType] || bundleType,
        status: "In Progress" 
      }]);
    }
    
    setCurrentView("bundle");
  };

  return (
    <div className="min-h-screen bg-background">
      {!isLoggedIn && currentView === "home" && (
        <Hero onLoginClick={() => setCurrentView("login")} />
      )}

      {!isLoggedIn && currentView === "login" && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
          <LoginForm onLogin={handleLogin} />
        </div>
      )}

      {isLoggedIn && (
        <>
          <Header userName={userName} onTitleDoubleClick={handleTitleDoubleClick} />
          <div className="container mx-auto px-4 py-8">
            {currentView !== "main-menu" && (
              <Button
                variant="ghost"
                onClick={() => setCurrentView("main-menu")}
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}

            {currentView === "main-menu" && (
              <MainMenu
                onUploadClick={() => setCurrentView("upload")}
                onBrowseClick={() => setCurrentView("browse-forms")}
                onAIClick={() => setCurrentView("ai-chat")}
              />
            )}

            {currentView === "browse-forms" && (
              <DocumentSelector
                onUploadClick={() => setCurrentView("upload")}
                onCameraClick={() => setCurrentView("camera")}
                onDocumentSelect={handleDocumentSelect}
                onBundleSelect={handleBundleSelect}
                inProgressDocs={inProgressDocs}
              />
            )}

            {currentView === "ai-chat" && (
              <div className="max-w-4xl mx-auto">
                <ChatBot />
              </div>
            )}

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
                  onClose={() => setCurrentView("browse-forms")}
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

            {currentView === "bundle" && (
              <div className="max-w-4xl mx-auto animate-fade-in">
                <BundleChecklist
                  bundleName={selectedBundle}
                  onFormClick={(formId) => {
                    console.log("Opening form:", formId);
                    setCurrentView("visa-form");
                  }}
                  onBack={() => setCurrentView("browse-forms")}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
