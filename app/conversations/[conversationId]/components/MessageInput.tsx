import React from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface MessageInputProps {
  id: string
  required?: boolean
  placeholder?: string
  type?: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  register,
  errors,
  required = false,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="relative w-full ">
      <input
        type={type}
        id={id}
        autoComplete={id}
        {...register(id, { required: true })}
        placeholder={placeholder}
        className="
            text-black
            font-light
            py-2
            px-4
            bg-neutral-100
            w-full 
            rounded-full
            focus:outline-none
        "
        required={required}
      />
    </div>
  )
}

export default MessageInput
