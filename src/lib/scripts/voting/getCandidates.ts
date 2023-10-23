import prisma from "@/lib/prisma";
import { Votables } from "@/lib/votables";

async function getCandidates() {
    const Candidates = await prisma.candidates.findMany({ where: { marked: false } });
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
        President: {
            label: "President",
            maxVotable: 1,
            candidates: [],
        },
        VicePresident: {
            label: "Vice President",
            maxVotable: 1,
            candidates: [],
        },
        Secretary: {
            label: "Secretary",
            maxVotable: 1,
            candidates: [],
        },
        Treasurer: {
            label: "Treasurer",
            maxVotable: 1,
            candidates: [],
        },
        Auditor: {
            label: "Auditor",
            maxVotable: 1,
            candidates: [],
        },
        BusinessManager: {
            label: "Business Manager",
            maxVotable: 2,
            candidates: [],
        },
        PIO: {
            label: "Public Information Officer (P.I.O)",
            maxVotable: 1,
            candidates: [],
        },
        SGTA: {
            label: 'Sergeant of Arms',
            maxVotable: 1,
            candidates: [],
        },
        Muse: {
            label: 'Muse',
            maxVotable: 1,
            candidates: []
        },
        Escort: {
            label: 'Escort',
            maxVotable: 1,
            candidates: []
        }
    };

    Candidates.forEach((candidate, i) => {
        const position = List[candidate.position!];
        position.candidates.push({
            ...candidate,
            partyAcronym: PartyList[candidate.party!].acronym
        });
    });

    return List;
}

export default getCandidates;
