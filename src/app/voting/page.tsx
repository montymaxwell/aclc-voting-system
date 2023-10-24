import Voting from "@/components/Voting"
import getCandidates from "@/lib/scripts/voting/getCandidates"
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

export const metadata: Metadata = {
  title: 'ACLC Votiong System'
}

async function VotingPage() {
  const Candidates = await getCandidates()

  return (
    <div className="w-full h-full flex-col">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="flex-auto px-2 w-full">
        <Voting data={Candidates} />
      </div>
      <footer className="w-full flex flex-row p-5 py-10 justify-center bg-gray-800 text-gray-300">
        <div className="w-1/6">
          <div className="text-3xl font-bold tracking-wide">Votum</div>
          <div className="text-sm ml-1 tracking-wider">Voting System</div>
        </div>
        <div className="w-2/6 flex flex-row">
          <div>
            <div className="text-xs tracking-wider text-gray-500">Designer</div>
            <div className="text-sm tracking-wide mb-4">James Mayor</div>
            <div className="text-xs tracking-wider text-gray-500">Developer</div>
            <div className="text-sm tracking-wide">Monty</div>
          </div>
          <div className="ml-auto">
            <div className="mb-2 text-gray-500 tracking-wide">Contacts</div>
            <Link className="flex flex-row items-center mb-3 hover:text-blue-300" target="_blank" href={'https://github.com/montymaxwell'}>
              <AiFillGithub size={25} />
              <div className="ml-2 text-sm">Monty Maxwell</div>
            </Link>
            <Link className="flex flex-row items-center hover:text-blue-300" target="_blank" href={'https://github.com/JpMayor1'}>
              <AiFillGithub size={25} />
              <div className="ml-2 text-sm">James Phillip Mayor</div>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default VotingPage