import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, User, Mail, Lock, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      navigate('/dashboard');
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result: { error: any, autoLoggedIn?: boolean } = await signUp(email, password, fullName);
    setIsLoading(false);
    if (result && result.autoLoggedIn) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CreditCard className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">VirtuCard Pro</span>
          </div>
          <p className="text-gray-300">Accédez à votre compte ou créez-en un nouveau</p>
        </div>

        <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 border-purple-500/20 backdrop-blur">
          <Tabs defaultValue="signin" className="p-6">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800 border-purple-500/20">
              <TabsTrigger value="signin" className="text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Connexion
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Inscription
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="mt-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-white flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-white flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Mot de passe
                  </Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isLoading ? "Connexion..." : "Se connecter"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="mt-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-white flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nom complet
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-white flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-white flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Mot de passe
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    minLength={6}
                    required
                  />
                  <p className="text-xs text-gray-400">
                    Minimum 6 caractères
                  </p>
                </div>
                
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isLoading ? "Création du compte..." : "Créer mon compte"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;