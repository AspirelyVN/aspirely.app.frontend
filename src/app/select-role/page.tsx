"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

export default function SelectRolePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSelect = async (role: string) => {
    const token = getCookie("token")
    if (!token) {
      router.push("/login")
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      })
      if (!res.ok) throw new Error("Failed")
      router.push("/profile")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = getCookie("token")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="space-x-4">
        <button
          onClick={() => handleSelect("student")}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Student
        </button>
        <button
          onClick={() => handleSelect("teacher")}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Teacher
        </button>
      </div>
    </div>
  )
}
