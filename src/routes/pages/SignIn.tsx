import { useState } from 'react';

export default function SignInPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  function signIn() {
    console.log(id, password);
    // 로그인 정보 전송
  }

  return (
    <>
      <h1>Sign In</h1>
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={e => {
          setId(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={signIn}>로그인</button>
    </>
  );
}
