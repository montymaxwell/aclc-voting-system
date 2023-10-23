'use client';

import Link from "next/link"
import { MdBallot, MdBuildCircle, MdFlag, MdPeople, MdPerson, MdAssessment } from "react-icons/md"
import LogoutBtn from "@/components/LogoutBtn"
import { FaVoteYea } from "react-icons/fa"
import { usePathname } from "next/navigation";

function Routing() {
  const path = usePathname()

  return (
    <nav className="w-24 h-full fixed bg-slate-800 text-white flex flex-col items-center">
      <Link href='/users' className={`link hover:bg-slate-900 ${path === '/users' ? 'bg-slate-900' : ''}`}>
        <MdPerson />
        <span>Users</span>
      </Link>
      <Link href='/party' className={`link hover:bg-slate-900 ${path === '/party' ? 'bg-slate-900' : ''}`}>
        <MdFlag />
        <span>Party</span>
      </Link>
      <Link href='/candidates' className={`link hover:bg-slate-900 ${path === '/candidates' ? 'bg-slate-900' : ''}`}>
        <MdPeople />
        <span>Candidates</span>
      </Link>
      <Link href='/votes' className={`link hover:bg-slate-900 ${path === '/votes' ? 'bg-slate-900' : ''}`}>
        <FaVoteYea />
        <span>Votes</span>
      </Link>
      <Link href='/votes2' className={`link hover:bg-slate-900 ${path === '/votes2' ? 'bg-slate-900' : ''}`}>
        <MdBallot />
        <span>Voting</span>
      </Link>
      <Link href='/ranking' className={`link hover:bg-slate-900 ${path === '/ranking' ? 'bg-slate-900' : ''}`}>
        <MdAssessment />
        <span>Ranking</span>
      </Link>
      <Link href='/tools' className={`link hover:bg-slate-900 ${path === '/tools' ? 'bg-slate-900' : ''}`}>
        <MdBuildCircle />
        <span>Tools</span>
      </Link>
      <div className="w-full mb-5 mt-auto">
        <LogoutBtn />
      </div>
    </nav>
  )
}

export default Routing