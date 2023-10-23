import Login from "@/components/Forms/Login"
import Image from "next/image"

function LoginPage() {

  return (
    <div className="w-full h-full flex flex-wrap">
      <div className="w-full relative lg:w-1/2 lg:h-full bg-slate-800">
        <div className="w-full h-full absolute bg-slate-800/80">
          {/* <div className="flex flex-row flex-wrap">
            <div className="bg-white rounded-lg p-2 m-5 px-4">
              <Image
                src="/aclclogo.png"
                className="mx-auto"
                alt="aclclogo"
                width={50}
                height={50}
              />
            </div>
          </div> */}
        </div>
        <Image src='/aclc.jpg' alt="aclc_college_of_commonwealth" width={680} height={510} className="w-full h-full" />
      </div>
      <div className="w-full flex-auto lg:w-1/2 flex flex-col">
        <div className="w-3/4 lg:w-2/4 m-auto">
          <Login />
        </div>
        <footer className="p-3">
          {/* <div>Developer : Mark Guiao</div> */}
        </footer>
      </div>
    </div>
  )
}

export default LoginPage