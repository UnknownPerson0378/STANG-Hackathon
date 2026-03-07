-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_budgets table
CREATE TABLE IF NOT EXISTS user_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  monthly_budget DECIMAL(10, 2) DEFAULT 100.00,
  warning_threshold_percentage INTEGER DEFAULT 80,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create ticket_games table
CREATE TABLE IF NOT EXISTS ticket_games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  state VARCHAR(50),
  typical_ticket_price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_id UUID REFERENCES ticket_games(id),
  store_name VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  ticket_cost DECIMAL(10, 2) NOT NULL,
  expected_outcome DECIMAL(10, 2),
  actual_outcome DECIMAL(10, 2),
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create location_stats view for aggregated location data
CREATE OR REPLACE VIEW location_stats AS
SELECT 
  latitude,
  longitude,
  store_name,
  COUNT(*) as tickets_purchased,
  SUM(ticket_cost) as total_spent,
  SUM(actual_outcome) as total_winnings,
  SUM(COALESCE(actual_outcome, 0) - ticket_cost) as net_result
FROM tickets
WHERE latitude IS NOT NULL AND longitude IS NOT NULL
GROUP BY latitude, longitude, store_name;

-- Insert some default ticket games
INSERT INTO ticket_games (name, state, typical_ticket_price) VALUES
  ('Powerball', 'National', 2.00),
  ('Mega Millions', 'National', 2.00),
  ('Scratchers', 'State', 5.00),
  ('Pick 3', 'State', 1.00),
  ('Pick 4', 'State', 1.00)
ON CONFLICT DO NOTHING;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_purchase_date ON tickets(purchase_date);
CREATE INDEX IF NOT EXISTS idx_tickets_location ON tickets(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
