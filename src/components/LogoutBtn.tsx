"use client";
import { useUserStore } from "@/lib/UserStore";
import { useRouter } from 'next/navigation'
import { AiOutlineLogout } from "react-icons/ai";
const LogoutBtn = () => {
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();
  return (
    <button
      className="w-full py-3 text-red-500 mt-auto mb-5 text-3xl hover:bg-red-400/80 hover:text-white"
      onClick={() => {
        logout()
        router.replace('/')
      }}
    >
      <AiOutlineLogout className="mx-auto" />
      <div className="text-xs mt-2">Logout</div>
    </button>
  );
};

export default LogoutBtn;