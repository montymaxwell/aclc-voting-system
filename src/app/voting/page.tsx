import Voting from "@/components/Voting"
import getCandidates from "@/lib/scripts/voting/getCandidates"
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: 'Voting | ACLC VoteSys'
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
      <footer className="w-full p-5 bg-blue-950"></footer>
    </div>
  )
}

export default VotingPage