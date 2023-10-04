import Link from "next/link"
import { MdKeyboardArrowRight } from 'react-icons/md'

function UnauthorizedPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-medium tracking-wide">Unauthorized Access</h1>
        <h6 className="text-3xl my-10 tracking-wide">Please Login</h6>
        <Link href='/'
          className="flex justify-between items-center text-2xl
          p-5 px-10 rounded-full bg-indigo-500 text-white
          hover:bg-indigo-700
          ">
          <span>Proceed to login</span>
          <MdKeyboardArrowRight className="ml-2 text-2xl" />
        </Link>
      </div>
    </div>
  )
}

export default UnauthorizedPage