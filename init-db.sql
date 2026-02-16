-- Initialize VastuCart Databases
-- This script creates databases for Medusa backend and Next.js app

-- Create Medusa database
CREATE DATABASE medusa;

-- Create VastuCart app database (if not exists)
-- Note: vastucart_db is created by POSTGRES_DB env variable

-- Connect to medusa database and set up extensions
\c medusa;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
GRANT ALL PRIVILEGES ON DATABASE medusa TO postgres;

-- Connect to vastucart_db and set up extensions
\c vastucart_db;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
GRANT ALL PRIVILEGES ON DATABASE vastucart_db TO postgres;
