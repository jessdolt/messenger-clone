"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import useConversation from "@/app/hooks/useConversation"
import { FullConversationType } from "@/app/types"

import { MdOutlineGroupAdd } from "react-icons/md"
import ListContainer from "@/app/components/ListContainer"
import ConversationBox from "../ConversationBox"
import GroupChatModal from "./GroupChatModal"
import { User } from "@prisma/client"

interface ConversationListProps {
  initialItems: FullConversationType[]
  users: User[]
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const { conversationId } = useConversation()

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ListContainer>
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4 ">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              className="cursor-pointer rounded-full p-2 bg-gray-100 text-gray-600 hover:opacity-75 transition"
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>

          {items.map((item) => (
            <ConversationBox
              data={item}
              key={item.id}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </ListContainer>
    </>
  )
}

export default ConversationList
