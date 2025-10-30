import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, FileText, MoreVertical } from "lucide-react";

interface Document {
  id: number;
  name: string;
  date: string;
  status: "completed" | "processing" | "pending";
  progress?: number;
}

const mockDocuments: Document[] = [
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
  const [documents] = useState<Document[]>(mockDocuments);

  return (
    <div className="space-y-4">
      {documents.map((doc) => {
        const isVisaApp = doc.name.includes("Visa Application");
        // if visa is completed, force status to completed for that card
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
              {/* Icon circle */}
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

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.date}</p>

                    {/* CTA changes based on completion */}
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

                  <div className="flex items-center gap-2">
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
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress bar (only if still processing) */}
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
