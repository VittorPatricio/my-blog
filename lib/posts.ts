import { executeQuery } from "./db"

// Função para obter todos os posts
export async function getAllPosts() {
  try {
    const posts = await executeQuery(`
      SELECT p.*, u.username as author
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `)
    return posts
  } catch (error) {
    console.error("Erro ao buscar posts:", error)
    throw error
  }
}

// Função para obter um post específico
export async function getPostById(id: number) {
  try {
    const posts = (await executeQuery(
      `
      SELECT p.*, u.username as author
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `,
      [id],
    )) as any[]

    return posts.length > 0 ? posts[0] : null
  } catch (error) {
    console.error("Erro ao buscar post:", error)
    throw error
  }
}

// Função para criar um novo post
export async function createPost(title: string, content: string, userId: number) {
  try {
    const result = (await executeQuery("INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)", [
      title,
      content,
      userId,
    ])) as any

    return {
      id: result.insertId,
      title,
      content,
      user_id: userId,
      created_at: new Date(),
    }
  } catch (error) {
    console.error("Erro ao criar post:", error)
    throw error
  }
}

// Função para atualizar um post
export async function updatePost(id: number, title: string, content: string, userId: number) {
  try {
    // Verificar se o post existe e pertence ao usuário
    const posts = (await executeQuery("SELECT * FROM posts WHERE id = ?", [id])) as any[]

    if (posts.length === 0) {
      throw new Error("Post não encontrado")
    }

    const post = posts[0]

    // Verificar se o usuário é o autor do post ou é admin
    const users = (await executeQuery("SELECT is_admin FROM users WHERE id = ?", [userId])) as any[]

    const isAdmin = users.length > 0 && users[0].is_admin === 1

    if (post.user_id !== userId && !isAdmin) {
      throw new Error("Não autorizado")
    }

    // Atualizar o post
    await executeQuery("UPDATE posts SET title = ?, content = ? WHERE id = ?", [title, content, id])

    return {
      id,
      title,
      content,
      user_id: post.user_id,
      updated_at: new Date(),
    }
  } catch (error) {
    console.error("Erro ao atualizar post:", error)
    throw error
  }
}

// Função para excluir um post
export async function deletePost(id: number, userId: number) {
  try {
    // Verificar se o post existe e pertence ao usuário
    const posts = (await executeQuery("SELECT * FROM posts WHERE id = ?", [id])) as any[]

    if (posts.length === 0) {
      throw new Error("Post não encontrado")
    }

    const post = posts[0]

    // Verificar se o usuário é o autor do post ou é admin
    const users = (await executeQuery("SELECT is_admin FROM users WHERE id = ?", [userId])) as any[]

    const isAdmin = users.length > 0 && users[0].is_admin === 1

    if (post.user_id !== userId && !isAdmin) {
      throw new Error("Não autorizado")
    }

    // Excluir o post
    await executeQuery("DELETE FROM posts WHERE id = ?", [id])

    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir post:", error)
    throw error
  }
}

