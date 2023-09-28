import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getMessages = async (conversationId: string) => {
  const currentUser = await getCurrentUser()
  if (!currentUser?.id) return []

  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    return messages
  } catch (error: any) {
    return []
  }
}

export default getMessages
