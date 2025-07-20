"use client"
import { useState } from "react"
import Link from "next/link"
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/i18n"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default function RegisterPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setError(t("register.errorIncomplete"))
      return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError(t("register.errorInvalidEmail"))
      return
    }
    if (form.password.length < 8) {
      setError(t("register.errorPasswordLength"))
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
    } catch (e) {
      setError(t("register.errorGeneric"))
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <LanguageSwitcher />
        <h2 className="text-3xl font-bold text-center text-[#9F0A0B]">{t("register.title")}</h2>

        <input
          type="text"
          placeholder={t("register.namePlaceholder")}
          className="w-full p-3 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder={t("register.emailPlaceholder")}
          className="w-full p-3 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("register.passwordPlaceholder")}
            className="w-full p-3 border rounded pr-10"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? t("register.hide") : t("register.show")}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleRegister}
          className="w-full bg-[#9F0A0B] text-white font-semibold py-3 rounded hover:opacity-90"
        >
          {t("register.submit")}
        </button>

        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
          <span className="h-px w-full bg-gray-300" />
          {t("login.or")}
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
          {t("register.alreadyHaveAccount")}{" "}
          <Link href="/login" className="text-[#9F0A0B] font-medium hover:underline">
            {t("register.login")}
          </Link>
        </p>
      </div>
    </div>
  )
}