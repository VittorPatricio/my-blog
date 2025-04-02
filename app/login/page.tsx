"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import { Lock, User, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function Login() {
  const router = useRouter()
  const { login, error: authError, isLoading } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const success = await login(username, password)

    if (success) {
      router.push("/admin")
    } else {
      setError(authError || "Erro ao fazer login")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Header />
      <div className="form-container">
        <h1 className="text-center">Login</h1>

        <div className="card">
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Nome de usuário</label>
              <div className="input-wrapper">
                <div className="icon-left">
                  <User size={18} />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                  placeholder="Digite seu nome de usuário"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className="input-wrapper">
                <div className="icon-left">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-with-eye"
                  placeholder="Digite sua senha"
                  required
                  disabled={isLoading}
                />
                <button type="button" onClick={togglePasswordVisibility} className="icon-right" disabled={isLoading}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </button>

            <div className="form-footer">
              <p>
                Ainda não tem uma conta? <Link href="/register">Criar uma conta</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

