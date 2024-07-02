import React from 'react'

interface ButtonProps {
  type?: 'button' | 'submit'
  onClick?: () => void
  label: string
  disabled?: boolean
  isDelete?: boolean
}

const Button = ({
  type = 'button',
  onClick,
  label,
  disabled,
  isDelete,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-12 py-5 bg-blue-500 text-white flex justify-center items-center my-5 rounded-lg text-base leading-6 font-bold
        ${disabled ? 'text-gray-300 bg-gray-200' : ''}
        ${isDelete ? 'text-gray-600 bg-gray-200' : ''}
      `}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
