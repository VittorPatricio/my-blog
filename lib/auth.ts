import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { executeQuery } from "./db"

const JWT_SECRET = process.env.JWT_SECRET

// Função para verificar as credenciais do usuário
export async function verifyCredentials(username: string, password: string) {
  try {
    const users = (await executeQuery("SELECT * FROM users WHERE username = ?", [username])) as any[]

    if (users.length === 0) {
      return null
    }

    const user = users[0]
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return null
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.is_admin === 1,
    }
  } catch (error) {
    console.error("Erro ao verificar credenciais:", error)
    throw error
  }
}

// Função para gerar um token JWT
export function generateToken(user: any) {
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined')
  
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  )
}

// Função para verificar um token JWT
export function verifyToken(token: string) {
  try {
    if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined')
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
// Função para criar um novo usuário
export async function createUser(username: string, email: string, password: string) {
  try {
    // Verificar se o usuário já existe
    const existingUsers = (await executeQuery("SELECT * FROM users WHERE username = ? OR email = ?", [
      username,
      email,
    ])) as any[]

    if (existingUsers.length > 0) {
      throw new Error("Usuário ou email já existe")
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Inserir o novo usuário
    const result = (await executeQuery("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [
      username,
      email,
      hashedPassword,
    ])) as any

    return {
      id: result.insertId,
      username,
      email,
      isAdmin: false,
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    throw error
  }
}

