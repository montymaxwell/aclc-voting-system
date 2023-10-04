import { CandidateType, VoteProps } from "@/lib/types";
import { useLayoutEffect } from "react";
import Candidates from "./Candidate";
import { useUserStore } from "@/lib/UserStore";

type Props = {
  data: Array<VoteProps>;
};

// This component handles renders the collection of candidates in a given party position
function Collection({ data }: Props) {
  // Define allowedPositions here with a more generic type
  const allowedPositions: { [strand: string]: string[] } = {
    BSIT: [
      "President",
      "Vice President",
      "Secretary",
      "Treasurer",
      "Auditor",
      "Business Manager",
      "Public Information Officer (P.I.O)",
      "BSIT Representative",
    ],
    ABM: [
      "President",
      "Vice President",
      "Secretary",
      "Treasurer",
      "Auditor",
      "Business Manager",
      "Public Information Officer (P.I.O)",
      "ABM Representative",
    ],
    GAS: [
      "President",
      "Vice President",
      "Secretary",
      "Treasurer",
      "Auditor",
      "Business Manager",
      "Public Information Officer (P.I.O)",
      "GAS Representative",
    ],
    HUMMS: [
      "President",
      "Vice President",
      "Secretary",
      "Treasurer",
      "Auditor",
      "Business Manager",
      "Public Information Officer (P.I.O)",
      "HUMMS Representative",
    ],
    TVL: [
      "President",
      "Vice President",
      "Secretary",
      "Treasurer",
      "Auditor",
      "Business Manager",
      "Public Information Officer (P.I.O)",
      "TVL Representative",
    ],
    BSE: [
      "President",
      "Vice President",
      "Secretary",
      "Treasurer",
      "Auditor",
      "Business Manager",
      "Public Information Officer (P.I.O)",
      "BSE Representative",
    ],
    ACT: [
      "President",
      "Vice President",
      "Secretary",
      "Treasurer",
      "Auditor",
      "Business Manager",
      "Public Information Officer (P.I.O)",
      "ACT Representative",
    ],
  };

  const User = useUserStore();
  const userStrand = User.userInfo.strand;

  useLayoutEffect(() => {
    data.forEach((content, i) => {
      const candidates: CandidateType[] =
        content.candidates as CandidateType[];
      candidates.forEach((candidate: CandidateType, ic: number) => {
        candidates[ic].selected = false;
      });
    });
  }, [data]);

  const filteredData = data.filter((voting) => {
    const position = voting.label; // Assuming the position label matches the strand

    // Check if the user's strand is in allowedPositions
    // and if the allowed positions for the strand include the current position
    return (
      userStrand in allowedPositions &&
      allowedPositions[userStrand].includes(position)
    );
  });

  return filteredData.map((voting) => (
    <div className="w-full" key={voting.label}>
      <div className="w-auto mx-2 p-5 rounded-lg bg-gray-100 flex flex-wrap items-center justify-between">
        <h1 className="tracking-wide">{voting.label}</h1>
        {voting.maxVotable > 1 ? (
          <h1 className="mx-2 text-red-300">
            (You can vote up to {voting.maxVotable} candidates*)
          </h1>
        ) : (
          <h1 className="mx-2 text-red-300">
            (You can only vote {voting.maxVotable} candidate*)
          </h1>
        )}
      </div>
      <div className="w-full my-2 flex flex-wrap justify-center gap-2">
        <Candidates data={voting} />
      </div>
    </div>
  ));
}

export default Collection;
