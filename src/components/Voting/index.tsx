'use client'

import { VoteProps } from '@/lib/types';
import { Votables } from '@/lib/votables';
import { BsFillSendCheckFill } from 'react-icons/bs'
import Collection from './Collection';
import LogoutBtn from '../LogoutBtn';
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useUserStore } from "@/lib/UserStore";
import { useRouter } from "next/navigation";

export const Votes: { [id: string]: VoteProps } = { ...Votables };

type Props = {
  data: { [id: string]: VoteProps };
};
function Voting({ data }: Props) {

  const User = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (User.userInfo.usn === "" || User.userInfo.role === "admin") {
      router.replace("/unauthorized");
    }
  }, [User.userInfo.usn, User.userInfo.role, router]);

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
      const VoteCollection: { USN: string; candidate: string }[] = [];
      Object.values(Votes).forEach((vote) => {
        vote.candidates.forEach((candidate) => {
          VoteCollection.push({
            USN: User.userInfo.usn,
            candidate: candidate.name,
          });
        });
      });

      const res = await fetch("/api/voting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(VoteCollection),
      });

      const vote = await res.json();
      console.log(vote);
      if (vote.state === true) {
        toast.success("Vote submitted successfully!");
        setTimeout(() => {
          User.logout();
          router.replace("/");
        }, 3000);
      }
    }
  };


  return (
    <>
      <div className="w-full">
        <div className="w-full items-center relative py-2">
          <h1 className="text-2xl font-bold my-5 text-center">
            ACLC SSC Voting System
          </h1>
          <div className="absolute right-5 top-0 w-[100px] rounded-md">
            <LogoutBtn />
          </div>
        </div>
        <Collection data={Object.values(data)} />
        <button
          onClick={Submit}
          className={`fixed z-10 bottom-8 right-5 w-20 h-20 p-5 bg-indigo-400 text-white rounded-full flex justify-center items-center`}
        >
          <div className="w-full h-full flex justify-center items-center">
            <BsFillSendCheckFill className="text-4xl -ml-1.5 -mb-1 align-middle" />
          </div>
        </button>
      </div>
    </>
  )
}

export default Voting