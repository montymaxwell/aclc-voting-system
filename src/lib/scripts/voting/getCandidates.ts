import prisma from "@/lib/prisma";
import { VoteProps } from "@/lib/types";
import { Votables } from "@/lib/votables";

async function getCandidates() {
    const Candidates = await prisma.candidates.findMany();
    const Party = await prisma.party.findMany();

    const PartyList: {
        [id: string]: { name: string; acronym: string; members: [] };
    } = {};

    Party.forEach((party) => {
        PartyList[party.name] = {
            name: party.name,
            acronym: party.acronym!,
            members: [],
        };
    });

    const List: { [id: string]: VoteProps } = {};

    Candidates.forEach((candidate) => {
        if (List[candidate.position!] === undefined) {
            List[candidate.position!] = {
                label: Votables[candidate.position!].label,
                maxVotable: Votables[candidate.position!].maxVotable,
                candidates: [],
            };
        }

        const position = List[candidate.position!];
        position.candidates.push({
            ...candidate,
            partyAcronym: PartyList[candidate.party!].acronym,
        });
    });

    return List;
}

export default getCandidates