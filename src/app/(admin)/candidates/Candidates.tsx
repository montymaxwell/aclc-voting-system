"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { Candidate } from "@/lib/types";
import CandidateModal from "./Modal";
import Table from "@/components/Table";
import { Prisma } from "@prisma/client";
import { useUserStore } from "@/lib/UserStore";
import { useRouter } from "next/navigation";

type Props = {
    data: any;
    party: any;
};
function Candidates({ data, party }: Props) {
    const account = useUserStore()
    const router = useRouter()
    const [auth, setAuth] = useState<boolean>(false)
    const [candidates, setCandidates] = useState<Array<Object>>(data);

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
            <CandidateModal staticData={data} data={candidates} party={party} update={setCandidates} />
            <div className="flex-auto">
                <Table
                    body={candidates}
                    api="/api/candidates"
                    update={setCandidates}
                    head={Object.values(Prisma.CandidatesScalarFieldEnum)}
                />
            </div>
        </>
    );
}

export default Candidates;
