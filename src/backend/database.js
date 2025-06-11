import { createClient } from "@libsql/client"; 

const db = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_TOKEN
})

export const query = async (sql, values) => {
    const result = await db.execute(sql, values)
    return result.rows
}