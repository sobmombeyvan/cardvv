
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, Shield, Zap, Users, ArrowRight, Star, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import VirtualCard from "@/components/VirtualCard";
import CreateCardModal from "@/components/CreateCardModal";

const Index = () => {
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      setIsCreateCardModalOpen(true);
    } else {
      navigate('/auth');
    }
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative z-50 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">VirtuCard Pro</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={handleDashboard}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Dashboard
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleLogin}
                variant="outline" 
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                Se connecter
              </Button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Créez votre
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> carte virtuelle </span>
              en quelques clics
            </h1>
            <div className="mb-4 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                <DollarSign className="h-6 w-6" />
                <span className="text-lg font-bold">10$ GRATUITS à la création !</span>
              </div>
              <p className="text-center text-green-300 text-sm">
                Chaque carte créée inclut automatiquement 10$ de crédit gratuit
              </p>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Sécurisée, instantanée et accessible partout. Profitez de la liberté financière avec nos cartes bancaires virtuelles nouvelle génération.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3"
              >
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white text-lg px-8 py-3"
              >
                En savoir plus
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <VirtualCard />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Pourquoi choisir VirtuCard Pro ?
            </h2>
            <p className="text-xl text-gray-300">
              Des fonctionnalités avancées pour une expérience bancaire moderne
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20 p-8 hover:scale-105 transition-transform duration-300">
              <Shield className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Sécurité maximale</h3>
              <p className="text-gray-300">
                Cryptage de niveau bancaire et authentification à deux facteurs pour protéger vos transactions.
              </p>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20 p-8 hover:scale-105 transition-transform duration-300">
              <Zap className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Création instantanée</h3>
              <p className="text-gray-300">
                Obtenez votre carte virtuelle en moins d'une minute après le paiement.
              </p>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20 p-8 hover:scale-105 transition-transform duration-300">
              <Users className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Support 24/7</h3>
              <p className="text-gray-300">
                Notre équipe d'experts est disponible 24h/24 pour vous accompagner.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Tarif simple et transparent
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Un seul prix, toutes les fonctionnalités incluses
          </p>
          
          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20 p-12 max-w-md mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Carte Virtuelle</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-purple-400">1000</span>
                <span className="text-xl text-gray-300 ml-2">FCFA</span>
              </div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <Star className="h-4 w-4 text-purple-400 mr-2" />
                  Carte virtuelle instantanée
                </li>
                <li className="flex items-center text-gray-300">
                  <DollarSign className="h-4 w-4 text-green-400 mr-2" />
                  10$ de crédit gratuit inclus
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="h-4 w-4 text-purple-400 mr-2" />
                  Paiements en ligne sécurisés
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="h-4 w-4 text-purple-400 mr-2" />
                  Support client 24/7
                </li>
              </ul>
              <Button 
                onClick={handleGetStarted}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3"
              >
                Obtenir ma carte
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-black/40">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CreditCard className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold text-white">VirtuCard Pro</span>
          </div>
          <p className="text-gray-400">
            © 2024 VirtuCard Pro. Tous droits réservés.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <CreateCardModal 
        isOpen={isCreateCardModalOpen} 
        onClose={() => setIsCreateCardModalOpen(false)}
      />
    </div>
  );
};

export default Index;
