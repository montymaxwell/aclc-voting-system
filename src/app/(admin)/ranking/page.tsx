import Ranking from "@/components/Ranking";
import prisma from "@/lib/prisma";
import { Candidate } from "@/lib/types";
import { Votables } from "@/lib/votables";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ranking | ACLC Voting System'
}

async function getCandidates() {
  const Candidates = await prisma.candidates.findMany({ where: { marked: false } });

  const positions = [
    "President",
    "Vice President",
    "Secretary",
    "Treasurer",
    "Auditor",
    "Business Manager",
    "Public Information Officer (P.I.O)",
    "Sergeant of Arms",
    "Muse",
    "Escort"
  ]

  const sortedCandidates = Candidates.sort((a, b) => {
    const first = positions.indexOf(Votables[a.position].label);
    const second = positions.indexOf(Votables[b.position].label);
    return first - second;
  });

  const List: { [id: string]: Array<Candidate> } = {};

  sortedCandidates.forEach(candidate => {
    if (List[candidate.position] === undefined) {
      List[candidate.position] = [];
    }

    List[candidate.position].push(candidate);
  })

  return List
}

async function RankingPage() {
  const Candidates = await getCandidates()
  const voters = await prisma.users.count()
  const voted = await prisma.users.count({ where: { voted: true } });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-auto">
        {Object.keys(Candidates).map((key) => (
          <Ranking key={key}
            voted={voted}
            voters={voters}
            data={Candidates[key]}
            label={Votables[key].label}
          />
        ))}
      </div>
    </div>
  )
}

export default RankingPage