import mysql from "mysql2/promise"

// Configuração da conexão com o banco de dados
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

// Função para criar uma conexão com o banco de dados
export async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig)
    return connection
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error)
    throw new Error("Não foi possível conectar ao banco de dados")
  }
}

// Função para executar uma consulta SQL
export async function executeQuery(query: string, params: any[] = []) {
  const connection = await connectToDatabase()
  try {
    const [results] = await connection.execute(query, params)
    return results
  } catch (error) {
    console.error("Erro ao executar consulta:", error)
    throw error
  } finally {
    await connection.end()
  }
}

