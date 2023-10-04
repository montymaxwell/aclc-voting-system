import Login from "@/components/Forms/Login"

function LoginPage() {

  return (
    <div className="w-full h-full flex flex-wrap">
      <div className="w-full lg:w-1/2 lg:h-full bg-slate-800"></div>
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