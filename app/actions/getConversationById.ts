import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getConversationById = async (conversationId: string) => {
  const currentUser = await getCurrentUser()
  if (!currentUser?.id) return null

  try {
    const conversations = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    })

    return conversations
  } catch (error: any) {
    return null
  }
}

export default getConversationById
