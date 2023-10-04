import Table from "@/components/Table"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import CandidateModal from "./Modal"

async function CandidatesPage() {
  const Candidates = await prisma.candidates.findMany()
  const Party = await prisma.party.findMany()

  return (
    <div className="w-full h-full flex flex-col">
      <CandidateModal data={Party} />
      <div className="flex-auto">
        <Table
          api="/api/candidates"
          head={Object.values(Prisma.CandidatesScalarFieldEnum)}
          body={Candidates}
        />
      </div>
    </div>
  )
}

export default CandidatesPage