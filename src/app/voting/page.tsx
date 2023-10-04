import Voting from "@/components/Voting"
import getCandidates from "@/lib/scripts/voting/getCandidates"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function VotingPage() {
  const Candidates = await getCandidates()

  return (
    <div className="w-full h-full flex-col">
      <div className="flex-auto px-2 w-full">
        <Voting data={Candidates} />
      </div>
      <footer className="footer"></footer>
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
    </div>
  )
}

export default VotingPage