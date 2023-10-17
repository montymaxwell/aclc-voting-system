import { Candidate } from "@/lib/types"
import Image from "next/image"

type Props = {
  label: string,
  voters: number,
  data: Array<Candidate>
}

function getColor(index: number) {
  if (index % 3 === 0) {
    return "bg-red-400"
  }
  else if (index % 2 === 0) {
    return "bg-blue-500"
  }
  else {
    return "bg-indigo-500"
  }
}

function Ranking({ label, data, voters }: Props) {
  const filtered = data.sort((a, b) => {
    return a.votes! - b.votes!;
  }).reverse()

  return (
    <div className="w-full">
      <div className="w-full">
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
                {/* <span>{voters}</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ranking


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