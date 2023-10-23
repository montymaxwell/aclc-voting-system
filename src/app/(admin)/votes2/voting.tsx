'use client';
import Image from 'next/image'
import { FaUserTie } from 'react-icons/fa6'

import { Candidate } from "@/lib/types";
import { Votables } from '@/lib/votables';
import { useUserStore } from '@/lib/UserStore';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

function Voting({ data }: { data: { [party: string]: Array<Candidate> } }) {
  const account = useUserStore()
  const router = useRouter()
  const [auth, setAuth] = useState<boolean>(false)

  useLayoutEffect(() => {
    if (account.userInfo.usn !== "" || account.userInfo.role !== "user") {
      setAuth(true);
    }
    else {
      setAuth(false);
      router.replace('/unauthorized');
    }
  }, [auth, account.userInfo.usn, account.userInfo.role, router])

  return Object.keys(data).map(key => (
    <div key={key} className='w-1/2'>
      <div className='w-full my-3'>
        <div className='w-full py-3 px-6 flex justify-center items-center bg-white border border-gray-200 rounded-lg'>
          <h1 className='text-xl text-gray-500'>{key}</h1>
        </div>
      </div>
      <div className='w-full my-3'>
        {data[key].map((candidate) => (
          <div key={candidate.id} className="w-full my-1 p-6 bg-white border border-gray-200 rounded-lg flex flex-row flex-nowrap items-center">
            <div className="w-20 h-20">
              {candidate.icon ?
                <Image
                  width={80}
                  height={80}
                  alt='candidate photo'
                  className="rounded-md w-20 h-20 object-cover"
                  priority
                  src={candidate.icon}
                />
                :
                <FaUserTie size={80} className='p-3 text-gray-700' />
              }
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
  ))
}

export default Voting