-- Create cards table for virtual card system
CREATE TABLE public.cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  card_number TEXT NOT NULL,
  expiry_date TEXT NOT NULL,
  cvv TEXT NOT NULL,
  holder_name TEXT NOT NULL,
  balance DECIMAL(10,2) DEFAULT 10.00,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'validated', 'unlocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- Create policies for cards
CREATE POLICY "Users can view their own cards" 
ON public.cards 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can create their own cards" 
ON public.cards 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own cards" 
ON public.cards 
FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all cards" 
ON public.cards 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Admins can update all cards" 
ON public.cards 
FOR UPDATE 
USING (is_admin());

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_cards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_cards_updated_at
BEFORE UPDATE ON public.cards
FOR EACH ROW
EXECUTE FUNCTION public.update_cards_updated_at();

-- Make sobmombeyvan@gmail.com an admin by updating their profile
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'sobmombeyvan@gmail.com';

-- If the profile doesn't exist, create it as admin
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  id, 
  email, 
  COALESCE(raw_user_meta_data->>'full_name', email), 
  'admin'
FROM auth.users 
WHERE email = 'sobmombeyvan@gmail.com'
AND NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE email = 'sobmombeyvan@gmail.com'
);

-- Create payment_logs table to track payments
CREATE TABLE public.payment_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id UUID REFERENCES public.cards(id) ON DELETE CASCADE,
  payment_type TEXT NOT NULL CHECK (payment_type IN ('creation', 'unlock')),
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  payment_url TEXT,
  whatsapp_confirmed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on payment_logs
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for payment_logs
CREATE POLICY "Users can view their own payment logs" 
ON public.payment_logs 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can create their own payment logs" 
ON public.payment_logs 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all payment logs" 
ON public.payment_logs 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Admins can update all payment logs" 
ON public.payment_logs 
FOR UPDATE 
USING (is_admin());