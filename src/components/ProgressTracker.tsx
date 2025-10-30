import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Clock, FileText, Plus, Trash2 } from "lucide-react";

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
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [newDocName, setNewDocName] = useState("");
  const [newDocType, setNewDocType] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddDocument = () => {
    if (!newDocName || !newDocType) return;
    
    const newDoc: Document = {
      id: Date.now().toString(),
      name: newDocType === "custom" ? newDocName : `${newDocType}.pdf`,
      status: "pending",
      progress: 0,
      date: new Date().toISOString().split('T')[0],
    };
    
    setDocuments([...documents, newDoc]);
    setNewDocName("");
    setNewDocType("");
    setShowAddForm(false);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-foreground">Your Documents</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-accent hover:bg-accent/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </Button>
      </div>

      {showAddForm && (
        <Card className="p-4 sm:p-6 shadow-soft bg-gradient-card border-border mb-4">
          <h3 className="font-semibold text-foreground mb-4">Add New Document</h3>
          <div className="space-y-4">
            <Select value={newDocType} onValueChange={setNewDocType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Visa Application">Visa Application</SelectItem>
                <SelectItem value="FAFSA Financial Aid">FAFSA Financial Aid</SelectItem>
                <SelectItem value="Legal Contract">Legal Contract</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            
            {newDocType === "custom" && (
              <Input
                placeholder="Enter custom document name"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
              />
            )}
            
            <div className="flex gap-2">
              <Button onClick={handleAddDocument} className="flex-1 bg-accent hover:bg-accent/90">
                Add
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {documents.map((doc) => (
        <Card 
          key={doc.id} 
          className={`p-4 sm:p-6 shadow-soft bg-gradient-card border-border animate-slide-up ${
            doc.name.includes("Visa Application") ? "cursor-pointer hover:shadow-medium transition-all" : ""
          }`}
          onClick={() => doc.name.includes("Visa Application") && onVisaFormClick()}
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
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground">{doc.date}</p>
                  {doc.name.includes("Visa Application") && (
                    <p className="text-sm text-primary font-medium mt-1">Click to fill out form →</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
                    doc.status === "completed" ? "bg-accent/10 text-accent" :
                    doc.status === "processing" ? "bg-primary/10 text-primary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDocument(doc.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
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
