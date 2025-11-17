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

  const getVisaExplanation = (language: string): string => {
    const explanations: Record<string, string> = {
      en: "A visa form is an official document required for entry into a country. It typically includes personal information, travel details, and the purpose of your visit. This form must be completed accurately and submitted along with supporting documents like your passport, photos, and proof of financial means. The visa application process varies by country and visa type (tourist, student, work, etc.).",
      es: "Un formulario de visa es un documento oficial requerido para ingresar a un país. Generalmente incluye información personal, detalles del viaje y el propósito de su visita. Este formulario debe completarse con precisión y presentarse junto con documentos de respaldo como su pasaporte, fotos y comprobante de medios financieros. El proceso de solicitud de visa varía según el país y el tipo de visa (turista, estudiante, trabajo, etc.).",
      zh: "签证表格是进入一个国家所需的官方文件。它通常包括个人信息、旅行详情和访问目的。此表格必须准确填写，并与护照、照片和财务证明等支持文件一起提交。签证申请流程因国家和签证类型（旅游、学生、工作等）而异。",
      ar: "نموذج التأشيرة هو وثيقة رسمية مطلوبة للدخول إلى بلد ما. يتضمن عادةً معلومات شخصية وتفاصيل السفر والغرض من زيارتك. يجب ملء هذا النموذج بدقة وتقديمه مع المستندات الداعمة مثل جواز سفرك والصور وإثبات الوسائل المالية. تختلف عملية طلب التأشيرة حسب البلد ونوع التأشيرة (سياحية، طالب، عمل، إلخ).",
      hi: "वीज़ा फॉर्म किसी देश में प्रवेश के लिए आवश्यक एक आधिकारिक दस्तावेज़ है। इसमें आम तौर पर व्यक्तिगत जानकारी, यात्रा विवरण और आपकी यात्रा का उद्देश्य शामिल होता है। यह फॉर्म सटीक रूप से पूरा किया जाना चाहिए और आपके पासपोर्ट, फोटो और वित्तीय साधनों के प्रमाण जैसे सहायक दस्तावेजों के साथ जमा किया जाना चाहिए। वीज़ा आवेदन प्रक्रिया देश और वीज़ा प्रकार (पर्यटक, छात्र, कार्य, आदि) के अनुसार भिन्न होती है।",
      pt: "Um formulário de visto é um documento oficial necessário para entrada em um país. Geralmente inclui informações pessoais, detalhes de viagem e o propósito da sua visita. Este formulário deve ser preenchido com precisão e enviado junto com documentos de apoio como seu passaporte, fotos e comprovante de meios financeiros. O processo de solicitação de visto varia de acordo com o país e tipo de visto (turista, estudante, trabalho, etc.).",
      fr: "Un formulaire de visa est un document officiel requis pour l'entrée dans un pays. Il comprend généralement des informations personnelles, des détails de voyage et le but de votre visite. Ce formulaire doit être rempli avec précision et soumis avec des documents justificatifs tels que votre passeport, des photos et une preuve de moyens financiers. Le processus de demande de visa varie selon le pays et le type de visa (touriste, étudiant, travail, etc.).",
      de: "Ein Visumsformular ist ein offizielles Dokument, das für die Einreise in ein Land erforderlich ist. Es enthält normalerweise persönliche Informationen, Reisedetails und den Zweck Ihres Besuchs. Dieses Formular muss genau ausgefüllt und zusammen mit unterstützenden Dokumenten wie Ihrem Reisepass, Fotos und Nachweis finanzieller Mittel eingereicht werden. Der Visumsantragsprozess variiert je nach Land und Visumstyp (Tourist, Student, Arbeit usw.).",
    };
    
    return explanations[language] || explanations.en;
  };

  const handleJustTranslate = () => {
    setShowDocumentDialog(false);
    setShowTranslateView(true);
    setTranslatedText(getVisaExplanation(translateLanguage));
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
                        setTranslatedText(getVisaExplanation(lang));
                      }}
                    />
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-foreground leading-relaxed">
                      {translatedText}
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
