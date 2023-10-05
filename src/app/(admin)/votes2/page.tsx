import RouteGuard from '@/app/(admin)/RouteGuard'
import prisma from '@/lib/prisma'
import { Candidate } from '@/lib/types'
import { Votables } from '@/lib/votables'
import Image from 'next/image'

async function getCandidates() {
  const Candidates = await prisma.candidates.findMany()

  const positions = [
    "President",
    "Vice President",
    "Secretary",
    "Treasurer",
    "Auditor",
    "Business Manager",
    "Public Information Officer (P.I.O)",
    "ABM Representative",
    "GAS Representative",
    "HUMMS Representative",
    "TVL Representative",
    "BSIT Representative",
    "BSE Representative",
    "ACT Representative",
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
                    <div className='text-xl'>{`${candidate.firstname} ${(candidate.middleInitial !== ' ' ? `${candidate.middleInitial}.` : '')} ${candidate.lastname}`}</div>
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

// {CandidateList.map((party) => (
//   <div key={party.label} className='w-1/2'>
//     <div className='w-full my-3'>
//       <div className='w-full py-3 px-6 flex justify-center items-center bg-white border border-gray-200 rounded-lg'>
//         <h1 className='text-xl text-gray-500'>{party.label}</h1>
//         {/* <div className='flex flex-row items-center'>
//             <div className='text-sm mr-2'>Total Votes : </div>
//             <div className='text-xl text-indigo-500'>0</div>
//           </div> */}
//       </div>
//       <div className='w-full my-3'>
//         {party.members.map((candidate) => (
//           <div key={candidate.id} className="w-full my-1 p-6 bg-white border border-gray-200 rounded-lg flex flex-row flex-nowrap items-center">
//             <div className="w-20 h-20">
//               <Image
//                 width={80}
//                 height={80}
//                 alt='candidate photo'
//                 className="rounded-md w-20 h-20 object-cover"
//                 priority
//                 src={candidate.icon ? candidate.icon : ''}
//               />
//             </div>
//             <div className="flex-auto mx-4">
//               <div className='text-sm tracking-wide text-gray-500'>{Votables[candidate.position].label}</div>
//               <div className='text-xl'>{`${candidate.firstname} ${(candidate.middleInitial !== ' ' ? `${candidate.middleInitial}.` : '')} ${candidate.lastname}`}</div>
//               <div className='text-base text-blue-500'>{candidate.party}</div>
//             </div>
//             <div className="w-auto p-3 flex flex-col justify-center items-center">
//               <div className='text-gray-500 text-sm'>Votes</div>
//               <div className='text-indigo-500 text-3xl'>{candidate.votes}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// ))}