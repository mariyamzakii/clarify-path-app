import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const FormHelper = () => {
  return (
    <Card className="p-4 bg-primary/5 border-primary/20 shadow-soft animate-fade-in">
      <div className="flex gap-3">
        <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            Don't understand a section?
          </p>
          <p className="text-xs text-muted-foreground">
            Highlight it to open the AI Assistant and choose your Language to translate it to.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default FormHelper;
