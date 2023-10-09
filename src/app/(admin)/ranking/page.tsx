import Ranking from "@/components/Ranking";
import prisma from "@/lib/prisma";
import { Candidate } from "@/lib/types";
import { Votables } from "@/lib/votables";

async function getCandidates() {
  const Candidates = await prisma.candidates.findMany({ where: { marked: false } })

  const List: { [id: string]: Array<Candidate> } = {
    President: [],
    VicePresident: [],
    Secretary: [],
    Treasurer: [],
    Auditor: [],
    BusinessManager: [],
    PIO: [],
    SGTA: [],
    Muse: [],
    Escort: []
  };

  Candidates.forEach(candidate => {
    List[candidate.position].push(candidate)
  })

  return List
}

async function RankingPage() {
  const Candidates = await getCandidates()
  const voters = await prisma.users.count()

  return (
    <div className="w-full h-full bg-gray-100">
      {/* <pre>{JSON.stringify(Candidates, null, 2)}</pre> */}
      {Object.keys(Candidates).map((key) => (
        <Ranking key={key}
          voters={voters}
          data={Candidates[key]}
          label={Votables[key].label}
        />
      ))}
    </div>
  )
}

export default RankingPage