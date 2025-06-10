import { createConnection } from "mysql2";

async function query(sql, values) {
    const connection = createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute(sql, values);

    connection.end();

    return rows;
}

export default query
