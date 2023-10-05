'use client';

import { useUserStore } from "@/lib/UserStore";
import UnauthorizedPage from "../unauthorized/page";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const account = useUserStore()

  if (account.userInfo.usn !== "" || account.userInfo.role !== "user") {
    return children
  }

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white">
      <UnauthorizedPage />
    </div>
  )
}

export default RouteGuard