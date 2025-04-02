"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import { Save, ArrowLeft } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function EditPost() {
  const router = useRouter()
  const params = useParams()
  const postId = Number(params.id)
  const { user, token } = useAuth()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Verificar se o usuário está logado
    if (!user || !token) {
      router.push("/login")
      return
    }

    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${postId}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Post não encontrado")
          }
          throw new Error("Erro ao buscar post")
        }

        const post = await response.json()

        // Verificar se o usuário é o autor do post ou é admin
        if (!user || (post.user_id !== user.id && !user.isAdmin)) {
          router.push("/")
          return
        }

        setTitle(post.title)
        setContent(post.content)
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
  }, [postId, user, token, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) return

    try {
      setIsSubmitting(true)
      setError(null)

      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao atualizar post")
      }

      router.push("/admin")
    } catch (error: any) {
      console.error("Erro ao atualizar post:", error)
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div>Carregando...</div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="space-y-8">
        <div className="flex items-center">
          <button onClick={() => router.push("/admin")} className="back-button mr-3">
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>
          <h1 className="text-3xl font-bold m-0">Editar Post</h1>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray border-opacity-20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block font-medium">
                Título
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                placeholder="Digite o título do post"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="block font-medium">
                Conteúdo
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input min-h-[200px]"
                placeholder="Digite o conteúdo do post"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary flex items-center gap-2" disabled={isSubmitting}>
                <Save size={18} />
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

