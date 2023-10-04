import Link from "next/link"
import { MdPerson } from "react-icons/md"
import LogoutBtn from "@/components/LogoutBtn"

type LayoutProps = {
  children: React.ReactNode
}
function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <main className="flex-auto flex flex-row flex-nowrap">
        <nav className="w-40 bg-slate-800 text-white">
          <Link href='/users' className="link hover:bg-slate-900">
            <MdPerson />
            <span>Users</span>
          </Link>
          <Link href='/candidates' className="link hover:bg-slate-900">
            <MdPerson />
            <span>Candidates</span>
          </Link>
          <Link href='/party' className="link hover:bg-slate-900">
            <MdPerson />
            <span>Party</span>
          </Link>
          <Link href='/votes' className="link hover:bg-slate-900">
            <MdPerson />
            <span>Votes</span>
          </Link>
          <LogoutBtn />
        </nav>
        <div className="flex-auto scroll-auto overflow-auto">
          {children}
        </div>
      </main>
      <nav></nav>
    </div>
  )
}

export default AdminLayout