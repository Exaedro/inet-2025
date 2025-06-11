
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const db = createClient(supabaseUrl, supabaseKey)

export const query = async (sql, values) => {
    const result = await db
    return result.rows
}