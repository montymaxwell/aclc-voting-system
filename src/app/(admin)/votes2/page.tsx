import RouteGuard from '@/app/(admin)/RouteGuard'
import prisma from '@/lib/prisma'
import { Candidate } from '@/lib/types'
import { Votables } from '@/lib/votables'
import { Metadata } from 'next'
import Image from 'next/image'

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
      <RouteGuard>
        {Object.keys(CandidateList).map(key => (
          <div key={key} className='w-1/2'>
            <div className='w-full my-3'>
              <div className='w-full py-3 px-6 flex justify-center items-center bg-white border border-gray-200 rounded-lg'>
                <h1 className='text-xl text-gray-500'>{key}</h1>
              </div>
            </div>
            <div className='w-full my-3'>
              {CandidateList[key].map((candidate) => (
                <div key={candidate.id} className="w-full my-1 p-6 bg-white border border-gray-200 rounded-lg flex flex-row flex-nowrap items-center">
                  <div className="w-20 h-20">
                    <Image
                      width={80}
                      height={80}
                      alt='candidate photo'
                      className="rounded-md w-20 h-20 object-cover"
                      priority
                      src={candidate.icon ? candidate.icon : ''}
                    />
                  </div>
                  <div className="flex-auto mx-4">
                    <div className='text-sm tracking-wide text-gray-500'>{Votables[candidate.position].label}</div>
                    <div className='text-xl'>{candidate.name}</div>
                    <div className='text-base text-blue-500'>{candidate.party}</div>
                  </div>
                  <div className="w-auto p-3 flex flex-col justify-center items-center">
                    <div className='text-gray-500 text-sm'>Votes</div>
                    <div className='text-indigo-500 text-3xl'>{candidate.votes}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </RouteGuard>
    </div>
  )
}

export default VotesPage