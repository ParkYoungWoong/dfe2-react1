import { useState } from 'react'

let obj = {
  id: 'abc123',
  name: 'Neo',
  age: 22,
  contact: {
    email: 'neo@gmail.com',
    address: {
      country: 'Korea',
      city: 'Seoul'
    }
  }
}

export default function About() {
  const [user, setUser] = useState(obj)

  return (
    <>
      <h1>About!</h1>
      <button onClick={() => setUser(obj)}>초기화</button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}
