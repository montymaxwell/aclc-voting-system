'use client'

import { useEffect, useState } from "react"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { ServerResponse } from "@/app/api/types"
import { BsFillSendCheckFill } from "react-icons/bs"

function ToolsPage() {
  const [file, setFile] = useState<File>()
  const [content, setContent] = useState<any>()

  const Submit = async () => {
    if (content) {
      let Collection: any = [];
      Object.values(content).forEach((v: any) => {
        Collection = [...Collection, ...v]
      });

      console.log(Collection);

      const res: ServerResponse = await (await fetch('/api/tools/candidates', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Collection)
      })).json();

      if (res.state === true) {
        console.log(res.message);
      }
    }
  }

  useEffect(() => {
    if (file) {
      const data = new FormData();
      if (file) {
        data.set("file", file);

        fetch('/api/tools', {
          method: "POST",
          body: data,
        })
          .then(async (res) => {
            const json: ServerResponse = await res.json();
            console.log(json)

            if (json.state === true) {
              if (json.data) {
                setContent(json.data);
              }
            }
          })
      }
    }

  }, [file])

  return (
    <div>
      <div className="w-full h-1/6 bg-gray-100 flex justify-center items-center">
        {/* <textarea name="" id="" cols={30} rows={10}></textarea> */}
        <label
          htmlFor="icon"
          className="w-full h-full z-10 bg-gray-300 rounded-md flex justify-center items-center"
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
      <div className="w-full flex flex-row flex-wrap">
        {content ?
          Object.keys(content).map((v: any, i: number) => (
            <div key={i} className="w-1/3">
              <div>{v}</div>
              {/* <pre>{JSON.stringify(content[v], null, 2)}</pre> */}
              <textarea
                name=""
                id=""
                cols={30}
                rows={40}
                contentEditable={true}
                defaultValue={JSON.stringify(content[v], null, 2)}
                onChange={(e) => {
                  const newContent = content;

                  newContent[v] = JSON.parse(e.target.value);
                  setContent(newContent);
                  console.log(JSON.stringify(content));
                }}
              />
            </div>
          ))
          :
          undefined
        }
        <button
          onClick={Submit}
          className={`fixed z-10 bottom-8 right-5 w-20 h-20 p-5 bg-indigo-400 text-white rounded-full flex justify-center items-center`}
        >
          <div className="w-full h-full flex justify-center items-center">
            <BsFillSendCheckFill className="text-4xl -ml-1.5 -mb-1 align-middle" />
          </div>
        </button>
      </div>
    </div>
  )
}

export default ToolsPage