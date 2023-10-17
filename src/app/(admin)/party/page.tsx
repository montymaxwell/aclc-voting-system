import prisma from "@/lib/prisma"
import Party from "./party"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Party | ACLC Voting System'
}

async function PartyPage() {
  const party = await prisma.party.findMany()

  return (
    <div className="w-full h-full flex flex-col">
      <Party data={party} />
    </div>
  )
}

export default PartyPage