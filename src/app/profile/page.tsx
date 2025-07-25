"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

interface User {
  email: string
  name: string
  avatar?: string
  role?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

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
      .then((data: User) => {
        if (!data.role) {
          router.push("/select-role")
          return
        }
        setUser(data)
      })
      .catch(() => router.push("/login"))
  }, [router])

  if (!user) return <p className="text-center p-10">Loading...</p>

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-xl mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Thông tin cá nhân</h1>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
      <p>
        <strong>Họ tên: </strong>
        {user.name}
      </p>
      {user.avatar && (
        <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full" />
      )}
      <Link href="/profile/edit" className="text-blue-600 hover:underline">
        Chỉnh sửa thông tin
      </Link>
    </div>
  )
}
