import Link from "next/link"
import { MdBallot, MdBuildCircle, MdFlag, MdPeople, MdPerson } from "react-icons/md"
import LogoutBtn from "@/components/LogoutBtn"
import { FaVoteYea } from "react-icons/fa"

type LayoutProps = {
  children: React.ReactNode
}
function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <main className="flex-auto flex flex-row flex-nowrap">
        <nav className="w-24 h-full fixed bg-slate-800 text-white flex flex-col items-center">
          <Link href='/users' className="link hover:bg-slate-900">
            <MdPerson />
            <span>Users</span>
          </Link>
          <Link href='/party' className="link hover:bg-slate-900">
            <MdFlag />
            <span>Party</span>
          </Link>
          <Link href='/candidates' className="link hover:bg-slate-900">
            <MdPeople />
            <span>Candidates</span>
          </Link>
          <Link href='/votes' className="link hover:bg-slate-900">
            <FaVoteYea />
            <span>Votes</span>
          </Link>
          <Link href='/votes2' className="link hover:bg-slate-900">
            <MdBallot />
            <span>Voting</span>
          </Link>
          <Link href='/tools' className="link hover:bg-slate-900">
            <MdBuildCircle />
            <span>Tools</span>
          </Link>
          <LogoutBtn />
        </nav>
        <div className="ml-24 flex-auto">
          {children}
        </div>
      </main>
      <nav></nav>
    </div>
  )
}

export default AdminLayout