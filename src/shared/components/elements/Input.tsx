interface InputProps {
  name: string
  label: string
  placeholder?: string
  type?: string
  register?: any
}

const Input = ({ name, label, placeholder, type, register }: InputProps) => {
  return (
    <div className='flex flex-col h-[98px] gap-[8px]'>
      <label className='text-sm leading-[22px]' htmlFor={name}>
        {label}
      </label>
      <input
        // {...register(name, { required: true })}
        type={type}
        className='h-[44px] p-2 border border-[#c7c7c7] rounded-md mb-[18px] text-sm leading-[22px] focus:border-[#3a5cf3] focus:outline-none'
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
