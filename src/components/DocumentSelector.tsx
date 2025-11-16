import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, FileText, FolderOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <h3 className="text-lg font-semibold text-foreground mb-4">
            In Progress
          </h3>
          <div className="space-y-3">
            {inProgressDocs.map((doc) => (
              <Card
                key={doc.id}
                className="p-4 cursor-pointer hover:shadow-medium transition-all"
                onClick={() => doc.id.includes("bundle") ? onBundleSelect(doc.id.replace("-bundle", "")) : onDocumentSelect(doc.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="font-medium">{doc.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{doc.status}</span>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DocumentSelector;
