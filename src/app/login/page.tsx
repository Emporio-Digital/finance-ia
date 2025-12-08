'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Phone, Chrome, ArrowRight, Loader2 } from 'lucide-react';
import { signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithPhone, verifyOtp } from '@/lib/auth';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { data, error } = await signInWithEmail(email, password);
    
    if (error) {
      toast.error('Erro ao fazer login: ' + error.message);
    } else if (data.session) {
      toast.success('Login realizado com sucesso!');
      
      // Recarrega a página para atualizar a sessão
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    
    setIsLoading(false);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { data, error } = await signUpWithEmail(email, password);
    
    if (error) {
      toast.error('Erro ao criar conta: ' + error.message);
    } else {
      toast.success('Conta criada! Verifique seu email.');
    }
    
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogle();
    
    if (error) {
      toast.error('Erro ao fazer login com Google: ' + error.message);
      setIsLoading(false);
    }
    // O Google login redireciona automaticamente
  };

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!showOtpInput) {
      const { error } = await signInWithPhone(phone);
      
      if (error) {
        toast.error('Erro ao enviar código: ' + error.message);
      } else {
        toast.success('Código enviado para seu telefone!');
        setShowOtpInput(true);
      }
    } else {
      const { data, error } = await verifyOtp(phone, otp);
      
      if (error) {
        toast.error('Código inválido: ' + error.message);
      } else if (data.session) {
        toast.success('Login realizado com sucesso!');
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F1419] via-[#1A1A2E] to-[#16213E] p-4">
      <Card className="w-full max-w-md bg-[#1E1E2E]/80 backdrop-blur-sm border-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-white">
            Bem-vindo
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Faça login para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#2A2A3E]">
              <TabsTrigger value="email" className="data-[state=active]:bg-blue-600">
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="data-[state=active]:bg-blue-600">
                Telefone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4">
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-[#2A2A3E] border-gray-700 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-[#2A2A3E] border-gray-700 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Entrar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleEmailSignUp}
                    className="flex-1 border-gray-700 hover:bg-[#2A2A3E]"
                    disabled={isLoading}
                  >
                    Criar Conta
                  </Button>
                </div>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#1E1E2E] px-2 text-gray-400">Ou continue com</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-700 hover:bg-[#2A2A3E]"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <Chrome className="mr-2 h-5 w-5" />
                Google
              </Button>
            </TabsContent>

            <TabsContent value="phone" className="space-y-4">
              <form onSubmit={handlePhoneSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+55 11 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 bg-[#2A2A3E] border-gray-700 text-white placeholder:text-gray-500"
                      required
                      disabled={showOtpInput}
                    />
                  </div>
                </div>

                {showOtpInput && (
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-gray-300">Código de Verificação</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="bg-[#2A2A3E] border-gray-700 text-white placeholder:text-gray-500 text-center text-2xl tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : showOtpInput ? (
                    'Verificar Código'
                  ) : (
                    'Enviar Código'
                  )}
                </Button>

                {showOtpInput && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-white"
                    onClick={() => {
                      setShowOtpInput(false);
                      setOtp('');
                    }}
                  >
                    Voltar
                  </Button>
                )}
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
