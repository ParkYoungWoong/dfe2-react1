import { useCountStore } from '@/stores/count'

export default function Home() {
  const count = useCountStore(state => state.count)
  const double = useCountStore(state => state.double)
  const increase = useCountStore(state => state.increase)
  const decrease = useCountStore(state => state.decrease)

  return (
    <>
      <h1>Home!</h1>
      <h2>
        {count} / {double}
      </h2>
      <button onClick={increase}>증가</button>
      <button onClick={decrease}>감소</button>
    </>
  )
}
