import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { createClient } from '@supabase/supabase-js';

// Import all schemas
import * as usersSchema from './schema-users';
import * as bookingSchema from './schema-booking';
import * as sessionSchema from './schema-session';
import * as comparisonSchema from './schema';

// Supabase client for authentication and storage features
// Only initialize if environment variables are present (prevents build errors)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// PostgreSQL connection for Drizzle ORM
// Only initialize if environment variable is present
const connectionString = process.env.POSTGRES_URL;
const client = connectionString ? postgres(connectionString) : null as any;

// Create Drizzle ORM instance with PostgreSQL connection
// Only if connection is available
export const db = client ? drizzle(client, {
    schema: {
        ...usersSchema,
        ...bookingSchema,
        ...sessionSchema,
        ...comparisonSchema,
    }
}) : null as any;

// Export all schemas for type reference
export { usersSchema, bookingSchema, sessionSchema, comparisonSchema };

// Export specific tables for convenience
export { users } from './schema-users';
export { clinics, services, clinic_services, bookings } from './schema-booking';
export { examinationSessions, medicalRecords } from './schema-session';
export { comparisonRecords } from './schema';
