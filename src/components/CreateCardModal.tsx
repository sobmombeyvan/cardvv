import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, User, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateCardDetails } from "@/utils/cardGenerator";
import { useAuth } from "@/context/AuthContext";

interface CardData {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  holderName: string;
  balance: number;
  status: 'pending' | 'validated' | 'unlocked' | 'blocked';
  createdAt: string;
}

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCardCreated?: (card: CardData) => void;
}

const CreateCardModal: React.FC<CreateCardModalProps> = ({ isOpen, onClose, onCardCreated }) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre nom",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Open Fapshi payment link in new tab
    window.open('https://checkout.fapshi.com/link/23591742', '_blank');
    
    // Simulate payment processing
    setTimeout(() => {
      // Generate card details
      const cardDetails = generateCardDetails();
      const newCard: CardData & { userId: string } = {
        id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
        expiryDate: cardDetails.expiryDate,
        cvv: cardDetails.cvv,
        holderName: name.trim(),
        balance: 10, // Free $10 credit
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId: user?.id || '',
      };

      // Call parent callback if provided
      if (onCardCreated) {
        onCardCreated(newCard);
      }

      // Show payment confirmation message with WhatsApp redirect
      toast({
        title: "Paiement effectué !",
        description: "Carte créée ! Envoyez votre capture de paiement sur WhatsApp pour activation.",
      });

      // Redirect to WhatsApp after a short delay
      setTimeout(() => {
        const whatsappMessage = encodeURIComponent(
          `Bonjour, je viens d'effectuer le paiement de 1000 FCFA pour ma carte bancaire virtuelle. Voici ma capture de paiement.`
        );
        window.open(`https://wa.me/237679763835?text=${whatsappMessage}`, '_blank');
      }, 3000);
      
      setName('');
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md bg-gradient-to-br from-slate-900 to-purple-900 border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white text-lg sm:text-xl">
            <CreditCard className="h-5 w-5" />
            <span className="hidden sm:inline">Créer une nouvelle carte</span>
            <span className="sm:hidden">Créer une carte</span>
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-sm">
            Payez 1000 FCFA pour créer votre carte avec 10$ de crédit gratuit
          </DialogDescription>
        </DialogHeader>

        <div className="mb-6 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <DollarSign className="h-4 w-4" />
            <span className="font-semibold">Inclus avec votre carte:</span>
          </div>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• 10$ de crédit gratuit</li>
            <li>• Validation par l'administrateur</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white flex items-center gap-2">
              <User className="h-4 w-4" />
              Nom complet
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              required
            />
            <p className="text-xs text-gray-400">
              Ce nom apparaîtra sur votre carte bancaire virtuelle
            </p>
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm sm:text-base"
          >
            {isLoading ? (
              <span className="hidden sm:inline">Redirection vers le paiement...</span>
            ) : (
              <>
                <span className="hidden sm:inline">Payer 1000 FCFA et créer ma carte</span>
                <span className="sm:hidden">Payer 1000 FCFA</span>
              </>
            )}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-xs text-gray-400">
              Après paiement, envoyez votre capture sur WhatsApp pour activation
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
              onClick={() => {
                const whatsappMessage = encodeURIComponent(
                  `Bonjour, je viens d'effectuer le paiement de 1000 FCFA pour ma carte bancaire virtuelle. Voici ma capture de paiement.`
                );
                window.open(`https://wa.me/237679763835?text=${whatsappMessage}`, '_blank');
              }}
            >
              📱 Contacter WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCardModal;