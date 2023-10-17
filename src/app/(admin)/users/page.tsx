import prisma from "@/lib/prisma"
import Users from "./users"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Users | ACLC Voting System'
}

async function Page() {
  const users = await prisma.users.findMany({ where: { marked: false } });

  return (
    <div className="w-full h-full flex flex-col">
      <Users data={users} />
    </div>
  )
}

export default Page