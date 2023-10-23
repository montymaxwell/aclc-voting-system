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
import Image from 'next/image'
import api from "@/lib/api";
import { FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

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
          serializedVotes.push(candidate.name);
        });
      });

      User.addVotes(serializedVotes);

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

  const Logout = () => {
    User.logout();
    router.replace('/');
  }

  return (
    <>
      {auth ?
        <div className="w-full">
          <div className="w-full flex flex-auto items-center relative px-4 py-6">
            <Image
              src="/aclclogo.png"
              alt="aclclogo"
              width={60}
              height={60}
            />
            <div className="p-4">
              <h1 className="text-6xl font-bold text-indigo-950">ACLC</h1>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-700">College of Commonwealth</h2>
              <h6 className="">SCC Voting System</h6>
            </div>
            <button onClick={Logout} className="ml-auto flex flex-row items-center pl-2 pr-4 py-2 group hover:bg-indigo-400 hover:text-white rounded-lg">
              <FaUser size={55} className='p-3 group-hover:text-white text-gray-600' />
              <div className="text-start">
                <div className="text-xs">
                  Hello, you may start voting
                </div>
                <div className="text-sm font-bold">
                  {User.userInfo.name}
                </div>
              </div>
              <AiOutlineLogout className="ml-5 text-2xl" />
            </button>
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
