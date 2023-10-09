'use client'

import SimpleSearch from "@/components/SimpleSearch/Search"
import Table from "@/components/Table"
import { useUserStore } from "@/lib/UserStore"
import { Prisma } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useLayoutEffect, useState } from "react"

function Votes({ data }: { data: Array<any> }) {
  const account = useUserStore()
  const router = useRouter()
  const [auth, setAuth] = useState<boolean>(false)

  const [votes, setVotes] = useState(data)

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
          <div className="w-full p-5 bg-gray-200">
            <SimpleSearch target="USN" staticData={data} data={votes} update={setVotes} />
          </div>
          <Table
            update={setVotes}
            api="/api/users"
            head={Object.values(Prisma.VotesScalarFieldEnum)}
            body={votes}
          />
        </>
        :
        <></>
      }
    </>
  )
}

export default Votes