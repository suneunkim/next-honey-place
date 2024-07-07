import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface InputProps {
  name: string
  label: string
  placeholder?: string
  type?: string
  register: UseFormRegister<any>
  errors?: FieldErrors
}

const Input = ({
  name,
  label,
  placeholder,
  type,
  register,
  errors,
}: InputProps) => {
  return (
    <div className='flex flex-col h-[98px] gap-[8px]'>
      <label className='text-sm leading-[22px]' htmlFor={name}>
        {label}
      </label>
      <div>
        <input
          {...register(name, { required: true })}
          type={type}
          className='h-[44px] p-2 border border-[#c7c7c7] rounded-md text-sm leading-[22px] focus:border-[#3a5cf3] focus:outline-none w-full'
          placeholder={placeholder}
        />
        {errors && errors[name] && (
          <p className='text-xs text-red-500'>
            {String(errors[name]?.message) || `${label}을 입력하세요.`}
          </p>
        )}
      </div>
    </div>
  )
}

export default Input
