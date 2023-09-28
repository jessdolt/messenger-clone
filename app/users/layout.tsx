import getUsers from "../actions/getUsers"
import Sidebar from "../components/Sidebar"
import UserList from "./components/UserList"

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUsers()
  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  )
}
