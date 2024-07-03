'use client'
import Button from '@/shared/components/elements/Button'
import Input from '@/shared/components/elements/Input'
import Link from 'next/link'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { fireauth } from '@root/firebase'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FieldValues>({
    mode: 'onChange',
  })
  const [isLoading, setIsLoading] = useState(false) // 중복 제출 방지
  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    setIsLoading(true)
    const { email, password } = formData

    try {
      await signInWithEmailAndPassword(fireauth, email, password)
      router.push('/')
    } catch (error: any) {
      const errorCode = error.code
      console.log('errorCode', errorCode)
      console.log('errorMessage', error.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex gap-2 flex-col p-5 mt-40'
      >
        <div className='flex flex-col gap-[12px]'>
          <Input
            name='email'
            label='이메일'
            placeholder='이메일을 입력해 주세요'
            type='email'
            register={register}
          />
          <Input
            name='password'
            label='비밀번호'
            placeholder='비밀번호를 입력해 주세요'
            type='password'
            register={register}
          />
        </div>
        <Button type='submit' label='로그인' disabled={!isValid} />
        <Link href='/auth/register'>
          <p className='text-sm text-gray-700 text-center'>회원가입 하러가기</p>
        </Link>
      </form>
    </div>
  )
}

export default LoginForm
