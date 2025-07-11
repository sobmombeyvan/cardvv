
import React from 'react';
import { Card } from "@/components/ui/card";

const VirtualCard = () => {
  return (
    <div className="perspective-1000">
      <Card className="relative w-80 h-48 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 border-0 rounded-2xl shadow-2xl animate-float hover:animate-spin-slow transition-all duration-1000 transform-gpu">
        {/* Card Content */}
        <div className="absolute inset-0 p-6 text-white">
          {/* Chip */}
          <div className="w-12 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md mb-4 shadow-lg"></div>
          
          {/* Card Number */}
          <div className="space-y-4">
            <div className="font-mono text-lg tracking-wider">
              **** **** **** 1234
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-75 uppercase tracking-wide">Titulaire</p>
                <p className="font-semibold">John Doe</p>
              </div>
              <div>
                <p className="text-xs opacity-75 uppercase tracking-wide">Exp</p>
                <p className="font-semibold">12/27</p>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="absolute top-6 right-6">
            <div className="text-2xl font-bold">VC</div>
          </div>
        </div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
        </div>

        {/* Holographic Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer rounded-2xl"></div>
      </Card>
    </div>
  );
};

export default VirtualCard;
