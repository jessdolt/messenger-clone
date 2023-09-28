"use client"
import { User } from "@prisma/client"
import React from "react"
import UserBox from "../UserBox"
import ListContainer from "@/app/components/ListContainer"

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <ListContainer>
      <div className="px-5">
        <div className="flex-col">
          <div
            className="text-2xl 
              font-bold 
              text-neutral-800 
              py-4"
          >
            People
          </div>
        </div>

        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </ListContainer>
  )
}

export default UserList
