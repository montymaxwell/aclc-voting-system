import Login from "@/components/Forms/Login"
import Image from "next/image"
import Link from 'next/link'
import { AiFillGithub } from "react-icons/ai"

function LoginPage() {

  return (
    <div className="w-full h-full flex flex-wrap">
      <div className="w-full relative lg:w-1/2 lg:h-full bg-slate-800">
        <div className="w-full h-full absolute flex flex-col justify-between bg-slate-800/80">
          <div className="flex flex-row flex-wrap">
            <div className="bg-slate-100 rounded-lg p-2 m-5 px-3">
              <Image
                src="/aclclogo.png"
                className="mx-auto"
                alt="aclclogo"
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="m-5 text-gray-400 flex justify-between">
            <div>Developed by Monty & James Phillip Mayor</div>
            <div></div>
          </div>
        </div>
        <Image src='/aclc.jpg' alt="aclc_college_of_commonwealth" width={680} height={510} className="w-full h-full" />
      </div>
      <div className="w-full flex-auto lg:w-1/2 flex flex-col">
        <div className="w-3/4 lg:w-2/4 m-auto">
          <Login />
        </div>
        <div className="w-full border-t border-gray-200"></div>
        <footer className="w-full flex flex-row p-5 py-6 justify-center text-gray-800">
          <div className="w-1/4">
            <div className="text-3xl font-bold tracking-wide">Votum</div>
            <div className="text-sm ml-1 tracking-wider">Voting System</div>
          </div>
          <div className="w-3/6 flex flex-row">
            <div>
              <div className="text-xs tracking-wider text-gray-500">Designer</div>
              <div className="text-sm tracking-wide mb-4">James Mayor</div>
              <div className="text-xs tracking-wider text-gray-500">Developer</div>
              <div className="text-sm tracking-wide">Monty</div>
            </div>
            <div className="ml-auto">
              <div className="mb-2 text-gray-500 tracking-wide">Contacts</div>
              <Link className="flex flex-row items-center mb-3 hover:text-blue-300" target="_blank" href={'https://github.com/montymaxwell'}>
                <AiFillGithub size={25} />
                <div className="ml-2 text-sm">Monty Maxwell</div>
              </Link>
              <Link className="flex flex-row items-center hover:text-blue-300" target="_blank" href={'https://github.com/JpMayor1'}>
                <AiFillGithub size={25} />
                <div className="ml-2 text-sm">James Phillip Mayor</div>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default LoginPage