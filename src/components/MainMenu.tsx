import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FolderOpen, Camera } from "lucide-react";

interface MainMenuProps {
  onUploadClick: () => void;
  onBrowseClick: () => void;
  onCameraClick: () => void;
}

const MainMenu = ({ onUploadClick, onBrowseClick, onCameraClick }: MainMenuProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
        What would you like to do?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="p-8 shadow-soft bg-gradient-card border-border hover:shadow-medium transition-all cursor-pointer flex flex-col"
          onClick={onUploadClick}
        >
          <div className="flex flex-col items-center text-center space-y-4 flex-1">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Upload Document</h3>
            <p className="text-muted-foreground flex-1">
              Upload a document to translate or get assistance with
            </p>
            <Button className="w-full mt-auto">Get Started</Button>
          </div>
        </Card>

        <Card 
          className="p-8 shadow-soft bg-gradient-card border-border hover:shadow-medium transition-all cursor-pointer flex flex-col"
          onClick={onCameraClick}
        >
          <div className="flex flex-col items-center text-center space-y-4 flex-1">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Take a Photo</h3>
            <p className="text-muted-foreground flex-1">
              Use your camera to capture documents instantly
            </p>
            <Button className="w-full mt-auto">Open Camera</Button>
          </div>
        </Card>

        <Card 
          className="p-8 shadow-soft bg-gradient-card border-border hover:shadow-medium transition-all cursor-pointer flex flex-col"
          onClick={onBrowseClick}
        >
          <div className="flex flex-col items-center text-center space-y-4 flex-1">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <FolderOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Browse Forms</h3>
            <p className="text-muted-foreground flex-1">
              Select from visa, citizenship, and other document forms
            </p>
            <Button className="w-full mt-auto">Browse</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MainMenu;
