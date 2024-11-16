import { create } from 'zustand'
import { combine, subscribeWithSelector, persist } from 'zustand/middleware'

export const useCountStore = create(
  persist(
    subscribeWithSelector(
      combine(
        {
          count: 0,
          double: 0
        },
        set => {
          function increase() {
            set(state => ({ count: state.count + 1 }))
          }
          function decrease() {
            set(state => ({ count: state.count - 1 }))
          }
          return {
            increase,
            decrease
          }
        }
      )
    ),
    {
      name: 'countStore'
    }
  )
)

useCountStore.subscribe(
  state => state.count, // 선택자
  count => {
    useCountStore.setState({
      double: count * 2
    })
  }
)
