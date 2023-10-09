import { CandidateType, VoteProps } from "@/lib/types";
import { useLayoutEffect } from "react";
import Candidates from "./Candidate";
import { useUserStore } from "@/lib/UserStore";

type Props = {
  data: Array<VoteProps>;
};

// This component handles renders the collection of candidates in a given party position
function Collection({ data }: Props) {
  useLayoutEffect(() => {
    data.forEach((content, i) => {
      const candidates: CandidateType[] =
        content.candidates as CandidateType[];
      candidates.forEach((candidate: CandidateType, ic: number) => {
        candidates[ic].selected = false;
      });
    });
  }, [data]);

  return data.map((voting) => (
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
      <div className="w-full my-2 flex flex-row flex-wrap">
        <Candidates data={voting} />
      </div>
    </div>
  ));
}

export default Collection;
