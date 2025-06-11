import { Client } from 'pg'

const client = new Client({
  host: 'glctguckdkgppfvqhzic.supabase.co',
  port: 5432,
  user: 'postgres',
  password: 'eaASzy$G-C89Da4',
  database: 'postgres'
})

export const query = async (sql, values) => {
    await client.connect()
    const result = await client.query(sql, values)
    await client.end()
    return result.rows
}
