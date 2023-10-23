import prisma from '@/lib/prisma'
import { Candidate } from '@/lib/types'
import { Votables } from '@/lib/votables'
import { Metadata } from 'next'
import Voting from './voting'
export const metadata: Metadata = {
  title: 'Voting | ACLC Voting System'
}

async function getCandidates() {
  const Candidates = await prisma.candidates.findMany({ where: { marked: false } })

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

  const Collection: { [party: string]: Array<Candidate> } = {}
  Candidates.forEach(candidate => {
    if (Collection[candidate.party] === undefined) {
      Collection[candidate.party] = [];
    }

    Collection[candidate.party].push(candidate);
  });

  Object.keys(Collection).forEach(key => {
    Collection[key] = Collection[key].sort((a, b) => {
      const first = positions.indexOf(Votables[a.position].label);
      const second = positions.indexOf(Votables[b.position].label);
      return first - second
    });
  })

  return Collection
}

async function VotesPage() {
  const CandidateList = await getCandidates()

  return (
    <div className="w-full h-full p-5 bg-gray-100 scroll-auto overflow-auto flex flex-row gap-2">
      <Voting data={CandidateList} />
    </div>
  )
}

export default VotesPage