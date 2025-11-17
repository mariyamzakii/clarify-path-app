import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
import GenericForm from "@/components/GenericForm";
import I20Form from "@/components/I20Form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type View = "home" | "login" | "main-menu" | "browse-forms" | "upload" | "camera" | "progress" | "visa-form" | "bundle" | "fafsa-form" | "student-visa-form" | "i20-form" | "generic-form";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [visaCompleted, setVisaCompleted] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<string>("");
  const [currentFormType, setCurrentFormType] = useState<string>("");
  const [inProgressDocs, setInProgressDocs] = useState<Array<{ id: string; name: string; status: string }>>([
    { id: "visa", name: "Visa Application", status: "In Progress" }
  ]);
  const [showDocumentDialog, setShowDocumentDialog] = useState(false);
  const [tempUploadedFile, setTempUploadedFile] = useState<File | null>(null);
  const [showTranslateView, setShowTranslateView] = useState(false);
  const [translateLanguage, setTranslateLanguage] = useState("en");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

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
    setTempUploadedFile(file);
    setShowDocumentDialog(true);
    setShowTranslateView(false);
  };

  const handleAddForm = () => {
    setUploadedFile(tempUploadedFile);
    setShowDocumentDialog(false);
    setCurrentView("visa-form");
  };

  const handleJustTranslate = async () => {
    setShowDocumentDialog(false);
    setShowTranslateView(true);
    await fetchTranslation(translateLanguage);
  };

  const fetchTranslation = async (language: string) => {
    setIsTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            {
              role: 'user',
              content: 'Explain what a visa form is, including what information it typically requires, the purpose, and the general application process. Keep it concise in 3-4 sentences.'
            }
          ],
          language: language
        }
      });

      if (error) throw error;
      
      const content = data?.choices?.[0]?.message?.content || "A visa form is an official document required for entry into a country. It typically includes personal information, travel details, and the purpose of your visit. This form must be completed accurately and submitted along with supporting documents like your passport, photos, and proof of financial means. The visa application process varies by country and visa type (tourist, student, work, etc.).";
      setTranslatedText(content);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText("A visa form is an official document required for entry into a country. It typically includes personal information, travel details, and the purpose of your visit. This form must be completed accurately and submitted along with supporting documents like your passport, photos, and proof of financial means. The visa application process varies by country and visa type (tourist, student, work, etc.).");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCapture = (file: File) => {
    setUploadedFile(file);
    setCurrentView("upload");
  };

  const handleDocumentSelect = (docType: string) => {
    // Add to in-progress if not already there
    const docNames: Record<string, string> = {
      "visa": "Visa Application",
      "fafsa": "FAFSA Form",
      "student-visa": "F-1 Student Visa",
      "i-20": "I-20 Form",
      "passport": "Passport Application",
      "birth-certificate": "Birth Certificate Request",
      "marriage-certificate": "Marriage Certificate",
      "background-check": "Background Check Form",
    };
    
    if (!inProgressDocs.find(doc => doc.id === docType)) {
      setInProgressDocs(prev => [...prev, { 
        id: docType, 
        name: docNames[docType] || docType,
        status: "In Progress" 
      }]);
    }

    switch (docType) {
      case "visa":
        setCurrentView("visa-form");
        break;
      case "fafsa":
        setCurrentView("fafsa-form");
        break;
      case "student-visa":
        setCurrentView("student-visa-form");
        break;
      case "i-20":
        setCurrentView("i20-form");
        break;
      default:
        // For all other forms, use the generic form
        setCurrentFormType(docType);
        setCurrentView("generic-form");
    }
  };

  const handleDeleteDoc = (docId: string) => {
    setInProgressDocs(prev => prev.filter(doc => doc.id !== docId));
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
                onClick={() => {
                  if (currentView === "upload" || currentView === "camera" || currentView === "browse-forms") {
                    setCurrentView("main-menu");
                  } else {
                    setCurrentView("browse-forms");
                  }
                }}
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
                onCameraClick={() => setCurrentView("camera")}
              />
            )}

      {currentView === "browse-forms" && (
        <DocumentSelector
          onUploadClick={() => setCurrentView("upload")}
          onCameraClick={() => setCurrentView("camera")}
          onDocumentSelect={handleDocumentSelect}
          onBundleSelect={handleBundleSelect}
          inProgressDocs={inProgressDocs}
          onDeleteDoc={handleDeleteDoc}
        />
      )}

            {currentView === "upload" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              <DocumentUploader onFileSelect={handleFileSelect} />
              
              <AlertDialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Document Uploaded</AlertDialogTitle>
                    <AlertDialogDescription>
                      It seems like you are trying to add a Visa form. Would you like to add this as a form to fill out, or just get a translation/explanation of what this form is?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={handleJustTranslate} variant="outline">
                      Just Translate
                    </Button>
                    <AlertDialogAction onClick={handleAddForm}>
                      Add Form
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {showTranslateView && (
                <Card className="p-6 bg-gradient-card border-border shadow-medium">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Visa Form Information</h3>
                  <div className="mb-4">
                    <LanguageSelector 
                      selectedLanguage={translateLanguage}
                      onLanguageChange={(lang) => {
                        setTranslateLanguage(lang);
                        fetchTranslation(lang);
                      }}
                    />
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-foreground leading-relaxed">
                      {isTranslating ? "Translating..." : translatedText}
                    </p>
                  </div>
                </Card>
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
                    handleDocumentSelect(formId);
                  }}
                  onBack={() => setCurrentView("browse-forms")}
                />
              </div>
            )}

            {currentView === "fafsa-form" && (
              <div className="animate-fade-in">
                <GenericForm 
                  formName="FAFSA Form"
                  formType="fafsa"
                  onSubmit={() => setCurrentView("browse-forms")}
                />
              </div>
            )}

            {currentView === "student-visa-form" && (
              <div className="animate-fade-in">
                <GenericForm 
                  formName="F-1 Student Visa Application"
                  formType="student-visa"
                  onSubmit={() => setCurrentView("browse-forms")}
                />
              </div>
            )}

            {currentView === "i20-form" && (
              <div className="animate-fade-in">
                <I20Form 
                  onSubmit={() => {
                    // Mark i-20 as complete
                    setInProgressDocs(prev => prev.map(doc => 
                      doc.id === 'i-20' 
                        ? { ...doc, status: 'Complete' }
                        : doc
                    ));
                    // Mark student-package-bundle as complete
                    setInProgressDocs(prev => prev.map(doc => 
                      doc.id === 'student-package-bundle' 
                        ? { ...doc, status: 'Complete!' }
                        : doc
                    ));
                    setCurrentView("browse-forms");
                  }}
                />
              </div>
            )}

            {currentView === "generic-form" && (
              <div className="animate-fade-in">
                <GenericForm 
                  formName={currentFormType.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                  formType={currentFormType}
                  onSubmit={() => setCurrentView("browse-forms")}
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
