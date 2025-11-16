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
    <div className="space-y-2">
      <Label htmlFor="language" className="text-sm text-foreground flex items-center gap-2">
        <Languages className="w-4 h-4 text-primary" />
        Translate to
      </Label>
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
  );
};

export default LanguageSelector;
