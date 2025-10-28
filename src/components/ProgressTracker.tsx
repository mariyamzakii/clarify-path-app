import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, FileText } from "lucide-react";

interface Document {
  id: string;
  name: string;
  status: "pending" | "processing" | "completed";
  progress: number;
  date: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Visa Application.pdf",
    status: "processing",
    progress: 45,
    date: "2024-01-15",
  },
  {
    id: "2",
    name: "FAFSA Financial Aid",
    status: "processing",
    progress: 65,
    date: "2024-01-16",
  },
  {
    id: "3",
    name: "Legal Contract",
    status: "pending",
    progress: 0,
    date: "2024-01-17",
  },
];

interface ProgressTrackerProps {
  onVisaFormClick: () => void;
}

const ProgressTracker = ({ onVisaFormClick }: ProgressTrackerProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground mb-4">Your Documents</h2>
      
      {mockDocuments.map((doc) => (
        <Card 
          key={doc.id} 
          className={`p-6 shadow-soft bg-gradient-card border-border animate-slide-up ${
            doc.name === "Visa Application.pdf" ? "cursor-pointer hover:shadow-medium transition-all" : ""
          }`}
          onClick={() => doc.name === "Visa Application.pdf" && onVisaFormClick()}
        >
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              doc.status === "completed" ? "bg-accent/10" :
              doc.status === "processing" ? "bg-primary/10" :
              "bg-muted"
            }`}>
              {doc.status === "completed" ? (
                <CheckCircle2 className="w-5 h-5 text-accent" />
              ) : doc.status === "processing" ? (
                <Clock className="w-5 h-5 text-primary animate-spin" />
              ) : (
                <FileText className="w-5 h-5 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground">{doc.date}</p>
                  {doc.name === "Visa Application.pdf" && (
                    <p className="text-sm text-primary font-medium mt-1">Click to fill out form →</p>
                  )}
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  doc.status === "completed" ? "bg-accent/10 text-accent" :
                  doc.status === "processing" ? "bg-primary/10 text-primary" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </span>
              </div>

              {doc.status === "processing" && (
                <div className="space-y-1">
                  <Progress value={doc.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{doc.progress}% complete</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProgressTracker;
