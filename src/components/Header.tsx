import { User } from "lucide-react";
import { Card } from "@/components/ui/card";

interface HeaderProps {
  userName: string;
  onTitleDoubleClick: () => void;
}

const Header = ({ userName, onTitleDoubleClick }: HeaderProps) => {
  return (
    <div className="bg-gradient-hero py-6 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1
            className="text-3xl md:text-4xl font-bold text-white cursor-pointer"
            onDoubleClick={onTitleDoubleClick}
            title="Double-click to return home"
          >
            Documate
          </h1>
          <Card className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm border-white/20">
            <User className="w-5 h-5 text-white" />
            <div className="text-white">
              <p className="text-sm font-medium">Welcome back</p>
              <p className="text-lg font-bold">{userName}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Header;
