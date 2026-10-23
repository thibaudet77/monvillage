-- ============================================================
-- SUBSCRIPTIONS TABLE - MonVillage Geo-Pricing
-- Manages monthly subscriptions for users outside Africa
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS subscriptions (
    id serial PRIMARY KEY,
    email varchar(255) NOT NULL,
    name varchar(255),
    plan varchar(50) NOT NULL DEFAULT 'monthly',
    amount numeric(10,2) NOT NULL DEFAULT 10.00,
    currency varchar(10) NOT NULL DEFAULT 'USD',
    status varchar(20) NOT NULL DEFAULT 'active',
    starts_at timestamptz NOT NULL DEFAULT now(),
    expires_at timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
    auto_renew boolean DEFAULT true,
    payment_method varchar(50),
    transaction_id varchar(255),
    country_code varchar(5),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT chk_status CHECK (status IN ('active', 'expired', 'cancelled', 'pending'))
);

COMMENT ON TABLE subscriptions IS 'Monthly subscriptions for unlimited map exports (primarily for users outside Africa)';

CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions (email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions (status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_subscriptions_expires ON subscriptions (expires_at);

-- RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "subscriptions_select_public" ON subscriptions;
CREATE POLICY "subscriptions_select_public" ON subscriptions
    FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "subscriptions_insert_admin" ON subscriptions;
CREATE POLICY "subscriptions_insert_admin" ON subscriptions
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "subscriptions_update_admin" ON subscriptions;
CREATE POLICY "subscriptions_update_admin" ON subscriptions
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "subscriptions_delete_admin" ON subscriptions;
CREATE POLICY "subscriptions_delete_admin" ON subscriptions
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- Verification
SELECT 'subscriptions' AS table_name, COUNT(*) AS row_count FROM subscriptions;
