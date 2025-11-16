import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Send, MessageSquare, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBotProps {
  selectedText?: string;
  onClose?: () => void;
  onHighlightField?: (field: string) => void;
}

const ChatBot = ({ selectedText = "", onClose, onHighlightField }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "zh", name: "中文" },
    { code: "ar", name: "العربية" },
    { code: "hi", name: "हिन्दी" },
    { code: "pt", name: "Português" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
  ];

  const getMockResponse = (query: string, lang: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("based on your form") || lowerQuery.includes("name:")) {
      const responses: Record<string, string> = {
        en: "I've reviewed your form! Would you like me to translate this summary to another language? Everything looks good so far. If anything seems incorrect, let me know and I can guide you to update it.",
        es: "¡He revisado tu formulario! ¿Te gustaría que traduzca este resumen a otro idioma? Todo se ve bien hasta ahora. Si algo parece incorrecto, avísame y puedo guiarte para actualizarlo.",
        zh: "我已审查了您的表格！您想让我将此摘要翻译成另一种语言吗？到目前为止一切看起来都很好。如果有任何不正确的地方，请告诉我，我可以指导您更新。",
        pt: "Revisei seu formulário! Gostaria que eu traduzisse este resumo para outro idioma? Tudo parece bom até agora. Se algo parecer incorreto, me avise e posso orientá-lo a atualizar.",
        fr: "J'ai examiné votre formulaire! Voulez-vous que je traduise ce résumé dans une autre langue? Tout semble bon pour l'instant. Si quelque chose semble incorrect, faites-le-moi savoir et je peux vous guider pour le mettre à jour.",
        de: "Ich habe Ihr Formular überprüft! Möchten Sie, dass ich diese Zusammenfassung in eine andere Sprache übersetze? Bisher sieht alles gut aus. Wenn etwas falsch erscheint, lassen Sie es mich wissen und ich kann Sie beim Aktualisieren anleiten.",
      };
      return responses[lang] || responses.en;
    }

    if (lowerQuery.includes("age") || lowerQuery.includes("date of birth") || lowerQuery.includes("wrong")) {
      if (onHighlightField) {
        onHighlightField("dateOfBirth");
      }
      return "I've highlighted the Date of Birth field for you. Please update it with the correct information.";
    }

    if (lowerQuery.includes("name") && lowerQuery.includes("wrong")) {
      if (onHighlightField) {
        onHighlightField("fullName");
      }
      return "I've highlighted the Full Name field for you. Please update it with the correct information.";
    }

    const responses: Record<string, string> = {
      en: "I'm here to help! Select any text in the form to get explanations, or use 'Check My Form' to review what you've filled in.",
      es: "¡Estoy aquí para ayudar! Selecciona cualquier texto en el formulario para obtener explicaciones, o usa 'Verificar Mi Formulario' para revisar lo que has completado.",
      zh: "我在这里帮助您！选择表单中的任何文本以获取解释",
      pt: "Estou aqui para ajudar! Selecione qualquer texto no formulário para obter explicações, ou use 'Verificar Meu Formulário' para revisar o que você preencheu.",
      fr: "Je suis là pour vous aider! Sélectionnez n'importe quel texte dans le formulaire pour obtenir des explications, ou utilisez 'Vérifier Mon Formulaire' pour examiner ce que vous avez rempli.",
      de: "Ich bin hier, um zu helfen! Wählen Sie einen beliebigen Text im Formular aus, um Erklärungen zu erhalten, oder verwenden Sie 'Mein Formular prüfen', um zu überprüfen, was Sie ausgefüllt haben.",
    };

    return responses[lang] || responses.en;
  };

  useEffect(() => {
    if (selectedText && selectedText.trim()) {
      const userMessage: Message = { role: "user", content: selectedText };
      setMessages([userMessage]);
      
      setIsTyping(true);
      setTimeout(() => {
        const response = getMockResponse(selectedText, language);
        const assistantMessage: Message = { role: "assistant", content: response };
        setMessages([userMessage, assistantMessage]);
        setIsTyping(false);
      }, 1000);
    }
  }, [selectedText, language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      const response = getMockResponse(input, language);
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickTranslate = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant") {
      setInput("Translate to " + languages.find(l => l.code === language)?.name);
      handleSend();
    }
  };

  return (
    <Card className="fixed bottom-6 right-6 w-96 max-h-[500px] shadow-2xl border-2 border-primary/20 flex flex-col z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10 flex-shrink-0 rounded-t-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/20 rounded-full">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </div>
            <h3 className="font-semibold text-foreground">AI Form Assistant</h3>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-full bg-background border-border h-9">
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

      {selectedText && (
        <div className="px-4 py-2 bg-accent/20 border-b border-border flex-shrink-0">
          <p className="text-xs text-muted-foreground mb-1">Context:</p>
          <p className="text-sm font-medium text-foreground line-clamp-2">{selectedText}</p>
        </div>
      )}

      <ScrollArea className="flex-1 p-4 h-[400px]">
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <p className="font-medium mb-1">👋 Hi! I'm your AI assistant</p>
              <p className="text-xs">Highlight text or use "Check My Form"</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border space-y-2 flex-shrink-0 bg-background/50">
        {messages.length > 0 && messages[messages.length - 1]?.role === "assistant" && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickTranslate}
            className="w-full text-xs h-8"
          >
            🌍 Translate this to {languages.find(l => l.code === language)?.name}
          </Button>
        )}
        
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 h-9 text-sm"
          />
          <Button onClick={handleSend} size="icon" className="h-9 w-9 flex-shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatBot;
