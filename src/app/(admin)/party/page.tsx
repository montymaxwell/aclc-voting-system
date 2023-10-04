import Table from "@/components/Table"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import PartyModal from "./Modal"

async function PartyPage() {
  const Party = await prisma.party.findMany()

  return (
    <div className="w-full h-full flex flex-col">
      <PartyModal />
      <div className="flex-auto">
        <Table
          api="/api/party"
          head={Object.values(Prisma.PartyScalarFieldEnum)}
          body={Party}
        />
      </div>
    </div>
  )
}

export default PartyPage