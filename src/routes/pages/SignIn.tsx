import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SignInPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const callbackUrl = searchParams.get('callbackUrl')

  function signIn() {
    console.log(id, password)
    if (id && password) {
      // 로그인 성공!
      const accessToken = 'abcxyz123'
      localStorage.setItem('accessToken', accessToken)
      // 메인 페이지로 이동!
      navigate(callbackUrl || '/')
    }
  }

  return (
    <>
      <h1>Sign In</h1>
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={e => {
          setId(e.target.value)
        }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => {
          setPassword(e.target.value)
        }}
      />
      <button onClick={signIn}>로그인</button>
    </>
  )
}
