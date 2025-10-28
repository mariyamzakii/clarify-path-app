import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish (Español)" },
  { code: "zh", name: "Chinese (中文)" },
  { code: "ar", name: "Arabic (العربية)" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "pt", name: "Portuguese (Português)" },
  { code: "fr", name: "French (Français)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "ja", name: "Japanese (日本語)" },
  { code: "ko", name: "Korean (한국어)" },
  { code: "ru", name: "Russian (Русский)" },
  { code: "vi", name: "Vietnamese (Tiếng Việt)" },
];

const LanguageSelector = ({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <Card className="p-6 shadow-soft bg-gradient-card border-border">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Languages className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Select Your Language</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="language" className="text-foreground">Translate to</Label>
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger id="language" className="w-full bg-background border-border">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default LanguageSelector;
