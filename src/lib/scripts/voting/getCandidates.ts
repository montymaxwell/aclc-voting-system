import prisma from "@/lib/prisma";
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

    const List: { [id: string]: any } = {
        President: {},
        VicePresident: {},
        Secretary: {},
        Treasurer: {},
        Auditor: {},
        BusinessManager: {},
        PIO: {},
        SGTA: {},
        Muse: {},
        Escort: {}
    };

    Candidates.forEach((candidate) => {
        if (List[candidate.position!].label === undefined) {
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

export default getCandidates;
