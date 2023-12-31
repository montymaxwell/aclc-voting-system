import Table from "@/components/Table";
import Votes from "./votes";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Votes | ACLC Voting System'
}

async function VotesPage() {
  const votes = await prisma.votes.findMany({ where: { marked: false } })

  return (
    <div className="w-full h-full flex flex-col">
      <Votes data={votes} />
    </div>
  )
}

export default VotesPage