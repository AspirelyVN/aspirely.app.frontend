// "use client"
// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// export default function AuthForm() {
//   const [isLogin, setIsLogin] = useState(true)

//   return (
//     <div className="w-full h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
//       <div className="relative w-full max-w-4xl h-[500px] bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        
//         {/* Left form section */}
//         <div className="w-full md:w-1/2 h-full p-10 bg-white relative z-10 flex items-center justify-center">
//           <AnimatePresence mode="wait">
//             {isLogin ? (
//               <motion.div
//                 key="login"
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -30 }}
//                 transition={{ duration: 0.4 }}
//                 className="w-full space-y-4"
//               >
//                 <h2 className="text-3xl font-bold text-[#9F0A0B] text-center">Đăng nhập</h2>
//                 <input type="email" placeholder="Email" className="p-3 border rounded w-full" />
//                 <input type="password" placeholder="Mật khẩu" className="p-3 border rounded w-full" />
//                 <button className="bg-[#9F0A0B] text-white py-3 rounded font-semibold w-full">Đăng nhập</button>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="signup"
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 30 }}
//                 transition={{ duration: 0.4 }}
//                 className="w-full space-y-4"
//               >
//                 <h2 className="text-3xl font-bold text-[#9F0A0B] text-center">Tạo tài khoản</h2>
//                 <input type="text" placeholder="Họ và tên" className="p-3 border rounded w-full" />
//                 <input type="email" placeholder="Email" className="p-3 border rounded w-full" />
//                 <input type="password" placeholder="Mật khẩu" className="p-3 border rounded w-full" />
//                 <button className="bg-[#9F0A0B] text-white py-3 rounded font-semibold w-full">Đăng ký</button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Right sliding panel */}
//         <div className="w-full md:w-1/2 h-full bg-[#9F0A0B] text-white flex flex-col justify-center items-center px-10 text-center">
//           <h2 className="text-3xl font-bold mb-4">
//             {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
//           </h2>
//           <p className="mb-6 text-sm">
//             {isLogin
//               ? "Tạo tài khoản mới để bắt đầu hành trình học tập của bạn cùng Aspirely."
//               : "Đăng nhập để tiếp tục hành trình học tập."}
//           </p>
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="bg-white text-[#9F0A0B] font-bold py-2 px-6 rounded-full"
//           >
//             {isLogin ? "Đăng ký" : "Đăng nhập"}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }