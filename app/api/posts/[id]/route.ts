import { type NextRequest, NextResponse } from "next/server"
import { getPostById, updatePost, deletePost } from "@/lib/posts"
import { verifyToken } from "@/lib/auth"

// GET - Obter um post específico
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const post = await getPostById(id)

    if (!post) {
      return NextResponse.json({ error: "Post não encontrado" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Erro ao buscar post:", error)
    return NextResponse.json({ error: "Erro ao buscar post" }, { status: 500 })
  }
}

// PUT - Atualizar um post
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const id = Number.parseInt(params.id)
    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Título e conteúdo são obrigatórios" }, { status: 400 })
    }

    try {
      const post = await updatePost(id, title, content, decoded.id)
      return NextResponse.json(post)
    } catch (error: any) {
      if (error.message === "Não autorizado") {
        return NextResponse.json({ error: "Não autorizado a editar este post" }, { status: 403 })
      }
      throw error
    }
  } catch (error) {
    console.error("Erro ao atualizar post:", error)
    return NextResponse.json({ error: "Erro ao atualizar post" }, { status: 500 })
  }
}

// DELETE - Excluir um post
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const id = Number.parseInt(params.id)

    try {
      await deletePost(id, decoded.id)
      return NextResponse.json({ success: true })
    } catch (error: any) {
      if (error.message === "Não autorizado") {
        return NextResponse.json({ error: "Não autorizado a excluir este post" }, { status: 403 })
      }
      throw error
    }
  } catch (error) {
    console.error("Erro ao excluir post:", error)
    return NextResponse.json({ error: "Erro ao excluir post" }, { status: 500 })
  }
}

