"use client";

import { VoteProps } from "@/lib/types";
import { Votables } from "@/lib/votables";
import { BsFillSendCheckFill } from "react-icons/bs";
import Collection from "./Collection";
import LogoutBtn from "../LogoutBtn";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useUserStore } from "@/lib/UserStore";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export const Votes: { [id: string]: VoteProps } = { ...Votables };

type Props = {
  data: { [id: string]: VoteProps };
};
function Voting({ data }: Props) {
  const User = useUserStore();
  const router = useRouter();
  const [auth, setAuth] = useState<boolean>(false)

  useEffect(() => {
    if (User.userInfo.usn === "" || User.userInfo.role === "admin") {
      router.replace("/unauthorized");
      setAuth(false);
    }
    else {
      setAuth(true);
    }

  }, [User.userInfo.usn, User.userInfo.role, router]);

  const Submit = async () => {
    const notVoted = Object.keys(Votables).filter((position) => {
      const { candidates, maxVotable } = Votables[position];
      const votedCount = candidates.length;

      if (maxVotable !== undefined) {
        return votedCount !== maxVotable;
      }

      return votedCount === 0;
    });


    if (notVoted.length > 0) {
      const positionsToVote = notVoted.map((v) => Votables[v].label).join(",\n");
      toast.error(
        `Please vote for the following positions correctly: 
          ${positionsToVote}`,
        {
          style: {
            width: '400px',
          }
        }
      );
    }
    else {
      const serializedVotes: Array<string> = [];
      Object.values(Votes).forEach(vote => {
        vote.candidates.forEach((candidate) => {
          serializedVotes.push(candidate.id);
        });
      });

      const res = await api('voting').post({
        USN: User.userInfo.usn,
        votes: serializedVotes,
      });

      if (res.state === true) {
        toast.success('Successfully voted!');
        User.logout();
      }
      else {
        toast.error(res.message);
      }
    }
  }

  return (
    <>
      {auth ?
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
        :
        <div className="w-full h-full bg-white" />
      }
    </>
  );
}

export default Voting;
