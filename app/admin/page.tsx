"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Edit, Trash, Plus } from "lucide-react"
import { useAuth } from "@/context/auth-context"

// Tipo para os posts
interface Post {
  id: number
  title: string
  content: string
  created_at: string
  author: string
  user_id: number
}

export default function Admin() {
  const router = useRouter()
  const { user, token } = useAuth()

  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Verificar se o usuário está logado e é admin
    if (!user || !token) {
      router.push("/login")
      return
    }

    if (!user.isAdmin) {
      router.push("/")
      return
    }

    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts")

        if (!response.ok) {
          throw new Error("Erro ao buscar posts")
        }

        const data = await response.json()
        setPosts(data)
      } catch (error: any) {
        console.error("Erro ao buscar posts:", error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [user, token, router])

  const handleDelete = async (id: number) => {
    if (!token) return

    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Erro ao excluir post")
        }

        // Atualizar a lista de posts
        setPosts(posts.filter((post) => post.id !== id))
      } catch (error: any) {
        console.error("Erro ao excluir post:", error)
        alert(error.message)
      }
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
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1>Gerenciar Posts</h1>
          <button onClick={() => router.push("/admin/new")} className="btn btn-primary flex items-center gap-2">
            <Plus size={18} />
            Novo Post
          </button>
        </div>

        {error ? (
          <div className="alert alert-error">{error}</div>
        ) : posts.length === 0 ? (
          <p>Nenhum post encontrado.</p>
        ) : (
          <div className="card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Data</th>
                  <th>Autor</th>
                  <th style={{ textAlign: "right" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{new Date(post.created_at).toLocaleDateString("pt-BR")}</td>
                    <td>{post.author}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => router.push(`/admin/edit/${post.id}`)}
                          className="action-button edit-button"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="action-button delete-button"
                          title="Excluir"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

