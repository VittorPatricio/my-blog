"use client"

import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Olá! Vim do seu blog e gostaria de falar com você.",
}: WhatsAppButtonProps) {
 
  const formattedNumber = phoneNumber.replace(/\s+/g, "").replace(/-/g, "").replace(/$$/g, "").replace(/$$/g, "")

  
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      title="Entrar em contato via WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  )
}

