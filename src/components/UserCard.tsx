import React from 'react';
import { Card } from "@/components/ui/card";
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
  userId: string; // Added userId to the interface
}

interface UserCardProps {
  card: CardData;
  showSensitive?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ card, showSensitive = false }) => {
  const { user } = useAuth();
  const maskCardNumber = (cardNumber: string) => {
    // Only show card details if card is unlocked or showSensitive is true
    if (card.status === 'unlocked' || showSensitive) {
      return cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
    }
    return '**** **** **** ****';
  };

  const getCardGradient = (status: string) => {
    switch (status) {
      case 'pending':
        return 'from-gray-600 via-gray-700 to-gray-800';
      case 'validated':
        return 'from-blue-600 via-blue-700 to-indigo-800';
      case 'unlocked':
        return 'from-purple-600 via-purple-700 to-pink-600';
      case 'blocked':
        return 'from-red-600 via-red-700 to-red-800';
      default:
        return 'from-gray-600 via-gray-700 to-gray-800';
    }
  };

  return (
    <div className="perspective-1000">
      <Card className={`relative w-full max-w-sm h-28 sm:h-32 bg-gradient-to-br ${getCardGradient(card.status)} border-0 rounded-2xl shadow-2xl transition-all duration-300 transform-gpu hover:scale-105`}>
        {/* Card Content */}
        <div className="absolute inset-0 p-3 sm:p-4 text-white">
          {/* Chip */}
          <div className="w-6 h-4 sm:w-8 sm:h-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md mb-2 shadow-lg"></div>
          
          {/* Card Number */}
          <div className="space-y-1 sm:space-y-2">
            <div className="font-mono text-xs sm:text-sm tracking-wider">
              {maskCardNumber(card.cardNumber)}
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-75 uppercase tracking-wide">Titulaire</p>
                <p className="font-semibold text-xs sm:text-sm">
                  {(card.userId && user && card.userId === user.id) || showSensitive || card.status === 'unlocked'
                    ? card.holderName
                    : 'XXXX XXXX'}
                </p>
              </div>
              <div>
                <p className="text-xs opacity-75 uppercase tracking-wide">Exp</p>
                <p className="font-semibold text-xs sm:text-sm">
                  {card.status === 'unlocked' || showSensitive ? card.expiryDate : 'XX/XX'}
                </p>
              </div>
              {(showSensitive || card.status === 'unlocked') && (
                <div>
                  <p className="text-xs opacity-75 uppercase tracking-wide">CVV</p>
                  <p className="font-semibold text-xs sm:text-sm">{card.cvv}</p>
                </div>
              )}
            </div>
          </div>

          {/* Logo */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <div className="text-sm sm:text-lg font-bold">VC</div>
          </div>
        </div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
        </div>

        {/* Holographic Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer rounded-2xl"></div>
      </Card>
    </div>
  );
};

export default UserCard;