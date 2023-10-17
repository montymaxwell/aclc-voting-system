"use client";

import Modal from "@/components/Modal";
import { Party } from "@/lib/types";
import { Votables } from "@/lib/votables";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Image from "next/image";
import api from "@/lib/api";
import { ServerResponse } from "@/app/api/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SimpleSearch from "@/components/SimpleSearch/Search";

type ModalProps = {
  staticData: Array<Party>;
  data: Array<any>;
  update: Dispatch<SetStateAction<Array<any>>>;
};
function CandidateModal({ staticData, data, update }: ModalProps) {
  const router = useRouter();
  const [modal, setModal] = useState<boolean>(false);

  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  const [party, setParty] = useState<string | null>(
    data.length > 0 ? data[0].name : null
  );
  const [position, setPosition] = useState<string>("President");
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (file === undefined) return;
    const obj = URL.createObjectURL(file);
    setPreview(obj);

    return () => URL.revokeObjectURL(obj);
  }, [file]);

  const Submit = async () => {
    const data = new FormData();
    if (file) {
      data.set("file", file);
    }

    const image: ServerResponse = await (
      await fetch("/api/images", {
        method: "POST",
        body: data,
      })
    ).json();

    if (image.state === true) {
      const data = {
        icon: `/images/${image.data}`,
        party,
        position,
        name,
      };
      const res = await api("candidates").post(data);

      if (res.state === true) {
        // setModal(!modal);
        setFile(undefined);
        setName(null);

        if (update) {
          update((v: any) => [...v, res.data]);
        }

        toast.success('Successfully created a new candidate')
      }
      else {
        toast.error('Something went wrong with the candidate request, please try again.');
      }
    }
    else {
      toast.error('Something went wrong with the image upload, please try again.');
    }
  };

  return (
    <>
      {modal ? (
        <Modal>
          <header className="w-full p-2 mt-3 flex items-center">
            <div className="ml-6 text-lg">Candidate Form Modal</div>
            <button
              onClick={() => setModal(!modal)}
              className="button modal-exit ml-auto"
            >
              <IoMdClose />
            </button>
          </header>
          <main className="flex-auto p-3 flex flex-col">
            <div className="w-full flex flex-row px-5 justify-between">
              <div className="w-48 h-48 bg-gray-100 rounded-md flex justify-center items-center">
                {file && preview ? (
                  <div className="absolute w-48 h-48">
                    <Image
                      src={preview}
                      style={{
                        width: "192px",
                        height: "192px",
                        borderRadius: "6px",
                        objectFit: "cover",
                      }}
                      width={192}
                      height={192}
                      alt="uploaded_image"
                    />
                  </div>
                ) : (
                  <></>
                )}
                <label
                  htmlFor="icon"
                  className="w-full h-full z-10 bg-black/50 rounded-md flex justify-center items-center"
                >
                  <AiOutlineCloudUpload className="text-4xl text-white" />
                </label>
                <input
                  type="file"
                  name="icon"
                  id="icon"
                  className="hidden"
                  onChange={(ev) =>
                    setFile(ev.target.files?.[0])
                  }
                />
              </div>
            </div>
            <div className="w-full flex flex-row my-4 px-5">
              <div className="w-1/2 pr-2">
                <label
                  htmlFor="party"
                  className="form-label mx-3 my-2"
                >
                  Party
                </label>
                <select
                  name="party"
                  id="party"
                  className="text-input"
                  value={party ? party : undefined}
                  onChange={(ev) => setParty(ev.target.value)}
                >
                  {data.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 pl-2">
                <label
                  htmlFor="position"
                  className="form-label mx-3 my-2"
                >
                  Position
                </label>
                <select
                  name="position"
                  className="text-input"
                  id="position"
                  value={position}
                  onChange={(ev) =>
                    setPosition(ev.target.value)
                  }
                >
                  {Object.keys(Votables).map((v) => (
                    <option key={v} value={v}>
                      {Votables[v].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full flex flex-row my-4 px-5">
              <div className="flex-auto pr-2">
                <label
                  htmlFor="name"
                  className="form-label mx-3 my-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={(name ? name : '')}
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
      <header className="w-full p-5 flex flex-row items-center justify-between bg-gray-200">
        <SimpleSearch label="ID" target="id" staticData={staticData} data={data} update={update} />

        <button
          onClick={() => setModal(!modal)}
          className="button ml-auto bg-gray-600 text-white"
        >
          Create Candidate
        </button>
      </header>
    </>
  );
}

export default CandidateModal;
