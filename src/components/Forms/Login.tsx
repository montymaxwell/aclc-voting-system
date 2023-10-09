'use client'
import './forms.css'

import api from '@/lib/api'
import { User } from '@/lib/types'
import { LoginForm } from '@/app/api/types'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/lib/UserStore'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";

function Login() {
  const router = useRouter()
  const UserStore = useUserStore()

  const [USN, setUSN] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [isloading, setIsLoading] = useState(false);

  const Submit = async () => {
    if (USN === null) {
      return toast.error("USN is required");
    }

    if (password === null) {
      return toast.error("Password is required");
    }

    setIsLoading(true);

    const res = await api('auth').post<LoginForm>({ USN, password });
    if (res.state === true) {
      const user: User = res.data;

      UserStore.addUserInfo({
        usn: user.USN,
        strand: user.strand,
        role: user.role!,
        voted: user.voted!,
        voteList: user.voteList!,
      });

      switch (user.role) {
        case 'user':
          router.push('/voting');

          break;

        case 'admin':
          router.push('/users');
          break;
      }

    } else {
      toast.error(res.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col">
      <div className='w-full my-8 text-center'>
        <h1 className='text-6xl font-bold text-blue-900'>ACLC</h1>
        <h2 className='text-2xl font-semibold text-blue-900'>College of Daet</h2>
        <h6 className='text-lg mt-2'>SSC Voting System</h6>
      </div>
      <div className='w-full flex flex-col my-2 px-5'>
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
      <div className='w-full flex flex-col my-2 px-5'>
        <label htmlFor="Password" className='form-label mx-3 my-2'>Password</label>
        <input
          type="password"
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
      <div className='w-full flex flex-col my-8 px-5'>
        <button className='button success' onClick={Submit}>{isloading ? (
          <BeatLoader color="#ffffff" />
        ) : (
          "Login"
        )}</button>
      </div>
    </div>
  )
}

export default Login