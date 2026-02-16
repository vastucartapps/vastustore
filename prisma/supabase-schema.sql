-- VastuCart Product Reviews, Q&A, FAQs, and Wishlist Schema
-- This should be run in Supabase SQL editor

-- ═══════════════════════════════════════════════════════════════
-- Product Reviews Table
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id VARCHAR(255) NOT NULL, -- Medusa product ID
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_name VARCHAR(255) NOT NULL,
  reviewer_location VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(500) NOT NULL,
  text TEXT NOT NULL,
  is_verified_purchase BOOLEAN DEFAULT false,
  variant VARCHAR(255) NOT NULL DEFAULT '',
  photos TEXT[] DEFAULT '{}', -- Array of image URLs
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON product_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON product_reviews(created_at DESC);

-- ═══════════════════════════════════════════════════════════════
-- Product Questions (Customer Q&A) Table
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS product_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id VARCHAR(255) NOT NULL, -- Medusa product ID
  question TEXT NOT NULL,
  asked_by VARCHAR(255) NOT NULL,
  asked_at TIMESTAMPTZ DEFAULT NOW(),
  answer TEXT,
  answered_by VARCHAR(255),
  answered_at TIMESTAMPTZ,
  is_admin_answer BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_questions_product_id ON product_questions(product_id);
CREATE INDEX IF NOT EXISTS idx_questions_asked_at ON product_questions(asked_at DESC);

-- ═══════════════════════════════════════════════════════════════
-- Product FAQs (Admin-managed) Table
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS product_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id VARCHAR(255) NOT NULL, -- Medusa product ID
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  "order" INTEGER DEFAULT 0, -- Display order
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_faqs_product_id ON product_faqs(product_id);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON product_faqs("order");
CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON product_faqs(is_active);

-- ═══════════════════════════════════════════════════════════════
-- Wishlist Table
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id VARCHAR(255) NOT NULL, -- Medusa product ID
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id) -- Prevent duplicate wishlist entries
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product_id ON wishlists(product_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_created_at ON wishlists(created_at DESC);

-- ═══════════════════════════════════════════════════════════════
-- Row Level Security (RLS) Policies
-- ═══════════════════════════════════════════════════════════════

-- Reviews: Public read, authenticated write
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are viewable by everyone" ON product_reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON product_reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own reviews" ON product_reviews FOR UPDATE USING (auth.uid() = user_id);

-- Questions: Public read, anyone can ask, admins can answer
ALTER TABLE product_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions are viewable by everyone" ON product_questions FOR SELECT USING (true);
CREATE POLICY "Anyone can ask questions" ON product_questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can answer questions" ON product_questions FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- FAQs: Public read, admin write
ALTER TABLE product_faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "FAQs are viewable by everyone" ON product_faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage FAQs" ON product_faqs FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- Wishlist: Users can only see/manage their own wishlist
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own wishlist" ON wishlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to wishlist" ON wishlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove from wishlist" ON wishlists FOR DELETE USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════
-- Functions for automatic rating calculation
-- ═══════════════════════════════════════════════════════════════

-- Function to calculate rating breakdown for a product
CREATE OR REPLACE FUNCTION get_rating_breakdown(p_product_id VARCHAR)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'average', COALESCE(ROUND(AVG(rating)::numeric, 1), 0),
    'total', COUNT(*),
    'distribution', json_build_object(
      '5', COUNT(*) FILTER (WHERE rating = 5),
      '4', COUNT(*) FILTER (WHERE rating = 4),
      '3', COUNT(*) FILTER (WHERE rating = 3),
      '2', COUNT(*) FILTER (WHERE rating = 2),
      '1', COUNT(*) FILTER (WHERE rating = 1)
    )
  ) INTO result
  FROM product_reviews
  WHERE product_id = p_product_id;

  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ═══════════════════════════════════════════════════════════════
-- Payment Configuration Tables
-- ═══════════════════════════════════════════════════════════════

-- COD (Cash on Delivery) Configuration
CREATE TABLE IF NOT EXISTS cod_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_enabled BOOLEAN DEFAULT true,
  fee NUMERIC(10, 2) NOT NULL DEFAULT 50.00,
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  min_order_value NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
  max_order_value NUMERIC(10, 2) NOT NULL DEFAULT 50000.00,
  available_for_countries TEXT[] DEFAULT '{IN}', -- Array of country codes
  requires_authentication BOOLEAN DEFAULT true, -- Only logged-in users
  label VARCHAR(255) DEFAULT 'Cash on Delivery',
  fee_label VARCHAR(255) DEFAULT 'COD Charges',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prepaid Discount Configuration
CREATE TABLE IF NOT EXISTS prepaid_discount_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_enabled BOOLEAN DEFAULT true,
  discount_percentage NUMERIC(5, 2) NOT NULL DEFAULT 5.00, -- 5%
  max_discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
  min_order_value NUMERIC(10, 2) DEFAULT 500.00, -- Minimum order for discount
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  label VARCHAR(255) DEFAULT 'Save 5% on prepaid orders',
  description TEXT DEFAULT 'Get instant discount on online payment',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default configurations
INSERT INTO cod_config (is_enabled, fee, currency, min_order_value, max_order_value, available_for_countries, requires_authentication)
VALUES (true, 50.00, 'INR', 500.00, 50000.00, '{IN}', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO prepaid_discount_config (is_enabled, discount_percentage, max_discount_amount, min_order_value, currency)
VALUES (true, 5.00, 500.00, 500.00, 'INR')
ON CONFLICT (id) DO NOTHING;

-- Row Level Security for config tables (admin-only write, public read)
ALTER TABLE cod_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "COD config is viewable by everyone" ON cod_config FOR SELECT USING (true);
CREATE POLICY "Admins can manage COD config" ON cod_config FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

ALTER TABLE prepaid_discount_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Prepaid config is viewable by everyone" ON prepaid_discount_config FOR SELECT USING (true);
CREATE POLICY "Admins can manage prepaid config" ON prepaid_discount_config FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- ═══════════════════════════════════════════════════════════════
-- Gift Cards System
-- ═══════════════════════════════════════════════════════════════

-- Gift Cards Table
CREATE TABLE IF NOT EXISTS gift_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  initial_balance NUMERIC(10, 2) NOT NULL,
  current_balance NUMERIC(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT positive_balance CHECK (current_balance >= 0),
  CONSTRAINT valid_initial_balance CHECK (initial_balance > 0)
);

-- Gift Card Usage History (track redemptions)
CREATE TABLE IF NOT EXISTS gift_card_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gift_card_id UUID NOT NULL REFERENCES gift_cards(id) ON DELETE CASCADE,
  order_id VARCHAR(255) NOT NULL, -- Medusa order ID
  amount_used NUMERIC(10, 2) NOT NULL,
  used_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT positive_amount_used CHECK (amount_used > 0)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_gift_cards_code ON gift_cards(code);
CREATE INDEX IF NOT EXISTS idx_gift_cards_active ON gift_cards(is_active);
CREATE INDEX IF NOT EXISTS idx_gift_card_usage_card_id ON gift_card_usage(gift_card_id);
CREATE INDEX IF NOT EXISTS idx_gift_card_usage_order_id ON gift_card_usage(order_id);

-- Row Level Security
ALTER TABLE gift_cards ENABLE ROW LEVEL SECURITY;

-- Anyone can check a gift card (for validation during checkout)
CREATE POLICY "Gift cards are viewable by everyone" ON gift_cards 
  FOR SELECT USING (true);

-- Only admins can create/manage gift cards
CREATE POLICY "Admins can manage gift cards" ON gift_cards 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

ALTER TABLE gift_card_usage ENABLE ROW LEVEL SECURITY;

-- Usage records are viewable by the user who used them or admins
CREATE POLICY "Users can view own gift card usage" ON gift_card_usage 
  FOR SELECT USING (
    auth.uid() = used_by OR
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Only the system (via service role) can create usage records
-- This will be done via API routes with proper validation

-- Function to apply gift card (deduct balance and record usage)
CREATE OR REPLACE FUNCTION apply_gift_card(
  p_code VARCHAR,
  p_amount NUMERIC,
  p_order_id VARCHAR,
  p_user_id UUID
)
RETURNS JSON AS $$
DECLARE
  v_gift_card gift_cards%ROWTYPE;
  v_max_applicable NUMERIC;
  v_final_amount NUMERIC;
BEGIN
  -- Get gift card with row lock
  SELECT * INTO v_gift_card
  FROM gift_cards
  WHERE code = p_code
  AND is_active = true
  AND (expires_at IS NULL OR expires_at > NOW())
  FOR UPDATE;
  
  -- Check if gift card exists
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Invalid or expired gift card');
  END IF;
  
  -- Check if gift card has balance
  IF v_gift_card.current_balance <= 0 THEN
    RETURN json_build_object('success', false, 'error', 'Gift card has no balance');
  END IF;
  
  -- Calculate maximum applicable amount (can't exceed current balance or requested amount)
  v_max_applicable := LEAST(v_gift_card.current_balance, p_amount);
  v_final_amount := v_max_applicable;
  
  -- Deduct balance
  UPDATE gift_cards
  SET current_balance = current_balance - v_final_amount,
      updated_at = NOW()
  WHERE id = v_gift_card.id;
  
  -- Record usage
  INSERT INTO gift_card_usage (gift_card_id, order_id, amount_used, used_by)
  VALUES (v_gift_card.id, p_order_id, v_final_amount, p_user_id);
  
  -- Return success with applied amount and remaining balance
  RETURN json_build_object(
    'success', true,
    'code', v_gift_card.code,
    'applied_amount', v_final_amount,
    'remaining_balance', v_gift_card.current_balance - v_final_amount,
    'currency', v_gift_card.currency
  );
END;
$$ LANGUAGE plpgsql;

-- Homepage hero carousel slides
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  heading VARCHAR(200) NOT NULL,
  subtext TEXT NOT NULL,
  cta_label VARCHAR(50) NOT NULL,
  cta_link TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for hero_slides (public read, admin write)
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active hero slides"
  ON hero_slides FOR SELECT
  USING (is_active = true);

CREATE POLICY "Only admins can manage hero slides"
  ON hero_slides FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_hero_slides_order ON hero_slides("order" ASC);

