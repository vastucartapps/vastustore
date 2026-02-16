-- Initialize VastuCart Database
-- This script creates the database schema for both Medusa and the Next.js app

-- The database 'vastucart_db' will be created automatically by Docker
-- This file ensures proper initialization

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE vastucart_db TO postgres;
