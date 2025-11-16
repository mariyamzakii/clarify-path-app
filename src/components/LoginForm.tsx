import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface LoginFormProps {
  onLogin: (email: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onLogin(email);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-8 shadow-soft bg-gradient-card border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
        Welcome to Documate
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" size="lg">
          Log In
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;
