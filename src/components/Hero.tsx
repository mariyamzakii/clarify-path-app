import { Button } from "@/components/ui/button";
import { Upload, Camera, FileText } from "lucide-react";

interface HeroProps {
  onUploadClick: () => void;
  onCameraClick: () => void;
  onTrackClick: () => void;
}

const Hero = ({ onUploadClick, onCameraClick, onTrackClick }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <FileText className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">AI-Powered Document Translation</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Documate
          </h1>
          
          <p className="text-xl md:text-2xl text-accent font-semibold mb-6">
            Your Document Buddy
          </p>
          
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Translate, explain and complete forms easily
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={onUploadClick}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-medium min-w-[200px] h-14 text-lg font-semibold transition-all hover:scale-105"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Document
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={onCameraClick}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 min-w-[200px] h-14 text-lg font-semibold transition-all hover:scale-105"
            >
              <Camera className="w-5 h-5 mr-2" />
              Take Photo
            </Button>

            <Button 
              size="lg"
              variant="outline"
              onClick={onTrackClick}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 min-w-[200px] h-14 text-lg font-semibold transition-all hover:scale-105"
            >
              <FileText className="w-5 h-5 mr-2" />
              Track Documents
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: FileText, title: "Complex Documents", desc: "Visa, FAFSA, legal forms" },
              { icon: Camera, title: "Instant Clarification", desc: "Photo capture for quick help" },
              { icon: Upload, title: "Track Progress", desc: "Monitor your translations" }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <feature.icon className="w-8 h-8 text-accent mb-3" />
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
