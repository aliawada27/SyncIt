-- =============================================================================
-- SYNCIT DATABASE INITIALIZATION
-- =============================================================================

-- Create database if not exists (already handled by Docker)
-- CREATE DATABASE syncit_db;

-- Connect to the database
\c syncit_db;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =============================================================================
-- PERFORMANCE OPTIMIZATIONS
-- =============================================================================

-- Indexes for better performance (will be created by Prisma migrations)
-- These are just examples of what Prisma will create

-- User table indexes
-- CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
-- CREATE INDEX IF NOT EXISTS idx_users_provider_id ON users(provider, provider_id);

-- Event table indexes  
-- CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
-- CREATE INDEX IF NOT EXISTS idx_events_invite_code ON events(invite_code);
-- CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);

-- Task table indexes
-- CREATE INDEX IF NOT EXISTS idx_tasks_event_id ON tasks(event_id);
-- CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
-- CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

-- Chat message indexes
-- CREATE INDEX IF NOT EXISTS idx_chat_messages_event_id ON chat_messages(event_id);
-- CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- =============================================================================
-- FUNCTIONS AND TRIGGERS
-- =============================================================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- This trigger will be applied by Prisma to relevant tables
-- Example: 
-- CREATE TRIGGER update_users_updated_at 
--     BEFORE UPDATE ON users 
--     FOR EACH ROW 
--     EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- INITIAL DATA (Optional)
-- =============================================================================

-- This will be handled by the seed script instead
-- INSERT INTO initial_data...

-- Grant permissions to the user
GRANT ALL PRIVILEGES ON DATABASE syncit_db TO syncit_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO syncit_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO syncit_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO syncit_user;

-- =============================================================================
-- LOGGING AND MONITORING
-- =============================================================================

-- Enable query logging for development
-- ALTER SYSTEM SET log_statement = 'all';
-- ALTER SYSTEM SET log_min_duration_statement = 1000; -- Log slow queries > 1s

SELECT 'SyncIt Database Initialized Successfully' as status; 