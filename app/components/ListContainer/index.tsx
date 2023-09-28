import useConversation from "@/app/hooks/useConversation"
import clsx from "clsx"
import React from "react"

interface ListContainerProps {
  children: React.ReactNode
}

const ListContainer = ({ children }: ListContainerProps) => {
  const { isOpen } = useConversation()

  return (
    <aside
      className={clsx(
        `
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
        bg-white
      `,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      {children}
    </aside>
  )
}

export default ListContainer
