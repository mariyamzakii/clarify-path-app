import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, FileText, FolderOpen } from "lucide-react";

interface DocumentSelectorProps {
  onUploadClick: () => void;
  onCameraClick: () => void;
  onDocumentSelect: (docType: string) => void;
  onBundleSelect: (bundleType: string) => void;
}

const DocumentSelector = ({
  onUploadClick,
  onCameraClick,
  onDocumentSelect,
  onBundleSelect,
}: DocumentSelectorProps) => {
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
          What document are you trying to fill?
        </h2>

        {/* Add New Form Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Add a New Form
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              onClick={onUploadClick}
              variant="outline"
              className="h-24 flex flex-col gap-2"
            >
              <Upload className="w-6 h-6" />
              <span>Upload Document</span>
            </Button>
            <Button
              onClick={onCameraClick}
              variant="outline"
              className="h-24 flex flex-col gap-2"
            >
              <Camera className="w-6 h-6" />
              <span>Take Photo</span>
            </Button>
            <Button
              onClick={() => {}}
              variant="outline"
              className="h-24 flex flex-col gap-2"
            >
              <FolderOpen className="w-6 h-6" />
              <span>Browse Menu</span>
            </Button>
          </div>
        </div>

        {/* Individual Documents */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Select Individual Document
          </h3>
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
        </div>

        {/* OR Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-sm font-semibold text-muted-foreground">
              OR
            </span>
          </div>
        </div>

        {/* Bundles */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Select a Bundle
          </h3>
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
        </div>
      </Card>
    </div>
  );
};

export default DocumentSelector;
