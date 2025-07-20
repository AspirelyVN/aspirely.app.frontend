import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

export type Locale = "en" | "vi";

const messages = {
  en: {
    login: {
      title: "Login",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      show: "Show",
      hide: "Hide",
      submit: "Login",
      or: "Or",
      errorEmailPasswordRequired: "Please enter email and password.",
      errorInvalidEmail: "Invalid email.",
      errorGeneric: "Something went wrong. Please try again.",
    },
    register: {
      title: "Sign Up",
      namePlaceholder: "Full name",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      show: "Show",
      hide: "Hide",
      submit: "Sign Up",
      alreadyHaveAccount: "Already have an account?",
      login: "Login",
      errorIncomplete: "Please complete all fields.",
      errorInvalidEmail: "Invalid email.",
      errorPasswordLength: "Password must be at least 8 characters.",
      errorGeneric: "Something went wrong. Please try again.",
    },
    profile: {
      loading: "Loading...",
      title: "Profile",
      email: "Email",
      name: "Name",
    },
  },
  vi: {
    login: {
      title: "Đăng nhập",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Mật khẩu",
      show: "Hiện",
      hide: "Ẩn",
      submit: "Đăng nhập",
      or: "Hoặc",
      errorEmailPasswordRequired: "Vui lòng điền email và mật khẩu.",
      errorInvalidEmail: "Email không hợp lệ.",
      errorGeneric: "Đã xảy ra lỗi. Vui lòng thử lại.",
    },
    register: {
      title: "Đăng ký",
      namePlaceholder: "Họ và tên",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Mật khẩu",
      show: "Hiện",
      hide: "Ẩn",
      submit: "Đăng ký",
      alreadyHaveAccount: "Đã có tài khoản?",
      login: "Đăng nhập",
      errorIncomplete: "Vui lòng điền đầy đủ thông tin.",
      errorInvalidEmail: "Email không hợp lệ.",
      errorPasswordLength: "Mật khẩu phải có ít nhất 8 ký tự.",
      errorGeneric: "Đã xảy ra lỗi. Vui lòng thử lại.",
    },
    profile: {
      loading: "Đang tải...",
      title: "Thông tin cá nhân",
      email: "Email",
      name: "Họ tên",
    },
  },
} as const;

type Messages = typeof messages;
interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(
    (Cookies.get("lang") as Locale) || "vi"
  );
  const setLocale = (l: Locale) => {
    Cookies.set("lang", l, { expires: 365 });
    setLocaleState(l);
  };
  const t = (path: string) => {
    return path.split(".").reduce<any>((acc, key) => acc && acc[key], messages[locale as keyof Messages]) ?? path;
  };
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}
