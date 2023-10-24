'use client'

import { useUserStore } from "@/lib/UserStore"
import { Candidate } from "@/lib/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLayoutEffect, useState } from "react"

type Props = {
  label: string,
  voters: number,
  voted: number,
  data: Array<Candidate>
}

function getColor(index: number) {
  if (index % 3 === 0) {
    // return "bg-red-400"
    return "bg-blue-400"
  }
  else if (index % 2 === 0) {
    // return "bg-blue-500"
    return "bg-red-400"
  }
  else {
    // return "bg-indigo-500"
    return "bg-orange-400"
  }
}

function Ranking({ label, data, voters, voted }: Props) {
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

  if (auth) {
    const filtered = data.sort((a, b) => {
      return a.votes! - b.votes!;
    }).reverse()

    return (
      <div className="w-full h-screen flex flex-row snap-center">
        <div className="w-1/4 p-5 gap-y-2 flex flex-col justify-center">
          {filtered.map((candidate, i) => (
            <div key={candidate.id} className={`text-white px-4 flex flex-row py-2 rounded-lg ${getColor(i)}`}>
              <span>{candidate.name}</span>
              <span className="ml-auto">{candidate.votes}</span>
            </div>
          ))}
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-5 p-10">
          <div className="w-3/4 px-4 flex flex-row flex-wrap items-center">
            <div className="tracking-wide">{label}</div>
            <div className="ml-auto">
              <span className="text-xl text-indigo-500">{voted}</span>
              <span className="ml-2 text-sm text-gray-600">Voted</span>
            </div>
            <div className="mx-2">/</div>
            <div>
              <span className="text-xl text-indigo-500">{voters}</span>
              <span className="ml-2 text-sm text-gray-600">Voters</span>
            </div>
          </div>
          <div className="w-3/4 h-3/4">
            <div className="relative w-full h-full border-4 border-gray-300 rounded-xl flex flex-row items-end gap-x-5 justify-center">
              <div className="absolute w-full h-1/4 -z-10 border-t border-gray-200">
                <div className="-mt-3 -ml-12 text-gray-400">25%</div>
              </div>
              <div className="absolute w-full h-2/4 -z-10 border-t border-gray-200">
                <div className="-mt-3 -ml-12 text-gray-400">50%</div>
              </div>
              <div className="absolute w-full h-3/4 -z-10 border-t border-gray-200">
                <div className="-mt-3 -ml-12 text-gray-400">75%</div>
              </div>
              {filtered.map((candidate, i) => (
                <div key={candidate.id} className="h-full flex flex-col justify-end items-center">
                  <div className="text-gray-800">{Math.round((candidate.votes! / voters) * 100) / 100}</div>
                  <div className={`w-16 ${getColor(i)} rounded-t-lg`} style={{ height: `${(candidate.votes! / voters) * 100}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  else return (
    <div></div>
  )
}

export default Ranking

{/* <div className="w-full">
<span className="p-5 bg-indigo-500 text-white">{label}</span>
</div>
<div className="w-full flex flex-row flex-wrap py-10 gap-2">
{filtered.map((candidate, i) => (
  <div key={candidate.id} className="w-1/4 p-4 flex-auto bg-white flex flex-row rounded-lg border border-gray-200">
    <div className="mr-10 text-1xl text-gray-400">#{i + 1}</div>
    <div className="flex-auto">
      <div className="flex flex-row gap-2 text-2xl items-center">
        <p>{candidate.name}</p>
        <p className="text-base">({candidate.party})</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <span className="text-indigo-600 text-3xl">{candidate.votes}</span>
        <span className="text-gray-500 self-end mb-1">Votes</span>
      </div>
    </div>
  </div>
))}
</div> */}


{/* <div className="w-full flex flex-col flex-nowrap">
<div className="w-full">{label}</div>
<div className="w-3/6">
  <div className="w-full flex flex-row">
    {filtered.map((candidate, i) => (
      <div key={candidate.id}
        className={`rank-card text-white ${getColor(i)}`}
      >
        <div className="w-10 h-10 flex justify-center items-center bg-white/30 rounded-full">
          <Image
            src={candidate.icon!}
            alt="candidate icon"
            width={32}
            height={32}
            className="object-cover w-8 h-8 rounded-full"
          />
        </div>
        <div className="flex-auto flex flex-row">
          <p className="mx-1">{candidate.firstname}</p>
          <p className="mx-1">{candidate.lastname}</p>
        </div>
      </div>
    ))}
  </div>
</div>
<div className="flex-auto">
  <div className="w-full h-full border border-gray-300">

  </div>
</div>
</div> */}


{/* <div className="w-full h-screen p-5">
<div className="w-full h-full flex flex-col">
  <div>{label}</div>
  <div className="flex-auto flex">
    <div className="w-3/12 flex flex-col justify-center px-4">
      {filtered.map((candidate, i) => (
        <div key={candidate.id}
          className={`rank-card text-white ${getColor(i)}`}
        >
          <div className="w-10 h-10 flex justify-center items-center bg-white/30 rounded-full">
            <Image
              src={candidate.icon!}
              alt="candidate icon"
              width={32}
              height={32}
              className="object-cover w-8 h-8 rounded-full"
            />
          </div>
          <div className="flex-auto flex flex-row">
            <p className="mx-1">{candidate.firstname}</p>
            <p className="mx-1">{candidate.lastname}</p>
            <p className="ml-auto mr-5">{candidate.votes}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="w-9/12 flex justify-center items-center">
      <div className="
        w-1/2 h-1/2 border border-gray-300 
        rounded-lg flex flex-row flex-nowrap
        justify-around items-end
      ">
        {filtered.map((candidate, i) => (
          <div key={candidate.id}
            className={`w-1/6 p-5 text-white ${getColor(i)}`}
            style={{ height: '200px' }}
          >

          </div>
        ))}
      </div>
    </div>
  </div>
</div>
</div> */}