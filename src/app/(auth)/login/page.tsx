"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa"
import Cookies from "js-cookie"

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (!form.email || !form.password) {
      setError("Vui lòng điền email và mật khẩu.")
      return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Email không hợp lệ.")
      return
    }
    setError("")
    console.log("Login:", form)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    if (token && email) {
      Cookies.set("token", token, { expires: 7 })
      Cookies.set("email", email, { expires: 7 })
      router.push("/profile")
    }
  }, [searchParams, router])

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#9F0A0B]">Đăng nhập</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            className="w-full p-3 border rounded pr-10"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ẩn" : "Hiện"}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-[#9F0A0B] text-white font-semibold py-3 rounded hover:opacity-90"
        >
          Đăng nhập
        </button>

        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
          <span className="h-px w-full bg-gray-300" />
          Hoặc
          <span className="h-px w-full bg-gray-300" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => (window.location.href = "https://api.aspirely.edu.vn/auth/google/login")}
            className="flex items-center justify-center p-3 border rounded hover:bg-gray-50"
          >
            <FaGoogle className="text-red-500" />
          </button>
          <button className="flex items-center justify-center p-3 border rounded hover:bg-gray-50">
            <FaApple />
          </button>
          <button className="flex items-center justify-center p-3 border rounded hover:bg-gray-50">
            <FaFacebookF className="text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  )
}