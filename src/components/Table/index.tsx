'use client'

import { ServerResponse } from "@/app/api/types"
import { MdDelete, MdEdit } from "react-icons/md"

import { Dispatch, SetStateAction, useEffect, useState } from "react"

type TableProps = {
  head: Array<string>
  body: Array<Object>,
  api?: string,
  update: Dispatch<SetStateAction<Array<Object>>>
}

function Table({ head, body, api, update }: TableProps) {
  const [modal, setModal] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<boolean>(false)
  const [index, setIndex] = useState<number | null>(null)

  const onDelete = async (index: number) => {
    setModal(true);
    setIndex(index);
  }

  useEffect(() => {
    (async () => {
      if (confirm === true) {
        if (index !== null) {
          if (api) {
            const ref: string | undefined = Object.values(body[index])[0];
            if (ref) {
              const url = `${api}?` + new URLSearchParams({ target: ref });
              const response = await fetch(url, { method: 'DELETE' });
              const message: ServerResponse = await response.json();

              if (message.state === true) {
                update(body.filter((v) => v !== body[index]));
                setConfirm(false);
                setModal(false);
              }
            }
          }
        }
      }

    })();

  }, [confirm])

  return (
    <div className="w-full h-full">
      {modal === true ?
        <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black/80">
          <div className="w-auto h-auto p-5 bg-white flex justify-center items-center flex-col rounded-lg">
            <div className="w-full p-5 px-8 text-xl">Are you sure you want to delete this?</div>
            <footer className="w-full p-5 px-8 flex flex-row">
              <button
                onClick={() => setModal(!modal)}
                className="button bg-gray-200 text-red-600 mr-5 ml-auto"
              >Cancel</button>
              <button
                onClick={() => setConfirm(true)}
                className="button bg-gray-200 text-green-600 ml-5 mr-auto"
              >Confirm</button>
            </footer>
          </div>
        </div>
        :
        <></>
      }
      <table className='table-auto w-full'>
        <thead>
          <tr className='ui-table-row'>
            {head.map((text) => (
              <th key={text}
                className='ui-table-head border border-gray-200 text-gray-400'
              >{String(text)}</th>
            ))}
            <th className='ui-table-head border border-gray-200' />
          </tr>
        </thead>
        <tbody className='border-x border-b border-gray-200'>
          {body.map((entries, i) => (
            <tr key={`tbody-row-${i}`} className='ui-table-row border border-gray-200'>
              {Object.values(entries).map((text, i) => (
                <td key={`tbody-data-${i}`} className='ui-table-data border border-gray-200'>{String(text)}</td>
              ))}
              <td className='ui-table-data border border-gray-200'>
                <div className='w-full h-full flex justify-around items-center'>
                  {/* <button className='btn bg-gray-200'><MdEdit /></button> */}
                  <button className='btn bg-gray-200' onClick={() => {
                    onDelete(i)
                  }}><MdDelete /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table