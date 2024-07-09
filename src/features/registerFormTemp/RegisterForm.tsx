'use client'

import Button from '@/shared/components/elements/Button'
import Input from '@/shared/components/elements/Input'
import Link from 'next/link'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db, fireauth } from '@root/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    mode: 'onChange',
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false) // 중복 제출 방지

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    setIsLoading(true)
    const { nickname, email, password } = formData

    try {
      const userCredential = await createUserWithEmailAndPassword(fireauth, email, password)
      const user = userCredential.user
      const userDoc = doc(db, 'users', user.uid)

      await setDoc(userDoc, {
        uid: user.uid,
        nickname,
        email,
      })
      alert('회원가입이 완료되었습니다.')
      router.push('/auth/login')
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
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 mt-28'>
        <div className='flex flex-col gap-2'>
          <Input
            name='email'
            label='이메일'
            placeholder='이메일을 입력해 주세요'
            type='email'
            register={register}
            errors={errors}
          />
          <Input
            name='nickname'
            label='닉네임'
            placeholder='닉네임을 입력해 주세요'
            type='text'
            register={register}
            errors={errors}
          />
          <Input
            name='password'
            label='비밀번호'
            placeholder='비밀번호를 입력해 주세요'
            type='password'
            register={register}
            errors={errors}
          />
        </div>
        <Button type='submit' label='회원가입' disabled={!isValid} />
        <Link href='/auth/login'>
          <p className='text-sm text-gray-700 text-center'>로그인 하러가기</p>
        </Link>
      </form>
    </div>
  )
}

export default RegisterForm
