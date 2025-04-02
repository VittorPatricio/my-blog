"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/context/auth-context"

// Tipo para os posts
interface Post {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
  author: string
  user_id: number
}

export default function PostView() {
  const router = useRouter()
  const params = useParams()
  const postId = Number(params.id)
  const { user } = useAuth()

  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${postId}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Post não encontrado")
          }
          throw new Error("Erro ao buscar post")
        }

        const data = await response.json()
        setPost(data)
      } catch (error: any) {
        console.error("Erro ao buscar post:", error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (postId) {
      fetchPost()
    }
  }, [postId])

  if (isLoading) {
    return (
      <>
        <Header />
        <div>Carregando...</div>
      </>
    )
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <div className="alert alert-error">{error || "Post não encontrado"}</div>
      </>
    )
  }

  // Verificar se o usuário é o autor do post ou é admin
  const canEdit = user && (user.id === post.user_id || user.isAdmin)

  return (
    <>
      <Header />
      <div>
        <div className="flex items-center mb-6">
          <button onClick={() => router.push("/")} className="back-button mr-3">
            <ArrowLeft size={16} />
            <span>Voltar para a lista</span>
          </button>
        </div>

        <article className="card" style={{ padding: "2rem" }}>
          <h1 style={{ marginBottom: "0.5rem" }}>{post.title}</h1>
          <p className="post-date" style={{ marginBottom: "2rem" }}>
            Publicado em: {new Date(post.created_at).toLocaleDateString("pt-BR")} por {post.author}
            {post.updated_at !== post.created_at &&
              ` (Atualizado em: ${new Date(post.updated_at).toLocaleDateString("pt-BR")})`}
          </p>

          <div>
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index} style={{ marginBottom: "1rem" }}>
                {paragraph}
              </p>
            ))}
          </div>

          {canEdit && (
            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #ddd" }}>
              <button onClick={() => router.push(`/admin/edit/${post.id}`)} className="btn btn-primary">
                Editar este post
              </button>
            </div>
          )}
        </article>
      </div>
    </>
  )
}

