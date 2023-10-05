'use client'

import { ServerResponse } from "@/app/api/types"
import { MdDelete, MdEdit } from "react-icons/md"

import { useState } from "react"
import RouteGuard from "@/app/(admin)/RouteGuard"

type TableProps = {
  head: Array<string>
  body: Array<Object>,
  api?: string
}

function Table({ head, body, api }: TableProps) {
  const [data, setData] = useState<Array<Object>>(body)

  const onDelete = async (index: number) => {
    if (api) {
      const ref: string | undefined = Object.values(data[index])[0];
      if (ref) {
        const url = `${api}?` + new URLSearchParams({ target: ref });
        const response = await fetch(url, { method: 'DELETE' });
        const message: ServerResponse = await response.json();

        if (message.state === true) {
          const sets = data.filter((v) => v !== data[index]);
          setData(sets)
        }
      }
    }

  }

  return (
    <div className="w-full h-full">
      <RouteGuard>
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
            {data.map((entries, i) => (
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
      </RouteGuard>
    </div>
  )
}

export default Table