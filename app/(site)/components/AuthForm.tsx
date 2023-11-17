"use client"
import { useEffect } from "react"
import Button from "@/app/components/Button"
import Input from "@/app/components/Inputs/Input"
import { useCallback, useState } from "react"
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form"
import AuthSocialButton from "./AuthSocialButton"
import { BsGithub, BsGoogle } from "react-icons/bs"
import axios from "axios"
import { toast } from "react-hot-toast"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

enum ACTION {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

type Variant = ACTION

const AuthForm = () => {
  const { data, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/users")
    }
  }, [status, router])

  const [variant, setVariant] = useState<Variant>(ACTION.LOGIN)
  const [isLoading, setIsLoading] = useState(false)

  const toggleVariant = useCallback(() => {
    if (variant === ACTION.LOGIN) setVariant(ACTION.REGISTER)
    else setVariant(ACTION.LOGIN)
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    if (variant === ACTION.REGISTER) {
      try {
        await axios.post("/api/register", data)
        signIn("credentials", data)
        toast.success("Account created successfully")
      } catch (err: any) {
        toast.error("Something went wrong")
      }
    }

    if (variant === ACTION.LOGIN) {
      const callback = await signIn("credentials", {
        ...data,
        redirect: false,
      })

      if (callback?.error) toast.error(callback.error)
      if (callback?.ok && !callback?.error) {
        toast.success("Logged in")
        router.push("/users")
      }
    }

    setIsLoading(false)
  }

  const socialAction = async (action: string) => {
    setIsLoading(true)
    const callback = await signIn(action, { redirect: false })
    if (callback?.error) toast.error(callback.error)
    if (callback?.ok && !callback?.error) {
      toast.success("Logged in")
      router.push("/users")
    }
    setIsLoading(false)
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === ACTION.REGISTER && (
            <Input
              label="Name"
              id="name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            label="Email"
            id="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            label="Password"
            id="password"
            register={register}
            errors={errors}
            disabled={isLoading}
            type="password"
          />
          <div>
            <Button fullWidth disabled={isLoading} type="submit">
              {variant === ACTION.LOGIN ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => socialAction("github")}
          />

          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction("google")}
          />
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          {variant === ACTION.LOGIN
            ? "New to messenger? "
            : "Already have an account? "}
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === ACTION.LOGIN ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
