import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, FileText, FolderOpen, CheckCircle2, Circle, ChevronDown, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface DocumentSelectorProps {
  onUploadClick: () => void;
  onCameraClick: () => void;
  onDocumentSelect: (docType: string) => void;
  onBundleSelect: (bundleType: string) => void;
  inProgressDocs: Array<{ id: string; name: string; status: string }>;
}

const DocumentSelector = ({
  onUploadClick,
  onCameraClick,
  onDocumentSelect,
  onBundleSelect,
  inProgressDocs,
}: DocumentSelectorProps) => {
  const [activeTab, setActiveTab] = useState("individual");
  const [openBundles, setOpenBundles] = useState<Record<string, boolean>>({});
  const individualDocuments = [
    { id: "visa", name: "Visa Application", icon: FileText },
    { id: "passport", name: "Passport Renewal", icon: FileText },
    { id: "fafsa", name: "FAFSA Form", icon: FileText },
    { id: "tax", name: "Tax Forms", icon: FileText },
    { id: "immigration", name: "Immigration Forms", icon: FileText },
    { id: "work-permit", name: "Work Permit", icon: FileText },
  ];

  const bundles = [
    { id: "citizenship", name: "Citizenship Forms Bundle", count: 5 },
    { id: "country-visa", name: "Country Visa Applications", count: 8 },
    { id: "student-package", name: "Student Package (FAFSA + Visa)", count: 3 },
  ];

  const getBundleForms = (bundleId: string) => {
    switch (bundleId) {
      case "student-package":
        return [
          { id: "fafsa", name: "FAFSA Application", completed: true },
          { id: "student-visa", name: "F-1 Student Visa Application", completed: true },
          { id: "i-20", name: "I-20 Form from School", completed: false },
        ];
      case "citizenship":
        return [
          { id: "n-400", name: "Form N-400", completed: false },
          { id: "biometrics", name: "Biometrics Appointment", completed: false },
        ];
      case "country-visa":
        return [
          { id: "ds-160", name: "DS-160 Form", completed: false },
          { id: "passport-copy", name: "Passport Copy", completed: false },
        ];
      default:
        return [];
    }
  };

  const getProgress = (bundleId: string) => {
    if (bundleId === "visa") return 67;
    const forms = getBundleForms(bundleId);
    if (forms.length === 0) return 0;
    const completed = forms.filter(f => f.completed).length;
    return Math.round((completed / forms.length) * 100);
  };

  const toggleBundle = (bundleId: string) => {
    setOpenBundles(prev => ({ ...prev, [bundleId]: !prev[bundleId] }));
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 shadow-soft bg-gradient-card border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Browse Forms
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="individual">Select Individual</TabsTrigger>
            <TabsTrigger value="bundle">Bundle</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {individualDocuments.map((doc) => (
                <Button
                  key={doc.id}
                  onClick={() => onDocumentSelect(doc.id)}
                  variant="outline"
                  className="h-20 justify-start gap-3 text-left"
                >
                  <doc.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{doc.name}</span>
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bundle" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bundles.map((bundle) => (
                <Button
                  key={bundle.id}
                  onClick={() => onBundleSelect(bundle.id)}
                  variant="outline"
                  className="h-24 flex flex-col gap-2 justify-center"
                >
                  <FolderOpen className="w-6 h-6" />
                  <span className="font-semibold">{bundle.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {bundle.count} forms
                  </span>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {inProgressDocs.length > 0 && (
        <Card className="p-6 shadow-soft bg-gradient-card border-border">
          <h3 className="text-xl font-semibold mb-4">My Forms</h3>
          <div className="space-y-3">
            {inProgressDocs.map((doc) => {
              const isBundle = doc.id.includes("-bundle");
              const bundleId = isBundle ? doc.id.replace("-bundle", "") : doc.id;
              const progress = getProgress(bundleId);
              const forms = isBundle ? getBundleForms(bundleId) : [];
              const isOpen = openBundles[doc.id] || false;

              if (isBundle) {
                return (
                  <Collapsible key={doc.id} open={isOpen} onOpenChange={() => toggleBundle(doc.id)}>
                    <Card className="p-4 hover:shadow-medium transition-all">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                            <span className="font-medium">{doc.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="relative w-10 h-10">
                              <svg className="w-10 h-10 transform -rotate-90">
                                <circle
                                  cx="20"
                                  cy="20"
                                  r="16"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  fill="none"
                                  className="text-muted"
                                />
                                <circle
                                  cx="20"
                                  cy="20"
                                  r="16"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  fill="none"
                                  strokeDasharray={`${2 * Math.PI * 16}`}
                                  strokeDashoffset={`${2 * Math.PI * 16 * (1 - progress / 100)}`}
                                  className="text-primary transition-all"
                                />
                              </svg>
                              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                                {progress}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-4 space-y-2 pl-8">
                          {forms.map((form) => (
                            <div
                              key={form.id}
                              className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded cursor-pointer"
                              onClick={() => onDocumentSelect(form.id)}
                            >
                              {form.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                              ) : (
                                <Circle className="w-5 h-5 text-muted-foreground" />
                              )}
                              <span className="text-sm">{form.name}</span>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                );
              } else {
                return (
                  <Card
                    key={doc.id}
                    className="p-4 hover:shadow-medium transition-all cursor-pointer"
                    onClick={() => onDocumentSelect(doc.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{doc.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="relative w-10 h-10">
                          <svg className="w-10 h-10 transform -rotate-90">
                            <circle
                              cx="20"
                              cy="20"
                              r="16"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              className="text-muted"
                            />
                            <circle
                              cx="20"
                              cy="20"
                              r="16"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 16}`}
                              strokeDashoffset={`${2 * Math.PI * 16 * (1 - progress / 100)}`}
                              className="text-primary transition-all"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                            {progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              }
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DocumentSelector;
