import Table from "@/components/Table";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

async function VotesPage() {
  const Votes = await prisma.votes.findMany()

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-auto">
        <Table
          api="/api/users"
          head={Object.values(Prisma.VotesScalarFieldEnum)}
          body={Votes}
        />
      </div>
    </div>
  )
}

export default VotesPage