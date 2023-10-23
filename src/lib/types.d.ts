type VoteProps = {
    label: string;
    maxVotable: number;
    candidates: Array<any>;
};

// User Types
export type User = {
    USN: string,
    role: 'user' | 'admin' | string,
    name: string,
    strand: string,
    voted?: boolean,
    voteList?: Array<string>,
    createdAt?: Date | null
}

// Candidate Types
export type Candidate = {
    id: number;
    name: string,
    icon: string | null;
    party: string;
    position: string;
    votes: number | null;
    createdAt: Date | null;
};

export type CandidateType = {
    partyAcronym: string;
    displayPosition: string;
    selected?: boolean;
} & Candidate

// Party Types
export type Party = {
    name: string;
    acronym: string | null;
    members?: Array<string>;
};