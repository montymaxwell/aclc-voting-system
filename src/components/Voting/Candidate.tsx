import { CandidateType } from "@/lib/types";
import { useState } from "react";
import { Votes } from "./index";
import { MdVerified } from "react-icons/md";
import Image from "next/image";

type Props = {
    data: any;
};

// This Component handles the rendering of which selected candidate in a collection
function Candidates({ data }: Props) {
    const [candidates, setCandidates] = useState<Array<CandidateType>>(
        data.candidates
    );

    const Action = (index: number) => {
        let list = candidates;

        // this checks if the current selection
        // is the last one that you've selected
        // and then unselects them and rerender the collection
        if (list[index].selected === true) {
            list[index].selected = false;
            Votes[list[index].position].candidates.splice(
                Votes[list[index].position].candidates.indexOf(list[index]),
                1
            );
            setCandidates([...list]);

            return;
        }

        // this filters out the selected candidate in a collection
        // then return them as an array of seleected candidates
        const selected = list.filter((v) => v.selected === true);

        // this checks if the selected candidates are within range of
        // max votable candidates and looks for other selected items
        // and unselects them
        if (selected.length === data.maxVotable) {
            // this is a pointless checking and
            // honestly don't know why this is here
            // but i ain't touching anything
            if (selected.length === 0) {
                return;
            }

            list.forEach((item, i) => {
                if (i <= selected.length) {
                    const lastSelection = selected[i];
                    if (lastSelection !== undefined) {
                        list[list.indexOf(lastSelection)].selected = false;
                    }
                } else return;
            });
        }

        const updatedList = list.filter((v) => {
            if (v === candidates[index]) {
                if (v.selected && v.selected === true) {
                    v.selected = false;
                } else {
                    v.selected = true;
                }
            }

            return v;
        });

        setCandidates(updatedList);
        Votes[candidates[index].position].candidates = candidates.filter(
            (v) => v.selected === true
        );
    };

    // If you're still reading this. Honestly, I forgot what is going on up there but i do know that it works
    // sleepless nights can really make you forget a lot of things hehe ;)
    return candidates.map((candidate, index: number) => (
        <div
            className="h-fit w-full max-w-[400px] my-1"
            key={`${String(candidate.position)}-${index}`}
        >
            <Card
                key={candidate.firstname}
                action={() => Action(index)}
                data={{
                    ...candidate,
                    displayPosition: data.label,
                    selected: candidates[index].selected,
                }}
            />
        </div>
    ));

    // return candidates.map((candidate, index: number) => {
    //     // if(candidate.position === 'VicePresident') {
    //     //   const tmp = candidates.splice(candidates.length - 1, 1);
    //     //   setCandidates(v => [candidate, ...tmp])
    //     // }
    //     // else if(candidate.position === 'President') {
    //     //   const tmp = candidates.splice(candidates.length - 1, 1);
    //     //   setCandidates(v => [candidate, ...tmp])
    //     // }
    // });
}

function Card({ data, action }: { data: CandidateType; action?: () => void }) {
    const { displayPosition, ...user } = data;

    return (
        <div
            role="button"
            onClick={action}
            className={`VoteCard border-4 ${
                user.selected ? "border-green-400" : "border-transparent"
            }`}
        >
            {/* for image */}
            <div className="w-32 h-32 p-1 relative">
                <div className="w-full h-full bg-gray-200 rounded-md">
                    <div className="w-48 h-48">
                        <Image
                            src={user.icon ? user.icon : ""}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                            alt="candidate image"
                        />
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 px-2 py-1 text-sm rounded-full bg-indigo-500 text-white">
                    {user.partyAcronym}
                </div>
            </div>

            <div className="flex-auto pl-3">
                {/* <h6 className="font-light mb-2 text-gray-500">Something</h6> */}
                <h1 className="text-1xl font-medium">{`${user.firstname} ${user.middleInitial}. ${user.lastname}`}</h1>
                <h3 className="font-light text-lg text-gray-400">
                    {displayPosition}
                </h3>
                <h6 className="text-md font-normal">{user.party}</h6>
            </div>
            {user.selected && (
                <div className="-mt-4">
                    <MdVerified className="text-3xl text-green-400" />
                </div>
            )}
        </div>
    );
}

export default Candidates;
