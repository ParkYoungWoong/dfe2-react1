import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

type Todos = Todo[] // 할 일 목록
export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

export function useFetchTodos() {
  return useQuery<Todos>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          // method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            apikey: 'KDT8_bcAWVpD8',
            username: 'KDT8_ParkYoungWoong'
          }
        }
      )
      return await res.json()
    }
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (title: string) => {
      await new Promise(resolve => setTimeout(resolve, 3000))
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: 'KDT8_bcAWVpD8',
            username: 'KDT8_ParkYoungWoong'
          },
          body: JSON.stringify({
            title: title
          })
        }
      )
      return await res.json()
    },
    onMutate: title => {
      // 낙관적 업데이터(...
      const todo = {
        id: Date.now().toString(),
        title: title
      } as Todo // 타입 단언!
      const previousTodos = queryClient.getQueryData<Todos>(['todos'])
      // todos?.unshift(todo)
      // 타입 가드
      if (previousTodos) {
        queryClient.setQueryData(['todos'], [todo, ...previousTodos])
      }
      return previousTodos
    },
    onSuccess: (_data, _title, _previousTodos) => {
      // 다시 가져와!
      queryClient.fetchQuery({
        queryKey: ['todos']
      })
    },
    onError: (_error, _title, previousTodos) => {
      // 되돌리기!(복구하기)
      // const todos = queryClient.getQueryData<Todos>(['todos'])
      // todos?.shift()
      queryClient.setQueryData(['todos'], previousTodos)
    },
    onSettled: () => {}
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            apikey: 'KDT8_bcAWVpD8',
            username: 'KDT8_ParkYoungWoong'
          },
          body: JSON.stringify({
            title: todo.title,
            done: todo.done
          })
        }
      )
      return await res.json()
    },
    onMutate: () => {},
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ['todos']
      })
    },
    onError: () => {}
  })
}
