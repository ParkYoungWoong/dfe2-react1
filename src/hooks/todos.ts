import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from 'zustand'

type Todos = Todo[] // 할 일 목록
export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}
type FilterStatus = 'all' | 'done' | 'todo'

export const useTodoFiltersStore = create<{
  filterStatus: FilterStatus
  setFilterStatus: (status: FilterStatus) => void
}>(set => {
  return {
    filterStatus: 'all',
    setFilterStatus: status => {
      set({
        filterStatus: status
      })
    }
  }
})

export function useFetchTodos() {
  const filterStatus = useTodoFiltersStore(state => state.filterStatus)
  return useQuery<Todos>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({
          method: 'GET'
        })
      })
      return await res.json()
    },
    select: todos => {
      switch (filterStatus) {
        case 'all':
          return todos
        case 'todo':
          return todos.filter(todo => !todo.done)
        case 'done':
          return todos.filter(todo => todo.done)
      }
    }
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (title: string) => {
      await new Promise(resolve => setTimeout(resolve, 3000))
      const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({
          method: 'POST',
          body: {
            title: title
          }
        })
      })
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
      const res = await fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify({
          method: 'PUT',
          endpoint: todo.id,
          body: {
            title: todo.title,
            done: todo.done
          }
        })
      })
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

export function useDeleteTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify({
          method: 'DELETE',
          endpoint: todo.id
        })
      })
      return await res.json()
    },
    onMutate: () => {},
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ['todos']
      })
    }
  })
}

export function useDeleteDoneTodos() {
  const queryClient = useQueryClient()
  const { data: todos } = useFetchTodos()
  // const todos = queryClient.getQueryData<Todos>(['todos'])
  return useMutation({
    mutationFn: async () => {
      const todoIds = todos?.filter(todo => todo.done).map(todo => todo.id)
      const res = await fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify({
          method: 'DELETE',
          endpoint: 'deletions',
          body: {
            todoIds
          }
        })
      })
      return await res.json()
    },
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ['todos']
      })
    }
  })
}
