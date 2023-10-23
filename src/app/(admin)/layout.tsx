import { Metadata } from "next";
import Routing from "./Routing";

export const metadata: Metadata = {
  title: 'Admin | ACLC Voting System'
}

type LayoutProps = {
  children: React.ReactNode
}
function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full flex flex-col snap-mandatory snap-y overflow-auto">
      <main className="flex-auto flex flex-row flex-nowrap">
        <Routing />
        <div className="ml-24 flex-auto">
          {children}
        </div>
      </main>
      <nav></nav>
    </div>
  )
}

export default AdminLayout