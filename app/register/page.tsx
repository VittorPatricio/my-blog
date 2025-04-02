"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import { Lock, User, Mail, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function Register() {
  const router = useRouter()
  const { register, error: authError, isLoading } = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar se as senhas coincidem
    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    const success = await register(username, email, password)

    if (success) {
      router.push("/")
    } else {
      setError(authError || "Erro ao criar conta")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <>
      <Header />
      <div className="form-container">
        <h1 className="text-center">Criar Conta</h1>

        <div className="card">
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleRegister}>
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
                  placeholder="Escolha um nome de usuário"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <div className="icon-left">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="Digite seu email"
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
                  placeholder="Crie uma senha forte"
                  required
                  disabled={isLoading}
                />
                <button type="button" onClick={togglePasswordVisibility} className="icon-right" disabled={isLoading}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <div className="input-wrapper">
                <div className="icon-left">
                  <Lock size={18} />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input input-with-eye"
                  placeholder="Confirme sua senha"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="icon-right"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </button>

            <div className="form-footer">
              <p>
                Já tem uma conta? <Link href="/login">Fazer login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

