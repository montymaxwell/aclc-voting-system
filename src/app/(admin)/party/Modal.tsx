"use client";

import Modal from "@/components/Modal";
import api from "@/lib/api";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";

function PartyModal() {
    const [modal, setModal] = useState<boolean>(false);
    const [name, setName] = useState<string | null>(null);
    const [acronym, setAcronym] = useState<string | null>(null);

    const Submit = async () => {
        if (name === null) {
            return;
        }

        if (acronym === null) {
            return;
        }

        const res = await api("party").post({ name, acronym });
        if (res.state === true) {
            setModal(!modal);
        }
    };

    return (
        <>
            {modal ? (
                <Modal>
                    <header className="w-full p-2 mt-3 flex items-center">
                        <div className="ml-6 text-lg">Party Form Modal</div>
                        <button
                            onClick={() => setModal(!modal)}
                            className="button ml-auto"
                        >
                            <IoMdClose />
                        </button>
                    </header>
                    <main className="flex-auto p-3 flex flex-col">
                        <div className="w-full flex flex-row my-4 px-5">
                            <div className="flex-auto pr-2">
                                <label
                                    htmlFor="partyname"
                                    className="form-label mx-3 my-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="partyname"
                                    placeholder="Name"
                                    className="text-input primary-input"
                                    onChange={(ev) => {
                                        if (ev.target.value === "") {
                                            setName(null);
                                        } else {
                                            setName(ev.target.value);
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex-auto pl-2">
                                <label
                                    htmlFor="partyAcronym"
                                    className="form-label mx-3 my-2"
                                >
                                    Acronym
                                </label>
                                <input
                                    type="text"
                                    name="partyAcronym"
                                    placeholder="Acronym"
                                    className="text-input primary-input"
                                    onChange={(ev) => {
                                        if (ev.target.value === "") {
                                            setAcronym(null);
                                        } else {
                                            setAcronym(ev.target.value);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </main>
                    <footer className="w-full p-4 px-8 flex justify-end">
                        <button
                            onClick={() => setModal(!modal)}
                            className="button bg-gray-200 text-red-600 ml-auto mr-5"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={Submit}
                            className="button bg-gray-200 text-green-600"
                        >
                            Submit
                        </button>
                    </footer>
                </Modal>
            ) : (
                <></>
            )}
            <header className="w-full p-5 flex flex-row items-center bg-gray-200">
                <button
                    onClick={() => setModal(!modal)}
                    className="button ml-auto bg-gray-600 text-white"
                >
                    Create Party
                </button>
            </header>
        </>
    );
}

export default PartyModal;
