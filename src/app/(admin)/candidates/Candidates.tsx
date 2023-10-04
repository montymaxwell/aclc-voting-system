"use client";
import { useState } from "react";
import { Candidate } from "@/lib/types";
import CandidateModal from "./Modal";
import Table from "@/components/Table";
import { Prisma } from "@prisma/client";

type Props = {
    data: any;
    party: any;
};
function Candidates({ data, party }: Props) {
    const [candidates, setCandidates] = useState<Array<Object>>(data);

    return (
        <>
            <CandidateModal data={party} update={setCandidates} />
            <div className="flex-auto">
                <Table
                    api="/api/candidates"
                    head={Object.values(Prisma.CandidatesScalarFieldEnum)}
                    body={candidates}
                />
            </div>
        </>
    );
}

export default Candidates;
