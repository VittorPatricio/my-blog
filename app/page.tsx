"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import { ChevronRight } from "lucide-react"

// Tipo para os posts
interface Post {
  id: number
  title: string
  content: string
  created_at: string
  author: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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
  }, [])

  return (
    <>
      <Header />
      <div>
        <h1>Posts Recentes</h1>

        {isLoading ? (
          <p>Carregando posts...</p>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : posts.length === 0 ? (
          <p>Nenhum post encontrado.</p>
        ) : (
          <div>
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <h2>{post.title}</h2>
                <p className="post-date">
                  Publicado em: {new Date(post.created_at).toLocaleDateString("pt-BR")} por {post.author}
                </p>
                <p className="post-excerpt">{post.content.substring(0, 150)}...</p>
                <Link href={`/post/${post.id}`} className="read-more">
                  Ler mais <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

