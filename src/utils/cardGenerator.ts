export interface GeneratedCard {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

// Generate a random valid-looking credit card number
export const generateCardNumber = (): string => {
  // Using 4000 prefix for Visa test cards
  const prefix = '4000';
  let cardNumber = prefix;
  
  // Generate remaining 12 digits
  for (let i = 0; i < 12; i++) {
    cardNumber += Math.floor(Math.random() * 10);
  }
  
  // Format as groups of 4
  return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
};

// Generate expiry date (2-5 years from now)
export const generateExpiryDate = (): string => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  // Add 2-5 years to current year
  const expiryYear = currentYear + Math.floor(Math.random() * 4) + 2;
  // Random month 1-12
  const expiryMonth = Math.floor(Math.random() * 12) + 1;
  
  // Format as MM/YY
  const monthStr = expiryMonth.toString().padStart(2, '0');
  const yearStr = expiryYear.toString().slice(-2);
  
  return `${monthStr}/${yearStr}`;
};

// Generate 3-digit CVV
export const generateCVV = (): string => {
  return Math.floor(Math.random() * 900 + 100).toString();
};

// Generate complete card details
export const generateCardDetails = (): GeneratedCard => {
  return {
    cardNumber: generateCardNumber(),
    expiryDate: generateExpiryDate(),
    cvv: generateCVV()
  };
};