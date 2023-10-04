import Table from "@/components/Table"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import UserModal from "./Modal"

async function Page() {
  const Users = await prisma.users.findMany()

  return (
    <div className="w-full h-full flex flex-col">
      <UserModal />
      <div className="flex-auto">
        <Table
          api="/api/users"
          head={Object.values(Prisma.UsersScalarFieldEnum)}
          body={Users}
        />
      </div>
    </div>
  )
}

export default Page