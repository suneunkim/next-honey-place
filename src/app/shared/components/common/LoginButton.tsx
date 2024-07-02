import Link from 'next/link'
import Button from '../elements/Button'

const LoginButton = () => {
  return (
    <Link
      className='w-full flex items-center justify-center'
      href={'/auth/login'}
    >
      <Button label='로그인 해주세요' />
    </Link>
  )
}

export default LoginButton
