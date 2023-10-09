const Submit = async () => {
    const allowedPositions: { [strand: string]: string[] } = {
        BSIT: [
            "President",
            "VicePresident",
            "Secretary",
            "Treasurer",
            "Auditor",
            "BusinessManager",
            "PIO",
            "BSITRepresentative",
        ],
        ABM: [
            "President",
            "VicePresident",
            "Secretary",
            "Treasurer",
            "Auditor",
            "BusinessManager",
            "PIO",
            "ABMRepresentative",
        ],
        GAS: [
            "President",
            "VicePresident",
            "Secretary",
            "Treasurer",
            "Auditor",
            "BusinessManager",
            "PIO",
            "GASRepresentative",
        ],
        HUMMS: [
            "President",
            "VicePresident",
            "Secretary",
            "Treasurer",
            "Auditor",
            "BusinessManager",
            "PIO",
            "HUMMSRepresentative",
        ],
        TVL: [
            "President",
            "VicePresident",
            "Secretary",
            "Treasurer",
            "Auditor",
            "BusinessManager",
            "PIO",
            "TVLRepresentative",
        ],
        BSE: [
            "President",
            "VicePresident",
            "Secretary",
            "Treasurer",
            "Auditor",
            "BusinessManager",
            "PIO",
            "BSERepresentative",
        ],
        ACT: [
            "President",
            "VicePresident",
            "Secretary",
            "Treasurer",
            "Auditor",
            "BusinessManager",
            "PIO",
            "ACTRepresentative",
        ],
    };

    const userStrand: string = User.userInfo.strand;

    // Get the positions that the user is allowed to vote for
    const validPositionsForStrand = allowedPositions[userStrand];

    // Get positions that are not voted for
    const notVotedPositions = Object.keys(Votables).filter((position) => {
        const { candidates, maxVotable } = Votables[position];
        return candidates.length !== maxVotable;
    });

    // Find the intersection of valid positions and not voted positions
    const invalidPositions = validPositionsForStrand.filter((position) => {
        return notVotedPositions.includes(position);
    });

    if (invalidPositions.length > 0) {
        const positionsToVote = invalidPositions.join(", ");
        toast.error(
            `Please vote for the following positions correctly: ${positionsToVote}`
        );
        console.log(invalidPositions);
    } else {
        const filteredVotes: any = {};

        // Iterate through the positions and filter out those with selected candidates
        Object.keys(Votes).forEach((position) => {
            const selectedCandidates = Votes[position].candidates.filter(
                (candidate) => candidate.selected
            );

            // Only include positions with selected candidates
            if (selectedCandidates.length > 0) {
                filteredVotes[position] = {
                    ...Votes[position],
                    candidates: selectedCandidates,
                };
            }
        });

        const VoteCollection: Array<any> = [];

        // Iterate through positions with candidates and add them to VoteCollection
        Object.keys(filteredVotes).forEach((position) => {
            const candidates = filteredVotes[position].candidates;
            // candidates.forEach((candidate: any) => {
            //     VoteCollection.push({
            //         USN: User.userInfo.usn,
            //         candidate: candidate.id, // Use candidate.id to store the candidate's name
            //     });
            // });

            VoteCollection.push(candidates);
        });

        const res = await fetch("/api/v1/voting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(VoteCollection),
        });

        const vote = await res.json();
        if (vote.state === true) {
            toast.success("Vote submitted successfully!");
            setTimeout(() => {
                User.logout();
                router.replace("/");
            }, 3000);
        } else {
            toast.error("Vote failed to submit!");
        }
    }
};