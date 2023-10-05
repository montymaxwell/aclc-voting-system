import Voting from "@/components/Voting"
import getCandidates from "@/lib/scripts/voting/getCandidates"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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