'use client'

import Modal from "@/components/Modal"
import { IoMdClose } from 'react-icons/io'

import { useState } from "react"
import { Strands } from "@/lib/votables"
import api from "@/lib/api"

function UserModal() {
  const [modal, setModal] = useState<boolean>(false)
  const [role, setRole] = useState<string>('user')
  const [strand, setStrand] = useState<string | null>(Strands[0])
  const [USN, setUSN] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [lastname, setLastname] = useState<string | null>(null)
  const [firstname, setFirstname] = useState<string | null>(null)
  const [middleInitial, setMiddleInitial] = useState<string | null>(null)

  const Submit = async () => {
    const res = await api('users').post({
      USN,
      password,
      role,
      strand,
      lastname,
      firstname,
      middleInitial,
    })

    console.log(res)
    if(res.state === true) {
      setModal(!modal);
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
              className="button ml-auto"
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
              <div className="w-28">
                <label htmlFor="strand" className='form-label mx-3 my-2'>Strand</label>
                <select
                  id="strand"
                  name="strand"
                  className="text-input"
                  onChange={(ev) => {
                    setStrand(ev.target.value)
                  }}
                >
                  {Strands.map((v) => (<option key={v} value={v}>{v}</option>))}
                </select>
              </div>
            </div>

            <div className="w-full flex flex-row my-4 px-5">
              <div className="flex-auto pr-2">
                <label htmlFor="USN" className='form-label mx-3 my-2'>USN</label>
                <input
                  type="text"
                  name='USN'
                  placeholder='USN'
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
              </div>
              <div className="flex-auto pl-2">
                <label htmlFor="password" className='form-label mx-3 my-2'>Password</label>
                <input
                  type="text"
                  name='password'
                  placeholder='Password'
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
              <div className="flex-auto pr-2">
                <label htmlFor="lastname" className='form-label mx-3 my-2'>Lastname</label>
                <input
                  type="text"
                  name='lastname'
                  placeholder='Lastname'
                  className='text-input primary-input'
                  onChange={(ev) => {
                    if (ev.target.value === '') {
                      setLastname(null);
                    }
                    else {
                      setLastname(ev.target.value);
                    }
                  }}
                />
              </div>
              <div className="flex-auto pl-2">
                <label htmlFor="firstname" className='form-label mx-3 my-2'>Firstname</label>
                <input
                  type="text"
                  name='firstname'
                  placeholder='Firstname'
                  className='text-input primary-input'
                  onChange={(ev) => {
                    if (ev.target.value === '') {
                      setFirstname(null);
                    }
                    else {
                      setFirstname(ev.target.value);
                    }
                  }}
                />
              </div>
              <div className="w-20 pl-2">
                <label htmlFor="middleinitial" className='form-label mx-3 my-2'>M.I</label>
                <input
                  type="text"
                  name='middleinitial'
                  placeholder='M.I'
                  className='text-input primary-input'
                  onChange={(ev) => {
                    if (ev.target.value === '') {
                      setMiddleInitial(null);
                    }
                    else {
                      setMiddleInitial(ev.target.value);
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
        <button
          onClick={() => setModal(!modal)}
          className="button ml-auto bg-gray-600 text-white"
        >Create User</button>
      </header>
    </>
  )
}

export default UserModal