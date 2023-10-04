function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center">
      <div className="w-2/6 h-auto p-2 flex flex-col bg-white rounded-md">
        {children}
      </div>
    </div>
  )
}

export default Modal