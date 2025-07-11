import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, LogOut, DollarSign, Clock, CheckCircle, Lock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import UserCard from "@/components/UserCard";
import CreateCardModal from "@/components/CreateCardModal";

interface CardData {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  holderName: string;
  balance: number;
  status: 'pending' | 'validated' | 'unlocked' | 'blocked';
  createdAt: string;
  userId: string;
}

const Dashboard = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    // Load cards from localStorage (in real app this would be from database)
    const savedCards = localStorage.getItem('userCards');
    if (savedCards) {
      const allCards: CardData[] = JSON.parse(savedCards);
      setCards(allCards.filter(card => card.userId === user?.id));
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleCardCreated = (newCard: CardData) => {
    // Ajoute la carte à toutes les cartes du localStorage
    const savedCards = localStorage.getItem('userCards');
    const allCards: CardData[] = savedCards ? JSON.parse(savedCards) : [];
    const updatedAllCards = [...allCards, newCard];
    localStorage.setItem('userCards', JSON.stringify(updatedAllCards));
    // Mets à jour l'état local avec les cartes de l'utilisateur connecté
    setCards(updatedAllCards.filter(card => card.userId === user?.id));
    toast({
      title: "Carte créée avec succès !",
      description: "Votre carte est en attente de validation par l'administrateur.",
    });
  };

  const handleUnlockPayment = (cardId: string) => {
    // Open Fapshi unlock payment link
    window.open('https://checkout.fapshi.com/link/47542427', '_blank');
    
    // Show payment message with WhatsApp redirect
    toast({
      title: "Redirection vers la recharge",
      description: "Rechargez 3500 FCFA puis envoyez la capture sur WhatsApp pour activation de la carte et déblocage de 10$ par l'admin.",
    });

    // Redirect to WhatsApp after a short delay
    setTimeout(() => {
      const whatsappMessage = encodeURIComponent(
        `Bonjour, je viens d'effectuer la recharge de 3500 FCFA pour activer ma carte bancaire virtuelle et débloquer 10$. Voici ma capture de paiement.`
      );
      window.open(`https://wa.me/237679763835?text=${whatsappMessage}`, '_blank');
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'validated': return 'bg-blue-500';
      case 'unlocked': return 'bg-green-500';
      case 'blocked': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'validated': return 'Validée';
      case 'unlocked': return 'Active';
      case 'blocked': return 'Bloquée';
      default: return 'Inconnu';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'validated': return <CheckCircle className="h-4 w-4" />;
      case 'unlocked': return <CreditCard className="h-4 w-4" />;
      case 'blocked': return <Lock className="h-4 w-4" />;
      default: return <Lock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 border-b border-purple-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-7xl mx-auto space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Tableau de Bord</h1>
              <p className="text-sm sm:text-base text-purple-300">Bienvenue, {user?.email || 'Utilisateur'}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              onClick={handleLogout}
              variant="outline" 
              size="sm"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white text-xs sm:text-sm"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Déconnexion</span>
              <span className="sm:hidden">Déco</span>
            </Button>
          </div>
        </div>
        {/* Debug info - remove in production */}
        <div className="text-xs text-gray-400 mt-2 max-w-7xl mx-auto">
          Email: {user?.email} | Admin: {isAdmin ? 'Yes' : 'No'}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-xs sm:text-sm">Total des cartes</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{cards.length}</p>
                </div>
                <CreditCard className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-xs sm:text-sm">Solde total</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">${cards.reduce((sum, card) => sum + card.balance, 0)}</p>
                </div>
                <DollarSign className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20 p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-xs sm:text-sm">Cartes actives</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{cards.filter(card => card.status === 'unlocked').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
              </div>
            </Card>
          </div>

          {/* Action Button */}
          <div className="mb-6 sm:mb-8">
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Créer une nouvelle carte</span>
              <span className="sm:hidden">Créer une carte</span>
            </Button>
          </div>

          {/* Cards Grid */}
          {cards.length === 0 ? (
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20 p-6 sm:p-12 text-center">
              <CreditCard className="h-12 w-12 sm:h-16 sm:w-16 text-purple-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Aucune carte créée</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-6">Créez votre première carte bancaire virtuelle pour commencer</p>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <span className="hidden sm:inline">Créer ma première carte</span>
                <span className="sm:hidden">Créer ma première carte</span>
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {cards.map((card) => (
                <Card key={card.id} className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20 p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={`${getStatusColor(card.status)} text-white text-xs sm:text-sm`}>
                      {getStatusIcon(card.status)}
                      <span className="ml-1 hidden sm:inline">{getStatusText(card.status)}</span>
                      <span className="ml-1 sm:hidden">{getStatusText(card.status).substring(0, 3)}</span>
                    </Badge>
                    <div className="text-right">
                      <p className="text-gray-300 text-xs sm:text-sm">Solde</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-400">${card.balance}</p>
                    </div>
                  </div>
                  
                  <UserCard card={card} />
                  
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Créée le: {new Date(card.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                    
                    {card.status === 'validated' && (
                      <div className="space-y-2">
                        <Button 
                          onClick={() => handleUnlockPayment(card.id)}
                          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-xs sm:text-sm"
                        >
                          <span className="hidden sm:inline">Recharge 3500 FCFA pour activer la carte et débloquer 10$</span>
                          <span className="sm:hidden">Recharge 3500 FCFA</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                          onClick={() => {
                            const whatsappMessage = encodeURIComponent(
                              `Bonjour, j'ai une carte validée et je souhaite effectuer la recharge de 3500 FCFA pour activer ma carte et débloquer 10$.`
                            );
                            window.open(`https://wa.me/237679763835?text=${whatsappMessage}`, '_blank');
                          }}
                        >
                          📱 Contacter WhatsApp
                        </Button>
                      </div>
                    )}
                    
                    {card.status === 'pending' && (
                      <div className="space-y-2">
                        <p className="text-yellow-400 text-xs sm:text-sm">
                          <span className="hidden sm:inline">En attente de validation par l'administrateur</span>
                          <span className="sm:hidden">En attente de validation</span>
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                          onClick={() => {
                            const whatsappMessage = encodeURIComponent(
                              `Bonjour, je viens d'effectuer le paiement de 1000 FCFA pour ma carte bancaire virtuelle. Voici ma capture de paiement.`
                            );
                            window.open(`https://wa.me/237679763835?text=${whatsappMessage}`, '_blank');
                          }}
                        >
                          📱 Confirmer sur WhatsApp
                        </Button>
                      </div>
                    )}
                    
                    {card.status === 'unlocked' && (
                      <p className="text-green-400 text-sm">
                        ✓ Carte active et utilisable avec 10$ inclus
                      </p>
                    )}
                    
                    {card.status === 'blocked' && (
                      <div className="space-y-2">
                        <p className="text-red-400 text-sm">
                          ❌ Carte bloquée
                        </p>
                        <p className="text-xs text-gray-400">
                          Contactez le support pour plus d'informations
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Card Modal */}
      <CreateCardModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onCardCreated={handleCardCreated}
      />
    </div>
  );
};

export default Dashboard;