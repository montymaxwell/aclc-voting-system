import Table from "@/components/Table";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import CandidateModal from "./Modal";

import Candidates from "./Candidates";

async function CandidatesPage() {
    const candidates = await prisma.candidates.findMany();
    const Party = await prisma.party.findMany();

    return (
        <div className="w-full h-full flex flex-col">
            <Candidates data={candidates} party={Party} />
        </div>
    );
}

export default CandidatesPage;
