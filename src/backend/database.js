import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_KEY in your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export const query = async (sql, values = []) => {
    throw new Error('Direct SQL queries are not supported with Supabase. Use the Supabase client directly.')
}