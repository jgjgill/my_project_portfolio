import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { User } from '@prisma/client'
import useSWR from 'swr'

import useMutation from '@libs/client/useMutation'
import Button from '@components/common/button'
import Input from '@components/common/input'

interface LoginForm {
  email: string
}

interface MutationResult {
  ok: boolean
  error?: string
}

interface EmailFormProps {
  isView: boolean | undefined
  setIsView: Dispatch<SetStateAction<boolean>>
}

interface UserResponse {
  ok: boolean
  profile: User
  error?: string
}

const EmailForm = ({ isView, setIsView }: EmailFormProps) => {
  const { data: user } = useSWR<UserResponse>('/api/users/me')

  const [confirmEmail, { loading: emailLoading, data: emailData }] = useMutation<MutationResult>('/api/users/enter')

  const { register: loginRegister, handleSubmit: loginSubmit } = useForm<LoginForm>()

  const router = useRouter()

  const loginValid = (emailForm: LoginForm) => {
    confirmEmail(emailForm)
  }

  useEffect(() => {
    if (user?.ok === true) {
      router.replace('/')
    }
  }, [user, router])

  useEffect(() => {
    if (!emailData?.ok) return

    setIsView((prev) => !prev)
  }, [emailData, setIsView])

  if (!isView) return null

  return (
    <form onSubmit={loginSubmit(loginValid)} className='flex flex-col space-y-2 items-center'>
      <Input
        label='Email'
        name='email'
        type='email'
        placeholder='이메일을 입력해주세요'
        register={loginRegister('email', { required: true })}
        required
      />
      <Button text='Get Login Link' loading={emailLoading} />
    </form>
  )
}

export default EmailForm
