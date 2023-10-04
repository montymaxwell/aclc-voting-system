"use client";
import { useUserStore } from "@/lib/UserStore";
import { useRouter } from 'next/navigation'
const LogoutBtn = () => {
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();
  return (
    <button
      className="w-full bg-red-400 py-3 text-white mt-5 hover:bg-red-400/80"
      onClick={() => {
        logout()
        router.push('/')
      }}
    >
      Log out
    </button>
  );
};

export default LogoutBtn;