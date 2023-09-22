"use client"
import React from "react"

import clsx from "clsx"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
  label: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium leading-6 text-gray-900  block"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          autoComplete={id}
          disabled={disabled}
          type={type}
          {...register(id, { required })}
          className={clsx(
            `
            form-input
            w-full
            block
            rounded-md
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-sky-600
            focus:border-sky-600
          `,
            errors[id] && "focus-ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  )
}

export default Input