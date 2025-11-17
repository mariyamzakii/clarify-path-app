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
  const bottomRef = useRef<HTMLDivElement>(null);

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

  const checkAndHighlightField = (userMessage: string) => {
    const lowerMsg = userMessage.toLowerCase();
    
    if ((lowerMsg.includes("age") || lowerMsg.includes("date of birth") || lowerMsg.includes("birthday")) && 
        (lowerMsg.includes("wrong") || lowerMsg.includes("incorrect") || lowerMsg.includes("error") || lowerMsg.includes("fix"))) {
      if (onHighlightField) {
        onHighlightField("dateOfBirth");
      }
    } else if (lowerMsg.includes("name") && 
               (lowerMsg.includes("wrong") || lowerMsg.includes("incorrect") || lowerMsg.includes("error") || lowerMsg.includes("fix"))) {
      if (onHighlightField) {
        onHighlightField("fullName");
      }
    } else if (lowerMsg.includes("email") && 
               (lowerMsg.includes("wrong") || lowerMsg.includes("incorrect") || lowerMsg.includes("error") || lowerMsg.includes("fix"))) {
      if (onHighlightField) {
        onHighlightField("email");
      }
    } else if (lowerMsg.includes("phone") && 
               (lowerMsg.includes("wrong") || lowerMsg.includes("incorrect") || lowerMsg.includes("error") || lowerMsg.includes("fix"))) {
      if (onHighlightField) {
        onHighlightField("phone");
      }
    } else if (lowerMsg.includes("address") && 
               (lowerMsg.includes("wrong") || lowerMsg.includes("incorrect") || lowerMsg.includes("error") || lowerMsg.includes("fix"))) {
      if (onHighlightField) {
        onHighlightField("address");
      }
    }
  };

  const getMockResponse = (query: string, lang: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Check if it's a form review response
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

    // Field-specific explanations with examples
    
    // Full Name / Legal Name
    if ((lowerQuery.includes("full") && lowerQuery.includes("name")) || lowerQuery.includes("legal name")) {
      const responses: Record<string, string> = {
        en: "📝 Full Legal Name\n\nThis is your complete name exactly as it appears on your passport or official ID. Include all first names, middle names, and surnames in the correct order.\n\nExample: María Elena García López\nExample: John Michael Smith Jr.",
        es: "📝 Nombre Legal Completo\n\nEste es su nombre completo exactamente como aparece en su pasaporte o identificación oficial. Incluya todos los nombres, segundos nombres y apellidos en el orden correcto.\n\nEjemplo: María Elena García López\nEjemplo: John Michael Smith Jr.",
        zh: "📝 完整法定姓名\n\n这是您护照或官方身份证件上显示的完整姓名。按正确顺序包括所有名字、中间名和姓氏。\n\n示例：María Elena García López\n示例：张三 (Zhang San)",
        pt: "📝 Nome Legal Completo\n\nEste é o seu nome completo exatamente como aparece no seu passaporte ou documento oficial. Inclua todos os primeiros nomes, nomes do meio e sobrenomes na ordem correta.\n\nExemplo: María Elena García López\nExemplo: João Silva Santos",
        fr: "📝 Nom Légal Complet\n\nC'est votre nom complet exactement tel qu'il apparaît sur votre passeport ou pièce d'identité officielle. Incluez tous les prénoms, deuxièmes prénoms et noms de famille dans le bon ordre.\n\nExemple: María Elena García López\nExemple: Jean Pierre Dupont",
        de: "📝 Vollständiger rechtlicher Name\n\nDies ist Ihr vollständiger Name genau so, wie er in Ihrem Pass oder Ausweis erscheint. Fügen Sie alle Vornamen, zweiten Vornamen und Nachnamen in der richtigen Reihenfolge hinzu.\n\nBeispiel: María Elena García López\nBeispiel: Hans Michael Müller",
      };
      return responses[lang] || responses.en;
    }

    // Date of Birth
    if ((lowerQuery.includes("date") && lowerQuery.includes("birth")) || lowerQuery.includes("birthday") || lowerQuery.includes("born")) {
      const responses: Record<string, string> = {
        en: "📅 Date of Birth\n\nYour birth date as shown on your passport or birth certificate. Use the format provided by the form (usually MM/DD/YYYY or DD/MM/YYYY).\n\nExample: 03/15/1995\nExample: 15/03/1995",
        es: "📅 Fecha de Nacimiento\n\nSu fecha de nacimiento como aparece en su pasaporte o certificado de nacimiento. Use el formato proporcionado por el formulario (generalmente DD/MM/AAAA).\n\nEjemplo: 15/03/1995\nEjemplo: 03/15/1995",
        zh: "📅 出生日期\n\n您护照或出生证明上显示的出生日期。使用表格提供的格式（通常为DD/MM/YYYY或MM/DD/YYYY）。\n\n示例：1995年3月15日\n示例：03/15/1995",
        pt: "📅 Data de Nascimento\n\nSua data de nascimento conforme mostrado em seu passaporte ou certidão de nascimento. Use o formato fornecido pelo formulário (geralmente DD/MM/AAAA).\n\nExemplo: 15/03/1995",
        fr: "📅 Date de Naissance\n\nVotre date de naissance telle qu'elle apparaît sur votre passeport ou acte de naissance. Utilisez le format fourni par le formulaire (généralement JJ/MM/AAAA).\n\nExemple: 15/03/1995",
        de: "📅 Geburtsdatum\n\nIhr Geburtsdatum, wie es in Ihrem Reisepass oder Ihrer Geburtsurkunde angegeben ist. Verwenden Sie das vom Formular bereitgestellte Format (normalerweise TT.MM.JJJJ).\n\nBeispiel: 15.03.1995",
      };
      return responses[lang] || responses.en;
    }

    // Place of Birth / Country of Birth
    if ((lowerQuery.includes("place") && lowerQuery.includes("birth")) || (lowerQuery.includes("country") && lowerQuery.includes("birth"))) {
      const responses: Record<string, string> = {
        en: "🌍 Place/Country of Birth\n\nThe city and country where you were born. This should match what's on your passport.\n\nExample: Mexico City, Mexico\nExample: London, United Kingdom\nExample: Tokyo, Japan",
        es: "🌍 Lugar/País de Nacimiento\n\nLa ciudad y el país donde nació. Esto debe coincidir con lo que figura en su pasaporte.\n\nEjemplo: Ciudad de México, México\nEjemplo: Madrid, España\nEjemplo: Bogotá, Colombia",
        zh: "🌍 出生地/出生国家\n\n您出生的城市和国家。这应该与您护照上的信息一致。\n\n示例：北京，中国\n示例：上海，中国",
        pt: "🌍 Local/País de Nascimento\n\nA cidade e o país onde você nasceu. Isso deve corresponder ao que está em seu passaporte.\n\nExemplo: São Paulo, Brasil\nExemplo: Lisboa, Portugal",
        fr: "🌍 Lieu/Pays de Naissance\n\nLa ville et le pays où vous êtes né. Cela doit correspondre à ce qui figure sur votre passeport.\n\nExemple: Paris, France\nExemple: Montréal, Canada",
        de: "🌍 Geburtsort/Geburtsland\n\nDie Stadt und das Land, in dem Sie geboren wurden. Dies sollte mit Ihrem Reisepass übereinstimmen.\n\nBeispiel: Berlin, Deutschland\nBeispiel: Wien, Österreich",
      };
      return responses[lang] || responses.en;
    }

    // Nationality / Citizenship
    if (lowerQuery.includes("nationality") || lowerQuery.includes("citizenship") || lowerQuery.includes("citizen")) {
      const responses: Record<string, string> = {
        en: "🛂 Nationality/Citizenship\n\nList all countries where you hold citizenship. If you have dual citizenship, list both countries.\n\nExample: Mexican\nExample: American and Canadian (dual citizenship)\nExample: British",
        es: "🛂 Nacionalidad/Ciudadanía\n\nEnumere todos los países donde tiene ciudadanía. Si tiene doble nacionalidad, enumere ambos países.\n\nEjemplo: Mexicana\nEjemplo: Estadounidense y Canadiense (doble ciudadanía)\nEjemplo: Española",
        zh: "🛂 国籍/公民身份\n\n列出您拥有公民身份的所有国家。如果您拥有双重国籍，请列出两个国家。\n\n示例：中国\n示例：美国和加拿大（双重国籍）",
        pt: "🛂 Nacionalidade/Cidadania\n\nListe todos os países onde você possui cidadania. Se você tem cidadania dupla, liste ambos os países.\n\nExemplo: Brasileira\nExemplo: Portuguesa e Brasileira (dupla cidadania)",
        fr: "🛂 Nationalité/Citoyenneté\n\nÉnumérez tous les pays où vous détenez la citoyenneté. Si vous avez la double citoyenneté, énumérez les deux pays.\n\nExemple: Française\nExemple: Canadienne et Française (double citoyenneté)",
        de: "🛂 Staatsangehörigkeit\n\nListen Sie alle Länder auf, in denen Sie die Staatsbürgerschaft besitzen. Wenn Sie eine doppelte Staatsbürgerschaft haben, listen Sie beide Länder auf.\n\nBeispiel: Deutsch\nBeispiel: Deutsch und Österreichisch (doppelte Staatsbürgerschaft)",
      };
      return responses[lang] || responses.en;
    }

    // Purpose of Visit
    if (lowerQuery.includes("purpose") || (lowerQuery.includes("reason") && lowerQuery.includes("visit"))) {
      const responses: Record<string, string> = {
        en: "🎯 Purpose of Visit\n\nClearly explain why you are traveling. Be specific and honest.\n\nExample: Tourism - visiting historical sites and cultural attractions\nExample: Business meetings with ABC Company to discuss partnership opportunities\nExample: Attending my cousin's wedding on June 15th\nExample: Academic conference at University of XYZ",
        es: "🎯 Propósito de la Visita\n\nExplique claramente por qué está viajando. Sea específico y honesto.\n\nEjemplo: Turismo - visitar sitios históricos y atracciones culturales\nEjemplo: Reuniones de negocios con la empresa ABC para discutir oportunidades de asociación\nEjemplo: Asistir a la boda de mi primo el 15 de junio\nEjemplo: Conferencia académica en la Universidad XYZ",
        zh: "🎯 访问目的\n\n清楚地解释您旅行的原因。要具体和诚实。\n\n示例：旅游 - 参观历史遗址和文化景点\n示例：与ABC公司进行商务会议讨论合作机会\n示例：参加我表兄弟的婚礼（6月15日）\n示例：在XYZ大学参加学术会议",
        pt: "🎯 Objetivo da Visita\n\nExplique claramente por que você está viajando. Seja específico e honesto.\n\nExemplo: Turismo - visitar locais históricos e atrações culturais\nExemplo: Reuniões de negócios com a empresa ABC para discutir oportunidades de parceria\nExemplo: Participar do casamento do meu primo em 15 de junho",
        fr: "🎯 Objet de la Visite\n\nExpliquez clairement pourquoi vous voyagez. Soyez précis et honnête.\n\nExemple: Tourisme - visiter des sites historiques et des attractions culturelles\nExemple: Réunions d'affaires avec la société ABC pour discuter des opportunités de partenariat\nExemple: Assister au mariage de mon cousin le 15 juin",
        de: "🎯 Zweck des Besuchs\n\nErklären Sie klar, warum Sie reisen. Seien Sie spezifisch und ehrlich.\n\nBeispiel: Tourismus - Besuch historischer Stätten und kultureller Attraktionen\nBeispiel: Geschäftstreffen mit ABC-Unternehmen zur Erörterung von Partnerschaftsmöglichkeiten\nBeispiel: Teilnahme an der Hochzeit meines Cousins am 15. Juni",
      };
      return responses[lang] || responses.en;
    }

    // Duration of Stay
    if (lowerQuery.includes("duration") || lowerQuery.includes("how long") || lowerQuery.includes("stay")) {
      const responses: Record<string, string> = {
        en: "⏱️ Duration of Stay\n\nHow many days you plan to stay in the country.\n\nExample: 14 days\nExample: 30 days\nExample: 90 days",
        es: "⏱️ Duración de la Estadía\n\nCuántos días planea quedarse en el país.\n\nEjemplo: 14 días\nEjemplo: 30 días\nEjemplo: 90 días",
        zh: "⏱️ 停留时间\n\n您计划在该国停留多少天。\n\n示例：14天\n示例：30天\n示例：90天",
        pt: "⏱️ Duração da Estadia\n\nQuantos dias você planeja ficar no país.\n\nExemplo: 14 dias\nExemplo: 30 dias\nExemplo: 90 dias",
        fr: "⏱️ Durée du Séjour\n\nCombien de jours vous prévoyez de rester dans le pays.\n\nExemple: 14 jours\nExemple: 30 jours\nExemple: 90 jours",
        de: "⏱️ Aufenthaltsdauer\n\nWie viele Tage Sie im Land bleiben möchten.\n\nBeispiel: 14 Tage\nBeispiel: 30 Tage\nBeispiel: 90 Tage",
      };
      return responses[lang] || responses.en;
    }

    // Email Address
    if (lowerQuery.includes("email")) {
      const responses: Record<string, string> = {
        en: "📧 Email Address\n\nYour active email address where you can receive important notifications about your application.\n\nExample: maria.garcia@email.com\nExample: john.smith123@gmail.com",
        es: "📧 Correo Electrónico\n\nSu dirección de correo electrónico activa donde puede recibir notificaciones importantes sobre su solicitud.\n\nEjemplo: maria.garcia@email.com\nEjemplo: juan.perez123@gmail.com",
        zh: "📧 电子邮件地址\n\n您的活跃电子邮件地址，可以接收有关您申请的重要通知。\n\n示例：maria.garcia@email.com\n示例：zhangsan123@gmail.com",
        pt: "📧 Endereço de Email\n\nSeu endereço de email ativo onde você pode receber notificações importantes sobre sua inscrição.\n\nExemplo: maria.garcia@email.com\nExemplo: joao.silva123@gmail.com",
        fr: "📧 Adresse Email\n\nVotre adresse email active où vous pouvez recevoir des notifications importantes concernant votre candidature.\n\nExemple: marie.dupont@email.com\nExemple: jean.martin123@gmail.com",
        de: "📧 E-Mail-Adresse\n\nIhre aktive E-Mail-Adresse, unter der Sie wichtige Benachrichtigungen zu Ihrer Bewerbung erhalten können.\n\nBeispiel: maria.mueller@email.com\nExemplo: hans.schmidt123@gmail.com",
      };
      return responses[lang] || responses.en;
    }

    // Phone Number
    if (lowerQuery.includes("phone") || lowerQuery.includes("telephone") || lowerQuery.includes("mobile")) {
      const responses: Record<string, string> = {
        en: "📱 Phone Number\n\nYour contact phone number with country code. Make sure it's a number where you can be reached.\n\nExample: +52 555 123 4567 (Mexico)\nExample: +1 202 555 0123 (USA)\nExample: +44 20 7123 4567 (UK)",
        es: "📱 Número de Teléfono\n\nSu número de teléfono de contacto con código de país. Asegúrese de que sea un número donde pueda ser contactado.\n\nEjemplo: +52 555 123 4567 (México)\nEjemplo: +34 91 123 4567 (España)\nEjemplo: +57 1 234 5678 (Colombia)",
        zh: "📱 电话号码\n\n您的联系电话号码及国家代码。确保这是一个可以联系到您的号码。\n\n示例：+86 10 1234 5678（中国）\n示例：+1 202 555 0123（美国）",
        pt: "📱 Número de Telefone\n\nSeu número de telefone de contato com código do país. Certifique-se de que seja um número onde você possa ser contactado.\n\nExemplo: +55 11 98765 4321 (Brasil)\nExemplo: +351 21 123 4567 (Portugal)",
        fr: "📱 Numéro de Téléphone\n\nVotre numéro de téléphone de contact avec l'indicatif du pays. Assurez-vous que c'est un numéro où vous pouvez être joint.\n\nExemple: +33 1 42 12 34 56 (France)\nExemple: +1 514 123 4567 (Canada)",
        de: "📱 Telefonnummer\n\nIhre Kontakttelefonnummer mit Ländervorwahl. Stellen Sie sicher, dass Sie unter dieser Nummer erreichbar sind.\n\nBeispiel: +49 30 1234 5678 (Deutschland)\nBeispiel: +43 1 234 5678 (Österreich)",
      };
      return responses[lang] || responses.en;
    }

    // Address
    if (lowerQuery.includes("address") || lowerQuery.includes("street") || lowerQuery.includes("residence")) {
      const responses: Record<string, string> = {
        en: "🏠 Address\n\nYour complete residential address including street, city, state/province, and postal code.\n\nExample: 123 Main Street, Apt 4B, New York, NY 10001, USA\nExample: Calle Principal 456, Col. Centro, Ciudad de México, 06000, México",
        es: "🏠 Dirección\n\nSu dirección residencial completa incluyendo calle, ciudad, estado/provincia y código postal.\n\nEjemplo: Calle Principal 456, Col. Centro, Ciudad de México, 06000, México\nEjemplo: Av. Libertador 789, Depto 5C, Buenos Aires, C1001, Argentina",
        zh: "🏠 地址\n\n您的完整居住地址，包括街道、城市、州/省和邮政编码。\n\n示例：北京市朝阳区建国路123号4单元5层，100020，中国\n示例：上海市浦东新区世纪大道456号，200120，中国",
        pt: "🏠 Endereço\n\nSeu endereço residencial completo incluindo rua, cidade, estado e código postal.\n\nExemplo: Rua Principal 123, Apto 4B, São Paulo, SP 01000-000, Brasil\nExemplo: Avenida Central 456, Lisboa, 1000-001, Portugal",
        fr: "🏠 Adresse\n\nVotre adresse résidentielle complète comprenant la rue, la ville, l'état/province et le code postal.\n\nExemple: 123 Rue Principale, Appt 4B, Paris, 75001, France\nExemple: 456 Avenue Central, Montréal, QC H1A 1A1, Canada",
        de: "🏠 Adresse\n\nIhre vollständige Wohnadresse einschließlich Straße, Stadt, Bundesland und Postleitzahl.\n\nBeispiel: Hauptstraße 123, Wohnung 4B, Berlin, 10115, Deutschland\nBeispiel: Zentrale Allee 456, Wien, 1010, Österreich",
      };
      return responses[lang] || responses.en;
    }

    // School/University Name
    if ((lowerQuery.includes("school") && lowerQuery.includes("name")) || lowerQuery.includes("university") || lowerQuery.includes("college")) {
      const responses: Record<string, string> = {
        en: "🎓 School/University Name\n\nThe full official name of your educational institution.\n\nExample: Harvard University\nExample: Universidad Nacional Autónoma de México\nExample: Massachusetts Institute of Technology (MIT)",
        es: "🎓 Nombre de la Escuela/Universidad\n\nEl nombre oficial completo de su institución educativa.\n\nEjemplo: Universidad Nacional Autónoma de México\nEjemplo: Instituto Tecnológico de Monterrey\nEjemplo: Universidad de Buenos Aires",
        zh: "🎓 学校/大学名称\n\n您教育机构的完整官方名称。\n\n示例：北京大学\n示例：清华大学\n示例：复旦大学",
        pt: "🎓 Nome da Escola/Universidade\n\nO nome oficial completo da sua instituição educacional.\n\nExemplo: Universidade de São Paulo\nExemplo: Universidade Federal do Rio de Janeiro\nExemplo: Universidade de Lisboa",
        fr: "🎓 Nom de l'École/Université\n\nLe nom officiel complet de votre établissement d'enseignement.\n\nExemple: Université Paris-Sorbonne\nExemplo: Université McGill\nExemple: École Polytechnique",
        de: "🎓 Name der Schule/Universität\n\nDer vollständige offizielle Name Ihrer Bildungseinrichtung.\n\nBeispiel: Ludwig-Maximilians-Universität München\nBeispiel: Technische Universität Berlin\nBeispiel: Universität Wien",
      };
      return responses[lang] || responses.en;
    }

    // Student ID
    if ((lowerQuery.includes("student") && lowerQuery.includes("id")) || lowerQuery.includes("student number")) {
      const responses: Record<string, string> = {
        en: "🆔 Student ID Number\n\nYour unique identification number assigned by your school or university.\n\nExample: S12345678\nExample: 2024-A-001234\nExample: STU-2024-09876",
        es: "🆔 Número de Identificación Estudiantil\n\nSu número de identificación único asignado por su escuela o universidad.\n\nEjemplo: S12345678\nEjemplo: 2024-A-001234\nEjemplo: EST-2024-09876",
        zh: "🆔 学生证号码\n\n您的学校或大学分配给您的唯一识别号码。\n\n示例：S12345678\n示例：2024-A-001234\n示例：学号-2024-09876",
        pt: "🆔 Número de Identificação de Estudante\n\nSeu número de identificação único atribuído pela sua escola ou universidade.\n\nExemplo: S12345678\nExemplo: 2024-A-001234\nExemplo: EST-2024-09876",
        fr: "🆔 Numéro d'Identification Étudiant\n\nVotre numéro d'identification unique attribué par votre école ou université.\n\nExemple: S12345678\nExemple: 2024-A-001234\nExemple: ETU-2024-09876",
        de: "🆔 Studentenausweisnummer\n\nIhre eindeutige Identifikationsnummer, die von Ihrer Schule oder Universität vergeben wurde.\n\nBeispiel: S12345678\nBeispiel: 2024-A-001234\nBeispiel: STU-2024-09876",
      };
      return responses[lang] || responses.en;
    }

    // Degree Level
    if (lowerQuery.includes("degree") || (lowerQuery.includes("level") && lowerQuery.includes("study"))) {
      const responses: Record<string, string> = {
        en: "🎯 Degree Level\n\nThe type of degree or program you are pursuing.\n\nExample: Bachelor's Degree\nExample: Master's Degree\nExample: PhD/Doctorate\nExample: Associate Degree\nExample: Certificate Program",
        es: "🎯 Nivel de Título\n\nEl tipo de título o programa que está cursando.\n\nEjemplo: Licenciatura\nEjemplo: Maestría\nEjemplo: Doctorado\nEjemplo: Técnico Superior\nEjemplo: Programa de Certificado",
        zh: "🎯 学位级别\n\n您正在攻读的学位或项目类型。\n\n示例：学士学位\n示例：硕士学位\n示例：博士学位\n示例：专科学位\n示例：证书课程",
        pt: "🎯 Nível de Graduação\n\nO tipo de diploma ou programa que você está cursando.\n\nExemplo: Bacharelado\nExemplo: Mestrado\nExemplo: Doutorado\nExemplo: Tecnólogo\nExemplo: Programa de Certificado",
        fr: "🎯 Niveau de Diplôme\n\nLe type de diplôme ou de programme que vous poursuivez.\n\nExemple: Licence\nExemple: Master\nExemple: Doctorat\nExemple: DUT\nExemple: Programme de Certificat",
        de: "🎯 Abschlussniveau\n\nDie Art des Abschlusses oder Programms, das Sie anstreben.\n\nBeispiel: Bachelor-Abschluss\nBeispiel: Master-Abschluss\nBeispiel: Promotion\nBeispiel: Associate Degree\nBeispiel: Zertifikatsprogramm",
      };
      return responses[lang] || responses.en;
    }

    // Major / Field of Study
    if (lowerQuery.includes("major") || (lowerQuery.includes("field") && lowerQuery.includes("study"))) {
      const responses: Record<string, string> = {
        en: "📚 Major/Field of Study\n\nYour area of academic specialization or the subject you are studying.\n\nExample: Computer Science\nExample: International Business\nExample: Mechanical Engineering\nExample: Psychology\nExample: Environmental Science",
        es: "📚 Carrera/Campo de Estudio\n\nSu área de especialización académica o la materia que está estudiando.\n\nEjemplo: Ciencias de la Computación\nEjemplo: Negocios Internacionales\nEjemplo: Ingeniería Mecánica\nEjemplo: Psicología\nEjemplo: Ciencias Ambientales",
        zh: "📚 专业/研究领域\n\n您的学术专业领域或正在学习的科目。\n\n示例：计算机科学\n示例：国际商务\n示例：机械工程\n示例：心理学\n示例：环境科学",
        pt: "📚 Curso/Área de Estudo\n\nSua área de especialização acadêmica ou o assunto que você está estudando.\n\nExemplo: Ciência da Computação\nExemplo: Negócios Internacionais\nExemplo: Engenharia Mecânica\nExemplo: Psicologia\nExemplo: Ciências Ambientais",
        fr: "📚 Majeure/Domaine d'Études\n\nVotre domaine de spécialisation académique ou le sujet que vous étudiez.\n\nExemple: Informatique\nExemple: Commerce International\nExemple: Génie Mécanique\nExemple: Psychologie\nExemple: Sciences de l'Environnement",
        de: "📚 Hauptfach/Studienbereich\n\nIhr akademischer Spezialisierungsbereich oder das Fach, das Sie studieren.\n\nBeispiel: Informatik\nBeispiel: Internationales Geschäft\nBeispiel: Maschinenbau\nBeispiel: Psychologie\nBeispiel: Umweltwissenschaften",
      };
      return responses[lang] || responses.en;
    }

    // Program Start/End Dates
    if (lowerQuery.includes("program") && (lowerQuery.includes("start") || lowerQuery.includes("end") || lowerQuery.includes("date"))) {
      const responses: Record<string, string> = {
        en: "📅 Program Start/End Date\n\nThe dates when your academic program begins and is expected to end.\n\nStart Date Example: August 25, 2024\nEnd Date Example: May 15, 2028\n\nFor graduate programs:\nStart: September 1, 2024\nEnd: June 30, 2026",
        es: "📅 Fecha de Inicio/Fin del Programa\n\nLas fechas en que comienza su programa académico y se espera que termine.\n\nEjemplo de Fecha de Inicio: 25 de agosto de 2024\nEjemplo de Fecha de Fin: 15 de mayo de 2028\n\nPara programas de posgrado:\nInicio: 1 de septiembre de 2024\nFin: 30 de junio de 2026",
        zh: "📅 项目开始/结束日期\n\n您的学术项目开始和预计结束的日期。\n\n开始日期示例：2024年8月25日\n结束日期示例：2028年5月15日\n\n研究生项目：\n开始：2024年9月1日\n结束：2026年6月30日",
        pt: "📅 Data de Início/Término do Programa\n\nAs datas em que seu programa acadêmico começa e deve terminar.\n\nExemplo de Data de Início: 25 de agosto de 2024\nExemplo de Data de Término: 15 de maio de 2028\n\nPara programas de pós-graduação:\nInício: 1 de setembro de 2024\nTérmino: 30 de junho de 2026",
        fr: "📅 Date de Début/Fin du Programme\n\nLes dates auxquelles votre programme académique commence et devrait se terminer.\n\nExemple de Date de Début: 25 août 2024\nExemple de Date de Fin: 15 mai 2028\n\nPour les programmes d'études supérieures:\nDébut: 1er septembre 2024\nFin: 30 juin 2026",
        de: "📅 Programm-Start-/Enddatum\n\nDie Daten, an denen Ihr akademisches Programm beginnt und voraussichtlich endet.\n\nBeispiel Startdatum: 25. August 2024\nBeispiel Enddatum: 15. Mai 2028\n\nFür Graduiertenprogramme:\nStart: 1. September 2024\nEnde: 30. Juni 2026",
      };
      return responses[lang] || responses.en;
    }

    // Default response
    const responses: Record<string, string> = {
      en: "I'm here to help! Select any text in the form (like 'Full Name' or 'Date of Birth') to get a detailed explanation with examples. You can also use 'Check My Form' to review what you've filled in.",
      es: "¡Estoy aquí para ayudar! Selecciona cualquier texto en el formulario (como 'Nombre Completo' o 'Fecha de Nacimiento') para obtener una explicación detallada con ejemplos. También puedes usar 'Verificar Mi Formulario' para revisar lo que has completado.",
      zh: "我在这里帮助您！选择表单中的任何文本（如\"完整姓名\"或\"出生日期\"）以获取详细的解释和示例。您也可以使用\"检查我的表格\"来查看您填写的内容。",
      pt: "Estou aqui para ajudar! Selecione qualquer texto no formulário (como 'Nome Completo' ou 'Data de Nascimento') para obter uma explicação detalhada com exemplos. Você também pode usar 'Verificar Meu Formulário' para revisar o que preencheu.",
      fr: "Je suis là pour vous aider! Sélectionnez n'importe quel texte dans le formulaire (comme 'Nom Complet' ou 'Date de Naissance') pour obtenir une explication détaillée avec des exemples. Vous pouvez également utiliser 'Vérifier Mon Formulaire' pour examiner ce que vous avez rempli.",
      de: "Ich bin hier, um zu helfen! Wählen Sie einen beliebigen Text im Formular aus (wie 'Vollständiger Name' oder 'Geburtsdatum'), um eine detaillierte Erklärung mit Beispielen zu erhalten. Sie können auch 'Mein Formular prüfen' verwenden, um zu überprüfen, was Sie ausgefüllt haben.",
      ar: "أنا هنا للمساعدة! حدد أي نص في النموذج (مثل 'الاسم الكامل' أو 'تاريخ الميلاد') للحصول على شرح مفصل مع أمثلة. يمكنك أيضًا استخدام 'التحقق من النموذج' لمراجعة ما قمت بملئه.",
      hi: "मैं मदद के लिए यहाँ हूँ! विस्तृत स्पष्टीकरण और उदाहरणों के लिए फॉर्म में किसी भी टेक्स्ट (जैसे 'पूरा नाम' या 'जन्म तिथि') का चयन करें। आप अपने द्वारा भरी गई जानकारी की समीक्षा करने के लिए 'मेरा फॉर्म जांचें' का भी उपयोग कर सकते हैं।",
    };

    return responses[lang] || responses.en;
  };

  useEffect(() => {
    if (selectedText && selectedText.trim()) {
      const userMessage: Message = { role: "user", content: selectedText };
      setMessages([userMessage]);
      
      setIsTyping(true);
      
      // Use hardcoded responses only (no AI calls)
      const fallback = getMockResponse(selectedText, language);
      setMessages([userMessage, { role: "assistant", content: fallback }]);
      setIsTyping(false);
    }
  }, [selectedText, language]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    const inputText = input;
    setInput("");

    // Check if user is reporting an error and highlight the field
    checkAndHighlightField(inputText);

    setIsTyping(true);
    
    // Use hardcoded responses only (no AI calls)
    const response = getMockResponse(inputText, language);
    setMessages(prev => [...prev, { role: "assistant", content: response }]);
    
    setIsTyping(false);
  };

  const handleQuickTranslate = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant") {
      setInput("Translate to " + languages.find(l => l.code === language)?.name);
      handleSend();
    }
  };

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[520px] min-h-0 shadow-2xl border-2 border-primary/20 flex flex-col z-50 animate-in slide-in-from-bottom-5 duration-300">
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
        <div className="space-y-3 p-4">
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
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border space-y-2 flex-shrink-0 bg-background/50">
        
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
