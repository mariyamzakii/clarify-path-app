import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, FileText, Plus } from "lucide-react";

interface Document {
  id: number;
  name: string;
  date: string;
  status: "completed" | "processing" | "pending";
  progress?: number;
}

const initialDocuments: Document[] = [
  {
    id: 1,
    name: "Passport Scan",
    date: "Oct 15, 2025",
    status: "completed",
  },
  {
    id: 2,
    name: "Visa Application",
    date: "Oct 20, 2025",
    status: "processing",
    progress: 65,
  },
  {
    id: 3,
    name: "Travel Itinerary",
    date: "Oct 22, 2025",
    status: "pending",
  },
];

interface ProgressTrackerProps {
  onVisaFormClick: () => void;
  visaCompleted?: boolean;
}

const ProgressTracker = ({ onVisaFormClick, visaCompleted = false }: ProgressTrackerProps) => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [newDocName, setNewDocName] = useState("");
  const [newDocType, setNewDocType] = useState("");

  const handleAddDocument = () => {
    if (!newDocName.trim()) return;
    const newDoc: Document = {
      id: Date.now(),
      name: newDocName.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "pending",
    };
    setDocuments([...documents, newDoc]);
    setNewDocName("");
    setNewDocType("");
  };

  return (
    <div className="space-y-6">
      {/* Add new document form */}
      <Card className="p-4 sm:p-6 shadow-soft bg-gradient-card border-border animate-fade-in">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Add New Form</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="docName">Form Name</Label>
            <Input
              id="docName"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              placeholder="Enter form/document name"
            />
          </div>
          <div>
            <Label htmlFor="docType">Type (optional)</Label>
            <Input
              id="docType"
              value={newDocType}
              onChange={(e) => setNewDocType(e.target.value)}
              placeholder="E.g. Visa, Passport, etc."
            />
          </div>
        </div>
        <Button
          onClick={handleAddDocument}
          className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Form
        </Button>
      </Card>

      {/* Existing documents */}
      {documents.map((doc) => {
        const isVisaApp = doc.name.includes("Visa Application");
        const displayStatus = isVisaApp && visaCompleted ? "completed" : doc.status;

        return (
          <Card
            key={doc.id}
            className={`p-4 sm:p-6 shadow-soft bg-gradient-card border-border animate-slide-up ${
              isVisaApp ? "cursor-pointer hover:shadow-medium transition-all" : ""
            }`}
            onClick={() => isVisaApp && onVisaFormClick()}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  displayStatus === "completed"
                    ? "bg-accent/10"
                    : displayStatus === "processing"
                    ? "bg-primary/10"
                    : "bg-muted"
                }`}
              >
                {displayStatus === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                ) : displayStatus === "processing" ? (
                  <Clock className="w-5 h-5 text-primary animate-spin" />
                ) : (
                  <FileText className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.date}</p>

                    {isVisaApp && !visaCompleted && (
                      <p className="text-sm text-primary font-medium mt-1">
                        Click to fill out form →
                      </p>
                    )}
                    {isVisaApp && visaCompleted && (
                      <p className="text-sm text-accent font-medium mt-1">
                        ✓ Form submitted to Travel.state.gov
                      </p>
                    )}
                  </div>

                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
                      displayStatus === "completed"
                        ? "bg-accent/10 text-accent"
                        : displayStatus === "processing"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
                  </span>
                </div>

                {displayStatus === "processing" && doc.progress !== undefined && (
                  <div className="space-y-1">
                    <Progress value={doc.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{doc.progress}% complete</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ProgressTracker;
