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
  selectedText?: string;
  onClose?: () => void;
  position?: { x: number; y: number };
}

const ChatBot = ({ selectedText = "", onClose, position }: ChatBotProps) => {
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

  // Enhanced mock responses with more comprehensive answers
  const getMockResponse = (query: string, lang: string): string => {
    const lowerQuery = query.toLowerCase();
    
    const responses: Record<string, Record<string, string>> = {
      explain: {
        en: `"${selectedText}" means: This is a critical field on your application form. It requires precise and accurate information exactly as it appears on your official government-issued documents. Providing incorrect or inconsistent information can lead to delays or rejection of your application. Always verify the spelling, format, and details match your original documents like passport, birth certificate, or official records.`,
        es: `"${selectedText}" significa: Este es un campo crítico en su formulario. Requiere información precisa y exacta tal como aparece en sus documentos oficiales emitidos por el gobierno. Proporcionar información incorrecta puede causar retrasos o rechazo.`,
        fr: `"${selectedText}" signifie : Il s'agit d'un champ critique de votre formulaire. Il nécessite des informations précises et exactes telles qu'elles apparaissent sur vos documents officiels délivrés par le gouvernement.`,
        de: `"${selectedText}" bedeutet: Dies ist ein kritisches Feld in Ihrem Formular. Es erfordert präzise und genaue Informationen, genau wie sie auf Ihren offiziellen Regierungsdokumenten erscheinen.`,
        zh: `"${selectedText}" 的意思是：这是申请表上的关键字段。需要提供与政府颁发的官方文件完全一致的准确信息。提供不正确的信息可能导致延误或拒绝。`,
      },
      fill: {
        en: `To fill "${selectedText}" correctly:\n\n1. GATHER DOCUMENTS: Collect your passport, birth certificate, and any relevant official records\n\n2. VERIFY INFORMATION: Check that names, dates, and numbers match exactly across all documents\n\n3. FORMAT CORRECTLY: Pay attention to date formats (MM/DD/YYYY vs DD/MM/YYYY), name order (First, Middle, Last), and capitalization\n\n4. DOUBLE-CHECK: Review your entry at least twice before moving to the next field\n\n5. COMMON MISTAKES TO AVOID:\n   • Spelling variations in names\n   • Wrong date formats\n   • Missing middle names\n   • Transposed numbers\n\n6. IF UNSURE: Contact the issuing authority or refer to your most recent official document`,
        es: `Para completar "${selectedText}" correctamente:\n\n1. REÚNA DOCUMENTOS: Pasaporte, acta de nacimiento y registros oficiales\n2. VERIFIQUE INFORMACIÓN: Los nombres, fechas y números deben coincidir exactamente\n3. FORMATO CORRECTO: Atención a formatos de fecha, orden de nombres y mayúsculas\n4. VERIFIQUE DOS VECES: Revise su entrada antes de continuar\n5. ERRORES COMUNES: Variaciones de ortografía, formatos de fecha incorrectos, nombres intermedios faltantes`,
        fr: `Pour remplir "${selectedText}" correctement:\n\n1. RASSEMBLEZ LES DOCUMENTS: Passeport, acte de naissance et dossiers officiels\n2. VÉRIFIEZ LES INFORMATIONS: Les noms, dates et numéros doivent correspondre exactement\n3. FORMAT CORRECT: Attention aux formats de date, ordre des noms et majuscules\n4. DOUBLE VÉRIFICATION: Examinez votre saisie avant de continuer`,
        de: `Um "${selectedText}" korrekt auszufüllen:\n\n1. DOKUMENTE SAMMELN: Pass, Geburtsurkunde und offizielle Unterlagen\n2. INFORMATIONEN ÜBERPRÜFEN: Namen, Daten und Nummern müssen genau übereinstimmen\n3. KORREKTES FORMAT: Achten Sie auf Datumsformate, Namensreihenfolge und Großschreibung\n4. DOPPELTE ÜBERPRÜFUNG: Überprüfen Sie Ihre Eingabe zweimal`,
        zh: `正确填写"${selectedText}"：\n\n1. 收集文件：护照、出生证明和相关官方记录\n2. 验证信息：确保姓名、日期和号码在所有文件中完全匹配\n3. 正确格式：注意日期格式、姓名顺序和大小写\n4. 仔细检查：在继续下一个字段之前至少检查两次\n5. 常见错误：姓名拼写变化、日期格式错误、缺少中间名、数字颠倒`,
      },
      help: {
        en: `I can help you with "${selectedText}"! Here's what I can do:\n\n• "Explain this" - Get a comprehensive explanation of what this field means and why it's important\n\n• "How do I fill this" - Receive detailed step-by-step instructions with examples\n\n• "What documents do I need" - Learn which official documents to reference\n\n• "Common mistakes" - Understand typical errors people make with this field\n\n• "Examples" - See sample entries to guide your input\n\nJust ask your question in plain language, and I'll provide clear, actionable guidance!`,
        es: `¡Puedo ayudarte con "${selectedText}"! Esto es lo que puedo hacer:\n\n• "Explica esto" - Obtener una explicación completa\n• "Cómo lleno esto" - Recibir instrucciones detalladas paso a paso\n• "Qué documentos necesito" - Aprender qué documentos oficiales consultar\n• "Errores comunes" - Entender errores típicos\n• "Ejemplos" - Ver entradas de muestra`,
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
