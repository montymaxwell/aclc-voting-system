'use client'

import Table from "@/components/Table"
import { Prisma } from "@prisma/client"
import UserModal from "./Modal"
import { useLayoutEffect, useState } from "react"
import { useUserStore } from "@/lib/UserStore"
import { useRouter } from "next/navigation"

function Users({ data }: { data: any }) {
  const account = useUserStore()
  const router = useRouter()
  const [auth, setAuth] = useState<boolean>(false)

  const [users, setUsers] = useState<Array<any>>(data)

  useLayoutEffect(() => {
    if (account.userInfo.usn !== "" || account.userInfo.role !== "user") {
      setAuth(true);
    }
    else {
      setAuth(false);
      router.replace('/unauthorized');
    }
  }, [auth, account.userInfo.usn, account.userInfo.role, router])

  return (
    <>
      {auth === true ?
        <>
          <UserModal staticData={data} data={users} update={setUsers} />
          <div className="flex-auto">
            <Table
              api="/api/users"
              update={setUsers}
              head={Object.values(Prisma.UsersScalarFieldEnum)}
              body={users}
            />
          </div>
        </>
        :
        <></>
      }
    </>
  )
}

export default Users