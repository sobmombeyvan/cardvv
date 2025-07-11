import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CreditCard, Check, X, Eye, EyeOff, Search, Users, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UserCard from "@/components/UserCard";

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

const Admin = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCardDetails, setShowCardDetails] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    // Load all cards from localStorage (in real app this would be from admin database)
    const savedCards = localStorage.getItem('userCards');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    } else {
      // Add some sample data for testing
      const sampleCards: CardData[] = [
        {
          id: 'card_1',
          cardNumber: '4111111111111111',
          expiryDate: '12/25',
          cvv: '123',
          holderName: 'John Doe',
          balance: 10,
          status: 'pending' as const,
          createdAt: new Date().toISOString(),
          userId: 'user_1'
        },
        {
          id: 'card_2',
          cardNumber: '4222222222222222',
          expiryDate: '01/26',
          cvv: '456',
          holderName: 'Jane Smith',
          balance: 10,
          status: 'validated' as const,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          userId: 'user_2'
        }
      ];
      setCards(sampleCards);
      localStorage.setItem('userCards', JSON.stringify(sampleCards));
    }
  }, []);

  const handleValidateCard = (cardId: string) => {
    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, status: 'validated' as const } : card
    );
    setCards(updatedCards);
    localStorage.setItem('userCards', JSON.stringify(updatedCards));
    toast({
      title: "Carte validée",
      description: "La carte a été validée avec succès. L'utilisateur peut maintenant la débloquer.",
    });
  };

  const handleRejectCard = (cardId: string) => {
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
    localStorage.setItem('userCards', JSON.stringify(updatedCards));
    toast({
      title: "Carte rejetée",
      description: "La carte a été supprimée du système.",
      variant: "destructive",
    });
  };

  const handleUnlockCard = (cardId: string) => {
    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, status: 'unlocked' as const } : card
    );
    setCards(updatedCards);
    localStorage.setItem('userCards', JSON.stringify(updatedCards));
    toast({
      title: "Carte activée et 10$ débloqués",
      description: "La carte a été activée avec succès et 10$ ont été débloqués. L'utilisateur peut maintenant l'utiliser.",
    });
  };

  const handleBlockCard = (cardId: string) => {
    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, status: 'blocked' as const } : card
    );
    setCards(updatedCards);
    localStorage.setItem('userCards', JSON.stringify(updatedCards));
    toast({
      title: "Carte bloquée",
      description: "La carte a été bloquée avec succès. L'utilisateur ne peut plus l'utiliser.",
      variant: "destructive",
    });
  };

  const handleUnblockCard = (cardId: string) => {
    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, status: 'unlocked' as const } : card
    );
    setCards(updatedCards);
    localStorage.setItem('userCards', JSON.stringify(updatedCards));
    toast({
      title: "Carte débloquée",
      description: "La carte a été débloquée avec succès. L'utilisateur peut maintenant l'utiliser.",
    });
  };

  const handleDeleteCard = (cardId: string) => {
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
    localStorage.setItem('userCards', JSON.stringify(updatedCards));
    toast({
      title: "Carte supprimée",
      description: "La carte a été définitivement supprimée du système.",
      variant: "destructive",
    });
  };

  const toggleCardDetails = (cardId: string) => {
    setShowCardDetails(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const filteredCards = cards.filter(card =>
    card.holderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.cardNumber.includes(searchTerm) ||
    card.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 border-b border-red-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-7xl mx-auto space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-red-400" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Panel Administrateur</h1>
              <p className="text-sm sm:text-base text-red-300">Gestion des cartes bancaires</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="destructive" className="bg-red-600 text-xs sm:text-sm">
              Admin
            </Badge>
            <Button
              onClick={() => {
                // Test function to add a sample card
                const newCard: CardData = {
                  id: `test_${Date.now()}`,
                  cardNumber: '5555555555555555',
                  expiryDate: '12/25',
                  cvv: '789',
                  holderName: 'Test User',
                  balance: 10,
                  status: 'pending',
                  createdAt: new Date().toISOString(),
                  userId: 'test_user'
                };
                const updatedCards = [...cards, newCard];
                setCards(updatedCards);
                localStorage.setItem('userCards', JSON.stringify(updatedCards));
                toast({
                  title: "Carte de test ajoutée",
                  description: "Une nouvelle carte de test a été ajoutée pour démonstration.",
                });
              }}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">+ Test Card</span>
              <span className="sm:hidden">+ Test</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Instructions */}
          <Card className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-blue-500/20 p-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-2">Instructions Admin</h3>
            <div className="text-sm text-gray-300 space-y-1">
              <p>• <strong>Valider</strong> : Approuve une carte en attente</p>
              <p>• <strong>Activer</strong> : Active une carte validée après recharge 3500 FCFA et débloque 10$</p>
              <p>• <strong>Bloquer</strong> : Désactive une carte (utilisateur ne peut plus l'utiliser)</p>
              <p>• <strong>Débloquer</strong> : Réactive une carte bloquée</p>
              <p>• <strong>Supprimer</strong> : Supprime définitivement une carte du système</p>
              <p>• <strong>Rejeter</strong> : Supprime une carte en attente du système</p>
              <p>• <strong>+ Test Card</strong> : Ajoute une carte de test pour démonstration</p>
            </div>
            <div className="mt-4 p-3 bg-gray-800/50 rounded border border-gray-600">
              <h4 className="text-white font-semibold mb-2">Actions par statut :</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-yellow-400">🟡 En attente:</span> Valider, Rejeter, Supprimer</div>
                <div><span className="text-blue-400">🔵 Validée:</span> Activer, Bloquer, Supprimer</div>
                <div><span className="text-green-400">🟢 Active:</span> Bloquer, Supprimer</div>
                <div><span className="text-red-400">🔴 Bloquée:</span> Débloquer, Supprimer</div>
              </div>
            </div>
          </Card>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-gradient-to-br from-red-900/50 to-pink-900/50 border-red-500/20 p-4 sm:p-6">
              <div className="text-center">
                <p className="text-gray-300 text-xs sm:text-sm">Total des cartes</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{cards.length}</p>
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-500/20 p-4 sm:p-6">
              <div className="text-center">
                <p className="text-gray-300 text-xs sm:text-sm">En attente</p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">{cards.filter(c => c.status === 'pending').length}</p>
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-blue-500/20 p-4 sm:p-6">
              <div className="text-center">
                <p className="text-gray-300 text-xs sm:text-sm">Validées</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-400">{cards.filter(c => c.status === 'validated').length}</p>
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20 p-4 sm:p-6">
              <div className="text-center">
                <p className="text-gray-300 text-xs sm:text-sm">Actives</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-400">{cards.filter(c => c.status === 'unlocked').length}</p>
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-red-500/20 p-4 sm:p-6 col-span-2 sm:col-span-1">
              <div className="text-center">
                <p className="text-gray-300 text-xs sm:text-sm">Bloquées</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-400">{cards.filter(c => c.status === 'blocked').length}</p>
              </div>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                placeholder="Rechercher par nom, numéro de carte ou statut..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Cards List */}
          {filteredCards.length === 0 ? (
            <Card className="bg-gradient-to-br from-red-900/50 to-pink-900/50 border-red-500/20 p-12 text-center">
              <CreditCard className="h-16 w-16 text-red-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-white mb-2">Aucune carte trouvée</h3>
              <p className="text-gray-300">Aucune carte ne correspond à votre recherche</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredCards.map((card) => (
                <Card key={card.id} className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border-red-500/20 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <Badge className={`${getStatusColor(card.status)} text-white`}>
                        {getStatusText(card.status)}
                      </Badge>
                      <div>
                        <h3 className="text-lg font-bold text-white">{card.holderName}</h3>
                        <p className="text-gray-300 text-sm">
                          Créée le: {new Date(card.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => toggleCardDetails(card.id)}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300"
                      >
                        {showCardDetails[card.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      {card.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => handleValidateCard(card.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Valider
                          </Button>
                          <Button
                            onClick={() => handleRejectCard(card.id)}
                            size="sm"
                            variant="destructive"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Rejeter
                          </Button>
                        </>
                      )}
                      {card.status === 'validated' && (
                        <Button
                          onClick={() => handleUnlockCard(card.id)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <CreditCard className="h-4 w-4 mr-1" />
                          Activer
                        </Button>
                      )}
                      {(card.status === 'unlocked' || card.status === 'validated') && (
                        <Button
                          onClick={() => handleBlockCard(card.id)}
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          <Lock className="h-4 w-4 mr-1" />
                          Bloquer
                        </Button>
                      )}
                      {card.status === 'blocked' && (
                        <Button
                          onClick={() => handleUnblockCard(card.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CreditCard className="h-4 w-4 mr-1" />
                          Débloquer
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDeleteCard(card.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </div>

                  {showCardDetails[card.id] && (
                    <div className="grid lg:grid-cols-2 gap-6 mt-6 pt-6 border-t border-red-500/20">
                      <div>
                        <UserCard card={card} showSensitive={true} />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white font-semibold mb-2">Détails de la carte</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Numéro:</span>
                              <span className="text-white font-mono">{card.cardNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Expiration:</span>
                              <span className="text-white">{card.expiryDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">CVV:</span>
                              <span className="text-white">{card.cvv}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Solde:</span>
                              <span className="text-green-400 font-bold">${card.balance}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;