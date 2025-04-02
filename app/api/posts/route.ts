import { type NextRequest, NextResponse } from "next/server"
import { getAllPosts, createPost } from "@/lib/posts"
import { verifyToken } from "@/lib/auth"

// GET - Obter todos os posts
export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Erro ao buscar posts:", error)
    return NextResponse.json({ error: "Erro ao buscar posts" }, { status: 500 })
  }
}

// POST - Criar um novo post
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const decoded = verifyToken(token) as any

    if (!decoded) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 })
    }

    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Título e conteúdo são obrigatórios" }, { status: 400 })
    }

    const post = await createPost(title, content, decoded.id)
    return NextResponse.json(post)
  } catch (error) {
    console.error("Erro ao criar post:", error)
    return NextResponse.json({ error: "Erro ao criar post" }, { status: 500 })
  }
}

