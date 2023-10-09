'use client'

import Table from "@/components/Table"
import { Prisma } from "@prisma/client"
import { useLayoutEffect, useState } from "react"
import { useUserStore } from "@/lib/UserStore"
import { useRouter } from "next/navigation"
import PartyModal from "./Modal"

function Party({ data }: { data: any }) {
  const account = useUserStore()
  const router = useRouter()
  const [auth, setAuth] = useState<boolean>(false)

  const [party, setParty] = useState<Array<any>>(data)

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
          <PartyModal update={setParty} />
          <div className="flex-auto">
            <Table
              update={setParty}
              api="/api/party"
              head={Object.values(Prisma.PartyScalarFieldEnum)}
              body={party}
            />
          </div>
        </>
        :
        <></>
      }
    </>
  )
}

export default Party