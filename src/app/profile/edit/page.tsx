"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

interface FormState {
  name: string
  avatar: string
  role: string
}

export default function ProfileEditPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({ name: "", avatar: "", role: "" })
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const token = getCookie("token")
    if (!token) {
      router.push("/login")
      return
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized")
        return res.json()
      })
      .then((data: Partial<FormState>) => {
        setForm({
          name: data.name || "",
          avatar: data.avatar || "",
          role: data.role || "",
        })
        setInitialized(true)
      })
      .catch(() => router.push("/login"))
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed")
      router.push("/profile")
    } finally {
      setLoading(false)
    }
  }

  if (!initialized) return <p className="text-center p-10">Loading...</p>

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-md mx-auto bg-white shadow rounded-xl mt-10 space-y-4"
    >
      <h1 className="text-2xl font-bold">Cập nhật thông tin</h1>
      <input
        type="text"
        placeholder="Họ tên"
        className="w-full p-3 border rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Avatar URL"
        className="w-full p-3 border rounded"
        value={form.avatar}
        onChange={(e) => setForm({ ...form, avatar: e.target.value })}
      />
      <select
        className="w-full p-3 border rounded"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="">Chọn vai trò</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded"
      >
        Cập nhật
      </button>
    </form>
  )
}
