import Image from "next/image"
import AuthForm from "./components/AuthForm"

export default function Home() {
  return (
    <div className="flex justify-center flex-col min-h-full bg-gray-100 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height={48}
          width={48}
          src="/images/logo.png"
          alt="logo"
          className="mx-auto"
        />
        <h2 className="text-3xl mt-6 font-bold text-center">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  )
}
