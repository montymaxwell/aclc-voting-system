'use client'

import Modal from "@/components/Modal"
import { IoMdClose } from 'react-icons/io'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

import { Dispatch, SetStateAction, useState } from "react"
import api from "@/lib/api"
import { toast } from "react-toastify"
import SimpleSearch from "@/components/SimpleSearch/Search"

function UserModal({ staticData, data, update }: { staticData: Array<any>, data: Array<any>, update: Dispatch<SetStateAction<Array<any>>> }) {
  const [modal, setModal] = useState<boolean>(false)
  const [role, setRole] = useState<string>('user')
  const [strand, setStrand] = useState<string | null>(null)
  const [USN, setUSN] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)

  const generateRandom = () => {
    setUSN(String(Math.floor(10000000000 + Math.random() * 100000000000)))
  }

  const Submit = async () => {
    if (role === 'admin') {
      setStrand('admin')
    }

    const res = await api('users').post({
      USN,
      password,
      role,
      strand,
      name,
    })

    if (res.state === true) {
      // setModal(!modal);
      setUSN(null);
      setPassword(null);
      setName(null);

      toast.success(res.message);
      update(v => [...v, res.data])
    }
    else {
      toast.error(res.message)
      if (res.data) {
        console.log(res.data);
      }
    }
  }

  return (
    <>
      {modal ?
        <Modal>
          <header className="w-full p-2 mt-3 flex items-center">
            <div className="ml-6 text-lg">User Form Modal</div>
            <button
              onClick={() => setModal(!modal)}
              className="button modal-exit ml-auto"
            ><IoMdClose /></button>
          </header>

          <main className="flex-auto p-3 flex flex-col">
            <div className="w-full flex flex-row my-4 px-5 justify-between">
              <div className="w-28">
                <label htmlFor="role" className='form-label mx-3 my-2'>Role</label>
                <select
                  id="role"
                  name="role"
                  className="text-input"
                  onChange={(ev) => {
                    setRole(ev.target.value)
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {role === 'user' ?
                <div className="w-28">
                  <label htmlFor="strand" className='form-label mx-3 my-2'>Strand</label>
                  <input
                    type="text"
                    name='Strand'
                    placeholder='Strand'
                    value={(strand ? strand : '')}
                    className='text-input primary-input'
                    onChange={(ev) => {
                      if (ev.target.value === '') {
                        setStrand(null);
                      }
                      else {
                        setStrand(ev.target.value)
                      }
                    }}
                  />
                </div>
                :
                <></>
              }
            </div>

            <div className="w-full flex flex-row my-4 px-5">
              <div className="flex-auto pr-2">
                <label htmlFor="USN" className='form-label mx-3 my-2'>USN</label>
                <div className="flex flex-row flex-nowrap">
                  <input
                    type="text"
                    name='USN'
                    placeholder='USN'
                    value={(USN ? USN : '')}
                    className='text-input primary-input'
                    onChange={(ev) => {
                      if (ev.target.value === '') {
                        setUSN(null);
                      }
                      else {
                        setUSN(ev.target.value);
                      }
                    }}
                  />
                  <button
                    onClick={generateRandom}
                    className="p-2.5 bg-gray-200 mx-1 text-gray-500 rounded-md hover:bg-blue-500 hover:text-white"
                  >
                    <GiPerspectiveDiceSixFacesRandom size={25} className="" />
                  </button>
                </div>
              </div>
              <div className="flex-auto pl-2">
                <label htmlFor="password" className='form-label mx-3 my-2'>Password</label>
                <input
                  type="text"
                  name='password'
                  placeholder='Password'
                  value={(password ? password : '')}
                  className='text-input primary-input'
                  onChange={(ev) => {
                    if (ev.target.value === '') {
                      setPassword(null);
                    }
                    else {
                      setPassword(ev.target.value);
                    }
                  }}
                />
              </div>
            </div>

            <div className="w-full flex flex-row my-4 px-5">
              <div className="flex-auto">
                <label htmlFor="name" className='form-label mx-3 my-2'>Name</label>
                <input
                  type="text"
                  name='name'
                  placeholder='Name'
                  value={(name ? name : '')}
                  className='text-input primary-input'
                  onChange={(ev) => {
                    if (ev.target.value === '') {
                      setName(null);
                    }
                    else {
                      setName(ev.target.value);
                    }
                  }}
                />
              </div>
            </div>
          </main>

          <footer className="w-full p-5 px-8 flex flex-row">
            <button
              onClick={() => setModal(!modal)}
              className="button bg-gray-200 text-red-600 ml-auto mr-5"
            >Cancel</button>
            <button
              onClick={Submit}
              className="button bg-gray-200 text-green-600"
            >Submit</button>
          </footer>
        </Modal>
        : <></>}
      <header className="w-full p-5 flex flex-row items-center bg-gray-200">
        <div className="flex-auto flex gap-x-2">
          <SimpleSearch label="USN" target='USN' staticData={staticData} data={data} update={update} />
          <SimpleSearch label="Name" target='name' staticData={staticData} data={data} update={update} />
        </div>
        <button
          onClick={() => setModal(!modal)}
          className="button ml-auto bg-gray-600 text-white hover:bg-gray-800"
        >Create User</button>
      </header>
    </>
  )
}

export default UserModal