import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBotProps {
  selectedText: string;
  onClose: () => void;
  position: { x: number; y: number };
}

const ChatBot = ({ selectedText, onClose, position }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
    { code: "ar", name: "العربية" },
    { code: "hi", name: "हिन्दी" },
    { code: "pt", name: "Português" },
  ];

  // Mock responses based on language
  const getMockResponse = (query: string, lang: string): string => {
    const lowerQuery = query.toLowerCase();
    
    const responses: Record<string, Record<string, string>> = {
      explain: {
        en: `"${selectedText}" means: This is an important field that requires accurate information. Make sure to provide the exact details as they appear in your official documents. This helps ensure your application is processed correctly.`,
        es: `"${selectedText}" significa: Este es un campo importante que requiere información precisa. Asegúrese de proporcionar los detalles exactos tal como aparecen en sus documentos oficiales.`,
        fr: `"${selectedText}" signifie : Ceci est un champ important qui nécessite des informations précises. Assurez-vous de fournir les détails exacts tels qu'ils apparaissent dans vos documents officiels.`,
        de: `"${selectedText}" bedeutet: Dies ist ein wichtiges Feld, das genaue Informationen erfordert. Stellen Sie sicher, dass Sie die genauen Details so angeben, wie sie in Ihren offiziellen Dokumenten erscheinen.`,
        zh: `"${selectedText}" 的意思是：这是一个需要准确信息的重要字段。请确保提供的详细信息与您的官方文件完全一致。`,
      },
      fill: {
        en: `To fill "${selectedText}": 1) Gather your official documents, 2) Copy the information exactly as shown, 3) Double-check for accuracy, 4) Use the same format (dates, names, etc.). If you're unsure, check your passport or official records.`,
        es: `Para completar "${selectedText}": 1) Reúna sus documentos oficiales, 2) Copie la información exactamente como se muestra, 3) Verifique la precisión, 4) Use el mismo formato. Si no está seguro, consulte su pasaporte.`,
        fr: `Pour remplir "${selectedText}" : 1) Rassemblez vos documents officiels, 2) Copiez les informations exactement comme indiqué, 3) Vérifiez l'exactitude, 4) Utilisez le même format. En cas de doute, consultez votre passeport.`,
        de: `Um "${selectedText}" auszufüllen: 1) Sammeln Sie Ihre offiziellen Dokumente, 2) Kopieren Sie die Informationen genau wie angezeigt, 3) Überprüfen Sie die Richtigkeit, 4) Verwenden Sie dasselbe Format. Bei Unsicherheit prüfen Sie Ihren Pass.`,
        zh: `填写"${selectedText}"的方法：1) 收集您的官方文件，2) 完全按照显示的内容复制信息，3) 仔细检查准确性，4) 使用相同的格式。如有疑问，请查看您的护照。`,
      },
      help: {
        en: `I can help you with "${selectedText}"! You can ask me to:\n• "Explain this" - Get a detailed explanation\n• "How do I fill this" - Get step-by-step instructions\n• Or ask any specific question about this field`,
        es: `¡Puedo ayudarte con "${selectedText}"! Puedes pedirme:\n• "Explica esto" - Obtener una explicación detallada\n• "Cómo lleno esto" - Obtener instrucciones paso a paso\n• O hacer cualquier pregunta específica sobre este campo`,
        fr: `Je peux vous aider avec "${selectedText}" ! Vous pouvez me demander :\n• "Expliquer ceci" - Obtenir une explication détaillée\n• "Comment remplir ceci" - Obtenir des instructions étape par étape\n• Ou poser toute question spécifique sur ce champ`,
        de: `Ich kann Ihnen mit "${selectedText}" helfen! Sie können mich bitten:\n• "Erkläre dies" - Erhalten Sie eine detaillierte Erklärung\n• "Wie fülle ich dies aus" - Erhalten Sie Schritt-für-Schritt-Anweisungen\n• Oder stellen Sie eine spezifische Frage zu diesem Feld`,
        zh: `我可以帮助您处理"${selectedText}"！您可以要求我：\n• "解释这个" - 获得详细解释\n• "如何填写这个" - 获得分步说明\n• 或询问有关此字段的任何具体问题`,
      },
    };

    if (lowerQuery.includes("explain")) {
      return responses.explain[lang] || responses.explain.en;
    } else if (lowerQuery.includes("fill") || lowerQuery.includes("complete")) {
      return responses.fill[lang] || responses.fill.en;
    } else if (lowerQuery.includes("help") || lowerQuery === "") {
      return responses.help[lang] || responses.help.en;
    } else {
      return responses.explain[lang] || responses.explain.en;
    }
  };

  useEffect(() => {
    if (selectedText) {
      const initialMessage: Message = {
        role: "assistant",
        content: getMockResponse("help", language),
      };
      setMessages([initialMessage]);
    }
  }, [selectedText, language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getMockResponse(input, language);
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickCommand = (command: string) => {
    setInput(command);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <Card className="fixed z-50 w-96 shadow-lg animate-fade-in" 
          style={{ 
            left: Math.min(position.x, window.innerWidth - 400),
            top: Math.min(position.y, window.innerHeight - 500),
          }}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">AI Assistant</h3>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
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
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 bg-accent/30 border-b">
        <p className="text-sm font-medium">Selected: "{selectedText}"</p>
      </div>

      <ScrollArea className="h-64 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t space-y-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickCommand("Explain this")}
          >
            Explain
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickCommand("How do I fill this")}
          >
            How to Fill
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask a question..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatBot;
