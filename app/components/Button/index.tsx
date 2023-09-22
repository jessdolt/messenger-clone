import React from "react"
import clsx from "clsx"

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => void
  secondary?: boolean
  danger?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `
        flex
        justify-center
        px-3
        py-2
        text-sm
        rounded-md
        font-semibold
        focus-visible:outline
        focus-visible:ouline-2
        focous-visible:outline-offset-2
        duration-100
        `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-black/90 hover:bg-black focus-visible:outline-black"
      )}
    >
      {children}
    </button>
  )
}

export default Button
