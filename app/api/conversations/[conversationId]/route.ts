import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

interface IParams {
  conversationId?: string
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params
    const currentUser = await getCurrentUser()

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    })

    if (!existingConversation)
      return new NextResponse("Conversation not found", { status: 400 })

    const deletedConversation = await prisma.conversation.delete({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    })

    return NextResponse.json(existingConversation)
  } catch (e: any) {
    console.log(e, "ERROR_MESSAGES_SEEN")
    return new NextResponse("Internal Error", { status: 500 })
  }
}