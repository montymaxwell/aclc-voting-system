import { VoteProps } from "./types";

export const Strands = ["ABM", "GAS", "HUMMS", "TVL", "BSIT", "BSE", "ACT"];

export const Votables: { [Position: string]: VoteProps } = {
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