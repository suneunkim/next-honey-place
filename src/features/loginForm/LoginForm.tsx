import Button from '@/shared/components/elements/Button'
import Input from '@/shared/components/elements/Input'
import Link from 'next/link'

const LoginForm = () => {
  return (
    <div>
      {/* <form onSubmit={handleSubmit(onSubmit)} className={styles.container}> */}
      <form className='flex gap-2 flex-col p-5 mt-40'>
        <div className='flex flex-col gap-[12px]'>
          <Input
            name='email'
            label='이메일'
            placeholder='이메일을 입력해 주세요'
            type='email'
            // register={register}
          />
          <Input
            name='password'
            label='비밀번호'
            placeholder='비밀번호를 입력해 주세요'
            type='password'
            // register={register}
          />
        </div>
        <Button
          type='submit'
          label='로그인'
          // disabled={isDisabled}
        />
        <Link href='/auth/register'>
          <p className='text-sm text-gray-700 text-center'>회원가입 하러가기</p>
        </Link>
      </form>
    </div>
  )
}

export default LoginForm
