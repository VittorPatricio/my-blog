"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <header>
      <Link href="/" className="logo">
        Blog
      </Link>
      <nav>
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          Home
        </Link>
        {user ? (
          <>
            {user.isAdmin && (
              <Link href="/admin" className={pathname === "/admin" ? "active" : ""}>
                Admin
              </Link>
            )}
            <button
              onClick={logout}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-red)",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <LogOut size={18} />
              Sair
            </button>
          </>
        ) : (
          <Link href="/login" className={pathname === "/login" ? "active" : ""}>
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}

