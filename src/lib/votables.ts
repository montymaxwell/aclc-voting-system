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

    ABMRepresentative: {
        label: "ABM Representative",
        maxVotable: 2,
        candidates: [],
    },
    GASRepresentative: {
        label: "GAS Representative",
        maxVotable: 2,
        candidates: [],
    },
    HUMMSRepresentative: {
        label: "HUMMS Representative",
        maxVotable: 2,
        candidates: [],
    },
    TVLRepresentative: {
        label: "TVL Representative",
        maxVotable: 2,
        candidates: [],
    },
    BSERepresentative: {
        label: "BSE Representative",
        maxVotable: 2,
        candidates: [],
    },
    BSITRepresentative: {
        label: "BSIT Representative",
        maxVotable: 2,
        candidates: [],
    },
    ACTRepresentative: {
        label: "ACT Representative",
        maxVotable: 2,
        candidates: [],
    },
};