"use client"
import { useState } from "react"
import Link from "next/link"
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Vui lòng điền đầy đủ thông tin")
      return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Email không hợp lệ")
      return
    }
    if (form.password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự")
      return
    }

    setError("")
    try {
      const res = await fetch("https://api.aspirely.edu.vn/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      Cookies.set("token", data.token, { expires: 7 })
      Cookies.set("email", data.email || form.email, { expires: 7 })
      router.push("/profile")
    } catch {
      setError("Đã có lỗi xảy ra")
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#9F0A0B]">Đăng ký</h2>

        <input
          type="text"
          placeholder="Họ tên"
          className="w-full p-3 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
          onClick={handleRegister}
          className="w-full bg-[#9F0A0B] text-white font-semibold py-3 rounded hover:opacity-90"
        >
          {"Đăng ký"}
        </button>

        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
          <span className="h-px w-full bg-gray-300" />
          {"Hoặc"}
          <span className="h-px w-full bg-gray-300" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button className="flex items-center justify-center p-3 border rounded hover:bg-gray-50">
            <FaGoogle className="text-red-500" />
          </button>
          <button className="flex items-center justify-center p-3 border rounded hover:bg-gray-50">
            <FaApple />
          </button>
          <button className="flex items-center justify-center p-3 border rounded hover:bg-gray-50">
            <FaFacebookF className="text-blue-600" />
          </button>
        </div>

        <p className="text-sm text-center text-gray-600">
          {"Bạn đã có tài khoản? "}{" "}
          <Link href="/login" className="text-[#9F0A0B] font-medium hover:underline">
            {"Đăng nhập"}
          </Link>
        </p>
      </div>
    </div>
  )
}