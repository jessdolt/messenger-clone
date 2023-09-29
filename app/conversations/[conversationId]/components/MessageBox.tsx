"use client"
import Avatar from "@/app/components/Avatar"
import { FullMessageType } from "@/app/types"
import clsx from "clsx"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import Image from "next/image"
import React from "react"

interface MessageBoxProps {
  isLast: boolean
  data: FullMessageType
}
const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
  const session = useSession()
  const isOwn = session?.data?.user?.email === data?.sender?.email
  const seenList = (data.seen || [])
    .filter((user) => user.email !== session?.data?.user?.email)
    .map((user) => user.name)
    .join(", ")

  const container = clsx(`flex gap-3 p-4`, isOwn && "justify-end")
  const avatar = clsx(isOwn && "order-2")
  const body = clsx(`flex flex-col gap-2`, isOwn && "items-end")
  const message = clsx(
    `text-sm w-fit overflow-hidden`,
    isOwn ? `text-white bg-sky-500` : ` bg-gray-100`,
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  )

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>

        <div className={message}>
          {data.image ? (
            <Image
              src={data.image}
              alt="Image"
              className="object-cover cursor-pointer hover:scale-110 transition translate"
              width={288}
              height={288}
            />
          ) : (
            data.body
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageBox