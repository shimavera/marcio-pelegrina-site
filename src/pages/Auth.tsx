import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import drLuanMacielLogo from "@/assets/dr-luan-logo-login.webp";
import { ArrowLeft } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const CORRECT_PIN = "161041";

const Auth = () => {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePinComplete = (value: string) => {
    setPin(value);
    if (value.length === 6) {
      handleAuth(value);
    }
  };

  const handleAuth = async (pinValue: string) => {
    setLoading(true);

    // Simulate a small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (pinValue === CORRECT_PIN) {
      // Store authentication in sessionStorage
      sessionStorage.setItem("admin_authenticated", "true");
      
      toast({
        title: "Acesso autorizado!",
        description: "Redirecionando para o painel...",
      });
      
      navigate("/admin/blog");
    } else {
      toast({
        title: "PIN incorreto",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      setPin("");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Button
        variant="outline"
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 z-20 hover:bg-primary hover:text-white transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Voltar ao Site</span>
        <span className="sm:hidden">Voltar</span>
      </Button>

      <Card className="w-full max-w-md relative z-10 shadow-lg border-border/50">
        <CardHeader className="space-y-4 px-4 sm:px-6 pt-6 sm:pt-8">
          <div className="flex justify-center mb-2 sm:mb-4">
            <img src={drLuanMacielLogo} alt="Dr. Luan Maciel - Odontologia Avançada" className="h-12 sm:h-16 w-auto max-w-[280px] sm:max-w-[320px]" />
          </div>
          <CardTitle className="text-xl sm:text-2xl text-center font-kiona text-foreground">
            Acesso ao Sistema
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            Digite o PIN de 6 dígitos para acessar o painel
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6 sm:pb-8">
          <div className="flex flex-col items-center space-y-6">
            <InputOTP
              maxLength={6}
              value={pin}
              onChange={handlePinComplete}
              disabled={loading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            {loading && (
              <p className="text-sm text-muted-foreground">Verificando...</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
